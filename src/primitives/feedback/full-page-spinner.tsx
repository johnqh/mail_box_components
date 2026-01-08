import React from 'react';
import { cn } from '../../lib/utils';
import { Spinner } from '../../ui/spinner';

export interface FullPageSpinnerProps {
  /** Size of the spinner */
  size?: 'small' | 'default' | 'large' | 'extraLarge';
  /** Color variant */
  variant?: 'default' | 'white' | 'success' | 'warning' | 'error';
  /** Loading text to display (screen reader accessible) */
  loadingText?: string;
  /** Show loading text visually below spinner */
  showText?: boolean;
  /** Background style */
  background?: 'transparent' | 'themed' | 'blur';
  /** Additional className for the container */
  className?: string;
}

/**
 * FullPageSpinner Component
 *
 * A centered, full-page loading spinner for route transitions and page loads.
 *
 * @example
 * ```tsx
 * // Simple usage
 * <FullPageSpinner />
 *
 * // With text
 * <FullPageSpinner showText loadingText="Loading dashboard..." />
 *
 * // With themed background
 * <FullPageSpinner background="themed" size="large" />
 * ```
 */
export const FullPageSpinner: React.FC<FullPageSpinnerProps> = ({
  size = 'large',
  variant = 'default',
  loadingText = 'Loading...',
  showText = false,
  background = 'themed',
  className,
}) => {
  const backgroundStyles = {
    transparent: 'bg-transparent',
    themed: 'bg-white dark:bg-gray-900',
    blur: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',
  };

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center',
        backgroundStyles[background],
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Spinner
        size={size}
        variant={variant}
        ariaLabel={loadingText}
        loadingText={loadingText}
      />
      {showText && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {loadingText}
        </p>
      )}
    </div>
  );
};
