import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import type {
  SubscriptionProduct,
  SubscriptionStatus,
  SubscriptionContextValue,
  SubscriptionProviderConfig,
} from './types';

// Dynamic import types for RevenueCat SDK
type Purchases = import('@revenuecat/purchases-js').Purchases;
type PurchasesConfig = import('@revenuecat/purchases-js').PurchasesConfig;
type Package = import('@revenuecat/purchases-js').Package;
type CustomerInfo = import('@revenuecat/purchases-js').CustomerInfo;
type Offerings = import('@revenuecat/purchases-js').Offerings;

// RevenueCat SDK lazy loading
let RevenueCatSDK: typeof import('@revenuecat/purchases-js') | null = null;
const loadRevenueCatSDK = async () => {
  if (!RevenueCatSDK) {
    RevenueCatSDK = await import('@revenuecat/purchases-js');
  }
  return RevenueCatSDK;
};

// Store purchases instance globally
let purchasesInstance: Purchases | null = null;

/**
 * Convert RevenueCat Package to SubscriptionProduct
 */
const convertPackageToProduct = (pkg: Package): SubscriptionProduct => {
  const product = pkg.rcBillingProduct;
  const subscriptionOption = product?.defaultSubscriptionOption;

  return {
    identifier: pkg.identifier,
    productId: product?.identifier || undefined,
    price: product?.currentPrice?.amountMicros
      ? (product.currentPrice.amountMicros / 1000000).toFixed(2)
      : '0',
    priceString: product?.currentPrice?.formattedPrice || '$0',
    title: product?.title || pkg.identifier,
    description: product?.description || '',
    period: product?.normalPeriodDuration || undefined,
    introPrice: subscriptionOption?.introPrice?.price?.formattedPrice || undefined,
    introPriceAmount: subscriptionOption?.introPrice?.price?.amountMicros
      ? (subscriptionOption.introPrice.price.amountMicros / 1000000).toFixed(2)
      : undefined,
    introPricePeriod: subscriptionOption?.introPrice?.periodDuration || undefined,
    introPriceCycles: subscriptionOption?.introPrice?.cycleCount || undefined,
    freeTrialPeriod: subscriptionOption?.trial?.periodDuration || undefined,
  };
};

/**
 * Parse CustomerInfo into SubscriptionStatus
 */
const parseCustomerInfo = (
  customerInfo: CustomerInfo,
  entitlementId: string
): SubscriptionStatus => {
  const entitlement = customerInfo.entitlements.active[entitlementId];

  if (entitlement) {
    return {
      isActive: true,
      expirationDate: entitlement.expirationDate
        ? new Date(entitlement.expirationDate)
        : undefined,
      purchaseDate: entitlement.latestPurchaseDate
        ? new Date(entitlement.latestPurchaseDate)
        : undefined,
      productIdentifier: entitlement.productIdentifier,
      willRenew: entitlement.willRenew,
      isSandbox: entitlement.isSandbox,
      unsubscribeDetectedAt: entitlement.unsubscribeDetectedAt
        ? new Date(entitlement.unsubscribeDetectedAt)
        : undefined,
      billingIssueDetectedAt: entitlement.billingIssueDetectedAt
        ? new Date(entitlement.billingIssueDetectedAt)
        : undefined,
    };
  }

  return { isActive: false };
};

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

export interface SubscriptionProviderProps extends SubscriptionProviderConfig {
  children: ReactNode;
}

/**
 * SubscriptionProvider - Context provider for RevenueCat subscription management
 *
 * Provides subscription state and actions to all child components.
 * Handles RevenueCat SDK initialization, product fetching, and purchase flow.
 *
 * @example
 * ```tsx
 * <SubscriptionProvider
 *   apiKey="your_revenuecat_api_key"
 *   entitlementId="premium"
 *   onError={(error) => console.error(error)}
 *   onPurchaseSuccess={(productId) => analytics.track('purchase', { productId })}
 * >
 *   <App />
 * </SubscriptionProvider>
 * ```
 */
export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  apiKey,
  entitlementId,
  userEmail,
  onError,
  onPurchaseSuccess,
  children,
}) => {
  const [products, setProducts] = useState<SubscriptionProduct[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentOffering, setCurrentOffering] = useState<unknown | null>(null);

  const isDevelopment = !apiKey || apiKey === 'your_revenuecat_api_key_here';

  /**
   * Reset state when user changes
   */
  const resetState = useCallback(() => {
    setProducts([]);
    setCurrentSubscription(null);
    setCurrentOffering(null);
    setError(null);
    setIsInitialized(false);
    setCurrentUserId(null);
    purchasesInstance = null;
  }, []);

  /**
   * Fetch offerings from RevenueCat
   */
  const fetchOfferings = useCallback(async () => {
    if (!purchasesInstance) return;

    try {
      const offerings: Offerings = await purchasesInstance.getOfferings();
      if (offerings.current) {
        setCurrentOffering(offerings.current);
        const productList = offerings.current.availablePackages.map(convertPackageToProduct);
        setProducts(productList);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load offerings';
      setError(errorMsg);
      onError?.(err instanceof Error ? err : new Error(errorMsg));
    }
  }, [onError]);

  /**
   * Fetch customer info from RevenueCat
   */
  const fetchCustomerInfo = useCallback(async () => {
    if (!purchasesInstance) return;

    try {
      const info = await purchasesInstance.getCustomerInfo();
      const status = parseCustomerInfo(info, entitlementId);
      setCurrentSubscription(status.isActive ? status : null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load subscription status';
      setError(errorMsg);
      onError?.(err instanceof Error ? err : new Error(errorMsg));
    }
  }, [entitlementId, onError]);

  /**
   * Initialize RevenueCat with user ID
   */
  const initialize = useCallback(
    async (userId: string, email?: string) => {
      // Reset if user changed
      if (currentUserId && currentUserId !== userId) {
        resetState();
      }

      // Skip if already initialized for this user
      if (isInitialized && currentUserId === userId) return;

      try {
        setIsLoading(true);
        setError(null);

        if (isDevelopment) {
          console.warn('[SubscriptionProvider] RevenueCat API key not configured');
          setProducts([]);
          setCurrentSubscription(null);
        } else {
          const SDK = await loadRevenueCatSDK();

          const config: PurchasesConfig = {
            apiKey,
            appUserId: userId,
          };

          purchasesInstance = SDK.Purchases.configure(config);

          // Set email attribute if provided
          const emailToSet = email || userEmail;
          if (emailToSet && purchasesInstance) {
            try {
              await purchasesInstance.setAttributes({ email: emailToSet });
            } catch {
              // Don't fail initialization if email setting fails
            }
          }

          await Promise.all([fetchOfferings(), fetchCustomerInfo()]);
        }

        setCurrentUserId(userId);
        setIsInitialized(true);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to initialize';
        setError(errorMsg);
        setCurrentSubscription(null);
        setProducts([]);
        onError?.(err instanceof Error ? err : new Error(errorMsg));
      } finally {
        setIsLoading(false);
      }
    },
    [
      currentUserId,
      isInitialized,
      isDevelopment,
      apiKey,
      userEmail,
      fetchOfferings,
      fetchCustomerInfo,
      onError,
      resetState,
    ]
  );

  /**
   * Purchase a subscription
   */
  const purchase = useCallback(
    async (productIdentifier: string): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        if (isDevelopment) {
          // Simulate purchase in development
          await new Promise(resolve => setTimeout(resolve, 2000));
          const mockSubscription: SubscriptionStatus = {
            isActive: true,
            expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            purchaseDate: new Date(),
            productIdentifier,
            willRenew: true,
          };
          setCurrentSubscription(mockSubscription);
          onPurchaseSuccess?.(productIdentifier);
          return true;
        }

        if (!purchasesInstance || !currentOffering) {
          throw new Error('Subscription service not initialized');
        }

        // Find the package by identifier
        const packages = (currentOffering as { availablePackages: Package[] }).availablePackages;
        const packageToPurchase = packages.find(
          (pkg: Package) => pkg.identifier === productIdentifier
        );

        if (!packageToPurchase) {
          throw new Error(`Package not found: ${productIdentifier}`);
        }

        const result = await purchasesInstance.purchase({
          rcPackage: packageToPurchase,
          ...(userEmail ? { customerEmail: userEmail } : {}),
        });

        const status = parseCustomerInfo(result.customerInfo, entitlementId);
        setCurrentSubscription(status.isActive ? status : null);

        if (status.isActive) {
          onPurchaseSuccess?.(productIdentifier);
        }

        return status.isActive;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Purchase failed';
        setError(errorMsg);
        onError?.(err instanceof Error ? err : new Error(errorMsg));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isDevelopment, currentOffering, userEmail, entitlementId, onPurchaseSuccess, onError]
  );

  /**
   * Restore previous purchases
   */
  const restore = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      if (isDevelopment) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setError('No previous purchases found');
        return false;
      }

      if (!purchasesInstance) {
        throw new Error('Subscription service not initialized');
      }

      const customerInfo = await purchasesInstance.getCustomerInfo();
      const status = parseCustomerInfo(customerInfo, entitlementId);
      setCurrentSubscription(status.isActive ? status : null);

      if (!status.isActive) {
        setError('No previous purchases found');
      }

      return status.isActive;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Restore failed';
      setError(errorMsg);
      onError?.(err instanceof Error ? err : new Error(errorMsg));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isDevelopment, entitlementId, onError]);

  /**
   * Refresh subscription status
   */
  const refresh = useCallback(async () => {
    if (isDevelopment) return;

    try {
      setError(null);
      await Promise.all([fetchCustomerInfo(), fetchOfferings()]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Refresh failed';
      setError(errorMsg);
      onError?.(err instanceof Error ? err : new Error(errorMsg));
    }
  }, [isDevelopment, fetchCustomerInfo, fetchOfferings, onError]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-refresh customer info periodically
  useEffect(() => {
    if (!isInitialized || isDevelopment || !purchasesInstance) return;

    const interval = setInterval(() => {
      fetchCustomerInfo().catch(() => {});
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, [isInitialized, isDevelopment, fetchCustomerInfo]);

  const value: SubscriptionContextValue = {
    products,
    currentSubscription,
    isLoading,
    error,
    initialize,
    purchase,
    restore,
    refresh,
    clearError,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};

/**
 * Hook to access subscription context
 *
 * @throws Error if used outside of SubscriptionProvider
 */
export const useSubscriptionContext = (): SubscriptionContextValue => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptionContext must be used within a SubscriptionProvider');
  }
  return context;
};

/**
 * Clear RevenueCat checkout sessions from browser storage
 */
export const clearRevenueCatCheckoutSessions = (): void => {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('revenuecat') || key.includes('rcb') || key.includes('rc_'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));

    const sessionKeysToRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && (key.includes('revenuecat') || key.includes('rcb') || key.includes('rc_'))) {
        sessionKeysToRemove.push(key);
      }
    }
    sessionKeysToRemove.forEach(key => sessionStorage.removeItem(key));
  } catch {
    // Ignore storage errors
  }
};

/**
 * Close RevenueCat instance and clear sessions
 */
export const closeRevenueCatInstance = (): void => {
  try {
    if (purchasesInstance) {
      purchasesInstance.close();
      purchasesInstance = null;
    }
    clearRevenueCatCheckoutSessions();
  } catch {
    // Ignore close errors
  }
};

export default SubscriptionProvider;
