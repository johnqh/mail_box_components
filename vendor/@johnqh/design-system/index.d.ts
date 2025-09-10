/**
 * Design System Exports
 *
 * Main export file for all design system components, tokens, and utilities.
 */
export { colors } from './colors';
export { designTokens } from './tokens';
export { textVariants } from './typography';
export { variants } from './variants';
export { SimpleVariants, createVariants, createQuickVariants } from './simple-variants';
export type { VariantFunction, VariantWithArgs, VariantsType } from './variants';
export type { VariantConfig } from './simple-variants';
export { colors as Colors } from './colors';
export { designTokens as Tokens } from './tokens';
export { textVariants as Typography } from './typography';
export { variants as Variants } from './variants';
/**
 * Quick access to commonly used design patterns
 */
declare const ui: {
    readonly layout: {
        readonly container: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
        readonly containerSmall: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8";
        readonly containerLarge: "mx-auto max-w-full px-4 sm:px-6 lg:px-8";
        readonly section: "py-8 sm:py-12 lg:py-16";
        readonly sectionSmall: "py-6 sm:py-8 lg:py-10";
        readonly flex: "flex items-center justify-between";
        readonly flexCenter: "flex items-center justify-center";
        readonly flexCol: "flex flex-col";
        readonly grid: "grid grid-cols-1 gap-6";
        readonly gridMd: "grid grid-cols-1 md:grid-cols-2 gap-6";
        readonly gridLg: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    };
    readonly background: {
        readonly surface: "bg-white dark:bg-gray-800";
        readonly subtle: "bg-gray-50 dark:bg-gray-900";
        readonly muted: "bg-gray-100 dark:bg-gray-700";
        readonly overlay: "bg-black/50 dark:bg-black/70";
    };
    readonly border: {
        readonly default: "border-gray-200 dark:border-gray-700";
        readonly subtle: "border-gray-100 dark:border-gray-800";
        readonly radius: "rounded-lg";
        readonly radiusSm: "rounded-md";
        readonly radiusLg: "rounded-xl";
        readonly radiusFull: "rounded-full";
    };
    readonly shadow: {
        readonly sm: "shadow-sm";
        readonly md: "shadow-md";
        readonly lg: "shadow-lg";
        readonly xl: "shadow-xl";
    };
    readonly spacing: {
        readonly card: {
            readonly sm: "p-4";
            readonly md: "p-6";
            readonly lg: "p-8";
        };
        readonly section: {
            readonly sm: "py-6 px-4";
            readonly md: "py-8 px-6";
            readonly lg: "py-12 px-8";
        };
    };
    readonly text: {
        readonly h1: "text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight";
        readonly h2: "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight";
        readonly h3: "text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white leading-tight tracking-tight";
        readonly h4: "text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight tracking-tight";
        readonly h5: "text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight tracking-tight";
        readonly h6: "text-base font-semibold text-gray-900 dark:text-white leading-tight tracking-tight";
        readonly display: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 dark:text-white leading-none tracking-tight";
        readonly hero: "text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 dark:text-white leading-none tracking-tight";
        readonly body: "text-base font-normal text-gray-700 dark:text-gray-300 leading-relaxed";
        readonly bodyLarge: "text-lg font-normal text-gray-700 dark:text-gray-300 leading-relaxed";
        readonly bodySmall: "text-sm font-normal text-gray-600 dark:text-gray-400 leading-relaxed";
        readonly lead: "text-xl font-normal text-gray-700 dark:text-gray-300 leading-relaxed";
        readonly leadLarge: "text-2xl font-normal text-gray-700 dark:text-gray-300 leading-relaxed";
        readonly caption: "text-sm font-normal text-gray-500 dark:text-gray-500 leading-normal";
        readonly label: "text-sm font-medium text-gray-700 dark:text-gray-300";
        readonly helper: "text-sm font-normal text-gray-500 dark:text-gray-500";
        readonly link: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 decoration-blue-600 dark:decoration-blue-400 transition-colors duration-150";
        readonly linkSubtle: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 no-underline hover:underline hover:underline-offset-2 transition-all duration-150";
        readonly linkMuted: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2 decoration-gray-400 hover:decoration-gray-600 transition-colors duration-150";
        readonly code: "font-mono text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded";
        readonly codeBlock: "font-mono text-sm font-normal text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto leading-relaxed";
        readonly success: "text-green-700 dark:text-green-300 font-medium";
        readonly warning: "text-amber-700 dark:text-amber-300 font-medium";
        readonly error: "text-red-700 dark:text-red-300 font-medium";
        readonly info: "text-blue-700 dark:text-blue-300 font-medium";
        readonly emphasis: "font-medium text-gray-900 dark:text-gray-100";
        readonly strong: "font-semibold text-gray-900 dark:text-gray-100";
        readonly muted: "text-gray-500 dark:text-gray-500";
        readonly uppercase: "text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider";
    };
    readonly transition: {
        readonly default: "transition-colors duration-200";
        readonly all: "transition-all duration-200";
        readonly fast: "transition-all duration-150";
        readonly slow: "transition-all duration-300";
        readonly transform: "transition-transform duration-200";
    };
    readonly states: {
        readonly hover: "hover:opacity-80 transition-opacity duration-200";
        readonly focus: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
        readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";
        readonly loading: "animate-pulse";
    };
    readonly web3: {
        readonly walletButton: "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium";
        readonly chainBadge: (chain: "ethereum" | "solana") => "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" | "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
        readonly addressText: "font-mono text-sm text-gray-600 dark:text-gray-400";
    };
};
export { ui };
export * from './colors';
export * from './tokens';
export * from './typography';
export * from './variants';
export { getColorClasses, buildColorClass } from './colors';
export { createTextStyle, combineTextStyles, createResponsiveText } from './typography';
//# sourceMappingURL=index.d.ts.map