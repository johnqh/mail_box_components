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
 * @param pkg - RevenueCat Package
 * @param offeringMetadata - Optional metadata from the offering containing entitlement info
 */
const convertPackageToProduct = (
  pkg: Package,
  offeringMetadata?: Record<string, unknown>
): SubscriptionProduct => {
  const product = pkg.rcBillingProduct;
  const subscriptionOption = product?.defaultSubscriptionOption;

  // Extract entitlement from offering metadata (set in RevenueCat dashboard)
  const entitlement =
    typeof offeringMetadata?.entitlement === 'string'
      ? offeringMetadata.entitlement
      : undefined;

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
    introPrice:
      subscriptionOption?.introPrice?.price?.formattedPrice || undefined,
    introPriceAmount: subscriptionOption?.introPrice?.price?.amountMicros
      ? (subscriptionOption.introPrice.price.amountMicros / 1000000).toFixed(2)
      : undefined,
    introPricePeriod:
      subscriptionOption?.introPrice?.periodDuration || undefined,
    introPriceCycles: subscriptionOption?.introPrice?.cycleCount || undefined,
    freeTrialPeriod: subscriptionOption?.trial?.periodDuration || undefined,
    entitlement,
  };
};

/**
 * Parse CustomerInfo into SubscriptionStatus
 * Checks for any active entitlement and returns the subscription status
 */
const parseCustomerInfo = (customerInfo: CustomerInfo): SubscriptionStatus => {
  const activeEntitlementIds = Object.keys(customerInfo.entitlements.active);

  if (activeEntitlementIds.length > 0) {
    // Use the first active entitlement for status details
    const firstEntitlementId = activeEntitlementIds[0];
    const entitlement = customerInfo.entitlements.active[firstEntitlementId];

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
      activeEntitlements: activeEntitlementIds,
    };
  }

  return { isActive: false };
};

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(
  undefined
);

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
 *   onError={(error) => console.error(error)}
 *   onPurchaseSuccess={(productId) => analytics.track('purchase', { productId })}
 * >
 *   <App />
 * </SubscriptionProvider>
 * ```
 */
export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  apiKey,
  userEmail,
  onError,
  onPurchaseSuccess,
  children,
}) => {
  const [products, setProducts] = useState<SubscriptionProduct[]>([]);
  const [currentSubscription, setCurrentSubscription] =
    useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentOffering, setCurrentOffering] = useState<unknown | null>(null);
  const [allOfferings, setAllOfferings] = useState<Record<
    string,
    unknown
  > | null>(null);

  const isDevelopment = !apiKey || apiKey === 'your_revenuecat_api_key_here';

  /**
   * Reset state when user changes
   */
  const resetState = useCallback(() => {
    setProducts([]);
    setCurrentSubscription(null);
    setCurrentOffering(null);
    setAllOfferings(null);
    setError(null);
    setIsInitialized(false);
    setCurrentUserId(null);
    purchasesInstance = null;
  }, []);

  /**
   * Fetch offerings from RevenueCat
   * Aggregates packages from ALL offerings, each with its own entitlement from metadata
   */
  const fetchOfferings = useCallback(async () => {
    if (!purchasesInstance) return;

    try {
      const offerings: Offerings = await purchasesInstance.getOfferings();

      // Store the current offering for purchase flow
      if (offerings.current) {
        setCurrentOffering(offerings.current);
      }

      // Aggregate products from ALL offerings, each with its own entitlement
      const allOfferingsData = (offerings as { all?: Record<string, unknown> })
        .all;

      if (allOfferingsData) {
        // Store all offerings for purchase flow
        setAllOfferings(allOfferingsData);

        const productList: SubscriptionProduct[] = [];

        for (const offeringKey of Object.keys(allOfferingsData)) {
          const offering = allOfferingsData[offeringKey] as {
            availablePackages?: Package[];
            metadata?: Record<string, unknown>;
          };

          if (offering?.availablePackages) {
            // Each offering has its own metadata with entitlement
            const offeringMetadata = offering.metadata;
            const productsFromOffering = offering.availablePackages.map(pkg =>
              convertPackageToProduct(pkg, offeringMetadata)
            );
            productList.push(...productsFromOffering);
          }
        }

        setProducts(productList);
      } else if (offerings.current) {
        // Fallback: if no 'all' property, use current offering
        const offeringMetadata = (
          offerings.current as { metadata?: Record<string, unknown> }
        ).metadata;
        const productList = offerings.current.availablePackages.map(pkg =>
          convertPackageToProduct(pkg, offeringMetadata)
        );
        setProducts(productList);
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to load offerings';
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
      const status = parseCustomerInfo(info);
      setCurrentSubscription(status.isActive ? status : null);
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Failed to load subscription status';
      setError(errorMsg);
      onError?.(err instanceof Error ? err : new Error(errorMsg));
    }
  }, [onError]);

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
          console.warn(
            '[SubscriptionProvider] RevenueCat API key not configured'
          );
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
        const errorMsg =
          err instanceof Error ? err.message : 'Failed to initialize';
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
   * @param productIdentifier - The product/package identifier to purchase
   * @param _subscriptionUserId - Optional user ID (for reference; actual user is bound via initialize)
   */
  const purchase = useCallback(
    async (productIdentifier: string, _subscriptionUserId?: string): Promise<boolean> => {
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

        if (!purchasesInstance || (!currentOffering && !allOfferings)) {
          throw new Error('Subscription service not initialized');
        }

        // Find the package by identifier - search across all offerings
        let packageToPurchase: Package | undefined;

        if (allOfferings) {
          for (const offeringKey of Object.keys(allOfferings)) {
            const offering = allOfferings[offeringKey] as {
              availablePackages?: Package[];
            };
            if (offering?.availablePackages) {
              packageToPurchase = offering.availablePackages.find(
                (pkg: Package) => pkg.identifier === productIdentifier
              );
              if (packageToPurchase) break;
            }
          }
        } else if (currentOffering) {
          // Fallback to current offering
          const packages = (currentOffering as { availablePackages: Package[] })
            .availablePackages;
          packageToPurchase = packages.find(
            (pkg: Package) => pkg.identifier === productIdentifier
          );
        }

        if (!packageToPurchase) {
          throw new Error(`Package not found: ${productIdentifier}`);
        }

        const result = await purchasesInstance.purchase({
          rcPackage: packageToPurchase,
          ...(userEmail ? { customerEmail: userEmail } : {}),
        });

        const status = parseCustomerInfo(result.customerInfo);
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
    [
      isDevelopment,
      currentOffering,
      allOfferings,
      userEmail,
      onPurchaseSuccess,
      onError,
    ]
  );

  /**
   * Restore previous purchases
   * @param _subscriptionUserId - Optional user ID (for reference; actual user is bound via initialize)
   */
  const restore = useCallback(async (_subscriptionUserId?: string): Promise<boolean> => {
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
      const status = parseCustomerInfo(customerInfo);
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
  }, [isDevelopment, onError]);

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

    const interval = setInterval(
      () => {
        fetchCustomerInfo().catch(() => {});
      },
      5 * 60 * 1000
    ); // Every 5 minutes

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

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

/**
 * Hook to access subscription context
 *
 * @throws Error if used outside of SubscriptionProvider
 */
export const useSubscriptionContext = (): SubscriptionContextValue => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      'useSubscriptionContext must be used within a SubscriptionProvider'
    );
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
      if (
        key &&
        (key.includes('revenuecat') ||
          key.includes('rcb') ||
          key.includes('rc_'))
      ) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));

    const sessionKeysToRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (
        key &&
        (key.includes('revenuecat') ||
          key.includes('rcb') ||
          key.includes('rc_'))
      ) {
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
