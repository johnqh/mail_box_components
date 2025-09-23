/**
 * Conditional dynamic imports for feature-based code splitting
 * Only loads code when specific conditions are met
 */

import React, { ComponentType, Suspense } from 'react';
// Simple loading component replacement
const LoadingState: React.FC<{ message: string }> = ({ message }) => (
  <div className='flex items-center justify-center p-4'>
    <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500'></div>
    <span className='ml-2 text-sm text-gray-600'>{message}</span>
  </div>
);

interface ConditionalImportConfig {
  condition: () => boolean | Promise<boolean>;
  fallback?: React.ReactNode;
  retries?: number;
  timeout?: number;
  priority?: 'high' | 'medium' | 'low';
  cacheKey?: string;
}

// Cache for conditionally loaded components
const conditionalCache = new Map<
  string,
  {
    component: ComponentType<Record<string, unknown>>;
    condition: () => boolean | Promise<boolean>;
    lastCheck: number;
    isValid: boolean;
  }
>();

/**
 * Create a lazily loaded component that only imports when conditions are met
 */
export function createConditionalLazyComponent<
  T extends ComponentType<Record<string, unknown>>,
>(
  importFn: () => Promise<{ default: T }>,
  config: ConditionalImportConfig
): ComponentType<Record<string, unknown>> {
  const {
    condition,
    fallback,
    retries = 3,
    timeout = 10000,
    priority = 'medium',
    cacheKey = `conditional-${Math.random()}`,
  } = config;

  const ConditionalComponent = (props: any) => {
    const [componentReady, setComponentReady] = React.useState(false);
    const [LazyComponent, setLazyComponent] = React.useState<ComponentType<
      Record<string, unknown>
    > | null>(null);

    React.useEffect(() => {
      const checkAndLoad = async () => {
        const cached = conditionalCache.get(cacheKey);

        // Check cache first
        if (
          cached &&
          cached.isValid &&
          Date.now() - cached.lastCheck < 5 * 60 * 1000
        ) {
          try {
            const conditionMet = await cached.condition();
            if (conditionMet) {
              setLazyComponent(() => cached.component);
              setComponentReady(true);
              return;
            }
          } catch (error) {
            console.warn('Cached condition check failed:', error);
          }
        }

        // Check condition
        try {
          const conditionMet = await condition();

          if (conditionMet) {
            // Load component with retry logic
            const component = await loadWithRetry(importFn, retries, timeout);

            // Cache the component
            conditionalCache.set(cacheKey, {
              component: component.default,
              condition,
              lastCheck: Date.now(),
              isValid: true,
            });

            setLazyComponent(() => component.default);
            setComponentReady(true);
          }
        } catch (error) {
          console.error('Failed to load conditional component:', error);
        }
      };

      // Add delay based on priority
      const delay = priority === 'high' ? 0 : priority === 'medium' ? 100 : 500;
      const timer = setTimeout(checkAndLoad, delay);

      return () => clearTimeout(timer);
    }, []);

    if (!componentReady) {
      return fallback || <LoadingState message='Checking conditions...' />;
    }

    if (!LazyComponent) {
      return null; // Condition not met
    }

    return (
      <Suspense
        fallback={fallback || <LoadingState message='Loading component...' />}
      >
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  ConditionalComponent.displayName = `ConditionalLazy(${cacheKey})`;
  return ConditionalComponent;
}

/**
 * Subscription-based conditional imports - Examples for future implementation
 * Note: These are template components that can be implemented as needed
 */
export const SubscriptionGatedComponents = {
  // Example: Premium features only for subscribed users
  // PremiumEmailFeatures: createConditionalLazyComponent(
  //   () => import('../components/premium/PremiumEmailFeatures'),
  //   {
  //     condition: async () => {
  //       const hasSubscription = await checkSubscriptionStatus();
  //       return hasSubscription;
  //     },
  //     cacheKey: 'premium-email-features',
  //     priority: 'high'
  //   }
  // ),
};

/**
 * Platform-specific conditional imports - Templates for future implementation
 */
export const PlatformSpecificComponents = {
  // Examples of platform-specific conditional loading
  // These can be implemented as needed for specific platform optimizations
};

/**
 * Helper functions
 */
async function loadWithRetry<T>(
  importFn: () => Promise<T>,
  retries: number,
  timeout: number
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Import timeout')), timeout);
      });

      return await Promise.race([importFn(), timeoutPromise]);
    } catch (error) {
      lastError = error as Error;

      if (attempt < retries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
}

/**
 * Clear conditional component cache
 */
export function clearConditionalCache() {
  conditionalCache.clear();
  // Conditional component cache cleared
}

/**
 * Get conditional loading statistics
 */
export function getConditionalStats() {
  return {
    cachedComponents: conditionalCache.size,
    cacheEntries: Array.from(conditionalCache.entries()).map(([key, info]) => ({
      key,
      lastCheck: info.lastCheck,
      isValid: info.isValid,
      age: Date.now() - info.lastCheck,
    })),
  };
}

export default {
  createConditionalLazyComponent,
  SubscriptionGatedComponents,
  PlatformSpecificComponents,
  clearConditionalCache,
  getConditionalStats,
};
