import { cn } from '../lib/utils';

/**
 * FlightTracker Component
 *
 * Aviation component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <FlightTracker className="custom-class" />
 * ```
 */
export interface FlightTrackerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const FlightTracker = ({
  className,
  children,
  disabled,
}: FlightTrackerProps) => {
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
      aria-label='FlightTracker'
    >
      {children || 'FlightTracker Component'}
    </div>
  );
};

export default FlightTracker;
