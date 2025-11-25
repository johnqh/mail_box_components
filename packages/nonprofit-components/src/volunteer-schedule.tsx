import { cn } from '@sudobility/components';

/**
 * VolunteerSchedule Component
 *
 * Non-profit component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <VolunteerSchedule className="custom-class" />
 * ```
 */
export interface VolunteerScheduleProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const VolunteerSchedule = ({
  className,
  children,
  disabled,
}: VolunteerScheduleProps) => {
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
      aria-label='VolunteerSchedule'
    >
      {children || 'VolunteerSchedule Component'}
    </div>
  );
};
