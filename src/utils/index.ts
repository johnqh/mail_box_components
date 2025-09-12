/**
 * Utilities and helpers
 */

// SEO and AI optimization
export * from './advancedSEO';
export * from './seo-headings';
export * from './aiTrainingMetadata';

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
  getContactKeywords
} from '@johnqh/design-system';

// Performance utilities
export * from './criticalPathOptimizer';
export * from './css-optimization';
export * from './image-optimization';
export * from './performance-monitoring';
export * from './performance';
export * from './treeShaking';

// UI utilities moved to design system - available via re-export above

// Navigation
export * from './navigation';
export * from './navigationHelpers';

// Note: Indexer API utilities moved to @johnqh/lib
// These were network logic and belonged in the core lib rather than components

// Lazy loading and components
export * from './lazy-components';
export * from './lazy-loading';

// Other utilities
export * from './storage';
export * from './walletBrowserDetection';