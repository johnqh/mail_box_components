/**
 * @johnqh/mail-box-components
 * 
 * A comprehensive React component library and design system.
 * 
 * @version 1.0.0
 * @author John Qiu Huang
 * @license MIT
 */

// Export utilities
export * from './lib/utils';

// Export design system
export * from './design-system';

// Export UI components (Phase 2: Dependencies resolved) - temporarily disabled
// export * from './ui';

// Default export for convenience
import { cn } from './lib/utils';
import { colors, designTokens, textVariants, variants } from './design-system';

export default {
  utils: { cn },
  design: {
    colors,
    tokens: designTokens,
    typography: textVariants,
    variants,
  },
};