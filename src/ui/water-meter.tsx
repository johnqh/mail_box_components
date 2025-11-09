import { cn } from '../lib/utils';

/**
 * WaterMeter Component
 *
 * Utilities component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <WaterMeter className="custom-class" />
 * ```
 */
export interface WaterMeterProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const WaterMeter = ({
  className,
  children,
  disabled,
}: WaterMeterProps) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-colors',
        'bg-white dark:bg-gray-900',
        'border-gray-200 dark:border-gray-700',
        'text-gray-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      role='region'
      aria-label='WaterMeter'
    >
      {children || 'WaterMeter Component'}
    </div>
  );
};

export default WaterMeter;
