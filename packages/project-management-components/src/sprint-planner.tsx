import { cn } from '@sudobility/components';

/**
 * SprintPlanner Component
 *
 * Project management component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <SprintPlanner className="custom-class" />
 * ```
 */
export interface SprintPlannerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const SprintPlanner = ({
  className,
  children,
  disabled,
}: SprintPlannerProps) => {
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
      aria-label='SprintPlanner'
    >
      {children || 'SprintPlanner Component'}
    </div>
  );
};

export default SprintPlanner;
