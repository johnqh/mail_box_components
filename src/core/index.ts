/**
 * Core Components - Essential reusable components
 */

// Navigation & Content
export { Breadcrumb } from './Breadcrumb';
export { default as BreadcrumbSection } from './BreadcrumbSection';
export { default as CodeBlock } from './CodeBlock';
export { default as CodeExampleBlock } from './CodeExampleBlock';
export { 
  default as CollapsibleDocumentationTopic,
  type CollapsibleDocumentationTopicProps,
  type Subsection
} from './CollapsibleDocumentationTopic';
export { default as PromotionalBanner, type PromotionalBannerProps } from './PromotionalBanner';

// Interactive Components
export { 
  default as TrackedButton, 
  type ButtonClickTrackingParams,
  type TrackingFunction
} from './TrackedButton';
export { 
  default as TrackedLink,
  type LinkClickTrackingParams, 
  type LinkTrackingFunction
} from './TrackedLink';

// UI Components
export { default as LanguageSelector } from './LanguageSelector';
export { default as StepList } from './StepList';

// Security & Error Handling
export { ErrorBoundary } from './ErrorBoundary';
export { default as ErrorBoundaryLazy } from './ErrorBoundaryLazy';
export { SafeAppWrapper } from './SafeAppWrapper';
export { SecurityProvider } from './SecurityProvider';

// Icons & Optimized components
export * from './icons';
export * from './optimized';