/**
 * Hook for managing login redirect flows.
 *
 * Provides utilities for:
 * - Navigating to login with a redirect-after-login path
 * - Extracting the redirect path from URL query params on the login page
 * - Handling post-login navigation
 */

import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addLanguageToPath } from './useLocalizedNavigate';

export interface UseLoginRedirectOptions {
  /** Path to the login page (without language prefix). @default '/login' */
  loginPath?: string;
  /** Where to redirect after login if no ?redirect param is present. @default '/' */
  defaultRedirect?: string;
  /** Current language code for localized navigation */
  currentLanguage?: string;
}

export interface UseLoginRedirectResult {
  /** The redirect path from ?redirect= query param, or null if not present */
  redirectPath: string | null;
  /** redirectPath if present, otherwise defaultRedirect */
  effectiveRedirect: string;
  /** Navigate to login page, optionally specifying where to redirect after login */
  navigateToLogin: (redirectAfterLogin?: string) => void;
  /** Navigate to effectiveRedirect (call this on login success) */
  handleLoginSuccess: () => void;
}

/**
 * Hook for login redirect flows.
 *
 * On pages that need login:
 * ```tsx
 * const { navigateToLogin } = useLoginRedirect({ currentLanguage: lang });
 * // navigateToLogin('/profile/subscription') → /en/login?redirect=/profile/subscription
 * ```
 *
 * On the login page:
 * ```tsx
 * const { handleLoginSuccess } = useLoginRedirect({ currentLanguage: lang });
 * // After successful auth:
 * handleLoginSuccess(); // navigates to ?redirect= value or defaultRedirect
 * ```
 */
export function useLoginRedirect(
  options?: UseLoginRedirectOptions
): UseLoginRedirectResult {
  const {
    loginPath = '/login',
    defaultRedirect = '/',
    currentLanguage,
  } = options ?? {};

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectPath = searchParams.get('redirect');

  const effectiveRedirect = useMemo(
    () => redirectPath || defaultRedirect,
    [redirectPath, defaultRedirect]
  );

  const navigateToLogin = useCallback(
    (redirectAfterLogin?: string) => {
      const loginUrl = currentLanguage
        ? addLanguageToPath(loginPath, currentLanguage)
        : loginPath;
      const separator = loginUrl.includes('?') ? '&' : '?';
      const fullUrl = redirectAfterLogin
        ? `${loginUrl}${separator}redirect=${encodeURIComponent(redirectAfterLogin)}`
        : loginUrl;
      navigate(fullUrl);
    },
    [navigate, loginPath, currentLanguage]
  );

  const handleLoginSuccess = useCallback(() => {
    const target = currentLanguage
      ? addLanguageToPath(effectiveRedirect, currentLanguage)
      : effectiveRedirect;
    navigate(target, { replace: true });
  }, [navigate, effectiveRedirect, currentLanguage]);

  return {
    redirectPath,
    effectiveRedirect,
    navigateToLogin,
    handleLoginSuccess,
  };
}
