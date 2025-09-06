/**
 * Design System Exports
 * 
 * Main export file for all design system components, tokens, and utilities.
 */

// === PRIMARY EXPORTS ===
export { colors } from './colors';
export { designTokens } from './tokens';
export { textVariants } from './typography';
export { variants } from './variants';

// === ORGANIZED STRUCTURE ALIASES ===
export { colors as Colors } from './colors';
export { designTokens as Tokens } from './tokens';
export { textVariants as Typography } from './typography';
export { variants as Variants } from './variants';

// === UI UTILITIES ===
/**
 * Quick access to commonly used design patterns
 */
export const ui = {
  // Layout utilities
  layout: {
    container: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
    containerSmall: 'mx-auto max-w-3xl px-4 sm:px-6 lg:px-8',
    containerLarge: 'mx-auto max-w-full px-4 sm:px-6 lg:px-8',
    section: 'py-8 sm:py-12 lg:py-16',
    sectionSmall: 'py-6 sm:py-8 lg:py-10',
    flex: 'flex items-center justify-between',
    flexCenter: 'flex items-center justify-center',
    flexCol: 'flex flex-col',
    grid: 'grid grid-cols-1 gap-6',
    gridMd: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    gridLg: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  },

  // Background utilities
  background: {
    surface: 'bg-white dark:bg-gray-800',
    subtle: 'bg-gray-50 dark:bg-gray-900',
    muted: 'bg-gray-100 dark:bg-gray-700',
    overlay: 'bg-black/50 dark:bg-black/70',
  },

  // Border utilities
  border: {
    default: 'border-gray-200 dark:border-gray-700',
    subtle: 'border-gray-100 dark:border-gray-800',
    radius: 'rounded-lg',
    radiusSm: 'rounded-md',
    radiusLg: 'rounded-xl',
    radiusFull: 'rounded-full',
  },

  // Shadow utilities
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },

  // Spacing utilities
  spacing: {
    card: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    section: {
      sm: 'py-6 px-4',
      md: 'py-8 px-6',
      lg: 'py-12 px-8',
    },
  },

  // Typography utilities - Enhanced with design system
  text: {
    // Headings
    h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight',
    h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight',
    h3: 'text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white leading-tight tracking-tight',
    h4: 'text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight tracking-tight',
    h5: 'text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight tracking-tight',
    h6: 'text-base font-semibold text-gray-900 dark:text-white leading-tight tracking-tight',
    
    // Display headings
    display: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 dark:text-white leading-none tracking-tight',
    hero: 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 dark:text-white leading-none tracking-tight',
    
    // Body text
    body: 'text-base font-normal text-gray-700 dark:text-gray-300 leading-relaxed',
    bodyLarge: 'text-lg font-normal text-gray-700 dark:text-gray-300 leading-relaxed',
    bodySmall: 'text-sm font-normal text-gray-600 dark:text-gray-400 leading-relaxed',
    
    // Lead text (introductory paragraphs)
    lead: 'text-xl font-normal text-gray-700 dark:text-gray-300 leading-relaxed',
    leadLarge: 'text-2xl font-normal text-gray-700 dark:text-gray-300 leading-relaxed',
    
    // Specialized text
    caption: 'text-sm font-normal text-gray-500 dark:text-gray-500 leading-normal',
    label: 'text-sm font-medium text-gray-700 dark:text-gray-300',
    helper: 'text-sm font-normal text-gray-500 dark:text-gray-500',
    
    // Links
    link: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 decoration-blue-600 dark:decoration-blue-400 transition-colors duration-150',
    linkSubtle: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 no-underline hover:underline hover:underline-offset-2 transition-all duration-150',
    linkMuted: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2 decoration-gray-400 hover:decoration-gray-600 transition-colors duration-150',
    
    // Code text
    code: 'font-mono text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded',
    codeBlock: 'font-mono text-sm font-normal text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto leading-relaxed',
    
    // Status text
    success: 'text-green-700 dark:text-green-300 font-medium',
    warning: 'text-amber-700 dark:text-amber-300 font-medium',
    error: 'text-red-700 dark:text-red-300 font-medium',
    info: 'text-blue-700 dark:text-blue-300 font-medium',
    
    // Emphasis variants
    emphasis: 'font-medium text-gray-900 dark:text-gray-100',
    strong: 'font-semibold text-gray-900 dark:text-gray-100',
    muted: 'text-gray-500 dark:text-gray-500',
    
    // Uppercase labels
    uppercase: 'text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider',
  },

  // Transition utilities
  transition: {
    default: 'transition-colors duration-200',
    all: 'transition-all duration-200',
    fast: 'transition-all duration-150',
    slow: 'transition-all duration-300',
    transform: 'transition-transform duration-200',
  },

  // Interactive states
  states: {
    hover: 'hover:opacity-80 transition-opacity duration-200',
    focus: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    loading: 'animate-pulse',
  },

  // Web3 specific utilities
  web3: {
    walletButton: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium',
    chainBadge: (chain: 'ethereum' | 'solana') => chain === 'ethereum' 
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
      : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    addressText: 'font-mono text-sm text-gray-600 dark:text-gray-400',
  },
} as const;

// === LEGACY WILDCARD EXPORTS ===
// For backward compatibility
export * from './colors';
export * from './tokens';
export * from './typography';
export * from './variants';