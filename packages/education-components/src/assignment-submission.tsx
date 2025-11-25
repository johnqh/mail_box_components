import { cn } from '@sudobility/components';

/**
 * AssignmentSubmission Component
 *
 * Education component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <AssignmentSubmission className="custom-class" />
 * ```
 */
export interface AssignmentSubmissionProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const AssignmentSubmission = ({
  className,
  children,
  disabled,
}: AssignmentSubmissionProps) => {
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
      aria-label='AssignmentSubmission'
    >
      {children || 'AssignmentSubmission Component'}
    </div>
  );
};
