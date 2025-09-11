/**
 * Text Variants Wrapper with Fallback Support
 * Provides backward compatibility for textVariants from design system
 */

// Import with fallback handling
let designSystemTextVariants: any;

try {
  const designSystem = require("@johnqh/design-system");
  designSystemTextVariants = designSystem.textVariants;
} catch (error) {
  console.warn('Failed to import textVariants from design system, using fallbacks:', error);
  designSystemTextVariants = null;
}

// Fallback textVariants if import fails
const fallbackTextVariants = {
  heading: {
    display: {
      hero: () => "text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 dark:text-white leading-none tracking-tight",
      xl: () => "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 dark:text-white leading-none tracking-tight",
      lg: () => "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-none tracking-tight",
      md: () => "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-none tracking-tight",
      sm: () => "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-none tracking-tight"
    },
    h1: () => "text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight",
    h2: () => "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight",
    h3: () => "text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white leading-tight tracking-tight",
    h4: () => "text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight tracking-tight",
    h5: () => "text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight tracking-tight",
    h6: () => "text-base font-semibold text-gray-900 dark:text-white leading-tight tracking-tight",
    responsive: {
      h1: () => "text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight",
      h2: () => "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight",
      h3: () => "text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white leading-tight tracking-tight",
      display: () => "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 dark:text-white leading-none tracking-tight"
    }
  },
  body: {
    xl: () => "text-xl font-normal text-gray-700 dark:text-gray-300 leading-relaxed",
    lg: () => "text-lg font-normal text-gray-700 dark:text-gray-300 leading-relaxed",
    md: () => "text-base font-normal text-gray-700 dark:text-gray-300 leading-relaxed",
    sm: () => "text-sm font-normal text-gray-600 dark:text-gray-400 leading-relaxed",
    xs: () => "text-xs font-normal text-gray-600 dark:text-gray-400 leading-relaxed",
    strong: {
      xl: () => "text-xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed",
      lg: () => "text-lg font-medium text-gray-900 dark:text-gray-100 leading-relaxed",
      md: () => "text-base font-medium text-gray-900 dark:text-gray-100 leading-relaxed",
      sm: () => "text-sm font-medium text-gray-900 dark:text-gray-100 leading-relaxed"
    },
    emphasis: {
      xl: () => "text-xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed",
      lg: () => "text-lg font-medium text-gray-900 dark:text-gray-100 leading-relaxed",
      md: () => "text-base font-medium text-gray-900 dark:text-gray-100 leading-relaxed",
      sm: () => "text-sm font-medium text-gray-900 dark:text-gray-100 leading-relaxed"
    },
    muted: {
      xl: () => "text-xl font-normal text-gray-500 dark:text-gray-500 leading-relaxed",
      lg: () => "text-lg font-normal text-gray-500 dark:text-gray-500 leading-relaxed",
      md: () => "text-base font-normal text-gray-500 dark:text-gray-500 leading-relaxed",
      sm: () => "text-sm font-normal text-gray-500 dark:text-gray-500 leading-relaxed"
    }
  },
  caption: {
    default: () => "text-sm font-normal text-gray-500 dark:text-gray-500 leading-normal",
    emphasis: () => "text-sm font-medium text-gray-500 dark:text-gray-500 leading-normal",
    uppercase: () => "text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider"
  },
  lead: {
    lg: () => "text-2xl font-normal text-gray-700 dark:text-gray-300 leading-relaxed",
    md: () => "text-xl font-normal text-gray-700 dark:text-gray-300 leading-relaxed",
    sm: () => "text-lg font-normal text-gray-700 dark:text-gray-300 leading-relaxed"
  },
  link: {
    default: () => "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 decoration-blue-600 dark:decoration-blue-400 transition-colors duration-150",
    subtle: () => "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 no-underline hover:underline hover:underline-offset-2 transition-all duration-150",
    muted: () => "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2 decoration-gray-400 hover:decoration-gray-600 transition-colors duration-150",
    external: () => "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 decoration-blue-600 dark:decoration-blue-400 transition-colors duration-150"
  },
  code: {
    inline: () => "font-mono text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded",
    block: () => "font-mono text-sm font-normal text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto leading-relaxed",
    small: () => "font-mono text-xs font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded"
  },
  label: {
    default: () => "text-sm font-medium text-gray-700 dark:text-gray-300",
    required: () => "text-sm font-medium text-gray-700 dark:text-gray-300",
    optional: () => "text-sm font-normal text-gray-500 dark:text-gray-500",
    helper: () => "text-sm font-normal text-gray-500 dark:text-gray-500",
    error: () => "text-sm font-medium text-red-700 dark:text-red-300",
    success: () => "text-sm font-medium text-green-700 dark:text-green-300"
  },
  web3: {
    address: () => "font-mono text-sm text-gray-600 dark:text-gray-400",
    addressShort: () => "font-mono text-sm text-gray-600 dark:text-gray-400",
    hash: () => "font-mono text-xs text-gray-500 dark:text-gray-500",
    amount: () => "font-mono text-base font-medium text-gray-900 dark:text-gray-100",
    chain: () => "text-sm font-medium text-gray-700 dark:text-gray-300",
    symbol: () => "text-sm font-medium text-gray-900 dark:text-gray-100"
  },
  truncate: {
    line: () => "truncate",
    lines2: () => "line-clamp-2",
    lines3: () => "line-clamp-3",
    lines4: () => "line-clamp-4"
  },
  selection: {
    default: () => "selection:bg-blue-100 selection:text-blue-900",
    brand: () => "selection:bg-blue-100 selection:text-blue-900"
  }
};

// Use design system textVariants if available, otherwise use fallback
export const textVariants = designSystemTextVariants || fallbackTextVariants;