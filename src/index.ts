/**
 * @johnqh/mail-box-components
 * 
 * A comprehensive React component library and design system.
 * 
 * @version 1.0.0
 * @author John Qiu Huang
 * @license MIT
 */

// Export utilities and helpers (Phase 3 enhancement)
export * from './lib';

// Export design system
export * from './design-system';

// Export UI components (Phase 3: Disabled pending import resolution)
// export * from './ui';

// Default export for convenience
import { cn } from './lib/utils';
import { withOpacity, responsive, themeColor, getSizeClasses, buttonVariant, inputVariant, cardVariant, textVariant } from './lib';
import { colors, designTokens, textVariants, variants } from './design-system';

export default {
  utils: { 
    cn,
    withOpacity,
    responsive,
    themeColor,
    getSizeClasses,
    buttonVariant,
    inputVariant,
    cardVariant,
    textVariant,
  },
  design: {
    colors,
    tokens: designTokens,
    typography: textVariants,
    variants,
  },
};