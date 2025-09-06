/**
 * Lazy component utilities for aggressive code splitting
 */

import { lazy, Suspense, ComponentType } from 'react';

// Enhanced lazy loading with retry and preloading
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  FallbackComponent: ComponentType<{ message?: string }> | null = null,
  fallbackMessage = 'Loading...',
  retryAttempts = 3
): T => {
  const LazyComponent = lazy(async () => {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < retryAttempts; attempt++) {
      try {
        return await importFunc();
      } catch (error) {
        lastError = error as Error;
        
        // Wait before retrying with exponential backoff
        if (attempt < retryAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    throw lastError;
  });
  
  const fallback = FallbackComponent 
    ? <FallbackComponent message={fallbackMessage} />
    : <div>{fallbackMessage}</div>;
  
  return ((props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )) as any;
};

// Example factory for creating UI component lazy loaders
export const createUIComponentLazyLoader = (
  componentImportPath: string,
  componentName: string,
  fallbackMessage?: string
) => {
  return createLazyComponent(
    () => import(componentImportPath).then(m => ({ default: m[componentName] })),
    null,
    fallbackMessage || `Loading ${componentName.toLowerCase()}...`
  );
};

// Example factory for third-party component lazy loading
export const createThirdPartyLazyLoader = (
  packageImportPath: string,
  fallbackMessage?: string
) => {
  return createLazyComponent(
    () => import(packageImportPath),
    null,
    fallbackMessage || 'Loading component...'
  );
};

// Preload strategy for components
export class ComponentPreloader {
  private static preloaded = new Set<string>();
  
  static preload(componentName: string, importFunc: () => Promise<unknown>): void {
    if (this.preloaded.has(componentName)) return;
    
    this.preloaded.add(componentName);
    
    // Use requestIdleCallback for non-blocking preload
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(async () => {
        try {
          await importFunc();
        } catch (error) {
          console.warn(`Failed to preload ${componentName}:`, error);
        }
      });
    }
  }
  
  // Preload based on user interaction patterns
  static preloadOnHover(element: HTMLElement, importFunc: () => Promise<unknown>): void {
    const handleHover = () => {
      importFunc().catch(console.warn);
      element.removeEventListener('mouseenter', handleHover);
    };
    
    element.addEventListener('mouseenter', handleHover, { passive: true });
  }
  
  // Preload based on scroll position
  static preloadOnScroll(threshold: number, importFunc: () => Promise<unknown>): void {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        importFunc().catch(console.warn);
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
}

// Initialize preloading based on user context
export const initializeComponentPreloading = (
  preloadConfig?: {
    componentsToPreload?: Array<{ name: string; importFunc: () => Promise<any> }>;
    preloadDelay?: number;
    conditionalPreload?: Array<{ condition: () => boolean; components: Array<{ name: string; importFunc: () => Promise<any> }> }>;
  }
): void => {
  const delay = preloadConfig?.preloadDelay || 1500;
  
  // Preload critical components after main bundle loads
  setTimeout(() => {
    // Preload configured components
    if (preloadConfig?.componentsToPreload) {
      preloadConfig.componentsToPreload.forEach(({ name, importFunc }) => {
        ComponentPreloader.preload(name, importFunc);
      });
    }
    
    // Conditional preloading based on application state
    if (preloadConfig?.conditionalPreload) {
      preloadConfig.conditionalPreload.forEach(({ condition, components }) => {
        if (condition()) {
          components.forEach(({ name, importFunc }) => {
            ComponentPreloader.preload(name, importFunc);
          });
        }
      });
    }
  }, delay);
};

export default {
  createLazyComponent,
  createUIComponentLazyLoader,
  createThirdPartyLazyLoader,
  ComponentPreloader,
  initializeComponentPreloading
};