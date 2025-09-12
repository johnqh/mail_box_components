/**
 * Utility functions and helpers - Re-exported from design system
 */

// === CORE UTILITIES ===
export { cn } from './utils';

// === DESIGN SYSTEM UTILITIES ===
// Import all utilities from design system
export { 
  withOpacity, 
  responsive, 
  themeColor,
  getSizeClasses,
  buttonVariant,
  inputVariant,
  cardVariant,
  textVariant
} from '@johnqh/design-system';

export type { 
  ThemeMode, 
  ResponsiveBreakpoint,
  ComponentSize, 
  ComponentVariant 
} from '@johnqh/design-system';

// === LEGACY WILDCARD EXPORTS ===
// For backward compatibility
export * from './utils';