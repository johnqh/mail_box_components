import React from 'react';
import { cn } from '../lib/utils';

export interface ProgressProps {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Progress variant */
  variant?: 'linear' | 'circular';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  color?: 'primary' | 'success' | 'warning' | 'danger';
  /** Show label */
  showLabel?: boolean;
  /** Custom label */
  label?: string;
  /** Indeterminate state (loading) */
  indeterminate?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Progress Component
 *
 * Linear and circular progress indicators.
 * Supports determinate and indeterminate states.
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
 *   variant="circular"
 *   size="lg"
 *   color="success"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Progress indeterminate variant="linear" />
 * ```
 */
export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'linear',
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  indeterminate = false,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Color configurations
  const colorClasses = {
    primary: 'bg-blue-600 dark:bg-blue-500',
    success: 'bg-green-600 dark:bg-green-500',
    warning: 'bg-yellow-600 dark:bg-yellow-500',
    danger: 'bg-red-600 dark:bg-red-500',
  };

  if (variant === 'linear') {
    // Size configurations for linear
    const linearSizeClasses = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    return (
      <div className={cn('w-full', className)}>
        <div
          className={cn(
            'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
            linearSizeClasses[size]
          )}
        >
          {indeterminate ? (
            <div
              className={cn(
                'h-full rounded-full animate-pulse',
                colorClasses[color]
              )}
              style={{ width: '100%' }}
            />
          ) : (
            <div
              className={cn(
                'h-full rounded-full transition-all duration-300',
                colorClasses[color]
              )}
              style={{ width: percentage + '%' }}
            />
          )}
        </div>
        {showLabel && (
          <div className='mt-1 text-xs text-gray-600 dark:text-gray-400 text-right'>
            {label || percentage.toFixed(0) + '%'}
          </div>
        )}
      </div>
    );
  }

  // Circular variant
  // Size configurations for circular
  const circularSizes = {
    sm: { size: 48, stroke: 4 },
    md: { size: 64, stroke: 6 },
    lg: { size: 96, stroke: 8 },
  };

  const { size: circleSize, stroke: strokeWidth } = circularSizes[size];
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = indeterminate
    ? 0
    : circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <div
        className='relative'
        style={{ width: circleSize, height: circleSize }}
      >
        <svg
          className='transform -rotate-90'
          width={circleSize}
          height={circleSize}
        >
          {/* Background circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke='currentColor'
            strokeWidth={strokeWidth}
            fill='none'
            className='text-gray-200 dark:text-gray-700'
          />
          {/* Progress circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke='currentColor'
            strokeWidth={strokeWidth}
            fill='none'
            strokeLinecap='round'
            className={cn(
              'transition-all duration-300',
              color === 'primary' && 'text-blue-600 dark:text-blue-500',
              color === 'success' && 'text-green-600 dark:text-green-500',
              color === 'warning' && 'text-yellow-600 dark:text-yellow-500',
              color === 'danger' && 'text-red-600 dark:text-red-500',
              indeterminate && 'animate-spin'
            )}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        {showLabel && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='text-sm font-semibold text-gray-900 dark:text-white'>
              {label || percentage.toFixed(0) + '%'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
