/**
 * Main Variant Resolver for Mail Box Components
 * Simple, robust, platform-agnostic variant system
 */

import { variants as designSystemVariants, createQuickVariants } from "@johnqh/design-system";

// Create the main variant resolver
export const v = createQuickVariants(designSystemVariants);

// Export for backward compatibility if needed
export const variants = v;