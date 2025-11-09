import { cn } from '../lib/utils';

/**
 * ProjectTimeline Component
 *
 * Construction component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <ProjectTimeline className="custom-class" />
 * ```
 */
export interface ProjectTimelineProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const ProjectTimeline = ({
  className,
  children,
  disabled,
}: ProjectTimelineProps) => {
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
      aria-label='ProjectTimeline'
    >
      {children || 'ProjectTimeline Component'}
    </div>
  );
};

export default ProjectTimeline;
