/**
 * Platform Integrations for mail_box_components
 *
 * This module provides platform-specific style generators and utilities
 * for component development.
 */

import { webStyleGenerator } from './web';

// Local platform registry
class PlatformRegistry {
  private generators = new Map<string, any>();

  register(platform: string, generator: any) {
    this.generators.set(platform, generator);
  }

  get(platform: string) {
    return this.generators.get(platform);
  }

  has(platform: string): boolean {
    return this.generators.has(platform);
  }
}

// Create and configure the platform registry
export const platformRegistry = new PlatformRegistry();

// Register the web platform generator
platformRegistry.register('web', webStyleGenerator);

// === PRIMARY EXPORTS ===
export { webStyleGenerator } from './web';

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
