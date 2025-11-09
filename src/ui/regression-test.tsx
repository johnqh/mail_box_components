import { cn } from '../lib/utils';

/**
 * RegressionTest Component
 * 
 * Quality assurance component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <RegressionTest className="custom-class" />
 * ```
 */
export interface RegressionTestProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const RegressionTest = ({ className, children, disabled }: RegressionTestProps) => {
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
      aria-label="RegressionTest"
    >
      {children || 'RegressionTest Component'}
    </div>
  );
};

export default RegressionTest;
