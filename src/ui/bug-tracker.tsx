import { cn } from '../lib/utils';

/**
 * UbugUtracker Component
 * 
 * Quality assurance component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <UbugUtracker className="custom-class" />
 * ```
 */
export interface BugTrackerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const UbugUtracker = ({ className, children, disabled }: BugTrackerProps) => {
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
      aria-label="UbugUtracker"
    >
      {children || 'UbugUtracker Component'}
    </div>
  );
};

export default UbugUtracker;
