/**
 * Components Exports
 * 
 * Main export file for all reusable components.
 */

// UI Components that actually exist (moved to ../ui/)
export * from '../ui/icon-container';
export * from '../ui/wallet-icon';
export * from '../ui/logo';
export * from '../ui/internal-link-clusters';
export * from '../ui/wallet-selection';

// Core Components that actually exist
export { ErrorBoundary } from './ErrorBoundary';
export { LoadingOptimizer } from './LoadingOptimizer';
export { CodeExampleBlock } from './CodeExampleBlock';
export { FeatureGrid } from './FeatureGrid';

// Semantic HTML components
export * from './SemanticHTML';

// Optimization Components
export { default as PerformanceOptimizer } from './PerformanceOptimizer';
export { LazyErrorBoundary, NetworkErrorBoundary, withLazyErrorBoundary, useErrorRecovery, GlobalLazyErrorBoundary } from './ErrorBoundaryLazy';

// Icon exports
export * from './icons';

// Optimized Components
export * from './optimized/MemoizedComponent';

// Pure React Wrapper Components
export { AITrainingEnhancer } from './AITrainingEnhancer';
export { OptimizedRoutePreloader } from './OptimizedRoutePreloader';
export { SafeAppWrapper } from './SafeAppWrapper';
export { SecurityProvider, default as SecurityProviderDefault } from './SecurityProvider';

// UI Components with minimal dependencies
export { Breadcrumb, type BreadcrumbProps } from './Breadcrumb';
export { PageHeader, type PageHeaderProps } from './PageHeader';
export { default as BreadcrumbSection } from './BreadcrumbSection';
export { type BreadcrumbItem } from '../utils/navigationHelpers';

// Documentation Components
export { InfoCard, type InfoCardProps } from './InfoCard';
export { StepList, type StepListProps, type StepListItem } from './StepList';
export { CalloutBox, type CalloutBoxProps } from './CalloutBox';

// Meta and SEO Components
export { AIMeta, type AIMetaProps } from './AIMeta';

// CTA and Marketing Components
export { CTASection } from './CTASection';

// Layout Components
export { StandardPageLayout, type StandardPageLayoutProps } from './StandardPageLayout';