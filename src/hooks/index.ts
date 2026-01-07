/**
 * Hooks
 */

// Existing hooks - re-export from main index.ts
export { useClickOutside } from './useClickOutside';
export { useCodeLoader } from './useCodeLoader';
export {
  useFormSubmission,
  type UseFormSubmissionOptions,
  type UseFormSubmissionReturn,
} from './useFormSubmission';
export { useToggle, type UseToggleReturn } from './useToggle';
export {
  useCopyToClipboard,
  useMultipleCopyToClipboard,
  type CopyToClipboardOptions,
  type CopyToClipboardResult,
} from './useCopyToClipboard';

// i18n hooks
export {
  useLocalizedNavigate,
  addLanguageToPath,
  removeLanguageFromPath,
} from './useLocalizedNavigate';
export type {
  UseLocalizedNavigateOptions,
  UseLocalizedNavigateReturn,
} from './useLocalizedNavigate';

// Performance hooks
export { useRoutePerformance } from './useRoutePerformance';
