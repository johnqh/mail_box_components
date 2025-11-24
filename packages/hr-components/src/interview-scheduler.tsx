import { cn } from './lib/utils';

/**
 * InterviewScheduler Component
 *
 * HR & recruiting component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <InterviewScheduler className="custom-class" />
 * ```
 */
export interface InterviewSchedulerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const InterviewScheduler = ({
  className,
  children,
  disabled,
}: InterviewSchedulerProps) => {
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
      aria-label='InterviewScheduler'
    >
      {children || 'InterviewScheduler Component'}
    </div>
  );
};

export default InterviewScheduler;
