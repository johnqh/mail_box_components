import React from 'react';
import { cn } from '../lib/utils';
import {
  colors,
  textVariants,
  getStatusIndicatorColor,
} from '@sudobility/design';

export interface DashboardStatCardProps {
  /** Stat title */
  title: string;
  /** Stat value */
  value: string | number;
  /** Change percentage */
  change?: number;
  /** Change period */
  changePeriod?: string;
  /** Icon */
  icon?: React.ReactNode;
  /** Color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /** Additional className */
  className?: string;
}

/**
 * DashboardStatCard Component
 *
 * Statistics display card for dashboards.
 * Shows value, change indicator, and optional icon.
 *
 * @example
 * ```tsx
 * <DashboardStatCard
 *   title="Total Revenue"
 *   value="$45,231"
 *   change={12.5}
 *   changePeriod="vs last month"
 *   variant="success"
 * />
 * ```
 */
export const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  title,
  value,
  change,
  changePeriod = 'vs last period',
  icon,
  variant = 'default',
  className,
}) => {
  const cardColors = colors.component.card;
  const variantStyles = {
    default: `${cardColors.default.base} ${cardColors.default.dark}`,
    primary: `${cardColors.default.base} ${cardColors.default.dark}`,
    success: `${cardColors.success.base} ${cardColors.success.dark}`,
    warning: `${cardColors.warning.base} ${cardColors.warning.dark}`,
    danger: `${cardColors.error.base} ${cardColors.error.dark}`,
  };

  return (
    <div
      className={cn('rounded-lg border p-6', variantStyles[variant], className)}
    >
      <div className='flex items-start justify-between mb-2'>
        <h3 className={cn('text-sm', textVariants.label.helper())}>{title}</h3>
        {icon && <div className='text-gray-400 dark:text-gray-600'>{icon}</div>}
      </div>

      <div className='flex items-end justify-between'>
        <div>
          <p className='text-3xl font-bold text-gray-900 dark:text-white'>
            {value}
          </p>
          {change !== undefined && (
            <div className='flex items-center gap-1 mt-2'>
              <span
                className={cn(
                  'text-sm font-medium',
                  change >= 0
                    ? getStatusIndicatorColor('success').replace('bg-', 'text-')
                    : getStatusIndicatorColor('error').replace('bg-', 'text-'),
                  change >= 0 ? 'dark:text-green-400' : 'dark:text-red-400'
                )}
              >
                {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
              </span>
              <span className={cn('text-xs', textVariants.label.helper())}>
                {changePeriod}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
