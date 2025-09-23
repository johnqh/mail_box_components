/**
 * Utilities and helpers
 */

// SEO and AI optimization (moved to ../seo/ folder)
// Note: These utilities have been moved to ../seo/ for better organization

// Re-export specific utilities from design system (avoiding type conflicts)
export {
  GRADIENTS,
  GRADIENT_CLASSES,
  getGradient,
  combineGradient,
  UI_CONSTANTS,
  UI_PATTERNS,
  BASE_KEYWORDS,
  USER_FOCUSED_KEYWORDS,
  DEVELOPER_KEYWORDS,
  DOCUMENTATION_KEYWORDS,
  COMPANY_KEYWORDS,
  WEB3_TRENDING_KEYWORDS,
  TECHNICAL_SEO_KEYWORDS,
  ACCESSIBILITY_KEYWORDS,
  combineKeywords,
  getHomePageKeywords,
  getAboutPageKeywords,
  getDocumentationKeywords,
  getUserPageKeywords,
  getDeveloperPageKeywords,
  getWeb3ProjectsKeywords,
  getSubscriptionKeywords,
  getContactKeywords,
} from '@johnqh/design_system';

// Performance utilities (some moved to ../optimization/ folder)
export * from './css-optimization';
export * from './image-optimization';
export * from './treeShaking';
// Note: criticalPathOptimizer, performance-monitoring, and performance moved to ../optimization/

// UI utilities moved to design system - available via re-export above

// Navigation
export * from './navigation';
export * from './navigationHelpers';

// Note: Indexer API utilities moved to @johnqh/lib
// These were network logic and belonged in the core lib rather than components

// Lazy loading and components (lazy-components moved to ../optimization/)
// Note: lazy-components exports moved to ../optimization/ to avoid conflicts
export * from './lazy-loading';

// Other utilities
export * from './storage';
export * from './walletBrowserDetection';
