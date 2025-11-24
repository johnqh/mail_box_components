import { cn } from '@sudobility/components';

/**
 * ProjectBoard Component
 *
 * Project management component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <ProjectBoard className="custom-class" />
 * ```
 */
export interface ProjectBoardProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const ProjectBoard = ({
  className,
  children,
  disabled,
}: ProjectBoardProps) => {
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
      aria-label='ProjectBoard'
    >
      {children || 'ProjectBoard Component'}
    </div>
  );
};

export default ProjectBoard;
