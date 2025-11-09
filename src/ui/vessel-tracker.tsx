import { cn } from '../lib/utils';

/**
 * VesselTracker Component
 *
 * Maritime component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <VesselTracker className="custom-class" />
 * ```
 */
export interface VesselTrackerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const VesselTracker = ({
  className,
  children,
  disabled,
}: VesselTrackerProps) => {
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
      aria-label='VesselTracker'
    >
      {children || 'VesselTracker Component'}
    </div>
  );
};

export default VesselTracker;
