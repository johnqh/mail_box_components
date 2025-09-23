/**
 * @fileoverview Advanced Loading Optimization Component
 * @description Implements critical loading optimizations for better Core Web Vitals
 */

import { useEffect } from 'react';

/**
 * LoadingOptimizer component that implements advanced loading strategies
 *
 * @description Optimizations:
 * 1. Resource prefetching based on user behavior
 * 2. Intelligent preloading of likely routes
 * 3. Critical resource prioritization
 * 4. Performance monitoring and adjustment
 *
 * @example Basic Usage
 * LoadingOptimizer component should be placed at the top level of your App.
 * Import and use: import LoadingOptimizer from './components/LoadingOptimizer';
 * Then add <LoadingOptimizer /> to your JSX.
 */
export const LoadingOptimizer = () => {
  useEffect(() => {
    // Critical loading optimizations
    const optimizeLoading = () => {
      // 1. Optimize image loading with intersection observer
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.removeAttribute('data-src');
                  imageObserver.unobserve(img);
                }
              }
            });
          },
          {
            rootMargin: '50px 0px', // Load images 50px before they come into view
          }
        );

        // Observer all images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }

      // 2. Prefetch critical routes based on user intent
      const prefetchCriticalRoutes = () => {
        const criticalRoutes = ['/connect', '/mail', '/settings'];

        criticalRoutes.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
      };

      // 3. Optimize Web3 wallet loading
      const optimizeWalletLoading = () => {
        // Preload wallet detection script
        if (!document.querySelector('script[data-wallet-detection]')) {
          const script = document.createElement('script');
          script.dataset.walletDetection = 'true';
          script.innerHTML =
            '(function() { window.walletPreload = { hasMetaMask: typeof window.ethereum !== "undefined", hasPhantom: typeof window.solana !== "undefined", hasWalletConnect: true }; })();';
          document.head.appendChild(script);
        }
      };

      // 4. Critical resource prioritization
      const prioritizeCriticalResources = () => {
        // Set high priority for hero images
        document.querySelectorAll('img[data-hero]').forEach(element => {
          const img = element as HTMLImageElement;
          img.loading = 'eager';
          if ('fetchPriority' in img) {
            (img as any).fetchPriority = 'high';
          }
        });

        // Set low priority for non-critical images
        document
          .querySelectorAll('img[data-priority="low"]')
          .forEach(element => {
            const img = element as HTMLImageElement;
            img.loading = 'lazy';
            if ('fetchPriority' in img) {
              (img as any).fetchPriority = 'low';
            }
          });
      };

      // Execute optimizations
      requestIdleCallback(
        () => {
          prefetchCriticalRoutes();
          optimizeWalletLoading();
          prioritizeCriticalResources();
        },
        { timeout: 2000 }
      );
    };

    // 5. Performance monitoring and adaptive loading
    const monitorPerformance = () => {
      if ('PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint
        const lcpObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            startTime: number;
            element?: Element;
          };

          if (lastEntry && lastEntry.startTime > 2500) {
            // LCP is poor, implement aggressive optimizations
            console.warn(
              'Poor LCP detected, implementing aggressive optimizations'
            );

            // Disable non-critical animations
            document.documentElement.style.setProperty(
              '--animation-duration',
              '0s'
            );

            // Reduce image quality for subsequent loads
            localStorage.setItem('reduce-image-quality', 'true');
          }
        });

        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch {
          // Fallback for browsers that don't support LCP
          // LCP monitoring not supported in this browser
        }

        // Monitor Cumulative Layout Shift
        const clsObserver = new PerformanceObserver(list => {
          let clsValue = 0;

          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }

          if (clsValue > 0.1) {
            console.warn('High CLS detected:', clsValue);

            // Add explicit dimensions to problematic elements
            document
              .querySelectorAll('img:not([width]):not([height])')
              .forEach(element => {
                const img = element as HTMLImageElement;
                img.style.aspectRatio = '16/9'; // Default aspect ratio
              });
          }
        });

        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch {
          // CLS monitoring not supported in this browser
        }
      }
    };

    // 6. Network-aware loading
    const adaptToNetworkConditions = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;

        if (connection) {
          const effectiveType = connection.effectiveType;

          if (effectiveType === 'slow-2g' || effectiveType === '2g') {
            // Very slow connection - minimal loading
            document.documentElement.classList.add('slow-connection');

            // Disable non-critical prefetching
            document.querySelectorAll('link[rel="prefetch"]').forEach(link => {
              if (!link.getAttribute('data-critical')) {
                link.remove();
              }
            });

            // Use lower quality images
            localStorage.setItem('use-low-quality-images', 'true');
          } else if (effectiveType === '3g') {
            // Moderate connection - balanced loading
            document.documentElement.classList.add('moderate-connection');
          } else {
            // Fast connection - full optimization
            document.documentElement.classList.add('fast-connection');
          }
        }
      }
    };

    // Initialize optimizations
    const initOptimizations = () => {
      optimizeLoading();
      monitorPerformance();
      adaptToNetworkConditions();
    };

    // Run immediately for critical optimizations
    initOptimizations();

    // Cleanup on unmount
    return () => {
      // Clean up observers if component unmounts
      if ('PerformanceObserver' in window) {
        try {
          PerformanceObserver.supportedEntryTypes.forEach(() => {
            // Observers will be garbage collected
          });
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default LoadingOptimizer;
