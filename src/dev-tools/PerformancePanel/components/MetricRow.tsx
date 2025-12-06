import React from 'react';
import { cn } from '../../../lib/utils';

export type MetricRating =
  | 'good'
  | 'needs-improvement'
  | 'poor'
  | 'unknown'
  | 'neutral';

export interface MetricRowProps {
  /** Label for the metric */
  label: string;
  /** Value to display */
  value: string | number;
  /** Unit suffix (e.g., 'ms', 'KB') */
  unit?: string;
  /** Rating for color coding */
  rating?: MetricRating;
  /** Additional description */
  description?: string;
  /** Custom className */
  className?: string;
}

const ratingColors: Record<MetricRating, string> = {
  good: 'text-green-500',
  'needs-improvement': 'text-yellow-500',
  poor: 'text-red-500',
  unknown: 'text-gray-400',
  neutral: 'text-gray-300',
};

/**
 * MetricRow - Display a single performance metric with optional rating
 */
export const MetricRow: React.FC<MetricRowProps> = ({
  label,
  value,
  unit = '',
  rating = 'neutral',
  description,
  className,
}) => {
  const formattedValue =
    typeof value === 'number'
      ? Number.isInteger(value)
        ? value.toString()
        : value.toFixed(value < 1 ? 3 : 0)
      : value;

  return (
    <div className={cn('flex justify-between items-center', className)}>
      <div className='flex flex-col'>
        <span className='text-gray-300'>{label}</span>
        {description && (
          <span className='text-[10px] text-gray-500'>{description}</span>
        )}
      </div>
      <span className={cn('font-medium', ratingColors[rating])}>
        {formattedValue}
        {unit}
      </span>
    </div>
  );
};

/**
 * Format a metric value with appropriate precision
 */
export const formatMetricValue = (
  value: number | undefined,
  unit: string = 'ms',
  decimals: number = 0
): string => {
  if (value === undefined) return 'N/A';
  return `${value.toFixed(decimals)}${unit}`;
};
