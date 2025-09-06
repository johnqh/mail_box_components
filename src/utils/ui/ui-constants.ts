/**
 * Centralized UI constants for consistent styling across the application
 */

export const UI_CONSTANTS = {
  // Common layout classes
  layout: {
    section: 'py-20',
    sectionSm: 'py-16',
    sectionLg: 'py-24',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    containerSm: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
    containerLg: 'max-w-8xl mx-auto px-4 sm:px-6 lg:px-8',
  },

  // Animation durations (in milliseconds)
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
    extraSlow: 1000,
  },

  // Common spacing patterns
  spacing: {
    sectionGap: 'space-y-20',
    cardGap: 'space-y-8',
    listGap: 'space-y-4',
    inlineGap: 'space-x-4',
  },

  // Grid patterns
  grid: {
    responsive2: 'grid md:grid-cols-2 gap-8',
    responsive3: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
    responsive4: 'grid md:grid-cols-2 lg:grid-cols-4 gap-8',
    autoFit: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-auto-fit gap-8',
  },

  // Typography patterns
  typography: {
    hero: 'text-4xl md:text-6xl lg:text-7xl font-bold',
    heading1: 'text-3xl md:text-5xl font-bold',
    heading2: 'text-2xl md:text-4xl font-bold',
    heading3: 'text-xl md:text-2xl font-bold',
    bodyLarge: 'text-xl md:text-2xl',
    body: 'text-lg',
    caption: 'text-sm text-gray-600 dark:text-gray-400',
  },

  // Card patterns
  card: {
    base: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
    interactive: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow',
    border: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg',
  },

  // Button sizing patterns
  button: {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  },

  // Icon sizing
  icon: {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
    xxl: 'w-12 h-12',
  },

  // Transition patterns
  transition: {
    base: 'transition-all duration-200',
    slow: 'transition-all duration-300',
    colors: 'transition-colors duration-200',
    transform: 'transition-transform duration-200',
    shadow: 'transition-shadow duration-200',
  },

  // Common hover effects
  hover: {
    scale: 'hover:scale-105',
    scaleSmall: 'hover:scale-102',
    lift: 'hover:-translate-y-1',
    glow: 'hover:shadow-lg',
  },

  // Focus patterns
  focus: {
    ring: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    ringInset: 'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500',
  },
} as const;

/**
 * Commonly used class combinations
 */
export const UI_PATTERNS = {
  // Section with container
  section: `${UI_CONSTANTS.layout.section} ${UI_CONSTANTS.layout.container}`,
  sectionCentered: `${UI_CONSTANTS.layout.section} ${UI_CONSTANTS.layout.container} text-center`,
  
  // Interactive card
  interactiveCard: `${UI_CONSTANTS.card.interactive} ${UI_CONSTANTS.transition.base} ${UI_CONSTANTS.hover.lift}`,
  
  // Primary button
  primaryButton: `${UI_CONSTANTS.button.md} ${UI_CONSTANTS.transition.base} ${UI_CONSTANTS.hover.scale} ${UI_CONSTANTS.focus.ring}`,
  
  // Hero text
  heroText: `${UI_CONSTANTS.typography.hero} leading-tight`,
  
  // Feature grid
  featureGrid: `${UI_CONSTANTS.grid.responsive4}`,
  
  // Icon container
  iconContainer: `${UI_CONSTANTS.icon.lg} rounded-full flex items-center justify-center`,
} as const;

/**
 * Utility function to get UI constant by path
 */
export const getUIConstant = (path: string): string => {
  const keys = path.split('.');
  let current: any = UI_CONSTANTS;
  
  for (const key of keys) {
    current = current[key];
    if (current === undefined) {
      console.warn(`UI constant not found: ${path}`);
      return '';
    }
  }
  
  return current;
};

/**
 * Utility function to combine UI classes
 */
export const combineUI = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};