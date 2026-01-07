/**
 * Language validator route component for i18n routing
 * Validates the language parameter and syncs with i18next
 */

import { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface LanguageValidatorProps {
  /**
   * Function to check if a language code is supported
   * Required to validate against your app's supported languages
   */
  isLanguageSupported: (lang: string) => boolean;
  /**
   * Default language to redirect to when invalid
   * @default 'en'
   */
  defaultLanguage?: string;
  /**
   * localStorage key for persisting language preference
   * @default 'language'
   */
  storageKey?: string;
  /**
   * Custom fallback component to render instead of null during redirect
   */
  fallback?: React.ReactNode;
}

/**
 * Route wrapper that validates the language parameter and syncs i18n.
 * Use this as a parent route to wrap all language-prefixed routes.
 *
 * @example
 * ```tsx
 * // In your router config
 * const router = createBrowserRouter([
 *   {
 *     path: '/:lang',
 *     element: <LanguageValidator isLanguageSupported={isLangSupported} />,
 *     children: [
 *       { path: '', element: <HomePage /> },
 *       { path: 'about', element: <AboutPage /> },
 *     ],
 *   },
 * ]);
 * ```
 */
export function LanguageValidator({
  isLanguageSupported,
  defaultLanguage = 'en',
  storageKey = 'language',
  fallback = null,
}: LanguageValidatorProps): React.ReactElement | null {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Validate language parameter
    if (!lang || !isLanguageSupported(lang)) {
      navigate(`/${defaultLanguage}`, { replace: true });
      return;
    }

    // Update i18n language if different
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }

    // Save to localStorage
    try {
      localStorage.setItem(storageKey, lang);
    } catch {
      // Ignore localStorage errors (e.g., Safari private browsing)
    }
  }, [lang, i18n, navigate, isLanguageSupported, defaultLanguage, storageKey]);

  // Don't render if language is invalid
  if (!lang || !isLanguageSupported(lang)) {
    return <>{fallback}</>;
  }

  return <Outlet />;
}

export default LanguageValidator;
