/**
 * Advanced lazy loading utilities for React components
 */

import React, { Suspense, lazy, ComponentType, ReactNode } from 'react';

// Lazy loading with retry logic
export function lazyWithRetry<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  retries = 3,
  delay = 1000
): React.LazyExoticComponent<T> {
  return lazy(() => {
    return new Promise<{ default: T }>((resolve, reject) => {
      const attempt = (retriesLeft: number) => {
        importFn()
          .then(resolve)
          .catch((error) => {
            if (retriesLeft > 0) {
              setTimeout(() => {
                // Retry import silently
                attempt(retriesLeft - 1);
              }, delay);
            } else {
              reject(error);
            }
          });
      };
      attempt(retries);
    });
  });
}

// Preloadable lazy component
export interface PreloadableComponent<T extends ComponentType<any>> {
  Component: React.LazyExoticComponent<T>;
  preload: () => Promise<void>;
}

export function lazyWithPreload<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): PreloadableComponent<T> {
  let preloadPromise: Promise<{ default: T }> | null = null;

  const preload = () => {
    if (!preloadPromise) {
      preloadPromise = importFn();
    }
    return preloadPromise.then(() => undefined);
  };

  const Component = lazy(() => {
    if (preloadPromise) {
      return preloadPromise;
    }
    return importFn();
  });

  return { Component, preload };
}

// Progressive enhancement lazy loading
export interface ProgressiveOptions {
  fallback?: ReactNode;
  errorFallback?: ReactNode;
  loadingDelay?: number;
  minimumLoadingTime?: number;
}

export function createProgressiveComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: ProgressiveOptions = {}
) {
  const {
    fallback = <div>Loading...</div>,
    errorFallback = <div>Failed to load component</div>,
    loadingDelay = 200,
    minimumLoadingTime = 500,
  } = options;

  const LazyComponent = lazy(async () => {
    const startTime = Date.now();
    
    try {
      const module = await importFn();
      
      // Ensure minimum loading time for smooth UX
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minimumLoadingTime) {
        await new Promise(resolve => 
          setTimeout(resolve, minimumLoadingTime - elapsedTime)
        );
      }
      
      return module;
    } catch (error) {
      console.error('Failed to load component:', error);
      // Return a component that renders the error fallback
      return {
        default: (() => errorFallback) as any
      };
    }
  });

  // Wrapper component with delayed loading indicator
  const DelayedFallback: React.FC = () => {
    const [showFallback, setShowFallback] = React.useState(false);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setShowFallback(true);
      }, loadingDelay);

      return () => clearTimeout(timer);
    }, []);

    if (!showFallback) {
      return null;
    }

    return <>{fallback}</>;
  };

  return React.forwardRef<any, any>((props, ref) => (
    <Suspense fallback={<DelayedFallback />}>
      <LazyComponent {...(props as any)} ref={ref} />
    </Suspense>
  )) as any;
}

// Intersection Observer lazy loading
export function useLazyLoad(
  ref: React.RefObject<HTMLElement>,
  options: globalThis.IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || hasLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options, hasLoaded]);

  return isIntersecting;
}

// Component-level lazy loading wrapper
export interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: ReactNode;
}

export const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback = <div>Loading...</div>,
  threshold = 0.01,
  rootMargin = '50px',
  placeholder
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useLazyLoad(ref as React.RefObject<HTMLElement>, { threshold, rootMargin });

  return (
    <div ref={ref}>
      {isVisible ? children : (placeholder || fallback)}
    </div>
  );
};

// Route-based lazy loading with prefetching
export interface LazyRouteConfig<T extends ComponentType<any>> {
  path: string;
  importFn: () => Promise<{ default: T }>;
  preloadOnHover?: boolean;
  preloadOnFocus?: boolean;
  prefetchDelay?: number;
}

export function createLazyRoute<T extends ComponentType<any>>(
  config: LazyRouteConfig<T>
) {
  const {
    importFn,
    preloadOnHover = true,
    preloadOnFocus = true,
    prefetchDelay = 50
  } = config;

  let preloadTimer: ReturnType<typeof setTimeout> | null = null;
  let preloadPromise: Promise<{ default: T }> | null = null;

  const preload = () => {
    if (!preloadPromise) {
      preloadPromise = importFn();
    }
    return preloadPromise;
  };

  const handleInteraction = () => {
    if (preloadTimer) {
      clearTimeout(preloadTimer);
    }
    preloadTimer = setTimeout(() => {
      preload();
    }, prefetchDelay);
  };

  const Component = lazy(() => {
    if (preloadPromise) {
      return preloadPromise;
    }
    return importFn();
  });

  return {
    Component,
    preload,
    linkProps: {
      ...(preloadOnHover && {
        onMouseEnter: handleInteraction,
        onMouseLeave: () => {
          if (preloadTimer) {
            clearTimeout(preloadTimer);
          }
        }
      }),
      ...(preloadOnFocus && {
        onFocus: handleInteraction
      })
    }
  };
}

// Dynamic import with loading states
export function useDynamicImport<T>(
  importFn: () => Promise<T>,
  deps: React.DependencyList = []
) {
  const [module, setModule] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let mounted = true;
    
    setLoading(true);
    setError(null);
    
    importFn()
      .then((mod) => {
        if (mounted) {
          setModule(mod);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, deps);

  return { module, loading, error };
}

// Batch lazy loading
export class LazyLoadQueue {
  private queue: Set<() => Promise<any>> = new Set();
  private isProcessing = false;
  private batchSize: number;
  private delay: number;

  constructor(batchSize = 3, delay = 100) {
    this.batchSize = batchSize;
    this.delay = delay;
  }

  add(loadFn: () => Promise<any>) {
    this.queue.add(loadFn);
    this.process();
  }

  private async process() {
    if (this.isProcessing || this.queue.size === 0) return;

    this.isProcessing = true;
    
    const batch = Array.from(this.queue).slice(0, this.batchSize);
    batch.forEach(fn => this.queue.delete(fn));

    await Promise.all(batch.map(fn => fn().catch(console.error)));
    
    if (this.queue.size > 0) {
      await new Promise(resolve => setTimeout(resolve, this.delay));
    }

    this.isProcessing = false;
    
    if (this.queue.size > 0) {
      this.process();
    }
  }
}

// Resource hints for lazy loading
export function addResourceHint(
  url: string,
  type: 'prefetch' | 'preload' | 'preconnect' | 'dns-prefetch',
  as?: string
) {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = type;
  link.href = url;
  
  if (as && (type === 'preload' || type === 'prefetch')) {
    link.as = as;
  }
  
  document.head.appendChild(link);
}

// Priority-based lazy loading
export enum LoadPriority {
  HIGH = 0,
  MEDIUM = 1,
  LOW = 2,
  IDLE = 3
}

export class PriorityLoader {
  private queues: Map<LoadPriority, (() => Promise<any>)[]> = new Map();
  private isProcessing = false;

  constructor() {
    Object.values(LoadPriority)
      .filter(v => typeof v === 'number')
      .forEach(priority => {
        this.queues.set(priority as LoadPriority, []);
      });
  }

  load(fn: () => Promise<any>, priority: LoadPriority = LoadPriority.MEDIUM) {
    const queue = this.queues.get(priority);
    if (queue) {
      queue.push(fn);
    }
    this.process();
  }

  private async process() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    for (const [priority, queue] of this.queues) {
      while (queue.length > 0) {
        const fn = queue.shift();
        if (fn) {
          try {
            await fn();
          } catch (error) {
            console.error(`Failed to load resource with priority ${priority}:`, error);
          }
        }
        
        // Add delay for lower priority items
        if (priority >= LoadPriority.LOW) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    }

    this.isProcessing = false;
  }
}

// Export singleton instances
export const lazyLoadQueue = new LazyLoadQueue();
export const priorityLoader = new PriorityLoader();

export default {
  lazyWithRetry,
  lazyWithPreload,
  createProgressiveComponent,
  useLazyLoad,
  LazyWrapper,
  createLazyRoute,
  useDynamicImport,
  LazyLoadQueue,
  addResourceHint,
  PriorityLoader,
  LoadPriority,
  lazyLoadQueue,
  priorityLoader
};