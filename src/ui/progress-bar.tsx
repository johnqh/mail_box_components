import React from 'react';
import { cn } from '../lib/utils';

export interface ProgressBarProps {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Color variant */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'gray';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show percentage label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: 'inside' | 'outside' | 'none';
  /** Custom label text (overrides percentage) */
  label?: string;
  /** Additional className for the container */
  className?: string;
  /** Additional className for the bar */
  barClassName?: string;
  /** Animated transition */
  animated?: boolean;
  /** Striped pattern */
  striped?: boolean;
}

/**
 * ProgressBar Component
 *
 * A visual progress indicator showing completion percentage.
 * Commonly used for loading states, budget tracking, or task completion.
 *
 * @example
 * ```tsx
 * <ProgressBar value={65} variant="primary" showLabel />
 * <ProgressBar value={78} variant="success" size="lg" />
 * ```
 *
 * @example
 * ```tsx
 * // With custom label
 * <ProgressBar
 *   value={12450}
 *   max={20000}
 *   label="$12,450"
 *   variant="primary"
 *   labelPosition="outside"
 * />
 * ```
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  labelPosition = 'outside',
  label,
  className,
  barClassName,
  animated = true,
  striped = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const displayLabel = label || `${Math.round(percentage)}%`;

  // Color variant configurations
  const variantClasses = {
    primary: 'bg-blue-600 dark:bg-blue-500',
    success: 'bg-green-600 dark:bg-green-500',
    warning: 'bg-yellow-600 dark:bg-yellow-500',
    danger: 'bg-red-600 dark:bg-red-500',
    purple: 'bg-purple-600 dark:bg-purple-500',
    gray: 'bg-gray-600 dark:bg-gray-500',
  };

  // Size configurations
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden',
            sizeClasses[size]
          )}
        >
          <div
            className={cn(
              'rounded-full',
              sizeClasses[size],
              variantClasses[variant],
              animated && 'transition-all duration-300 ease-in-out',
              striped &&
                'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_100%]',
              barClassName
            )}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          >
            {showLabel && labelPosition === 'inside' && size === 'lg' && (
              <span className="flex items-center justify-center h-full text-xs font-medium text-white px-2">
                {displayLabel}
              </span>
            )}
          </div>
        </div>
        {showLabel && labelPosition === 'outside' && (
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {displayLabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
