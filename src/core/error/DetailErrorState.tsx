/**
 * Error state component for displaying errors with retry functionality
 */

import type { ReactNode } from 'react';

export interface DetailErrorStateProps {
  /**
   * Error title
   */
  title?: string;
  /**
   * Error message/description
   */
  message?: string;
  /**
   * Retry callback
   */
  onRetry?: () => void;
  /**
   * Whether a retry is in progress
   */
  isRetrying?: boolean;
  /**
   * Custom retry button text
   * @default 'Retry'
   */
  retryText?: string;
  /**
   * Custom loading text shown during retry
   * @default 'Loading...'
   */
  loadingText?: string;
  /**
   * Custom icon to display (defaults to warning triangle)
   */
  icon?: ReactNode;
  /**
   * Additional className for the container
   */
  className?: string;
}

/**
 * Default warning icon
 */
function WarningIcon(): React.ReactElement {
  return (
    <svg
      className='w-8 h-8 text-red-600 dark:text-red-400'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
      />
    </svg>
  );
}

/**
 * Refresh icon for retry button
 */
function RefreshIcon({
  spinning = false,
}: {
  spinning?: boolean;
}): React.ReactElement {
  return (
    <svg
      className={`w-4 h-4 ${spinning ? 'animate-spin' : ''}`}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
      />
    </svg>
  );
}

/**
 * Error state display component with optional retry functionality.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DetailErrorState
 *   title="Something went wrong"
 *   message="Unable to load data from the server."
 *   onRetry={() => refetch()}
 *   isRetrying={isRefetching}
 * />
 *
 * // With translations
 * const { t } = useTranslation();
 * <DetailErrorState
 *   title={t('errors.serverDown.title')}
 *   message={t('errors.serverDown.message')}
 *   retryText={t('common.retry')}
 *   loadingText={t('common.loading')}
 *   onRetry={handleRetry}
 * />
 * ```
 */
export function DetailErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  isRetrying = false,
  retryText = 'Retry',
  loadingText = 'Loading...',
  icon,
  className = '',
}: DetailErrorStateProps): React.ReactElement {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
    >
      <div className='flex flex-col items-center max-w-md text-center'>
        <div className='w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4'>
          {icon ?? <WarningIcon />}
        </div>

        <h3 className='text-lg font-semibold text-theme-text-primary mb-2'>
          {title}
        </h3>

        <p className='text-sm text-theme-text-secondary mb-6'>{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className='inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50'
          >
            <RefreshIcon spinning={isRetrying} />
            {isRetrying ? loadingText : retryText}
          </button>
        )}
      </div>
    </div>
  );
}

export default DetailErrorState;
