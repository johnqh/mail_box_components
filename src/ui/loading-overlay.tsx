import React from 'react';
import { cn } from '../lib/utils';
import { Spinner } from './spinner';
import { textVariants } from '@sudobility/design';

export interface LoadingOverlayProps {
  /** Whether the overlay is visible */
  isLoading: boolean;
  /** Loading message */
  message?: string;
  /** Overlay mode */
  mode?: 'fullscreen' | 'container';
  /** Blur background */
  blur?: boolean;
  /** Spinner size */
  spinnerSize?: 'small' | 'default' | 'large' | 'extraLarge';
  /** Additional className */
  className?: string;
}

/**
 * LoadingOverlay Component
 *
 * Full-screen or container loading overlay with spinner and optional message.
 * Useful for async operations, page loads, and data fetching.
 *
 * @example
 * ```tsx
 * <LoadingOverlay
 *   isLoading={isSubmitting}
 *   message="Saving changes..."
 * />
 * ```
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   <LoadingOverlay
 *     isLoading={isLoading}
 *     mode="container"
 *     blur
 *   />
 *   <YourContent />
 * </div>
 * ```
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message,
  mode = 'fullscreen',
  blur = false,
  spinnerSize = 'large',
  className,
}) => {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        mode === 'fullscreen' ? 'fixed' : 'absolute',
        'inset-0 z-50',
        'flex flex-col items-center justify-center',
        'bg-white/80 dark:bg-gray-900/80',
        blur && 'backdrop-blur-sm',
        className
      )}
      role='alert'
      aria-live='polite'
      aria-busy='true'
    >
      <Spinner size={spinnerSize} />
      {message && (
        <p
          className={cn(
            textVariants.body.md(),
            'text-gray-700 dark:text-gray-300 mt-4'
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
};
