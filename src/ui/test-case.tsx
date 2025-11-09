import { cn } from '../lib/utils';

/**
 * UtestUcase Component
 * 
 * Quality assurance component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <UtestUcase className="custom-class" />
 * ```
 */
export interface TestCaseProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const UtestUcase = ({ className, children, disabled }: TestCaseProps) => {
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
      aria-label="UtestUcase"
    >
      {children || 'UtestUcase Component'}
    </div>
  );
};

export default UtestUcase;
