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

// === LEGACY WILDCARD EXPORTS ===
// For backward compatibility
export * from './colors';
export * from './tokens';
export * from './typography';
export * from './variants';