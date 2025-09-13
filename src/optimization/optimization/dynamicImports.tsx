/**
 * Simplified dynamic import utilities for existing dependencies
 */

import React, { lazy, Suspense, ComponentType } from 'react';
// Simple loading component replacement
const LoadingState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
    <span className="ml-2 text-sm text-gray-600">{message}</span>
  </div>
);

// Type for dynamic import functions
type DynamicImport<T = ComponentType<Record<string, unknown>>> = () => Promise<{ default: T }>;

// Loading fallback options
export type LoadingFallback = 'default' | 'minimal' | 'skeleton' | ComponentType<Record<string, unknown>>;

// Create loading component based on type
const getLoadingComponent = (fallback: LoadingFallback): ComponentType => {
  if (typeof fallback === 'function' || typeof fallback === 'object') {
    return fallback as ComponentType;
  }
  
  switch (fallback) {
    case 'minimal':
      return () => <div className="flex justify-center items-center p-4">Loading...</div>;
    case 'skeleton':
      return () => (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      );
    case 'default':
    default:
      return () => <LoadingState message="Loading component..." />;
  }
};

// Enhanced lazy loading with error boundary
export const createLazyComponent = <T extends ComponentType<Record<string, unknown>>>(
  importFunc: DynamicImport<T>,
  fallback: LoadingFallback = 'default',
  retryAttempts: number = 3
): ComponentType => {
  const LazyComponent = lazy(async () => {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < retryAttempts; attempt++) {
      try {
        return await importFunc();
      } catch (error) {
        lastError = error as Error;
        console.warn(`Failed to load component (attempt ${attempt + 1}/${retryAttempts}):`, error);
        
        // Wait before retrying with exponential backoff
        if (attempt < retryAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    // If all attempts failed, throw the error
    throw lastError;
  });
  
  const LoadingComponent = getLoadingComponent(fallback);
  
  return (props: any) => (
    <Suspense fallback={<LoadingComponent />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Preload component without rendering
export const preloadComponent = async <T extends ComponentType<Record<string, unknown>>>(
  importFunc: DynamicImport<T>
): Promise<void> => {
  try {
    await importFunc();
  } catch (error) {
    console.warn('Failed to preload component:', error);
  }
};

// Helper function to create UI components dynamically
// This is a generic helper - specific components should be defined in the consuming app
export const createUIComponents = (importMap: Record<string, () => Promise<any>>) => {
  const components: Record<string, ComponentType> = {};
  
  Object.entries(importMap).forEach(([name, importFunc]) => {
    components[name] = createLazyComponent(importFunc, 'skeleton');
  });
  
  return components;
};

// Helper for creating library imports - consuming app should provide actual imports
export const createLibraryImports = (libraries: Record<string, () => Promise<any>>) => {
  return libraries;
};

// Route-based code splitting configuration
export const routeConfig = {
  // Critical routes (preload immediately)
  critical: [
    '/',
    '/connect',
    '/mail'
  ],
  
  // Secondary routes (preload on idle)
  secondary: [
    '/settings',
    '/compose',
    '/points'
  ],
  
  // Optional routes (load on demand)
  optional: [
    '/document',
    '/about',
    '/terms',
    '/privacy'
  ]
};

// Component preloading strategy
export class ComponentPreloader {
  private static preloadedComponents = new Set<string>();
  private static preloadQueue: Array<{ name: string; loader: DynamicImport }> = [];
  private static isPreloading = false;
  
  static add(name: string, loader: DynamicImport): void {
    if (!this.preloadedComponents.has(name)) {
      this.preloadQueue.push({ name, loader });
      this.processQueue();
    }
  }
  
  private static async processQueue(): Promise<void> {
    if (this.isPreloading || this.preloadQueue.length === 0) return;
    
    this.isPreloading = true;
    
    // Use requestIdleCallback for non-critical preloading
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(async () => {
        const item = this.preloadQueue.shift();
        if (item) {
          try {
            await item.loader();
            this.preloadedComponents.add(item.name);
          } catch (error) {
            console.warn(`Failed to preload ${item.name}:`, error);
          }
        }
        this.isPreloading = false;
        this.processQueue();
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(async () => {
        const item = this.preloadQueue.shift();
        if (item) {
          try {
            await item.loader();
            this.preloadedComponents.add(item.name);
          } catch (error) {
            console.warn(`Failed to preload ${item.name}:`, error);
          }
        }
        this.isPreloading = false;
        this.processQueue();
      }, 100);
    }
  }
  
  static isPreloaded(name: string): boolean {
    return this.preloadedComponents.has(name);
  }
  
  static clear(): void {
    this.preloadedComponents.clear();
    this.preloadQueue = [];
    this.isPreloading = false;
  }
}

// Initialize preloading for critical components
export const initializePreloading = (): void => {
  // Preload secondary routes on idle
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      routeConfig.secondary.forEach(_route => {
        // Note: Actual component imports should be provided by the consuming app
        // Route would be preloaded if import function was provided
      });
    });
  }
};

export default {
  createLazyComponent,
  preloadComponent,
  createUIComponents,
  createLibraryImports,
  routeConfig,
  ComponentPreloader,
  initializePreloading
};