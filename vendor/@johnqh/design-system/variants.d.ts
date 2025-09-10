/**
 * Component Variants
 *
 * Pre-built component configurations that combine colors, spacing, and other design tokens
 * into ready-to-use component styles.
 */
export type VariantFunction = () => string;
export type VariantWithArgs<T = string> = (variant?: T) => string;
export interface VariantsType {
    button: {
        [key: string]: {
            [key: string]: VariantFunction | VariantWithArgs;
        } | VariantFunction | VariantWithArgs;
    };
    card: {
        [key: string]: {
            [key: string]: VariantFunction;
        };
    };
    badge: {
        [key: string]: VariantFunction | VariantWithArgs;
    };
    input: {
        [key: string]: VariantFunction | VariantWithArgs;
    };
    alert: {
        [key: string]: VariantFunction | {
            [key: string]: VariantFunction;
        };
    };
    [key: string]: any;
}
declare const variants: VariantsType;
export { variants };
//# sourceMappingURL=variants.d.ts.map