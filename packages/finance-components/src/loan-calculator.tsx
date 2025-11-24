import { cn } from '@sudobility/components';

/**
 * LoanCalculator Component
 *
 * Banking component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <LoanCalculator className="custom-class" />
 * ```
 */
export interface LoanCalculatorProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const LoanCalculator = ({
  className,
  children,
  disabled,
}: LoanCalculatorProps) => {
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
      aria-label='LoanCalculator'
    >
      {children || 'LoanCalculator Component'}
    </div>
  );
};

export default LoanCalculator;
