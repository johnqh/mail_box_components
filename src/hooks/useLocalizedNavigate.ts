/**
 * Hook for language-aware navigation in i18n applications
 */

import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Add language prefix to a path
 */
export function addLanguageToPath(path: string, lang: string): string {
  const cleanPath = removeLanguageFromPath(path);
  return `/${lang}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
}

/**
 * Remove language prefix from a path
 * Assumes language codes are 2 lowercase letters, optionally followed by -xx
 */
export function removeLanguageFromPath(
  path: string,
  isLanguageSupported?: (lang: string) => boolean
): string {
  const parts = path.split('/').filter(Boolean);
  if (parts.length > 0) {
    const firstPart = parts[0];
    // Check if first part is a language code (2 letters or 2-letters-xx format)
    const isLangCode = /^[a-z]{2}(-[a-z]+)?$/.test(firstPart);
    if (
      isLangCode &&
      (!isLanguageSupported || isLanguageSupported(firstPart))
    ) {
      return '/' + parts.slice(1).join('/');
    }
  }
  return path;
}

export interface UseLocalizedNavigateOptions {
  /**
   * Function to check if a language code is supported
   * If not provided, any 2-letter code is considered valid
   */
  isLanguageSupported?: (lang: string) => boolean;
  /**
   * Default language to use if none is detected
   * @default 'en'
   */
  defaultLanguage?: string;
  /**
   * localStorage key for persisting language preference
   * @default 'language'
   */
  storageKey?: string;
}

export interface UseLocalizedNavigateReturn {
  /**
   * Navigate to a path with the current language prefix
   */
  navigate: (
    to: string | number,
    options?: { replace?: boolean; state?: unknown }
  ) => void;
  /**
   * Switch to a different language and navigate to the same page in that language
   */
  switchLanguage: (newLanguage: string, currentPath?: string) => void;
  /**
   * The current language
   */
  currentLanguage: string;
}

/**
 * Hook for language-aware navigation
 *
 * @param options - Configuration options
 * @returns Navigation functions and current language
 */
export function useLocalizedNavigate(
  options: UseLocalizedNavigateOptions = {}
): UseLocalizedNavigateReturn {
  const {
    isLanguageSupported = (lang: string) => /^[a-z]{2}(-[a-z]+)?$/.test(lang),
    defaultLanguage = 'en',
    storageKey = 'language',
  } = options;

  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  const currentLanguage =
    lang && isLanguageSupported(lang) ? lang : i18n.language || defaultLanguage;

  const localizedNavigate = useCallback(
    (
      to: string | number,
      navOptions?: { replace?: boolean; state?: unknown }
    ) => {
      if (typeof to === 'number') {
        navigate(to);
        return;
      }
      const localizedPath = addLanguageToPath(to, currentLanguage);
      navigate(localizedPath, navOptions);
    },
    [navigate, currentLanguage]
  );

  const switchLanguage = useCallback(
    (newLanguage: string, currentPath?: string) => {
      i18n.changeLanguage(newLanguage);
      const pathWithoutLang = removeLanguageFromPath(
        currentPath ||
          (typeof window !== 'undefined' ? window.location.pathname : '/'),
        isLanguageSupported
      );
      const newPath = addLanguageToPath(pathWithoutLang, newLanguage);
      navigate(newPath, { replace: true });

      // Save to localStorage
      try {
        localStorage.setItem(storageKey, newLanguage);
      } catch {
        // Ignore localStorage errors (e.g., Safari private browsing)
      }
    },
    [navigate, i18n, isLanguageSupported, storageKey]
  );

  return { navigate: localizedNavigate, switchLanguage, currentLanguage };
}

export default useLocalizedNavigate;
