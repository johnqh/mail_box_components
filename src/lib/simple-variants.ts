/**
 * Simple, Platform-Agnostic Variant System
 * Works with React, React Native, Vue, or any JavaScript framework
 */

// Simple interfaces - no React dependencies
export interface VariantFunction {
  (): string;
}

export interface VariantConfig {
  [componentName: string]: {
    [variantName: string]: VariantFunction | string | {
      [sizeName: string]: VariantFunction | string;
    };
  };
}

// Platform-agnostic variant resolver
export class SimpleVariants {
  private variants: any;
  private fallbacks: Map<string, string> = new Map();

  constructor(designSystemVariants: any) {
    this.variants = designSystemVariants;
    this.setupDefaultFallbacks();
  }

  private setupDefaultFallbacks() {
    // Web/React Native compatible fallbacks
    this.fallbacks.set('button.primary', 'bg-blue-600 text-white px-4 py-2 rounded');
    this.fallbacks.set('button.secondary', 'bg-gray-200 text-gray-900 px-4 py-2 rounded');
    this.fallbacks.set('button.outline', 'border border-gray-300 text-gray-700 px-4 py-2 rounded');
    this.fallbacks.set('alert.default', 'bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded');
    this.fallbacks.set('alert.destructive', 'bg-red-50 border border-red-200 text-red-800 p-4 rounded');
    this.fallbacks.set('input.default', 'border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500');
    this.fallbacks.set('badge.default', 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm');
  }

  /**
   * Get variant classes - the main API
   * Usage: variants.get('button', 'primary') or variants.get('button.primary')
   */
  get(component: string, variant?: string): string {
    // Handle dot notation: get('button.primary')
    if (!variant && component.includes('.')) {
      const [comp, var_] = component.split('.', 2);
      return this.get(comp, var_);
    }

    if (!variant) {
      variant = 'default';
    }

    try {
      const componentVariants = this.variants[component];
      if (!componentVariants) {
        return this.getFallback(component, variant);
      }

      const variantValue = componentVariants[variant];
      
      // Handle function variants
      if (typeof variantValue === 'function') {
        return variantValue();
      }
      
      // Handle string variants
      if (typeof variantValue === 'string') {
        return variantValue;
      }
      
      // Handle object variants with default
      if (variantValue && typeof variantValue === 'object') {
        if (typeof variantValue.default === 'function') {
          return variantValue.default();
        }
        if (typeof variantValue.default === 'string') {
          return variantValue.default;
        }
      }

      return this.getFallback(component, variant);
    } catch (error) {
      console.warn(`Failed to get variant ${component}.${variant}:`, error);
      return this.getFallback(component, variant);
    }
  }

  /**
   * Get sized variant
   * Usage: variants.sized('button', 'primary', 'sm')
   */
  sized(component: string, variant: string, size: string): string {
    try {
      const componentVariants = this.variants[component];
      const variantObj = componentVariants?.[variant];
      
      if (variantObj && typeof variantObj === 'object' && variantObj[size]) {
        const sizedVariant = variantObj[size];
        if (typeof sizedVariant === 'function') {
          return sizedVariant();
        }
        if (typeof sizedVariant === 'string') {
          return sizedVariant;
        }
      }
      
      // Fallback to base variant
      return this.get(component, variant);
    } catch (error) {
      console.warn(`Failed to get sized variant ${component}.${variant}.${size}:`, error);
      return this.get(component, variant);
    }
  }

  /**
   * Get nested variant (for complex paths)
   * Usage: variants.nested('button.gradient.primary')
   */
  nested(path: string): string {
    try {
      const parts = path.split('.');
      let current = this.variants;
      
      for (const part of parts) {
        current = current?.[part];
        if (!current) break;
      }

      if (typeof current === 'function') {
        return current();
      }
      if (typeof current === 'string') {
        return current;
      }
      if (current && typeof current.default === 'function') {
        return current.default();
      }
      if (current && typeof current.default === 'string') {
        return current.default;
      }

      return this.getFallback(parts[0], parts.slice(1).join('.'));
    } catch (error) {
      console.warn(`Failed to get nested variant ${path}:`, error);
      return this.getFallback(path.split('.')[0], path.split('.').slice(1).join('.'));
    }
  }

  /**
   * Conditional variant selection
   * Usage: variants.when(isError, 'alert', 'destructive', 'alert', 'default')
   */
  when(condition: boolean, trueComponent: string, trueVariant: string, falseComponent?: string, falseVariant?: string): string {
    if (condition) {
      return this.get(trueComponent, trueVariant);
    }
    if (falseComponent && falseVariant) {
      return this.get(falseComponent, falseVariant);
    }
    return '';
  }

  /**
   * Combine multiple variants
   * Usage: variants.combine('button.primary', 'animations.hover', 'custom-class')
   */
  combine(...variants: string[]): string {
    return variants
      .map(v => {
        if (v.includes('.')) {
          return this.nested(v);
        }
        return v; // Assume it's a custom class
      })
      .filter(Boolean)
      .join(' ');
  }

  private getFallback(component: string, variant: string): string {
    const key = `${component}.${variant}`;
    return this.fallbacks.get(key) || this.fallbacks.get(`${component}.default`) || '';
  }

  /**
   * Add custom fallback
   */
  addFallback(key: string, classes: string): void {
    this.fallbacks.set(key, classes);
  }

  /**
   * Check if variant exists
   */
  has(component: string, variant: string): boolean {
    try {
      const componentVariants = this.variants[component];
      return !!(componentVariants && componentVariants[variant]);
    } catch {
      return false;
    }
  }
}

/**
 * Create variant resolver instance
 */
export function createVariants(designSystemVariants: any): SimpleVariants {
  return new SimpleVariants(designSystemVariants);
}

/**
 * Utility function for quick variant access
 */
export function createQuickVariants(designSystemVariants: any) {
  const resolver = new SimpleVariants(designSystemVariants);
  
  return {
    // Direct access functions
    button: (variant: string, size?: string) => 
      size ? resolver.sized('button', variant, size) : resolver.get('button', variant),
    alert: (variant: string) => resolver.get('alert', variant),
    input: (variant: string) => resolver.get('input', variant),
    badge: (variant: string) => resolver.get('badge', variant),
    
    // Generic access
    get: (component: string, variant?: string) => resolver.get(component, variant),
    nested: (path: string) => resolver.nested(path),
    when: (condition: boolean, trueComp: string, trueVar: string, falseComp?: string, falseVar?: string) => 
      resolver.when(condition, trueComp, trueVar, falseComp, falseVar),
    combine: (...variants: string[]) => resolver.combine(...variants),
  };
}