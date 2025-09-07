/**
 * Performance Optimization Utilities for React Components
 * Provides tools for monitoring, profiling, and optimizing application performance
 */

import React, { useMemo, useCallback, useEffect, useRef, useState } from 'react';

// Performance monitoring utilities
export const performanceUtils = {
  // Mark performance milestones
  mark: (name: string) => {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(name);
    }
  },

  // Measure time between marks
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof performance !== 'undefined' && performance.measure) {
      try {
        performance.measure(name, startMark, endMark);
        const entries = performance.getEntriesByName(name);
        return entries[entries.length - 1]?.duration || 0;
      } catch (error) {
        console.warn('Performance measurement failed:', error);
        return 0;
      }
    }
    return 0;
  },

  // Get performance entries
  getEntries: (name?: string) => {
    if (typeof performance !== 'undefined' && performance.getEntriesByName) {
      return name ? performance.getEntriesByName(name) : performance.getEntries();
    }
    return [];
  },

  // Clear performance entries
  clearEntries: (name?: string) => {
    if (typeof performance !== 'undefined') {
      if (name) {
        performance.clearMeasures?.(name);
        performance.clearMarks?.(name);
      } else {
        performance.clearMeasures?.();
        performance.clearMarks?.();
      }
    }
  }
};

// React performance hooks
export const usePerformanceMark = (name: string, dependencies: unknown[] = []) => {
  useEffect(() => {
    performanceUtils.mark(`${name}-start`);
    return () => {
      performanceUtils.mark(`${name}-end`);
      performanceUtils.measure(name, `${name}-start`, `${name}-end`);
    };
  }, [name, dependencies]);
};

// Stable callback hook to prevent unnecessary re-renders
export const useStableCallback = <T extends (...args: unknown[]) => unknown>(callback: T): T => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback((...args: unknown[]) => callbackRef.current(...args), []) as T;
};

// Memoization with debugging
export const useDebugMemo = <T>(factory: () => T, deps: unknown[], debugName?: string): T => {
  const prevDeps = useRef(deps);
  const prevResult = useRef<T | undefined>(undefined);
  
  return useMemo(() => {
    if (debugName && process.env.NODE_ENV === 'development') {
      const depsChanged = deps.some((dep, index) => dep !== prevDeps.current[index]);
      if (depsChanged) {
        // Dependency change detected for optimization
      }
    }
    
    prevDeps.current = deps;
    prevResult.current = factory();
    return prevResult.current;
  }, [factory, debugName, deps]);
};

// Component render counting for debugging
const renderCounts = new Map<string, number>();

export const useRenderCount = (componentName: string) => {
  const count = renderCounts.get(componentName) || 0;
  renderCounts.set(componentName, count + 1);
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Component render count tracked for optimization
    }
  });
};

export const getRenderCounts = () => Object.fromEntries(renderCounts);
export const clearRenderCounts = () => renderCounts.clear();

// Lazy loading utilities
export const createLazyComponentFactory = <T extends React.ComponentType<Record<string, unknown>>>(
  importFunc: () => Promise<{ default: T }>
) => {
  return React.lazy(importFunc);
};

// Image lazy loading with intersection observer
export const useImageLazyLoading = (threshold: number = 0.1) => {
  const [loadedImages, setLoadedImages] = useState(new Set<string>());
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.onload = () => {
                setLoadedImages(prev => new Set(prev).add(src));
              };
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      { threshold }
    );
    
    return () => observerRef.current?.disconnect();
  }, [threshold]);
  
  const observeImage = useCallback((element: HTMLImageElement | null) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);
  
  return { loadedImages, observeImage };
};

// Bundle loading utilities
export const preloadRoute = (routeImport: () => Promise<unknown>) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      routeImport().catch(() => {}); // Preload but ignore errors
    });
  } else {
    setTimeout(() => {
      routeImport().catch(() => {});
    }, 100);
  }
};

// Web Vitals monitoring
export interface WebVitalsMetrics {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
}

const vitalsMetrics: WebVitalsMetrics = {};

export const reportWebVitals = (metric: { name: string; value: number }) => {
  vitalsMetrics[metric.name as keyof WebVitalsMetrics] = metric.value;
  
  // Report to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Analytics reporting would go here
    // Web vital metric logged for analytics
  }
};

export const getWebVitals = () => vitalsMetrics;

// Resource loading optimization
export const prefetchResource = (href: string, as: string = 'script') => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }
};

export const preloadResource = (href: string, as: string = 'script', crossorigin?: boolean) => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (crossorigin) link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }
};

// Memory leak detection
export const useMemoryLeakDetection = (componentName: string) => {
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const intervalsRef = useRef<Set<ReturnType<typeof setInterval>>>(new Set());
  
  const createTimer = useCallback((callback: () => void, delay: number) => {
    const timer = setTimeout(() => {
      timersRef.current.delete(timer);
      callback();
    }, delay);
    timersRef.current.add(timer);
    return timer;
  }, []);
  
  const createInterval = useCallback((callback: () => void, delay: number) => {
    const interval = setInterval(callback, delay);
    intervalsRef.current.add(interval);
    return interval;
  }, []);
  
  useEffect(() => {
    const timers = timersRef.current;
    const intervals = intervalsRef.current;
    
    return () => {
      // Cleanup all timers and intervals
      timers.forEach(timer => clearTimeout(timer));
      intervals.forEach(interval => clearInterval(interval));
      
      if (process.env.NODE_ENV === 'development') {
        // Component unmounted - memory leak detection completed
      }
    };
  }, [componentName]);
  
  return { createTimer, createInterval };
};

// Performance budget monitoring
export const performanceBudget = {
  // Bundle size limits (in KB)
  maxBundleSize: 500,
  maxChunkSize: 200,
  maxImageSize: 100,
  
  // Performance metrics thresholds
  maxFCP: 1800, // 1.8s
  maxLCP: 2500, // 2.5s
  maxFID: 100,  // 100ms
  maxCLS: 0.1,  // 0.1
  
  check: (metrics: WebVitalsMetrics) => {
    const violations = [];
    
    if (metrics.FCP && metrics.FCP > performanceBudget.maxFCP) {
      violations.push(`FCP (${metrics.FCP}ms) exceeds budget (${performanceBudget.maxFCP}ms)`);
    }
    
    if (metrics.LCP && metrics.LCP > performanceBudget.maxLCP) {
      violations.push(`LCP (${metrics.LCP}ms) exceeds budget (${performanceBudget.maxLCP}ms)`);
    }
    
    if (metrics.FID && metrics.FID > performanceBudget.maxFID) {
      violations.push(`FID (${metrics.FID}ms) exceeds budget (${performanceBudget.maxFID}ms)`);
    }
    
    if (metrics.CLS && metrics.CLS > performanceBudget.maxCLS) {
      violations.push(`CLS (${metrics.CLS}) exceeds budget (${performanceBudget.maxCLS})`);
    }
    
    return violations;
  }
};

export default {
  performanceUtils,
  usePerformanceMark,
  useStableCallback,
  useDebugMemo,
  useRenderCount,
  createLazyComponentFactory,
  useImageLazyLoading,
  preloadRoute,
  reportWebVitals,
  getWebVitals,
  prefetchResource,
  preloadResource,
  useMemoryLeakDetection,
  performanceBudget,
  getRenderCounts,
  clearRenderCounts
};