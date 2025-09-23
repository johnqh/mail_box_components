/**
 * Enhanced Error Boundary specifically designed for lazy-loaded components
 * with retry mechanisms and performance monitoring
 */

import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  maxRetries?: number;
  retryDelay?: number;
  componentName?: string;
  showRetryButton?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
  isRetrying: boolean;
  lastErrorTime: number;
}

export class LazyErrorBoundary extends Component<Props, State> {
  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      isRetrying: false,
      lastErrorTime: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      lastErrorTime: Date.now(),
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError, componentName } = this.props;

    this.setState({
      error,
      errorInfo,
    });

    // Log error with context
    console.error(
      `LazyErrorBoundary caught an error in ${componentName || 'Unknown Component'}:`,
      error,
      errorInfo
    );

    // Call custom error handler
    onError?.(error, errorInfo);

    // Send error to monitoring service (if available)
    this.sendErrorToMonitoring(error, errorInfo);
  }

  private sendErrorToMonitoring = (error: Error, errorInfo: ErrorInfo) => {
    try {
      // Integration with error monitoring services like Sentry
      if (
        typeof window !== 'undefined' &&
        (
          window as {
            Sentry?: {
              captureException: (
                error: Error,
                options?: Record<string, unknown>
              ) => void;
            };
          }
        ).Sentry
      ) {
        (
          window as {
            Sentry?: {
              captureException: (
                error: Error,
                options?: Record<string, unknown>
              ) => void;
            };
          }
        ).Sentry?.captureException(error, {
          contexts: {
            react: {
              componentStack: errorInfo.componentStack,
            },
          },
          tags: {
            errorBoundary: true,
            componentName: this.props.componentName || 'unknown',
            lazyLoading: true,
          },
        });
      }

      // Send to analytics
      if (
        typeof window !== 'undefined' &&
        (
          window as {
            gtag?: (
              event: string,
              action: string,
              options?: Record<string, unknown>
            ) => void;
          }
        ).gtag
      ) {
        (
          window as {
            gtag?: (
              event: string,
              action: string,
              options?: Record<string, unknown>
            ) => void;
          }
        ).gtag?.('event', 'exception', {
          description: error.message,
          fatal: false,
          custom_map: {
            component: this.props.componentName || 'unknown',
          },
        });
      }
    } catch (monitoringError) {
      console.warn('Failed to send error to monitoring:', monitoringError);
    }
  };

  private handleRetry = () => {
    const { maxRetries = 3, retryDelay = 1000 } = this.props;
    const { retryCount } = this.state;

    if (retryCount >= maxRetries) {
      console.warn(
        `Max retries (${maxRetries}) exceeded for ${this.props.componentName}`
      );
      return;
    }

    this.setState({
      isRetrying: true,
    });

    // Clear any existing retry timer
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
    }

    // Exponential backoff for retries
    const delay = retryDelay * Math.pow(2, retryCount);

    this.retryTimer = setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: retryCount + 1,
        isRetrying: false,
      });
    }, delay);
  };

  private handleReload = () => {
    window.location.reload();
  };

  componentWillUnmount() {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
    }
  }

  render() {
    const {
      children,
      fallback,
      componentName,
      showRetryButton = true,
      maxRetries = 3,
    } = this.props;
    const { hasError, error, isRetrying, retryCount } = this.state;

    if (hasError && error) {
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <div className='lazy-error-boundary error-boundary-container'>
          <div className='error-content'>
            <div className='error-icon'>⚠️</div>
            <h3 className='error-title'>
              Something went wrong loading {componentName || 'this component'}
            </h3>

            <div className='error-details'>
              <p className='error-message'>{error.message}</p>

              {process.env.NODE_ENV === 'development' && (
                <details className='error-stack'>
                  <summary>Error Details (Development)</summary>
                  <pre>{error.stack}</pre>
                </details>
              )}
            </div>

            <div className='error-actions'>
              {showRetryButton && retryCount < maxRetries && (
                <button
                  onClick={this.handleRetry}
                  disabled={isRetrying}
                  className='retry-button'
                >
                  {isRetrying
                    ? 'Retrying...'
                    : `Retry (${retryCount}/${maxRetries})`}
                </button>
              )}

              {retryCount >= maxRetries && (
                <button onClick={this.handleReload} className='reload-button'>
                  Reload Page
                </button>
              )}
            </div>

            <div className='error-help'>
              <p>This might be a temporary issue. Try refreshing the page.</p>
              {navigator.onLine === false && (
                <p className='offline-notice'>
                  You appear to be offline. Check your connection and try again.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

/**
 * HOC for wrapping lazy components with error boundary
 */
export function withLazyErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <LazyErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </LazyErrorBoundary>
  );

  WrappedComponent.displayName = `withLazyErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

/**
 * Specialized error boundary for network-related lazy loading errors
 */
export class NetworkErrorBoundary extends LazyErrorBoundary {
  static getDerivedStateFromError(error: Error): Partial<State> {
    // Check if it's a network-related error
    const isNetworkError =
      error.message.includes('Loading chunk') ||
      error.message.includes('Loading CSS chunk') ||
      error.message.includes('ChunkLoadError') ||
      error.name === 'ChunkLoadError';

    if (isNetworkError) {
      return {
        hasError: true,
        error: new Error(
          'Network error while loading component. Please check your connection and try again.'
        ),
        lastErrorTime: Date.now(),
      };
    }

    return super.getDerivedStateFromError(error);
  }
}

/**
 * Hook for programmatic error boundary usage
 */
export function useErrorRecovery() {
  const [errorRecoveryCount, setErrorRecoveryCount] = React.useState(0);

  const triggerErrorRecovery = React.useCallback(() => {
    setErrorRecoveryCount(count => count + 1);
  }, []);

  return {
    errorRecoveryCount,
    triggerErrorRecovery,
  };
}

/**
 * Global error boundary for the entire lazy loading system
 */
export function GlobalLazyErrorBoundary({ children }: { children: ReactNode }) {
  const handleGlobalError = (error: Error, errorInfo: ErrorInfo) => {
    console.error('Global lazy loading error:', error, errorInfo);

    // Send critical error to monitoring
    if (
      typeof window !== 'undefined' &&
      (
        window as {
          Sentry?: {
            captureException: (
              error: Error,
              options?: Record<string, unknown>
            ) => void;
          };
        }
      ).Sentry
    ) {
      (
        window as {
          Sentry?: {
            captureException: (
              error: Error,
              options?: Record<string, unknown>
            ) => void;
          };
        }
      ).Sentry?.captureException(error, {
        level: 'error',
        tags: {
          globalErrorBoundary: true,
          lazyLoading: true,
        },
      });
    }
  };

  return (
    <LazyErrorBoundary
      onError={handleGlobalError}
      componentName='Application'
      maxRetries={1}
      showRetryButton={true}
      fallback={
        <div className='global-error-fallback'>
          <h1>Application Error</h1>
          <p>
            Something went wrong with the application. Please refresh the page.
          </p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      }
    >
      {children}
    </LazyErrorBoundary>
  );
}

export default LazyErrorBoundary;
