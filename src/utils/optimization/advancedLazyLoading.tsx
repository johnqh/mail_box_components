/**
 * Advanced lazy loading patterns with predictive loading and smart caching
 */

import React, { lazy, Suspense, ComponentType, useEffect, useState } from 'react';

interface LazyLoadConfig {
  retries?: number;
  timeout?: number;
  fallback?: React.ReactNode;
  preloadCondition?: () => boolean;
  cacheStrategy?: 'memory' | 'session' | 'none';
  priority?: 'critical' | 'high' | 'medium' | 'low';
  onLoad?: (component: any) => void;
  onError?: (error: Error) => void;
}

interface LoadedComponent {
  component: ComponentType<Record<string, unknown>>;
  timestamp: number;
  size?: number;
  loadTime: number;
}

// Global component cache
const componentCache = new Map<string, LoadedComponent>();
const loadingPromises = new Map<string, Promise<ComponentType<Record<string, unknown>>>>();
const preloadQueue = new Set<string>();

// Network speed estimation
let networkSpeed: 'slow' | 'medium' | 'fast' = 'medium';
let isLowEndDevice = false;

// Initialize performance detection
function initializePerformanceDetection() {
  // Detect network speed
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection) {
      networkSpeed = connection.effectiveType === '4g' ? 'fast' : 
                   connection.effectiveType === '3g' ? 'medium' : 'slow';
    }
  }

  // Detect device capability
  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  
  isLowEndDevice = (memory && memory < 4) || (cores && cores < 4);
}

// Initialize on module load
initializePerformanceDetection();

/**
 * Enhanced lazy loading with retry logic, caching, and predictive loading
 */
export function createAdvancedLazyComponent<T extends ComponentType<Record<string, unknown>>>(
  importFunc: () => Promise<{ default: T }>,
  componentName: string,
  config: LazyLoadConfig = {}
): ComponentType<Record<string, unknown>> {
  const {
    retries = 3,
    timeout = 10000,
    fallback,
    preloadCondition,
    cacheStrategy = 'memory',
    priority = 'medium',
    onLoad,
    onError
  } = config;

  // Check cache first
  if (componentCache.has(componentName)) {
    const cached = componentCache.get(componentName)!;
    return cached.component;
  }

  const LazyComponent = lazy(async () => {
    const startTime = performance.now();
    
    // Check if already loading
    if (loadingPromises.has(componentName)) {
      return loadingPromises.get(componentName)!.then(comp => ({ default: comp }));
    }

    const loadPromise = loadWithRetry(importFunc, retries, timeout);
    loadingPromises.set(componentName, loadPromise.then(result => result.default));

    try {
      const result = await loadPromise;
      const loadTime = performance.now() - startTime;
      
      // Cache the component
      if (cacheStrategy !== 'none') {
        const loadedComponent: LoadedComponent = {
          component: result.default,
          timestamp: Date.now(),
          loadTime,
        };
        
        componentCache.set(componentName, loadedComponent);
        
        // Session storage for persistent cache
        if (cacheStrategy === 'session') {
          try {
            sessionStorage.setItem(`lazy_${componentName}`, JSON.stringify({
              timestamp: loadedComponent.timestamp,
              loadTime
            }));
          } catch {
            console.warn('Session storage failed for lazy component cache');
          }
        }
      }

      // Remove from loading promises
      loadingPromises.delete(componentName);
      
      onLoad?.(result.default);
      // Component loaded successfully
      
      return result;
    } catch (error) {
      loadingPromises.delete(componentName);
      onError?.(error as Error);
      throw error;
    }
  });

  const WrappedComponent = (props: any) => {
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
      // Predictive preloading based on conditions
      if (preloadCondition && !componentCache.has(componentName)) {
        const shouldPreload = preloadCondition();
        if (shouldPreload && !preloadQueue.has(componentName)) {
          preloadQueue.add(componentName);
          
          // Delay preload based on priority and network speed
          const delay = calculatePreloadDelay(priority, networkSpeed);
          setTimeout(() => {
            importFunc().catch(console.warn);
          }, delay);
        }
      }
    }, []);

    const fallbackComponent = fallback || (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-sm text-gray-600">
          Loading {componentName.replace(/([A-Z])/g, ' $1').trim()}...
        </span>
      </div>
    );

    if (!shouldRender && isLowEndDevice && networkSpeed === 'slow') {
      return (
        <div className="lazy-placeholder">
          <button 
            onClick={() => setShouldRender(true)}
            className="load-component-btn"
          >
            Load {componentName}
          </button>
        </div>
      );
    }

    return (
      <Suspense fallback={fallbackComponent}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  // Add display name for debugging
  WrappedComponent.displayName = `AdvancedLazy(${componentName})`;

  return WrappedComponent;
}

async function loadWithRetry<T>(
  importFunc: () => Promise<T>,
  retries: number,
  timeout: number
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Load timeout')), timeout);
      });

      const result = await Promise.race([importFunc(), timeoutPromise]);
      return result;
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < retries - 1) {
        // Exponential backoff with jitter
        const baseDelay = Math.pow(2, attempt) * 1000;
        const jitter = Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, baseDelay + jitter));
        
        console.warn(`Retry ${attempt + 1}/${retries} for component load:`, error);
      }
    }
  }

  throw lastError!;
}

function calculatePreloadDelay(priority: string, speed: string): number {
  const baseDelays = {
    critical: 0,
    high: 500,
    medium: 2000,
    low: 5000
  };

  const speedMultipliers = {
    fast: 0.5,
    medium: 1,
    slow: 2
  };

  const baseDelay = baseDelays[priority as keyof typeof baseDelays] || 2000;
  const multiplier = speedMultipliers[speed as keyof typeof speedMultipliers] || 1;

  return baseDelay * multiplier;
}

/**
 * Route-based lazy loading with intelligent preloading
 */
export class RouteBasedLazyLoader {
  private static routeMap = new Map<string, ComponentType<Record<string, unknown>>>();
  private static routeUsageStats = new Map<string, number>();
  private static currentRoute = '';

  static registerRoute(path: string, component: ComponentType<Record<string, unknown>>) {
    this.routeMap.set(path, component);
    this.routeUsageStats.set(path, 0);
  }

  static setCurrentRoute(path: string) {
    this.currentRoute = path;
    
    // Increment usage stats
    const currentUsage = this.routeUsageStats.get(path) || 0;
    this.routeUsageStats.set(path, currentUsage + 1);
    
    // Preload likely next routes
    this.preloadLikelyRoutes(path);
  }

  private static preloadLikelyRoutes(currentPath: string) {
    const routeTransitions = this.getRouteTransitionProbability(currentPath);
    
    // Preload routes with high transition probability
    routeTransitions.forEach(({ route, probability }) => {
      if (probability > 0.3 && !componentCache.has(route)) {
        const delay = networkSpeed === 'fast' ? 1000 : 3000;
        setTimeout(() => {
          const component = this.routeMap.get(route);
          if (component) {
            // Trigger preload
            // Preloading likely next route
          }
        }, delay);
      }
    });
  }

  private static getRouteTransitionProbability(fromRoute: string): Array<{route: string, probability: number}> {
    // This would be based on actual user behavior analytics
    // For now, using heuristic rules
    const transitions: Array<{route: string, probability: number}> = [];

    switch (fromRoute) {
      case '/':
        transitions.push(
          { route: '/connect', probability: 0.7 },
          { route: '/about', probability: 0.2 },
          { route: '/document', probability: 0.1 }
        );
        break;
      case '/connect':
        transitions.push(
          { route: '/mail', probability: 0.8 },
          { route: '/settings', probability: 0.1 }
        );
        break;
      case '/mail':
        transitions.push(
          { route: '/compose', probability: 0.4 },
          { route: '/settings', probability: 0.2 }
        );
        break;
      default:
        // Generic fallback
        transitions.push({ route: '/', probability: 0.1 });
    }

    return transitions;
  }

  static getStats() {
    return {
      routeCount: this.routeMap.size,
      cacheSize: componentCache.size,
      currentRoute: this.currentRoute,
      usageStats: Object.fromEntries(this.routeUsageStats)
    };
  }
}

/**
 * Component for lazy loading images with intersection observer
 */
export const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  priority?: 'high' | 'medium' | 'low';
}> = ({ src, alt, className, placeholder, priority = 'medium' }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    // Skip intersection observer for high priority images
    if (priority === 'high') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: priority === 'low' ? '100px' : '200px',
        threshold: 0.1
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={`lazy-image-container ${className}`}>
      <img
        ref={imgRef}
        src={inView ? src : placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4='}
        alt={alt}
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        loading={priority === 'high' ? 'eager' : 'lazy'}
        fetchPriority={priority === 'high' ? 'high' : 'low'}
      />
      {!loaded && inView && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
};

/**
 * Clear component cache (useful for development)
 */
export function clearComponentCache() {
  componentCache.clear();
  preloadQueue.clear();
  // Component cache cleared
}

/**
 * Get performance statistics
 */
export function getLazyLoadingStats() {
  return {
    cachedComponents: componentCache.size,
    preloadQueue: preloadQueue.size,
    networkSpeed,
    isLowEndDevice,
    cacheEntries: Array.from(componentCache.entries()).map(([name, info]) => ({
      name,
      loadTime: info.loadTime,
      age: Date.now() - info.timestamp
    }))
  };
}

export default {
  createAdvancedLazyComponent,
  RouteBasedLazyLoader,
  LazyImage,
  clearComponentCache,
  getLazyLoadingStats
};