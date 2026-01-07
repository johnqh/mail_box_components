/**
 * Core Components - Essential reusable components
 */

// Navigation & Content
export { Breadcrumb } from './Breadcrumb';
export { BreadcrumbSection } from './BreadcrumbSection';
export { CodeBlock } from './CodeBlock';
export {
  CollapsibleDocumentationTopic,
  type CollapsibleDocumentationTopicProps,
  type Subsection,
} from './CollapsibleDocumentationTopic';
export {
  PromotionalBanner,
  type PromotionalBannerProps,
} from './PromotionalBanner';

// Interactive Components
export {
  TrackedButton,
  type ButtonClickTrackingParams,
  type TrackingFunction,
} from './TrackedButton';
export {
  TrackedLink,
  type LinkClickTrackingParams,
  type LinkTrackingFunction,
} from './TrackedLink';

// UI Components
export { LanguageSelector } from './LanguageSelector';
export { StepList } from './StepList';

// Security & Error Handling
export { ErrorBoundary } from './ErrorBoundary';
export * from './ErrorBoundaryLazy';
export { SafeAppWrapper } from './SafeAppWrapper';
export { SecurityProvider } from './SecurityProvider';

// Icons & Optimized components
// Note: OptimizedImage is exported via ./optimized
export * from './icons';
export * from './optimized';

// i18n Routing
export * from './i18n-routing';

// Auth components
export * from './auth';

// Error components
export * from './error';

// Theme system
export * from './theme';
