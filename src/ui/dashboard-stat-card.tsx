import React from 'react';
import { cn } from '../lib/utils';

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
  const variantStyles = {
    default: 'bg-white dark:bg-gray-900',
    primary: 'bg-blue-50 dark:bg-blue-900/20',
    success: 'bg-green-50 dark:bg-green-900/20',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20',
    danger: 'bg-red-50 dark:bg-red-900/20',
  };

  return (
    <div className={cn('rounded-lg border border-gray-200 dark:border-gray-700 p-6', variantStyles[variant], className)}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        {icon && (
          <div className="text-gray-400 dark:text-gray-600">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span className={cn('text-sm font-medium', change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
                {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {changePeriod}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;
