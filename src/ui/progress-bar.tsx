import React from 'react';
import { cn } from '../lib/utils';
import { STRIPE_STYLE } from '../lib/theme';

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

  // Plain fills in the theme's colours. 'purple' keeps its name for
  // compatibility; `accent` is a near-background grey in some themes (Swiss),
  // which drew an invisible bar on the muted track, so it is a lighter primary.
  const variantClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-destructive',
    purple: 'bg-primary/70',
    gray: 'bg-muted-foreground',
  };
  // The inside label, in the foreground that reads on each bar fill.
  const labelColors = {
    primary: 'text-primary-foreground',
    success: 'text-success-foreground',
    warning: 'text-warning-foreground',
    danger: 'text-destructive-foreground',
    purple: 'text-primary-foreground',
    gray: 'text-background',
  };

  // Size configurations
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className='flex items-center gap-3'>
        <div
          className={cn(
            'flex-1 bg-muted rounded-full overflow-hidden',
            sizeClasses[size]
          )}
        >
          <div
            className={cn(
              'rounded-full',
              sizeClasses[size],
              variantClasses[variant],
              animated && 'transition-all duration-300 ease-in-out',
              barClassName
            )}
            data-striped={striped || undefined}
            style={{
              width: `${percentage}%`,
              ...(striped ? STRIPE_STYLE : {}),
            }}
            role='progressbar'
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          >
            {showLabel && labelPosition === 'inside' && size === 'lg' && (
              <span
                className={cn(
                  'flex items-center justify-center h-full text-xs font-medium px-2',
                  labelColors[variant]
                )}
              >
                {displayLabel}
              </span>
            )}
          </div>
        </div>
        {showLabel && labelPosition === 'outside' && (
          <span className='text-sm font-medium text-muted-foreground whitespace-nowrap'>
            {displayLabel}
          </span>
        )}
      </div>
    </div>
  );
};
