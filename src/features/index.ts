/**
 * Feature Components - Specific features and content blocks
 *
 * NOTE: CalloutBox and InfoCard have been consolidated into Card component (src/ui/card.tsx)
 * and are re-exported from there for backward compatibility
 */

export { default as FeatureGrid } from './FeatureGrid';
export { default as CTASection } from './CTASection';

// Re-export from card.tsx (consolidated)
export { CalloutBox, InfoCard } from '../ui/card';
