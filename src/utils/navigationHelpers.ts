/**
 * Generic navigation helpers and utilities
 * Platform-agnostic navigation structures and functions
 */

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
  isActive?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

// Utility functions for navigation state
export const getActiveNavItem = (
  currentPath: string,
  items: NavigationItem[]
): NavigationItem | null => {
  return items.find(item => item.href === currentPath) || null;
};

export const createBreadcrumb = (
  path: string,
  customLabel?: string,
  pathLabels?: Record<string, string>
): BreadcrumbItem[] => {
  const pathSegments = path.split('/').filter(Boolean);

  if (pathSegments.length === 0) {
    return [{ label: 'Home', current: true }];
  }

  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

  // Default common path labels - can be overridden
  const defaultPathLabels: Record<string, string> = {
    docs: 'Documentation',
    about: 'About',
    connect: 'Connect',
    settings: 'Settings',
    preferences: 'Preferences',
    profile: 'Profile',
    help: 'Help',
    support: 'Support',
    contact: 'Contact',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
  };

  const labels = { ...defaultPathLabels, ...(pathLabels || {}) };

  pathSegments.forEach((segment, index) => {
    const isLast = index === pathSegments.length - 1;
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label =
      customLabel && isLast ? customLabel : labels[segment] || segment;

    breadcrumbs.push({
      label,
      href: isLast ? undefined : href,
      current: isLast,
    });
  });

  return breadcrumbs;
};

// Generic CTA button interface
export interface CTAButton {
  label: string;
  href: string;
  variant?: string;
  isExternal?: boolean;
}

// Navigation state utilities
export const navigationUtils = {
  /**
   * Check if a path is currently active
   */
  isActivePath: (
    currentPath: string,
    targetPath: string,
    exact = true
  ): boolean => {
    if (exact) {
      return currentPath === targetPath;
    }
    return currentPath.startsWith(targetPath);
  },

  /**
   * Get parent path from current path
   */
  getParentPath: (path: string): string => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length <= 1) return '/';
    return '/' + segments.slice(0, -1).join('/');
  },

  /**
   * Extract route parameters from path patterns
   */
  extractParams: (pattern: string, path: string): Record<string, string> => {
    const patternSegments = pattern.split('/').filter(Boolean);
    const pathSegments = path.split('/').filter(Boolean);

    const params: Record<string, string> = {};

    patternSegments.forEach((segment, index) => {
      if (segment.startsWith(':') && pathSegments[index]) {
        const paramName = segment.substring(1);
        params[paramName] = pathSegments[index];
      }
    });

    return params;
  },

  /**
   * Build URL with query parameters
   */
  buildUrlWithParams: (
    path: string,
    params: Record<string, string | number | boolean>
  ): string => {
    const url = new URL(path, 'http://localhost'); // Use dummy base for relative URLs
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
    return url.pathname + url.search;
  },

  /**
   * Parse query parameters from URL
   */
  parseQueryParams: (search: string): Record<string, string> => {
    const params = new URLSearchParams(
      search.startsWith('?') ? search : `?${search}`
    );
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  },

  /**
   * Normalize path (remove trailing slash, ensure leading slash)
   */
  normalizePath: (path: string): string => {
    if (!path || path === '/') return '/';

    // Ensure leading slash
    let normalized = path.startsWith('/') ? path : `/${path}`;

    // Remove trailing slash
    if (normalized.length > 1 && normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }

    return normalized;
  },

  /**
   * Check if URL is external
   */
  isExternalUrl: (url: string): boolean => {
    try {
      const parsed = new URL(
        url,
        window?.location?.origin || 'http://localhost'
      );
      return parsed.origin !== (window?.location?.origin || 'http://localhost');
    } catch {
      return false;
    }
  },
};

export default {
  getActiveNavItem,
  createBreadcrumb,
  navigationUtils,
};
