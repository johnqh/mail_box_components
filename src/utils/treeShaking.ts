/**
 * Tree-shaking optimization utilities
 * Helps eliminate unused code and optimize bundle sizes
 */

// Dead code elimination utilities
export const deadCodeElimination = {
  // Mark functions as pure for better tree-shaking
  /*#__PURE__*/ createPureFunction: <T extends (...args: unknown[]) => any>(fn: T): T => fn,
  
  // Environment-based code elimination
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  
  // Generic feature flags for conditional imports
  createFeatureFlags: (customFlags: Record<string, boolean | string> = {}) => ({
    enableAnalytics: process.env.VITE_ENABLE_ANALYTICS === 'true',
    enableDebugTools: process.env.NODE_ENV === 'development',
    enablePerformanceMonitoring: process.env.VITE_ENABLE_PERF_MONITORING !== 'false',
    ...customFlags
  })
};

// Generic conditional imports utility
export const createConditionalImports = (imports: Record<string, () => Promise<any>>) => {
  const conditionalImports: Record<string, () => Promise<any>> = {};
  
  Object.entries(imports).forEach(([key, importFn]) => {
    conditionalImports[key] = () => {
      try {
        return importFn();
      } catch (error) {
        console.warn(`Failed to load ${key}:`, error);
        return Promise.resolve({ default: null });
      }
    };
  });
  
  return conditionalImports;
};

// Tree-shakeable utility functions
export const utils = {
  // Lightweight debounce (instead of importing lodash)
  createDebounce: (delay: number) => {
    return <T extends (...args: unknown[]) => unknown>(func: T) => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return ((...args: unknown[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      }) as T;
    };
  },
  
  // Lightweight memoization (instead of heavy libraries)
  memoize: <T extends (...args: unknown[]) => any>(fn: T): T => {
    const cache = new Map();
    return ((...args: unknown[]) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    }) as T;
  },
  
  // Lightweight deep equality check
  isDeepEqual: (a: any, b: any): boolean => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a !== 'object' || typeof b !== 'object') return false;
    
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!utils.isDeepEqual(a[key], b[key])) return false;
    }
    
    return true;
  },

  // Lightweight throttle
  createThrottle: (delay: number) => {
    return <T extends (...args: unknown[]) => unknown>(func: T) => {
      let lastCall = 0;
      return ((...args: unknown[]) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
          lastCall = now;
          return func(...args);
        }
      }) as T;
    };
  }
};

// Generic selective re-exports factory
export const createSelectiveExports = (modules: Record<string, Record<string, string>>) => {
  const selectiveExports: Record<string, Record<string, () => Promise<any>>> = {};
  
  Object.entries(modules).forEach(([moduleName, exports]) => {
    selectiveExports[moduleName] = {};
    Object.entries(exports).forEach(([exportName, importPath]) => {
      selectiveExports[moduleName][exportName] = () => 
        import(/* @vite-ignore */ importPath).then(m => ({ [exportName]: m[exportName] }));
    });
  });
  
  return selectiveExports;
};

// Bundle analysis helpers
export const bundleAnalysis = {
  // Calculate approximate module size
  getModuleSize: (moduleName: string): Promise<number> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        const moduleEntry = entries.find(entry => entry.name.includes(moduleName));
        resolve(moduleEntry?.transferSize || 0);
      } else {
        resolve(0);
      }
    });
  },
  
  // Track which modules are actually used
  usageTracker: new Set<string>(),
  
  trackUsage: (moduleName: string) => {
    if (deadCodeElimination.isDevelopment) {
      bundleAnalysis.usageTracker.add(moduleName);
      // Module usage tracking (development only)
    }
  },
  
  getUsageReport: () => {
    if (deadCodeElimination.isDevelopment) {
      return Array.from(bundleAnalysis.usageTracker).sort();
    }
    return [];
  },

  // Estimate bundle impact
  estimateImpact: (moduleNames: string[]): Promise<{ total: number; modules: Record<string, number> }> => {
    const promises = moduleNames.map(name => 
      bundleAnalysis.getModuleSize(name).then(size => [name, size] as const)
    );
    
    return Promise.all(promises).then(results => {
      const modules: Record<string, number> = {};
      let total = 0;
      
      results.forEach(([name, size]) => {
        modules[name] = size;
        total += size;
      });
      
      return { total, modules };
    });
  }
};

// Optimize CSS imports
export const cssOptimization = {
  // Critical CSS utilities
  inlineCriticalCSS: (css: string) => {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
    }
  },
  
  // Load non-critical CSS asynchronously
  loadAsyncCSS: (href: string) => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
      document.head.appendChild(link);
    }
  },

  // Remove unused CSS (basic implementation)
  removeUnusedCSS: (selectors: string[]) => {
    if (typeof document === 'undefined') return;
    
    const usedSelectors = new Set<string>();
    
    // Find selectors that match elements in DOM
    selectors.forEach(selector => {
      try {
        if (document.querySelector(selector)) {
          usedSelectors.add(selector);
        }
      } catch {
        // Invalid selector, skip
      }
    });
    
    return {
      used: Array.from(usedSelectors),
      unused: selectors.filter(s => !usedSelectors.has(s))
    };
  }
};

// Generic tree-shaking initialization
export const createTreeShakingConfig = (options: {
  features?: Record<string, boolean | string>;
  criticalCSS?: string;
  enableUsageTracking?: boolean;
} = {}) => {
  const {
    features = {},
    criticalCSS = '',
    enableUsageTracking = deadCodeElimination.isDevelopment
  } = options;

  return {
    features: deadCodeElimination.createFeatureFlags(features),
    
    initialize: () => {
      // Track module usage in development
      if (enableUsageTracking) {
        // Tree-shaking optimizations initialized (development only)
        // Feature flags tracked (development only)
      }
      
      // Preload critical CSS
      if (criticalCSS && typeof document !== 'undefined') {
        cssOptimization.inlineCriticalCSS(criticalCSS);
      }
    },

    cleanup: () => {
      bundleAnalysis.usageTracker.clear();
    },

    getReport: () => ({
      usage: bundleAnalysis.getUsageReport(),
      features: deadCodeElimination.createFeatureFlags(features)
    })
  };
};

export default {
  deadCodeElimination,
  createConditionalImports,
  utils,
  createSelectiveExports,
  bundleAnalysis,
  cssOptimization,
  createTreeShakingConfig
};