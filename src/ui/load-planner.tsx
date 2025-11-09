import { cn } from '../lib/utils';

/**
 * LoadPlanner Component
 *
 * Logistics component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <LoadPlanner className="custom-class" />
 * ```
 */
export interface LoadPlannerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const LoadPlanner = ({
  className,
  children,
  disabled,
}: LoadPlannerProps) => {
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
      aria-label='LoadPlanner'
    >
      {children || 'LoadPlanner Component'}
    </div>
  );
};

export default LoadPlanner;
