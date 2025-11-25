import React from 'react';
import { cn } from '@sudobility/components';

export interface GaugeProps {
  /** Current value (0-100) */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Gauge size */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Show value text */
  showValue?: boolean;
  /** Label */
  label?: string;
  /** Color variant */
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  /** Additional className */
  className?: string;
}

/**
 * Gauge Component
 *
 * Circular gauge/speedometer indicator.
 * Displays progress in a semi-circular arc.
 *
 * @example
 * ```tsx
 * <Gauge value={75} label="CPU Usage" variant="success" />
 * ```
 */
export const Gauge: React.FC<GaugeProps> = ({
  value,
  min = 0,
  max = 100,
  size = 120,
  strokeWidth = 10,
  showValue = true,
  label,
  variant = 'primary',
  className,
}) => {
  const normalizedValue = Math.min(max, Math.max(min, value));
  const percentage = ((normalizedValue - min) / (max - min)) * 100;

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    primary: 'stroke-blue-600 dark:stroke-blue-500',
    success: 'stroke-green-600 dark:stroke-green-500',
    warning: 'stroke-yellow-600 dark:stroke-yellow-500',
    danger: 'stroke-red-600 dark:stroke-red-500',
  };

  return (
    <div className={cn('inline-flex flex-col items-center gap-2', className)}>
      <svg width={size} height={size * 0.65} className='transform rotate-180'>
        <path
          d={`M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`}
          fill='none'
          className='stroke-gray-200 dark:stroke-gray-700'
          strokeWidth={strokeWidth}
          strokeLinecap='round'
        />
        <path
          d={`M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`}
          fill='none'
          className={cn(colors[variant], 'transition-all duration-500')}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
        />
      </svg>
      {showValue && (
        <div className='text-center -mt-8'>
          <div className='text-2xl font-bold text-gray-900 dark:text-white'>
            {Math.round(normalizedValue)}
          </div>
          {label && (
            <div className='text-xs text-gray-600 dark:text-gray-400'>
              {label}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
