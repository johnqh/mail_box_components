/**
 * i18n routing components and utilities
 *
 * Components and hooks for language-aware routing in React applications.
 *
 * @example
 * ```tsx
 * import {
 *   LocalizedLink,
 *   LanguageValidator,
 *   useLocalizedNavigate,
 * } from '@sudobility/components/core/i18n-routing';
 *
 * // Define your supported languages
 * const LANGUAGES = ['en', 'es', 'fr', 'de'] as const;
 * const isSupported = (lang: string) => LANGUAGES.includes(lang as any);
 *
 * // Use in router
 * const router = createBrowserRouter([
 *   {
 *     path: '/:lang',
 *     element: <LanguageValidator isLanguageSupported={isSupported} />,
 *     children: [
 *       { path: '', element: <Home /> },
 *     ],
 *   },
 * ]);
 *
 * // Use LocalizedLink
 * <LocalizedLink to="/about" isLanguageSupported={isSupported}>About</LocalizedLink>
 *
 * // Use navigation hook
 * const { navigate, switchLanguage } = useLocalizedNavigate({ isLanguageSupported: isSupported });
 * ```
 */

export { LocalizedLink } from './LocalizedLink';
export type { LocalizedLinkProps } from './LocalizedLink';

export { LanguageValidator } from './LanguageValidator';
export type { LanguageValidatorProps } from './LanguageValidator';

// Re-export navigation hook and utilities from hooks
export {
  useLocalizedNavigate,
  addLanguageToPath,
  removeLanguageFromPath,
} from '../../hooks/useLocalizedNavigate';
export type {
  UseLocalizedNavigateOptions,
  UseLocalizedNavigateReturn,
} from '../../hooks/useLocalizedNavigate';
