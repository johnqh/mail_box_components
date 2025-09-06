/**
 * Centralized gradient utilities for consistent styling across the application
 */

export const GRADIENTS = {
  // Background gradients
  backgrounds: {
    main: 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100',
    page: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    pageDark: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800',
    section: 'bg-gradient-to-r from-purple-50 to-blue-50',
    overlay: 'bg-gradient-to-br from-blue-50/50 to-purple-50/50',
  },

  // Button gradients
  buttons: {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    primaryBlue: 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800',
    primaryPurple: 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800',
  },

  // Text gradients (use with bg-clip-text text-transparent)
  text: {
    primary: 'bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800',
    secondary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600',
    accent: 'bg-gradient-to-r from-blue-600 to-purple-600',
  },

  // Special effect gradients
  effects: {
    glow: 'bg-gradient-to-r from-blue-600 to-purple-600',
    shimmer: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
  }
} as const;

/**
 * Common gradient combinations with additional styling
 */
export const GRADIENT_CLASSES = {
  // Primary action button with full styling
  primaryButton: `${GRADIENTS.buttons.primary} text-white shadow-lg hover:shadow-xl transition-all duration-200`,
  
  // Hero button with enhanced styling
  heroButton: `${GRADIENTS.buttons.primary} text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25`,
  
  // Header button styling
  headerButton: `${GRADIENTS.buttons.primary} text-white px-4 py-2 rounded-md font-medium transition-all duration-200 transform hover:scale-105 shadow-lg`,
  
  // Page background with common layout
  pageLayout: `min-h-screen ${GRADIENTS.backgrounds.page}`,
  
  // Page background with dark mode support
  pageLayoutDark: `min-h-screen ${GRADIENTS.backgrounds.pageDark}`,
  
  // Text gradient styling
  gradientText: `${GRADIENTS.text.primary} bg-clip-text text-transparent`,
  gradientTextSecondary: `${GRADIENTS.text.secondary} bg-clip-text text-transparent`,
} as const;

/**
 * Utility function to get gradient class by key
 */
export const getGradient = (category: keyof typeof GRADIENTS, variant: string): string => {
  const gradientCategory = GRADIENTS[category] as Record<string, string>;
  return gradientCategory[variant] || '';
};

/**
 * Utility function to combine gradient with custom classes
 */
export const combineGradient = (gradientKey: string, additionalClasses: string = ''): string => {
  return `${gradientKey} ${additionalClasses}`.trim();
};