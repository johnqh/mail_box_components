import { cn } from '../lib/utils';

/**
 * DefectTracker Component
 *
 * Manufacturing component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <DefectTracker className="custom-class" />
 * ```
 */
export interface DefectTrackerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const DefectTracker = ({
  className,
  children,
  disabled,
}: DefectTrackerProps) => {
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
      aria-label='DefectTracker'
    >
      {children || 'DefectTracker Component'}
    </div>
  );
};

export default DefectTracker;
