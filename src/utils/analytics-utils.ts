/**
 * Analytics utilities for privacy-preserving tracking
 */

/* global TextEncoder, crypto */

/**
 * Hash a string using SHA-256 for privacy-preserving analytics
 * The hash is one-way and cannot be reversed to the original value
 *
 * @param value - The string to hash
 * @returns A hex string of the SHA-256 hash
 */
export async function hashString(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash a user ID using SHA-256 for privacy-preserving analytics
 * Alias for hashString for semantic clarity
 *
 * @param userId - The user ID to hash
 * @returns A hex string of the SHA-256 hash
 */
export const hashUserId = hashString;

/**
 * Strip language prefix from a path
 * E.g., /en/about -> /about, /zh-hant/docs -> /docs
 *
 * @param path - The path to normalize
 * @returns The path without language prefix
 */
export function stripLanguagePrefix(path: string): string {
  return path.replace(/^\/[a-z]{2}(-[a-z]+)?(?=\/|$)/, '');
}

/**
 * Get a normalized page name from a path
 * Converts path segments to underscore-separated names
 *
 * @param path - The path to convert
 * @param pageNames - Optional mapping of paths to custom names
 * @returns A normalized page name
 */
export function getPageName(
  path: string,
  pageNames?: Record<string, string>
): string {
  // Strip language prefix
  const normalizedPath = stripLanguagePrefix(path);

  // Check for custom mapping
  if (pageNames?.[normalizedPath]) {
    return pageNames[normalizedPath];
  }

  // Default to path-based name
  return normalizedPath.replace(/\//g, '_').replace(/^_/, '') || 'home';
}

/**
 * Common analytics event names following best practices
 */
export const CommonAnalyticsEvents = {
  // Authentication events
  USER_LOGIN: 'login',
  USER_LOGOUT: 'logout',
  USER_SIGNUP: 'sign_up',

  // Navigation events
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  LINK_CLICK: 'link_click',

  // Error events
  ERROR_OCCURRED: 'error_occurred',
  ERROR_API_CALL: 'error_api_call',

  // Engagement events
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  FORM_SUBMIT: 'form_submit',
  SEARCH: 'search',
} as const;

export type CommonAnalyticsEventName =
  (typeof CommonAnalyticsEvents)[keyof typeof CommonAnalyticsEvents];

/**
 * Common analytics event parameters
 */
export interface AnalyticsEventParams {
  user_hash?: string;
  page_path?: string;
  page_title?: string;
  button_name?: string;
  link_url?: string;
  error_message?: string;
  error_code?: string;
  timestamp?: number;
  [key: string]: unknown;
}

/**
 * Analytics event structure
 */
export interface AnalyticsEvent {
  event: string;
  parameters?: AnalyticsEventParams;
}

/**
 * Create an analytics event with common parameters
 *
 * @param event - The event name
 * @param parameters - Event parameters
 * @returns An analytics event object
 */
export function createAnalyticsEvent(
  event: string,
  parameters?: AnalyticsEventParams
): AnalyticsEvent {
  return {
    event,
    parameters: {
      ...parameters,
      timestamp: parameters?.timestamp ?? Date.now(),
    },
  };
}
