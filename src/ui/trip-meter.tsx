import { cn } from '../lib/utils';

/**
 * TripMeter Component
 *
 * Automotive component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <TripMeter className="custom-class" />
 * ```
 */
export interface TripMeterProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const TripMeter = ({
  className,
  children,
  disabled,
}: TripMeterProps) => {
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
      aria-label='TripMeter'
    >
      {children || 'TripMeter Component'}
    </div>
  );
};

export default TripMeter;
