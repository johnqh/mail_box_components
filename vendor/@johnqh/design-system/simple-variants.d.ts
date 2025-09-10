/**
 * Simple, Platform-Agnostic Variant System
 * Works with React, React Native, Vue, or any JavaScript framework
 */
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
export declare class SimpleVariants {
    private variants;
    private fallbacks;
    constructor(designSystemVariants: any);
    private setupDefaultFallbacks;
    /**
     * Get variant classes - the main API
     * Usage: variants.get('button', 'primary') or variants.get('button.primary')
     */
    get(component: string, variant?: string): string;
    /**
     * Get sized variant
     * Usage: variants.sized('button', 'primary', 'sm')
     */
    sized(component: string, variant: string, size: string): string;
    /**
     * Get nested variant (for complex paths)
     * Usage: variants.nested('button.gradient.primary')
     */
    nested(path: string): string;
    /**
     * Conditional variant selection
     * Usage: variants.when(isError, 'alert', 'destructive', 'alert', 'default')
     */
    when(condition: boolean, trueComponent: string, trueVariant: string, falseComponent?: string, falseVariant?: string): string;
    /**
     * Combine multiple variants
     * Usage: variants.combine('button.primary', 'animations.hover', 'custom-class')
     */
    combine(...variants: string[]): string;
    private getFallback;
    /**
     * Add custom fallback
     */
    addFallback(key: string, classes: string): void;
    /**
     * Check if variant exists
     */
    has(component: string, variant: string): boolean;
}
/**
 * Create variant resolver instance
 */
export declare function createVariants(designSystemVariants: any): SimpleVariants;
/**
 * Utility function for quick variant access
 */
export declare function createQuickVariants(designSystemVariants: any): {
    button: (variant: string, size?: string) => string;
    alert: (variant: string) => string;
    input: (variant: string) => string;
    badge: (variant: string) => string;
    get: (component: string, variant?: string) => string;
    nested: (path: string) => string;
    when: (condition: boolean, trueComp: string, trueVar: string, falseComp?: string, falseVar?: string) => string;
    combine: (...variants: string[]) => string;
};
//# sourceMappingURL=simple-variants.d.ts.map