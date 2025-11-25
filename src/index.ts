/**
 * @sudobility/components v3.0.0
 *
 * A comprehensive React component library and design system.
 * MAJOR VERSION: Reorganized structure for better maintainability.
 *
 * @author John Qiu Huang
 * @license MIT
 */

// === CORE UTILITIES ===
export { cn } from './lib/utils';

// === PRIMITIVES ===
export * from './primitives';

// === FORMS ===
export * from './forms';
export * from './ui/button';
export * from './ui/logo';
export * from './ui/section-badge';
export * from './ui/section-header';

// === NAVIGATION ===
export * from './navigation';

// === DATA DISPLAY ===
export * from './data-display';

// === CHARTS ===
export * from './charts';

// === MEDIA ===
export * from './media';

// === MODALS ===
export * from './modals';

// === INTERACTIVE ===
export * from './interactive';
export * from './ui/animated-section';

// === CORE COMPONENTS ===
export * from './core';

// === LAYOUT COMPONENTS ===
export * from './layout';

// === SEO COMPONENTS ===
export * from './seo';

// === OPTIMIZATION COMPONENTS ===
export * from './optimization';

// === HOOKS ===
export { useClickOutside } from './hooks/useClickOutside';
export { useCodeLoader } from './hooks/useCodeLoader';
export {
  useFormSubmission,
  type UseFormSubmissionOptions,
  type UseFormSubmissionReturn,
} from './hooks/useFormSubmission';
export { useToggle, type UseToggleReturn } from './hooks/useToggle';
export {
  useCopyToClipboard,
  useMultipleCopyToClipboard,
  type CopyToClipboardOptions,
  type CopyToClipboardResult,
} from './hooks/useCopyToClipboard';

// === UTILITIES ===
export {
  formatFileSize,
  convertFileSize,
  parseFileSize,
} from './utils/formatFileSize';

// Performance & Optimization utilities
export * from './utils';

// Performance monitoring
export {
  getPerformanceMonitor,
  initializePerformanceMonitoring,
  type PerformanceMetrics,
} from './optimization/performance-monitoring';

// === LEGACY EXPORTS (deprecated, use new paths) ===
// Note: Specialized domain components (Web3, Email, Fitness, Real Estate, etc.)
// have been moved to separate packages:
// - @sudobility/web3-components
// - @sudobility/email-components
// - @sudobility/fitness-components
// - @sudobility/realestate-components
// See migration guide for details.

// === DEFAULT EXPORT ===
import { cn } from './lib/utils';

export default {
  utils: {
    cn,
  },
};
