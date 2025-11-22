/**
 * Utilities and helpers
 */

// SEO and AI optimization (moved to ../seo/ folder)
// Note: These utilities have been moved to ../seo/ for better organization

// Performance utilities (some moved to ../optimization/ folder)
export * from './css-optimization';
export * from './image-optimization';
export * from './treeShaking';
// Note: criticalPathOptimizer, performance-monitoring, and performance moved to ../optimization/

// UI utilities moved to design system - available via re-export above

// Navigation
export * from './navigation';
// Note: navigationHelpers exports NavigationItem which conflicts with navigation/
// If needed, import directly from './utils/navigationHelpers'
// export * from './navigationHelpers';

// Note: Indexer API utilities moved to @johnqh/lib
// These were network logic and belonged in the core lib rather than components

// Lazy loading and components (lazy-components moved to ../optimization/)
// Note: lazy-components exports moved to ../optimization/ to avoid conflicts
export * from './lazy-loading';

// Other utilities
export * from './storage';
export * from './walletBrowserDetection';
