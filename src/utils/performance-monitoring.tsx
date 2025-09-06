/**
 * Performance monitoring and Web Vitals tracking
 */

import React from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

// Performance metrics interface
export interface PerformanceMetrics {
  // Core Web Vitals
  LCP?: number; // Largest Contentful Paint
  INP?: number; // Interaction to Next Paint (replaces FID)
  CLS?: number; // Cumulative Layout Shift
  
  // Additional metrics
  FCP?: number; // First Contentful Paint
  TTFB?: number; // Time to First Byte
  
  // Custom metrics
  routeChangeTime?: number;
  componentRenderTime?: number;
  apiResponseTime?: number;
  bundleLoadTime?: number;
  
  // User context
  connection?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  viewport?: { width: number; height: number };
  timestamp: number;
}

// Performance observer for custom metrics
class PerformanceMonitor {
  private metrics: PerformanceMetrics = { timestamp: Date.now() };
  private observers: PerformanceObserver[] = [];
  private reportCallback?: (metrics: PerformanceMetrics) => void;
  private performanceMarks: Map<string, number> = new Map();
  
  constructor(reportCallback?: (metrics: PerformanceMetrics) => void) {
    this.reportCallback = reportCallback;
    this.initializeWebVitals();
    this.initializeCustomObservers();
    this.collectDeviceInfo();
  }
  
  private initializeWebVitals(): void {
    // Collect Core Web Vitals
    onCLS((metric: {value: number; name: string}) => {
      this.metrics.CLS = metric.value;
      this.reportMetric('CLS', metric.value);
    });
    
    onINP((metric: {value: number; name: string}) => {
      this.metrics.INP = metric.value;
      this.reportMetric('INP', metric.value);
    });
    
    onFCP((metric: {value: number; name: string}) => {
      this.metrics.FCP = metric.value;
      this.reportMetric('FCP', metric.value);
    });
    
    onLCP((metric: {value: number; name: string}) => {
      this.metrics.LCP = metric.value;
      this.reportMetric('LCP', metric.value);
    });
    
    onTTFB((metric: {value: number; name: string}) => {
      this.metrics.TTFB = metric.value;
      this.reportMetric('TTFB', metric.value);
    });
  }
  
  private initializeCustomObservers(): void {
    if ('PerformanceObserver' in window) {
      // Navigation timing
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.metrics.bundleLoadTime = navEntry.loadEventEnd - navEntry.fetchStart;
          }
        });
      });
      
      try {
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navigationObserver);
      } catch (_e) {
        console.warn('Navigation timing observer not supported');
      }
      
      // Resource timing for bundle analysis
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name.includes('.js') || entry.name.includes('.css')) {
            this.trackResourceLoad(entry.name, entry.duration);
          }
        });
      });
      
      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver);
      } catch (_e) {
        console.warn('Resource timing observer not supported');
      }
    }
  }
  
  private collectDeviceInfo(): void {
    if (typeof window !== 'undefined') {
      // Network information
      const nav = navigator as any;
      if (nav.connection) {
        this.metrics.connection = nav.connection.effectiveType || nav.connection.type;
      }
      
      // Device capabilities
      if (nav.deviceMemory) {
        this.metrics.deviceMemory = nav.deviceMemory;
      }
      
      if (nav.hardwareConcurrency) {
        this.metrics.hardwareConcurrency = nav.hardwareConcurrency;
      }
      
      // Viewport
      this.metrics.viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
  }
  
  private reportMetric(_name: string, _value: number): void {
    // Report to analytics or monitoring service
    if (this.reportCallback) {
      this.reportCallback({ ...this.metrics, timestamp: Date.now() });
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      // Development logging disabled to avoid console warnings
    }
  }
  
  private trackResourceLoad(resource: string, duration: number): void {
    const isJS = resource.includes('.js');
    const isCSS = resource.includes('.css');
    
    if (isJS || isCSS) {
      const type = isJS ? 'JavaScript' : 'CSS';
      this.reportMetric(`${type} Load`, duration);
    }
  }
  
  public measureComponentRender(componentName: string, renderTime: number): void {
    this.metrics.componentRenderTime = renderTime;
    this.reportMetric(`Component Render (${componentName})`, renderTime);
  }
  
  public measureAPICall(endpoint: string, responseTime: number): void {
    this.metrics.apiResponseTime = responseTime;
    this.reportMetric(`API Call (${endpoint})`, responseTime);
  }
  
  public measureRouteChange(route: string, changeTime: number): void {
    this.metrics.routeChangeTime = changeTime;
    this.reportMetric(`Route Change (${route})`, changeTime);
  }

  public markStart(name: string): void {
    this.performanceMarks.set(name, performance.now());
  }

  public markEnd(name: string): void {
    const startTime = this.performanceMarks.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.reportMetric(`Mark (${name})`, duration);
      this.performanceMarks.delete(name);
    }
  }

  public trackRouteChange(route: string, pathOrTime: string | number, changeTime?: number): void {
    // Handle both 2-arg and 3-arg calls for backward compatibility  
    if (typeof pathOrTime === 'string') {
      // 3-arg call: trackRouteChange(referrer, path, time)
      this.measureRouteChange(pathOrTime, changeTime || performance.now());
    } else {
      // 2-arg call: trackRouteChange(route, time)
      this.measureRouteChange(route, pathOrTime);
    }
  }

  public getSummary(): any {
    return {
      coreWebVitals: {
        score: this.calculateScore(),
        LCP: this.metrics.LCP,
        INP: this.metrics.INP,
        CLS: this.metrics.CLS,
      },
      loadingPerformance: {
        FCP: this.metrics.FCP,
        TTFB: this.metrics.TTFB,
        bundleLoadTime: this.metrics.bundleLoadTime,
      },
      runtime: {
        routeChangeTime: this.metrics.routeChangeTime,
        apiResponseTime: this.metrics.apiResponseTime,
        componentRenderTime: this.metrics.componentRenderTime,
      },
      device: {
        connection: this.metrics.connection,
        deviceMemory: this.metrics.deviceMemory,
        hardwareConcurrency: this.metrics.hardwareConcurrency,
      }
    };
  }

  private calculateScore(): number {
    let score = 100;
    if (this.metrics.LCP && this.metrics.LCP > 2500) score -= 25;
    else if (this.metrics.LCP && this.metrics.LCP > 2000) score -= 15;
    
    if (this.metrics.INP && this.metrics.INP > 200) score -= 20;
    else if (this.metrics.INP && this.metrics.INP > 100) score -= 10;
    
    if (this.metrics.CLS && this.metrics.CLS > 0.1) score -= 15;
    else if (this.metrics.CLS && this.metrics.CLS > 0.05) score -= 8;
    
    return Math.max(score, 0);
  }
  
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }
  
  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export const initializePerformanceMonitoring = (
  reportCallback?: (metrics: PerformanceMetrics) => void
): PerformanceMonitor => {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor(reportCallback);
  }
  return performanceMonitor;
};

export const getPerformanceMonitor = (): PerformanceMonitor | null => {
  return performanceMonitor;
};

// React hook for component performance measurement
export const useComponentPerformance = (componentName: string) => {
  const startTime = React.useRef<number>(performance.now());
  
  React.useEffect(() => {
    const renderTime = performance.now() - startTime.current;
    const monitor = getPerformanceMonitor();
    
    if (monitor) {
      monitor.measureComponentRender(componentName, renderTime);
    }
  }, [componentName]);
};

// HOC for performance tracking
export const withPerformanceTracking = <P extends object = {}>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  return React.forwardRef<any, P>((props, ref) => {
    useComponentPerformance(componentName);
    return React.createElement(Component, { ...props, ref } as P & { ref: any });
  });
};

// Utility for measuring async operations
export const measureAsyncOperation = async <T extends any>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> => {
  const startTime = performance.now();
  
  try {
    const result = await operation();
    const duration = performance.now() - startTime;
    
    const monitor = getPerformanceMonitor();
    if (monitor) {
      monitor.measureAPICall(operationName, duration);
    }
    
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    console.error(`[Performance] ${operationName} failed after ${duration.toFixed(2)}ms`);
    throw error;
  }
};

// Performance budgets
export interface PerformanceBudget {
  LCP?: number;
  INP?: number;
  CLS?: number;
  FCP?: number;
  TTFB?: number;
  bundleSize?: number;
}

export const defaultPerformanceBudget: PerformanceBudget = {
  LCP: 2500, // 2.5s
  INP: 200, // 200ms
  CLS: 0.1, // 0.1
  FCP: 1800, // 1.8s
  TTFB: 800, // 800ms
  bundleSize: 170000 // 170KB
};

export const checkPerformanceBudget = (
  metrics: PerformanceMetrics,
  budget: PerformanceBudget = defaultPerformanceBudget
): { passed: boolean; violations: string[] } => {
  const violations: string[] = [];
  
  if (budget.LCP && metrics.LCP && metrics.LCP > budget.LCP) {
    violations.push(`LCP: ${metrics.LCP.toFixed(0)}ms (budget: ${budget.LCP}ms)`);
  }
  
  if (budget.INP && metrics.INP && metrics.INP > budget.INP) {
    violations.push(`INP: ${metrics.INP.toFixed(0)}ms (budget: ${budget.INP}ms)`);
  }
  
  if (budget.CLS && metrics.CLS && metrics.CLS > budget.CLS) {
    violations.push(`CLS: ${metrics.CLS.toFixed(3)} (budget: ${budget.CLS})`);
  }
  
  if (budget.FCP && metrics.FCP && metrics.FCP > budget.FCP) {
    violations.push(`FCP: ${metrics.FCP.toFixed(0)}ms (budget: ${budget.FCP}ms)`);
  }
  
  if (budget.TTFB && metrics.TTFB && metrics.TTFB > budget.TTFB) {
    violations.push(`TTFB: ${metrics.TTFB.toFixed(0)}ms (budget: ${budget.TTFB}ms)`);
  }
  
  return {
    passed: violations.length === 0,
    violations
  };
};

// Export performance data utility
export const exportPerformanceData = (metrics?: PerformanceMetrics): string => {
  const currentMetrics = metrics || getPerformanceMonitor()?.getMetrics() || { timestamp: Date.now() };
  const exportData = {
    timestamp: new Date().toISOString(),
    metrics: currentMetrics,
    environment: {
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      referrer: typeof document !== 'undefined' ? document.referrer : 'unknown',
      viewport: currentMetrics.viewport,
      connection: currentMetrics.connection,
      deviceMemory: currentMetrics.deviceMemory,
      hardwareConcurrency: currentMetrics.hardwareConcurrency
    }
  };
  
  return JSON.stringify(exportData, null, 2);
};

export default PerformanceMonitor;