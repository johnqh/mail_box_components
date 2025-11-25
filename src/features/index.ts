/**
 * Feature Components - Specific features and content blocks
 *
 * NOTE: CalloutBox and InfoCard have been consolidated into Card component (src/ui/card.tsx)
 * and are re-exported from there for backward compatibility
 */

export {
  FeatureCard,
  type FeatureCardProps,
  type FeatureCardColor,
} from './FeatureCard';
export {
  FeatureGrid,
  type FeatureGridProps,
  type Feature,
  createFeature,
  createSecurityFeatures,
} from './FeatureGrid';
export { CTASection } from './CTASection';

// Note: CalloutBox and InfoCard are exported from data-display/card
