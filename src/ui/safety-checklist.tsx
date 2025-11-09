import { cn } from '../lib/utils';

/**
 * SafetyChecklist Component
 *
 * Construction component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <SafetyChecklist className="custom-class" />
 * ```
 */
export interface SafetyChecklistProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const SafetyChecklist = ({
  className,
  children,
  disabled,
}: SafetyChecklistProps) => {
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
      aria-label='SafetyChecklist'
    >
      {children || 'SafetyChecklist Component'}
    </div>
  );
};

export default SafetyChecklist;
