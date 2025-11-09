import React from 'react';
import { cn } from '../lib/utils';

export interface ProgressCircleProps {
  /** Progress value (0-100) */
  value: number;
  /** Circle size in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Show percentage text */
  showValue?: boolean;
  /** Custom label */
  label?: string;
  /** Color variant */
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  /** Custom color */
  color?: string;
  /** Background track color */
  trackColor?: string;
  /** Additional className */
  className?: string;
}

/**
 * ProgressCircle Component
 *
 * Circular progress indicator with customizable size and colors.
 * Displays percentage or custom label in the center.
 *
 * @example
 * ```tsx
 * <ProgressCircle
 *   value={75}
 *   size={120}
 *   showValue
 *   variant="success"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ProgressCircle
 *   value={uploadProgress}
 *   label="Uploading..."
 *   color="#10b981"
 * />
 * ```
 */
export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  size = 100,
  strokeWidth = 8,
  showValue = true,
  label,
  variant = 'primary',
  color,
  trackColor,
  className,
}) => {
  // Clamp value between 0 and 100
  const progress = Math.min(100, Math.max(0, value));

  // Calculate circle properties
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Color variants
  const variantColors = {
    primary: 'stroke-blue-600 dark:stroke-blue-500',
    success: 'stroke-green-600 dark:stroke-green-500',
    warning: 'stroke-yellow-600 dark:stroke-yellow-500',
    danger: 'stroke-red-600 dark:stroke-red-500',
  };

  const trackColorClass = trackColor || 'stroke-gray-200 dark:stroke-gray-700';

  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <div className='relative' style={{ width: size, height: size }}>
        {/* SVG Circle */}
        <svg width={size} height={size} className='transform -rotate-90'>
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            className={trackColorClass}
            strokeWidth={strokeWidth}
            fill='none'
          />

          {/* Progress arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            className={cn(
              color ? '' : variantColors[variant],
              'transition-all duration-300 ease-in-out'
            )}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap='round'
            fill='none'
          />
        </svg>

        {/* Center text */}
        {(showValue || label) && (
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            {showValue && !label && (
              <span
                className='text-gray-900 dark:text-white font-bold'
                style={{ fontSize: size * 0.2 }}
              >
                {Math.round(progress)}%
              </span>
            )}
            {label && (
              <span
                className='text-gray-900 dark:text-white font-medium text-center px-2'
                style={{ fontSize: size * 0.15 }}
              >
                {label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressCircle;
