import { cn } from '@sudobility/components';

/**
 * PortSchedule Component
 *
 * Maritime component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <PortSchedule className="custom-class" />
 * ```
 */
export interface PortScheduleProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const PortSchedule = ({
  className,
  children,
  disabled,
}: PortScheduleProps) => {
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
      aria-label='PortSchedule'
    >
      {children || 'PortSchedule Component'}
    </div>
  );
};

export default PortSchedule;
