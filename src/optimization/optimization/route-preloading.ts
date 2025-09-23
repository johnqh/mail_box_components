/**
 * Route preloading utilities for performance optimization
 */

// Route preloading configuration
export interface RoutePreloadConfig {
  route: string;
  preloadOn: 'hover' | 'visible' | 'idle' | 'immediate';
  priority: 'high' | 'medium' | 'low';
  condition?: () => boolean;
}

// Route preloading service configuration
export interface RoutePreloadingConfig {
  routeImports: Record<string, () => Promise<unknown>>;
  preloadConfigs: RoutePreloadConfig[];
}

/**
 * Route Preloading Service
 * Handles intelligent route preloading based on user behavior and configuration
 */
export class RoutePreloadingService {
  private preloadedRoutes = new Set<string>();
  private preloadingRoutes = new Set<string>();
  private config: RoutePreloadingConfig;

  constructor(config: RoutePreloadingConfig) {
    this.config = config;
  }

  /**
   * Preload a specific route
   */
  async preloadRoute(route: string): Promise<void> {
    if (this.preloadedRoutes.has(route) || this.preloadingRoutes.has(route)) {
      return;
    }

    const routeImport = this.config.routeImports[route];
    if (!routeImport) {
      console.warn(`No import function found for route: ${route}`);
      return;
    }

    this.preloadingRoutes.add(route);

    try {
      await routeImport();
      this.preloadedRoutes.add(route);
      // Route preloaded successfully
    } catch (error) {
      console.warn(`Failed to preload route ${route}:`, error);
    } finally {
      this.preloadingRoutes.delete(route);
    }
  }

  /**
   * Preload routes based on strategy
   */
  preloadRoutesByStrategy(strategy: 'immediate' | 'idle' | 'visible'): void {
    const routesToPreload = this.config.preloadConfigs
      .filter(config => config.preloadOn === strategy)
      .filter(config => !config.condition || config.condition())
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

    routesToPreload.forEach(config => {
      this.preloadRoute(config.route);
    });
  }

  /**
   * Preload routes on idle
   */
  preloadOnIdle(): void {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(
        () => {
          this.preloadRoutesByStrategy('idle');
        },
        { timeout: 5000 }
      );
    } else {
      setTimeout(() => {
        this.preloadRoutesByStrategy('idle');
      }, 2000);
    }
  }

  /**
   * Preload routes immediately (high priority ones)
   */
  preloadImmediate(): void {
    this.preloadRoutesByStrategy('immediate');
  }

  /**
   * Get hover preloading handler
   */
  getHoverPreloadHandler() {
    const handleLinkHover = (event: Event) => {
      const target = event.currentTarget as HTMLAnchorElement;
      const href = target?.getAttribute('href');
      if (href && this.config.routeImports[href]) {
        const config = this.config.preloadConfigs.find(c => c.route === href);
        if (
          config &&
          config.preloadOn === 'hover' &&
          (!config.condition || config.condition())
        ) {
          this.preloadRoute(href);
        }
      }
    };

    return { onMouseEnter: handleLinkHover };
  }

  /**
   * Setup intersection observer preloading for visible links
   */
  setupVisiblePreloading(): () => void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.getAttribute('href');
            if (href && this.config.routeImports[href]) {
              const config = this.config.preloadConfigs.find(
                c => c.route === href
              );
              if (
                config &&
                config.preloadOn === 'visible' &&
                (!config.condition || config.condition())
              ) {
                this.preloadRoute(href);
                observer.unobserve(link);
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all links on the page
    const observeLinks = () => {
      document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && this.config.routeImports[href]) {
          observer.observe(link);
        }
      });
    };

    // Initial observation
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeLinks);
    } else {
      observeLinks();
    }

    return () => observer.disconnect();
  }

  /**
   * Add resource hints for critical dependencies
   */
  addResourceHints(
    hints?: Array<{
      rel: string;
      href: string;
      crossorigin?: boolean;
      as?: string;
      type?: string;
    }>
  ): void {
    if (typeof document === 'undefined') return;

    const defaultHints = [
      // DNS prefetch for external resources
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },

      // Preconnect to critical origins
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
        crossorigin: true,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
    ];

    const allHints = hints ? [...defaultHints, ...hints] : defaultHints;

    allHints.forEach(hint => {
      const link = document.createElement('link');
      Object.assign(link, hint);
      document.head.appendChild(link);
    });
  }

  /**
   * Initialize performance optimizations
   */
  initializePerformanceOptimizations(options?: {
    resourceHints?: Array<{
      rel: string;
      href: string;
      crossorigin?: boolean;
      as?: string;
      type?: string;
    }>;
    customPreloadLogic?: () => void;
  }): () => void {
    // Add resource hints
    this.addResourceHints(options?.resourceHints);

    // Start preloading immediately for high-priority routes
    this.preloadImmediate();

    // Setup idle preloading
    this.preloadOnIdle();

    // Setup visible link preloading
    const cleanupVisiblePreloading = this.setupVisiblePreloading();

    // Custom preload logic
    if (options?.customPreloadLogic) {
      options.customPreloadLogic();
    }

    return cleanupVisiblePreloading;
  }

  /**
   * Check if route is preloaded
   */
  isPreloaded(route: string): boolean {
    return this.preloadedRoutes.has(route);
  }

  /**
   * Get preloading status
   */
  getPreloadingStatus() {
    return {
      preloaded: Array.from(this.preloadedRoutes),
      preloading: Array.from(this.preloadingRoutes),
      total: Object.keys(this.config.routeImports).length,
    };
  }
}

// Legacy function-based API for backward compatibility
export const createRoutePreloadingService = (config: RoutePreloadingConfig) => {
  return new RoutePreloadingService(config);
};

export default RoutePreloadingService;
