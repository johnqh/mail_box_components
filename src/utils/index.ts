/**
 * Utility exports for @johnqh/mail_box_components
 * 
 * Performance, optimization, and development utilities
 */

// Performance monitoring
export * from './performance-monitoring';
export { default as performanceMonitoring } from './performance-monitoring';

// CSS optimization
export * from './css-optimization';
export { default as cssOptimization } from './css-optimization';

// Lazy loading
export * from './lazy-loading';
export { default as lazyLoading } from './lazy-loading';

// Image optimization
export * from './image-optimization';
export { default as imageOptimization } from './image-optimization';

// Performance utilities
export * from './performance';

// SEO utilities
export * from './seo';

// Optimization utilities
export { RoutePreloadingService } from './optimization/route-preloading';
export type { RoutePreloadingConfig, RoutePreloadConfig } from './optimization/route-preloading';
export { setupCSPReporting } from './optimization/securityHeaders';
export { isWebEnvironment } from './optimization/css-loader';

// UI utilities
export * from './ui';

// Storage utilities
export * from './storage';

// Wallet utilities
export * from './walletBrowserDetection';

// Navigation utilities
export * from './navigationHelpers';

// Tree shaking utilities
export * from './treeShaking';

// API utilities
export * from './api/indexer-graphql';
export * from './api/indexer-webhooks';
export * from './api/indexer-admin';

// Enhanced lazy components
export * from './lazy-components';
export { default as lazyComponents } from './lazy-components';

// Navigation service
export * from './navigation';