import React from 'react';
import { cn } from '../lib/utils';

export interface ProgressProps {
  /** Progress value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'danger';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show label */
  showLabel?: boolean;
  /** Custom label */
  label?: string;
  /** Indeterminate state (loading) */
  indeterminate?: boolean;
  /** Striped style */
  striped?: boolean;
  /** Animate stripes */
  animated?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Progress Component
 *
 * Linear progress indicator with support for determinate and indeterminate states.
 * Supports color variants, sizes, striped styles, and animations.
 *
 * @example
 * ```tsx
 * <Progress value={75} showLabel />
 * ```
 *
 * @example
 * ```tsx
 * <Progress
 *   value={progress}
 *   variant="success"
 *   size="lg"
 *   striped
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Progress indeterminate />
 * ```
 */
export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  indeterminate = false,
  striped = false,
  animated = false,
  className,
}) => {
  // Clamp value between 0 and 100
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Color configurations
  const colorClasses = {
    default: 'bg-blue-600 dark:bg-blue-500',
    success: 'bg-green-600 dark:bg-green-500',
    warning: 'bg-yellow-600 dark:bg-yellow-500',
    danger: 'bg-red-600 dark:bg-red-500',
  };

  // Size configurations
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
          sizeClasses[size]
        )}
        role='progressbar'
        aria-valuenow={indeterminate ? undefined : percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {indeterminate ? (
          <div
            className={cn(
              'h-full rounded-full animate-pulse',
              colorClasses[variant]
            )}
            style={{ width: '100%' }}
          />
        ) : (
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300',
              colorClasses[variant],
              striped && 'bg-stripe',
              striped && animated && 'animate-stripe'
            )}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
      {(showLabel || label) && (
        <div className='mt-1 text-xs text-gray-600 dark:text-gray-400 text-right'>
          {label || `${Math.round(percentage)}%`}
        </div>
      )}
    </div>
  );
};
