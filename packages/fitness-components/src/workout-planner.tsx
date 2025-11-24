import { cn } from '@sudobility/components';

/**
 * WorkoutPlanner Component
 *
 * Sports component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <WorkoutPlanner className="custom-class" />
 * ```
 */
export interface WorkoutPlannerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const WorkoutPlanner = ({
  className,
  children,
  disabled,
}: WorkoutPlannerProps) => {
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
      aria-label='WorkoutPlanner'
    >
      {children || 'WorkoutPlanner Component'}
    </div>
  );
};

export default WorkoutPlanner;
