/**
 * Redirect component for language-prefixed routing.
 *
 * Detects the user's preferred language and redirects to the
 * language-prefixed version of the current path. Used for the root `/`
 * route and catch-all `*` route.
 *
 * @example
 * ```tsx
 * <Route path="/" element={<LanguageRedirect isLanguageSupported={isSupported} />} />
 * <Route path="*" element={<LanguageRedirect isLanguageSupported={isSupported} />} />
 * ```
 */

import { Navigate, useLocation } from 'react-router-dom';
import { detectLanguage, stripLangPrefix } from './detectLanguage';

export interface LanguageRedirectProps {
  /** Function to check if a language code is supported */
  isLanguageSupported: (lang: string) => boolean;
  /** @default 'en' */
  defaultLanguage?: string;
  /** localStorage key for persisting language preference. @default 'language' */
  storageKey?: string;
}

export function LanguageRedirect({
  isLanguageSupported,
  defaultLanguage = 'en',
  storageKey = 'language',
}: LanguageRedirectProps) {
  const location = useLocation();
  const lang = detectLanguage(isLanguageSupported, defaultLanguage, storageKey);

  const pathWithoutLang = stripLangPrefix(location.pathname);
  const cleanPath = pathWithoutLang === '/' ? '' : pathWithoutLang;
  const to = `/${lang}${cleanPath}${location.search}${location.hash}`;

  return <Navigate to={to} replace />;
}
