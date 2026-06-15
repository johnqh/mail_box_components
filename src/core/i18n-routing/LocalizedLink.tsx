/**
 * Language-aware Link component for i18n routing
 */

import { Link, useParams } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

export interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  /**
   * Optional specific language override
   */
  language?: string;
  /**
   * Function to check if a language code is supported
   * If not provided, any 2-letter code is considered valid
   */
  isLanguageSupported?: (lang: string) => boolean;
  /**
   * Default language to use when none is detected
   * @default 'en'
   */
  defaultLanguage?: string;
}

/**
 * Default language validation - accepts 2-letter codes or 2-letter-xx format
 */
const defaultIsLanguageSupported = (lang: string): boolean => {
  return /^[a-z]{2}(-[a-z]+)?$/.test(lang);
};

/**
 * Strip any trailing slash from the path portion of an internal route, so
 * rendered links match the canonical URL / hreflang / sitemap convention
 * (no trailing slash — source of truth, e.g. `/en`, `/en/techniques/x-wing`).
 * Without this, a link to `/en/techniques/` resolves to a 200 that
 * 301-redirects to `/en/techniques`, wasting crawl budget and splitting signals.
 *
 * Query strings (`?...`) and hash fragments (`#...`) are preserved; the root
 * "/" is never reduced away; absolute/external URLs are left as-is.
 */
const stripTrailingSlash = (path: string): string => {
  if (!path.startsWith('/')) return path;
  const splitIndex = path.search(/[?#]/);
  const pathname = splitIndex === -1 ? path : path.slice(0, splitIndex);
  const suffix = splitIndex === -1 ? '' : path.slice(splitIndex);
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return `${normalized}${suffix}`;
};

/**
 * A Link component that automatically adds the current language prefix to paths.
 *
 * @example
 * ```tsx
 * // Current URL: /en/dashboard
 * <LocalizedLink to="/about">About</LocalizedLink>
 * // Renders: <a href="/en/about">About</a>
 *
 * // With language override
 * <LocalizedLink to="/about" language="fr">About (French)</LocalizedLink>
 * // Renders: <a href="/fr/about">About (French)</a>
 * ```
 */
export function LocalizedLink({
  to,
  language,
  children,
  isLanguageSupported = defaultIsLanguageSupported,
  defaultLanguage = 'en',
  ...props
}: LocalizedLinkProps): React.ReactElement {
  const { lang } = useParams<{ lang: string }>();
  const currentLang =
    lang && isLanguageSupported(lang) ? lang : defaultLanguage;

  // Use provided language or fall back to current
  const targetLang = language || currentLang;

  // Add language prefix if not already present, then strip any trailing slash
  // so the rendered href matches the canonical URL exactly (no trailing slash).
  const localizedTo = to.startsWith(`/${targetLang}`)
    ? to
    : `/${targetLang}${to.startsWith('/') ? to : `/${to}`}`;

  return (
    <Link to={stripTrailingSlash(localizedTo)} {...props}>
      {children}
    </Link>
  );
}

export default LocalizedLink;
