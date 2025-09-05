/**
 * Utility functions and helpers
 */

// === CORE UTILITIES ===
export { cn } from './utils';

// === THEME UTILITIES ===
export { 
  withOpacity, 
  responsive, 
  themeColor 
} from './theme-utils';

export type { 
  ThemeMode, 
  ResponsiveBreakpoint 
} from './theme-utils';

// === COMPONENT HELPERS ===
export { 
  getSizeClasses,
  buttonVariant,
  inputVariant,
  cardVariant,
  textVariant
} from './component-helpers';

export type { 
  ComponentSize, 
  ComponentVariant 
} from './component-helpers';

// === LEGACY WILDCARD EXPORTS ===
// For backward compatibility
export * from './utils';
export * from './theme-utils';
export * from './component-helpers';