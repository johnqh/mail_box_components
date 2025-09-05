/**
 * Platform Integrations for mail_box_components
 * 
 * This module registers platform-specific style generators with the design system
 * and provides utilities for component development.
 */

import { platformRegistry } from '@johnqh/design-system';
import { webStyleGenerator } from './web';

// Register the web platform generator
platformRegistry.register('web', webStyleGenerator);

// === PRIMARY EXPORTS ===
export { webStyleGenerator } from './web';
export { platformRegistry } from '@johnqh/design-system';

// Platform detection utility
export function detectPlatform(): string {
  if (typeof window !== 'undefined') {
    return 'web';
  }
  
  // React Native detection
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return 'react-native';
  }
  
  // Default to web for SSR environments
  return 'web';
}

// Get current platform generator
export function getCurrentPlatformGenerator() {
  const platform = detectPlatform();
  const generator = platformRegistry.get(platform);
  
  if (!generator) {
    throw new Error(`No style generator registered for platform: ${platform}`);
  }
  
  return generator;
}