import { cn } from '@sudobility/components';

/**
 * TransactionHistory Component
 *
 * Banking component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <TransactionHistory className="custom-class" />
 * ```
 */
export interface TransactionHistoryProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const TransactionHistory = ({
  className,
  children,
  disabled,
}: TransactionHistoryProps) => {
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
      aria-label='TransactionHistory'
    >
      {children || 'TransactionHistory Component'}
    </div>
  );
};
