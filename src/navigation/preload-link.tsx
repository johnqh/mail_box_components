import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

type PreloadFn = () => Promise<unknown>;

export type RouteModules = Record<string, () => Promise<unknown>>;

export interface PreloadLinkProps extends LinkProps {
  /** Custom preload function (overrides route module lookup) */
  preload?: PreloadFn;
  /** Delay before triggering preload (ms) */
  preloadDelay?: number;
  /** Route modules map for automatic preloading */
  routeModules?: RouteModules;
  /** Language prefixes to strip from path (e.g., ['en', 'es', 'zh']) */
  languagePrefixes?: string[];
  /** Path segments to normalize (e.g., ['/dashboard/[^/]+', '/dashboard']) */
  pathNormalizations?: Array<{ pattern: RegExp; replacement: string }>;
}

// Global cache of preloaded modules
const preloadedModules = new Set<string>();

/**
 * Clear the preloaded modules cache (useful for testing)
 */
export const clearPreloadCache = () => {
  preloadedModules.clear();
};

/**
 * Check if a module has been preloaded
 */
export const isPreloaded = (path: string) => preloadedModules.has(path);

/**
 * Get a route module by path with normalization
 */
function getRouteModule(
  to: string,
  routeModules: RouteModules,
  languagePrefixes: string[],
  pathNormalizations: Array<{ pattern: RegExp; replacement: string }>
): PreloadFn | undefined {
  let normalizedPath = to;

  // Remove language prefixes (e.g., /en/, /es/)
  if (languagePrefixes.length > 0) {
    const langPattern = new RegExp(`^/(${languagePrefixes.join('|')})/`);
    normalizedPath = normalizedPath.replace(langPattern, '/');
  }

  // Apply custom path normalizations
  for (const { pattern, replacement } of pathNormalizations) {
    normalizedPath = normalizedPath.replace(pattern, replacement);
  }

  // Check for exact match first
  if (routeModules[normalizedPath]) {
    return routeModules[normalizedPath];
  }

  // Check for partial matches (e.g., /dashboard/xxx/projects -> /projects)
  for (const [route, preloadFn] of Object.entries(routeModules)) {
    if (normalizedPath.endsWith(route)) {
      return preloadFn;
    }
  }

  return undefined;
}

/**
 * PreloadLink Component
 *
 * A Link component that preloads route modules on hover/focus for faster navigation.
 * Improves perceived performance by loading the next page before the user clicks.
 *
 * @example
 * ```tsx
 * // Basic usage with custom preload function
 * <PreloadLink
 *   to="/dashboard"
 *   preload={() => import('./pages/Dashboard')}
 * >
 *   Dashboard
 * </PreloadLink>
 * ```
 *
 * @example
 * ```tsx
 * // With route modules map
 * const routeModules = {
 *   '/': () => import('./pages/Home'),
 *   '/dashboard': () => import('./pages/Dashboard'),
 *   '/settings': () => import('./pages/Settings'),
 * };
 *
 * <PreloadLink
 *   to="/dashboard"
 *   routeModules={routeModules}
 *   languagePrefixes={['en', 'es', 'zh']}
 * >
 *   Dashboard
 * </PreloadLink>
 * ```
 *
 * @example
 * ```tsx
 * // With path normalizations for dynamic segments
 * <PreloadLink
 *   to="/dashboard/my-org/projects"
 *   routeModules={routeModules}
 *   pathNormalizations={[
 *     { pattern: /\/dashboard\/[^/]+/, replacement: '/dashboard' }
 *   ]}
 * >
 *   Projects
 * </PreloadLink>
 * ```
 */
export const PreloadLink: React.FC<PreloadLinkProps> = ({
  preload,
  preloadDelay = 50,
  routeModules = {},
  languagePrefixes = [],
  pathNormalizations = [],
  to,
  children,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  ...props
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePreload = useCallback(() => {
    const toPath = typeof to === 'string' ? to : to.pathname || '';

    if (preloadedModules.has(toPath)) {
      return;
    }

    const preloadFn =
      preload ||
      getRouteModule(toPath, routeModules, languagePrefixes, pathNormalizations);

    if (preloadFn) {
      timeoutRef.current = setTimeout(() => {
        preloadFn()
          .then(() => {
            preloadedModules.add(toPath);
          })
          .catch(() => {
            // Silently fail - preloading is an optimization
          });
      }, preloadDelay);
    }
  }, [preload, preloadDelay, to, routeModules, languagePrefixes, pathNormalizations]);

  const clearPreload = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      handlePreload();
      onMouseEnter?.(e);
    },
    [handlePreload, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      clearPreload();
      onMouseLeave?.(e);
    },
    [clearPreload, onMouseLeave]
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLAnchorElement>) => {
      handlePreload();
      onFocus?.(e);
    },
    [handlePreload, onFocus]
  );

  return (
    <Link
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PreloadLink;
