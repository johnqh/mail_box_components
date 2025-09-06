/**
 * Typography Variants
 * 
 * Pre-built text component configurations that combine font families, sizes, weights,
 * and other typography properties into ready-to-use text styles.
 */

import { designTokens } from './tokens';

const textVariants = {
  // =============================================================================
  // HEADINGS
  // =============================================================================
  
  heading: {
    // Display headings (hero sections, landing pages)
    display: {
      // Massive display text (128px)
      hero: () => `${designTokens.typography.family.display} ${designTokens.typography.semantic.hero} ${designTokens.typography.weight.display} ${designTokens.typography.leading.display} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
      
      // Large display text (96px)
      xl: () => `${designTokens.typography.family.display} text-7xl ${designTokens.typography.weight.display} ${designTokens.typography.leading.display} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
      
      // Medium display text (72px)
      lg: () => `${designTokens.typography.family.display} text-6xl ${designTokens.typography.weight.bold} ${designTokens.typography.leading.display} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
      
      // Small display text (60px)
      md: () => `${designTokens.typography.family.display} text-5xl ${designTokens.typography.weight.bold} ${designTokens.typography.leading.tight} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
      
      // Extra small display text (48px)
      sm: () => `${designTokens.typography.family.display} text-4xl ${designTokens.typography.weight.bold} ${designTokens.typography.leading.tight} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
    },

    // Standard headings (H1-H6)
    h1: () => `${designTokens.typography.family.sans} ${designTokens.typography.semantic.h1} ${designTokens.typography.weight.heading} ${designTokens.typography.leading.heading} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
    
    h2: () => `${designTokens.typography.family.sans} ${designTokens.typography.semantic.h2} ${designTokens.typography.weight.heading} ${designTokens.typography.leading.heading} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
    
    h3: () => `${designTokens.typography.family.sans} ${designTokens.typography.semantic.h3} ${designTokens.typography.weight.heading} ${designTokens.typography.leading.heading} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
    
    h4: () => `${designTokens.typography.family.sans} ${designTokens.typography.semantic.h4} ${designTokens.typography.weight.semibold} ${designTokens.typography.leading.heading} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
    
    h5: () => `${designTokens.typography.family.sans} ${designTokens.typography.semantic.h5} ${designTokens.typography.weight.semibold} ${designTokens.typography.leading.heading} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
    
    h6: () => `${designTokens.typography.family.sans} ${designTokens.typography.semantic.h6} ${designTokens.typography.weight.semibold} ${designTokens.typography.leading.heading} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,

    // Responsive headings that scale with screen size
    responsive: {
      h1: () => `${designTokens.typography.family.sans} text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${designTokens.typography.weight.heading} ${designTokens.typography.leading.heading} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
      
      h2: () => `${designTokens.typography.family.sans} text-xl sm:text-2xl md:text-3xl lg:text-4xl ${designTokens.typography.weight.heading} ${designTokens.typography.leading.heading} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
      
      h3: () => `${designTokens.typography.family.sans} text-lg sm:text-xl md:text-2xl lg:text-3xl ${designTokens.typography.weight.semibold} ${designTokens.typography.leading.heading} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
      
      display: () => `${designTokens.typography.family.display} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${designTokens.typography.weight.display} ${designTokens.typography.leading.display} ${designTokens.typography.tracking.heading} text-gray-900 dark:text-white`,
    },
  },

  // =============================================================================
  // BODY TEXT
  // =============================================================================
  
  body: {
    // Large body text (18px)
    xl: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.bodyLarge} ${designTokens.typography.weight.body} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-700 dark:text-gray-300`,
    
    // Regular body text (16px) - Default
    lg: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.body} ${designTokens.typography.weight.body} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-700 dark:text-gray-300`,
    
    // Medium body text (16px) - Alias for lg
    md: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.body} ${designTokens.typography.weight.body} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-700 dark:text-gray-300`,
    
    // Small body text (14px)
    sm: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.small} ${designTokens.typography.weight.body} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-600 dark:text-gray-400`,
    
    // Extra small body text (12px)
    xs: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.caption} ${designTokens.typography.weight.body} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-600 dark:text-gray-400`,

    // Emphasized/strong body text variants
    strong: {
      xl: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.bodyLarge} ${designTokens.typography.weight.strong} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-900 dark:text-white`,
      lg: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.body} ${designTokens.typography.weight.strong} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-900 dark:text-white`,
      md: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.body} ${designTokens.typography.weight.strong} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-900 dark:text-white`,
      sm: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.small} ${designTokens.typography.weight.strong} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-900 dark:text-white`,
    },

    // Emphasized/medium body text variants
    emphasis: {
      xl: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.bodyLarge} ${designTokens.typography.weight.emphasis} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-900 dark:text-white`,
      lg: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.body} ${designTokens.typography.weight.emphasis} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-900 dark:text-white`,
      md: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.body} ${designTokens.typography.weight.emphasis} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-900 dark:text-white`,
      sm: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.small} ${designTokens.typography.weight.emphasis} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-900 dark:text-white`,
    },

    // Muted/secondary body text variants
    muted: {
      xl: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.bodyLarge} ${designTokens.typography.weight.body} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-600 dark:text-gray-400`,
      lg: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.body} ${designTokens.typography.weight.body} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-600 dark:text-gray-400`,
      md: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.body} ${designTokens.typography.weight.body} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-600 dark:text-gray-400`,
      sm: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.small} ${designTokens.typography.weight.body} ${designTokens.typography.leading.body} ${designTokens.typography.tracking.body} text-gray-600 dark:text-gray-400`,
    },
  },

  // =============================================================================
  // SPECIALIZED TEXT
  // =============================================================================
  
  // Caption and small text
  caption: {
    // Default caption (12px)
    default: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.caption} ${designTokens.typography.weight.body} ${designTokens.typography.leading.caption} ${designTokens.typography.tracking.caption} text-gray-500 dark:text-gray-500`,
    
    // Emphasized caption
    emphasis: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.caption} ${designTokens.typography.weight.emphasis} ${designTokens.typography.leading.caption} ${designTokens.typography.tracking.caption} text-gray-600 dark:text-gray-400`,
    
    // Uppercase caption (for labels)
    uppercase: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.caption} ${designTokens.typography.weight.emphasis} ${designTokens.typography.leading.caption} ${designTokens.typography.tracking.uppercase} ${designTokens.typography.transform.uppercase} text-gray-500 dark:text-gray-500`,
  },

  // Lead text (introduction paragraphs)
  lead: {
    // Large lead text
    lg: () => `${designTokens.typography.family.body} text-xl ${designTokens.typography.weight.body} ${designTokens.typography.leading.relaxed} ${designTokens.typography.tracking.body} text-gray-700 dark:text-gray-300`,
    
    // Medium lead text
    md: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.bodyLarge} ${designTokens.typography.weight.body} ${designTokens.typography.leading.relaxed} ${designTokens.typography.tracking.body} text-gray-700 dark:text-gray-300`,
    
    // Small lead text
    sm: () => `${designTokens.typography.family.body} ${designTokens.typography.semantic.body} ${designTokens.typography.weight.body} ${designTokens.typography.leading.relaxed} ${designTokens.typography.tracking.body} text-gray-700 dark:text-gray-300`,
  },

  // Links
  link: {
    // Default link
    default: () => `${designTokens.typography.decoration.underline} ${designTokens.typography.underlineOffset.medium} text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150`,
    
    // Link without underline
    subtle: () => `${designTokens.typography.decoration.none} text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:${designTokens.typography.decoration.underline} hover:${designTokens.typography.underlineOffset.medium} transition-all duration-150`,
    
    // Muted link
    muted: () => `${designTokens.typography.decoration.underline} ${designTokens.typography.underlineOffset.medium} text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150`,
    
    // External link (with icon space)
    external: () => `${designTokens.typography.decoration.underline} ${designTokens.typography.underlineOffset.medium} text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150 inline-flex items-center gap-1`,
  },

  // Code and monospace text
  code: {
    // Inline code
    inline: () => `${designTokens.typography.family.mono} text-sm ${designTokens.typography.weight.medium} px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100`,
    
    // Code block
    block: () => `${designTokens.typography.family.mono} text-sm ${designTokens.typography.weight.body} ${designTokens.typography.leading.relaxed} p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 overflow-x-auto`,
    
    // Small inline code
    small: () => `${designTokens.typography.family.mono} text-xs ${designTokens.typography.weight.medium} px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100`,
  },

  // UI Labels and form text
  label: {
    // Form labels
    default: () => `${designTokens.typography.family.body} text-sm ${designTokens.typography.weight.emphasis} text-gray-900 dark:text-white`,
    
    // Required field labels
    required: () => `${designTokens.typography.family.body} text-sm ${designTokens.typography.weight.emphasis} text-gray-900 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500`,
    
    // Optional field labels
    optional: () => `${designTokens.typography.family.body} text-sm ${designTokens.typography.weight.body} text-gray-600 dark:text-gray-400`,
    
    // Helper text
    helper: () => `${designTokens.typography.family.body} text-sm ${designTokens.typography.weight.body} text-gray-500 dark:text-gray-500`,
    
    // Error text
    error: () => `${designTokens.typography.family.body} text-sm ${designTokens.typography.weight.body} text-red-600 dark:text-red-400`,
    
    // Success text
    success: () => `${designTokens.typography.family.body} text-sm ${designTokens.typography.weight.body} text-green-600 dark:text-green-400`,
  },

  // =============================================================================
  // WEB3 SPECIFIC
  // =============================================================================
  
  web3: {
    // Wallet addresses
    address: () => `${designTokens.typography.family.mono} text-sm ${designTokens.typography.weight.body} text-gray-900 dark:text-white break-all`,
    
    // Short wallet addresses (truncated)
    addressShort: () => `${designTokens.typography.family.mono} text-sm ${designTokens.typography.weight.body} text-gray-900 dark:text-white`,
    
    // Transaction hashes
    hash: () => `${designTokens.typography.family.mono} text-xs ${designTokens.typography.weight.body} text-gray-500 dark:text-gray-500 break-all`,
    
    // Cryptocurrency amounts
    amount: () => `${designTokens.typography.family.mono} text-base ${designTokens.typography.weight.emphasis} text-gray-900 dark:text-white`,
    
    // Chain names
    chain: () => `${designTokens.typography.family.body} text-sm ${designTokens.typography.weight.emphasis} text-gray-900 dark:text-white`,
    
    // Token symbols
    symbol: () => `${designTokens.typography.family.body} text-sm ${designTokens.typography.weight.bold} ${designTokens.typography.transform.uppercase} text-gray-900 dark:text-white`,
  },

  // =============================================================================
  // UTILITY CLASSES
  // =============================================================================
  
  // Truncation utilities
  truncate: {
    // Single line truncation
    line: () => `${designTokens.typography.overflow.ellipsis} ${designTokens.typography.whitespace.nowrap} overflow-hidden`,
    
    // Multi-line truncation (2 lines)
    lines2: () => 'line-clamp-2',
    
    // Multi-line truncation (3 lines)
    lines3: () => 'line-clamp-3',
    
    // Multi-line truncation (4 lines)
    lines4: () => 'line-clamp-4',
  },

  // Selection styles
  selection: {
    // Default text selection
    default: () => 'selection:bg-blue-200 dark:selection:bg-blue-800 selection:text-blue-900 dark:selection:text-blue-100',
    
    // Brand colored selection
    brand: () => 'selection:bg-purple-200 dark:selection:bg-purple-800 selection:text-purple-900 dark:selection:text-purple-100',
  },
} as const;

// Export utility functions for building custom text styles
const createTextStyle = (
  family: keyof typeof designTokens.typography.family = 'body',
  size: keyof typeof designTokens.typography.semantic = 'body',
  weight: keyof typeof designTokens.typography.weight = 'body',
  color: string = 'text-gray-900 dark:text-white',
  options: {
    leading?: keyof typeof designTokens.typography.leading;
    tracking?: keyof typeof designTokens.typography.tracking;
    transform?: keyof typeof designTokens.typography.transform;
    decoration?: keyof typeof designTokens.typography.decoration;
  } = {}
): string => {
  const {
    leading = 'body',
    tracking = 'body',
    transform = 'none',
    decoration = 'none'
  } = options;

  return [
    designTokens.typography.family[family],
    designTokens.typography.semantic[size],
    designTokens.typography.weight[weight],
    designTokens.typography.leading[leading],
    designTokens.typography.tracking[tracking],
    designTokens.typography.transform[transform],
    designTokens.typography.decoration[decoration],
    color
  ].filter(Boolean).join(' ');
};

// Helper function to combine text styles
const combineTextStyles = (...styles: string[]): string => {
  return styles.filter(Boolean).join(' ');
};

// Helper function to create responsive text styles
const createResponsiveText = (
  baseStyle: string,
  breakpoints: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  }
): string => {
  const responsiveClasses = [];
  
  responsiveClasses.push(baseStyle);
  
  if (breakpoints.sm) responsiveClasses.push(`sm:${breakpoints.sm}`);
  if (breakpoints.md) responsiveClasses.push(`md:${breakpoints.md}`);
  if (breakpoints.lg) responsiveClasses.push(`lg:${breakpoints.lg}`);
  if (breakpoints.xl) responsiveClasses.push(`xl:${breakpoints.xl}`);
  if (breakpoints['2xl']) responsiveClasses.push(`2xl:${breakpoints['2xl']}`);
  
  return responsiveClasses.join(' ');
};

export { textVariants, createTextStyle, combineTextStyles, createResponsiveText };