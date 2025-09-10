import { designTokens } from './tokens';
declare const textVariants: {
    readonly heading: {
        readonly display: {
            readonly hero: () => string;
            readonly xl: () => string;
            readonly lg: () => string;
            readonly md: () => string;
            readonly sm: () => string;
        };
        readonly h1: () => string;
        readonly h2: () => string;
        readonly h3: () => string;
        readonly h4: () => string;
        readonly h5: () => string;
        readonly h6: () => string;
        readonly responsive: {
            readonly h1: () => string;
            readonly h2: () => string;
            readonly h3: () => string;
            readonly display: () => string;
        };
    };
    readonly body: {
        readonly xl: () => string;
        readonly lg: () => string;
        readonly md: () => string;
        readonly sm: () => string;
        readonly xs: () => string;
        readonly strong: {
            readonly xl: () => string;
            readonly lg: () => string;
            readonly md: () => string;
            readonly sm: () => string;
        };
        readonly emphasis: {
            readonly xl: () => string;
            readonly lg: () => string;
            readonly md: () => string;
            readonly sm: () => string;
        };
        readonly muted: {
            readonly xl: () => string;
            readonly lg: () => string;
            readonly md: () => string;
            readonly sm: () => string;
        };
    };
    readonly caption: {
        readonly default: () => string;
        readonly emphasis: () => string;
        readonly uppercase: () => string;
    };
    readonly lead: {
        readonly lg: () => string;
        readonly md: () => string;
        readonly sm: () => string;
    };
    readonly link: {
        readonly default: () => string;
        readonly subtle: () => string;
        readonly muted: () => string;
        readonly external: () => string;
    };
    readonly code: {
        readonly inline: () => string;
        readonly block: () => string;
        readonly small: () => string;
    };
    readonly label: {
        readonly default: () => string;
        readonly required: () => string;
        readonly optional: () => string;
        readonly helper: () => string;
        readonly error: () => string;
        readonly success: () => string;
    };
    readonly web3: {
        readonly address: () => string;
        readonly addressShort: () => string;
        readonly hash: () => string;
        readonly amount: () => string;
        readonly chain: () => string;
        readonly symbol: () => string;
    };
    readonly truncate: {
        readonly line: () => string;
        readonly lines2: () => string;
        readonly lines3: () => string;
        readonly lines4: () => string;
    };
    readonly selection: {
        readonly default: () => string;
        readonly brand: () => string;
    };
};
declare const createTextStyle: (family?: keyof typeof designTokens.typography.family, size?: keyof typeof designTokens.typography.semantic, weight?: keyof typeof designTokens.typography.weight, color?: string, options?: {
    leading?: keyof typeof designTokens.typography.leading;
    tracking?: keyof typeof designTokens.typography.tracking;
    transform?: keyof typeof designTokens.typography.transform;
    decoration?: keyof typeof designTokens.typography.decoration;
}) => string;
declare const combineTextStyles: (...styles: string[]) => string;
declare const createResponsiveText: (baseStyle: string, breakpoints: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
}) => string;
export { textVariants, createTextStyle, combineTextStyles, createResponsiveText };
//# sourceMappingURL=typography.d.ts.map