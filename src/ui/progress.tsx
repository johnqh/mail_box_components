/**
 * @deprecated Use ProgressBar instead. This component will be removed in v4.0.
 *
 * Migration guide:
 * - `<Progress value={75} />` → `<ProgressBar value={75} />`
 * - `<Progress indeterminate />` → Not supported in ProgressBar yet
 * - `<Progress striped animated />` → `<ProgressBar striped animated />`
 *
 * ProgressBar has additional features:
 * - labelPosition: 'inside' | 'outside' | 'none'
 * - More color variants: 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'gray'
 */

import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import { ui } from '@sudobility/design';
import { animateStripes, STRIPE_STYLE } from '../lib/theme';

/** @deprecated Use ProgressBarProps instead */
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
 * @deprecated Use ProgressBar instead. This component will be removed in v4.0.
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

  // Plain fills in the theme's colours. (The button colours this used to
  // borrow carry hover and border states a bar has no use for.)
  const colorClasses = {
    default: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-destructive',
  };

  const fillRef = useRef<HTMLDivElement>(null);
  const animateFill = striped && animated && !indeterminate;
  useEffect(
    () => (animateFill ? animateStripes(fillRef.current) : undefined),
    [animateFill]
  );

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
          'w-full rounded-full overflow-hidden',
          ui.background.muted,
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
            ref={fillRef}
            className={cn(
              'h-full rounded-full transition-all duration-300',
              colorClasses[variant]
            )}
            data-striped={striped || undefined}
            data-animated={animateFill || undefined}
            style={{
              width: `${percentage}%`,
              ...(striped ? STRIPE_STYLE : {}),
            }}
          />
        )}
      </div>
      {(showLabel || label) && (
        <div className={cn('mt-1 text-xs text-right', ui.text.bodySmall)}>
          {label || `${Math.round(percentage)}%`}
        </div>
      )}
    </div>
  );
};
