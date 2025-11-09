import React from 'react';
import { cn } from '../lib/utils';

export interface SliderProps {
  /** Current value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Show value label */
  showValue?: boolean;
  /** Value label formatter */
  formatValue?: (value: number) => string;
  /** Show min/max labels */
  showMinMax?: boolean;
  /** Min label */
  minLabel?: string;
  /** Max label */
  maxLabel?: string;
  /** Color variant */
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

/**
 * Slider Component
 *
 * Range input slider with customizable styling, labels, and value display.
 * Supports different colors, sizes, and formatting options.
 *
 * @example
 * ```tsx
 * <Slider
 *   value={volume}
 *   onChange={setVolume}
 *   min={0}
 *   max={100}
 *   showValue
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Slider
 *   value={spamLevel}
 *   onChange={setSpamLevel}
 *   min={0}
 *   max={100}
 *   variant="warning"
 *   showValue
 *   formatValue={v => `${v}%`}
 *   showMinMax
 *   minLabel="None"
 *   maxLabel="Strict"
 * />
 * ```
 */
export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = false,
  formatValue = (v) => String(v),
  showMinMax = false,
  minLabel,
  maxLabel,
  variant = 'primary',
  size = 'md',
  className,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  // Color variant configurations
  const variantClasses = {
    primary: 'accent-blue-600 dark:accent-blue-500',
    success: 'accent-green-600 dark:accent-green-500',
    warning: 'accent-yellow-600 dark:accent-yellow-500',
    danger: 'accent-red-600 dark:accent-red-500',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('w-full', className)}>
      {/* Value display */}
      {showValue && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {formatValue(value)}
          </span>
          {showMinMax && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {minLabel || min} - {maxLabel || max}
            </span>
          )}
        </div>
      )}

      {/* Slider container */}
      <div className="relative">
        {/* Track background */}
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-gray-200 dark:bg-gray-700',
            sizeClasses[size]
          )}
        />

        {/* Filled track */}
        <div
          className={cn(
            'absolute left-0 rounded-full transition-all',
            'bg-current',
            variantClasses[variant],
            sizeClasses[size]
          )}
          style={{ width: `${percentage}%` }}
        />

        {/* Range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'relative w-full appearance-none bg-transparent cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            'rounded-lg',
            sizeClasses[size],
            variantClasses[variant],
            disabled && 'opacity-50 cursor-not-allowed',
            // Thumb styling
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:w-4',
            '[&::-webkit-slider-thumb]:h-4',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:bg-white',
            '[&::-webkit-slider-thumb]:border-2',
            '[&::-webkit-slider-thumb]:border-current',
            '[&::-webkit-slider-thumb]:shadow-md',
            '[&::-webkit-slider-thumb]:transition-transform',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            '[&::-moz-range-thumb]:w-4',
            '[&::-moz-range-thumb]:h-4',
            '[&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:bg-white',
            '[&::-moz-range-thumb]:border-2',
            '[&::-moz-range-thumb]:border-current',
            '[&::-moz-range-thumb]:shadow-md',
            '[&::-moz-range-thumb]:transition-transform',
            '[&::-moz-range-thumb]:hover:scale-110'
          )}
        />
      </div>

      {/* Min/Max labels below */}
      {showMinMax && !showValue && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {minLabel || min}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {maxLabel || max}
          </span>
        </div>
      )}
    </div>
  );
};

export default Slider;
