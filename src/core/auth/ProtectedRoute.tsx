/**
 * Protected route component for authentication-gated content
 */

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export interface ProtectedRouteProps {
  children: ReactNode;
  /**
   * Whether the user is authenticated
   */
  isAuthenticated: boolean;
  /**
   * Whether authentication status is still being determined
   */
  isLoading?: boolean;
  /**
   * Path to redirect to when not authenticated
   * Use ':lang' placeholder for language parameter
   * @default '/:lang' or '/en' if no lang param
   */
  redirectPath?: string;
  /**
   * Custom loading component
   */
  loadingComponent?: ReactNode;
  /**
   * Custom fallback when not authenticated (before redirect)
   */
  fallback?: ReactNode;
}

/**
 * Default loading spinner component
 */
function DefaultLoader(): React.ReactElement {
  return (
    <div className='min-h-screen flex items-center justify-center bg-theme-bg-primary'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600' />
    </div>
  );
}

/**
 * Route wrapper that protects content behind authentication.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { user, loading } = useAuth();
 *
 * <ProtectedRoute isAuthenticated={!!user} isLoading={loading}>
 *   <Dashboard />
 * </ProtectedRoute>
 *
 * // With custom redirect
 * <ProtectedRoute
 *   isAuthenticated={!!user}
 *   isLoading={loading}
 *   redirectPath="/:lang/login"
 * >
 *   <Dashboard />
 * </ProtectedRoute>
 * ```
 */
export function ProtectedRoute({
  children,
  isAuthenticated,
  isLoading = false,
  redirectPath,
  loadingComponent,
  fallback = null,
}: ProtectedRouteProps): React.ReactElement | null {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Build redirect path
      const targetPath = redirectPath
        ? redirectPath.replace(':lang', lang || 'en')
        : `/${lang || 'en'}`;
      navigate(targetPath, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, lang, redirectPath]);

  // Show loading while checking auth
  if (isLoading) {
    return <>{loadingComponent ?? <DefaultLoader />}</>;
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
