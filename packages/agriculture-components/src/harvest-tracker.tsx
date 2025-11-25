import { cn } from '@sudobility/components';

/**
 * HarvestTracker Component
 *
 * Agriculture component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <HarvestTracker className="custom-class" />
 * ```
 */
export interface HarvestTrackerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const HarvestTracker = ({
  className,
  children,
  disabled,
}: HarvestTrackerProps) => {
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
      aria-label='HarvestTracker'
    >
      {children || 'HarvestTracker Component'}
    </div>
  );
};
