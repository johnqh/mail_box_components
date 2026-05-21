/**
 * Detect the user's preferred language.
 *
 * Checks (in order): localStorage → browser language list → default.
 */
export function detectLanguage(
  isLanguageSupported: (lang: string) => boolean,
  defaultLanguage: string,
  storageKey: string
): string {
  // Check localStorage
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored && isLanguageSupported(stored)) {
      return stored;
    }
  } catch {
    // localStorage not available
  }

  // Check browser languages
  if (typeof navigator !== 'undefined') {
    const browserLangs = navigator.languages ?? [navigator.language];
    for (const browserLang of browserLangs) {
      const normalized = browserLang.toLowerCase().replace('_', '-');
      if (isLanguageSupported(normalized)) return normalized;
      const base = normalized.split('-')[0];
      if (isLanguageSupported(base)) return base;
    }
  }

  return defaultLanguage;
}

/**
 * Strip a language prefix from a pathname.
 *
 * `/en/daily` → `/daily`, `/zh-hant` → `/`
 */
export function stripLangPrefix(pathname: string): string {
  return pathname.replace(/^\/[a-z]{2}(-[a-z]+)?(\/|$)/, '/');
}
