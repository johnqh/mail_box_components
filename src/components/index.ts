/**
 * Components Exports
 * 
 * Main export file for all reusable components.
 */

// UI Components that actually exist
export * from './ui/icon-container';
export * from './ui/wallet-icon';
export * from './ui/logo';
export * from './ui/internal-link-clusters';

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