import { cn } from '../lib/utils';

/**
 * BugTracker Component
 * 
 * Quality assurance component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <BugTracker className="custom-class" />
 * ```
 */
export interface BugTrackerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const BugTracker = ({ className, children, disabled }: BugTrackerProps) => {
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
      role="region"
      aria-label="BugTracker"
    >
      {children || 'BugTracker Component'}
    </div>
  );
};

export default BugTracker;
