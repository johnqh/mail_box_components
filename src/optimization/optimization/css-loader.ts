/**
 * Platform-aware CSS loader for React Native compatibility
 * CSS imports are only processed in web environments
 */

/**
 * Conditionally import CSS files based on platform
 * In React Native, CSS imports are ignored
 * @param cssPath Path to CSS file (for documentation purposes)
 */
export function loadCSS(_cssPath: string): void {
  // CSS imports only work in web environments
  // React Native uses StyleSheet instead of CSS files
  if (typeof window !== 'undefined') {
    // In web environment, CSS would already be imported via bundler
    // This function serves as a platform-safe wrapper
    // CSS loaded (web): ${cssPath}
  } else {
    // In React Native, CSS imports are not supported
    // CSS skipped (React Native): ${cssPath}
  }
}

/**
 * Platform detection for CSS loading
 */
export function isWebEnvironment(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Check if CSS imports are supported
 */
export function supportsCSSImports(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Wrapper for conditional CSS imports
 * Use this in components that need platform-specific styling
 */
export function conditionalCSS(webCSS: () => void, reactNativeStyles?: any) {
  if (isWebEnvironment()) {
    // Execute web CSS import
    webCSS();
  } else {
    // In React Native, return styles object if provided
    return reactNativeStyles;
  }
}
