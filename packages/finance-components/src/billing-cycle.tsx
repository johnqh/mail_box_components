import { cn } from '@sudobility/components';

/**
 * BillingCycle Component
 *
 * Utilities component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <BillingCycle className="custom-class" />
 * ```
 */
export interface BillingCycleProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const BillingCycle = ({
  className,
  children,
  disabled,
}: BillingCycleProps) => {
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
      aria-label='BillingCycle'
    >
      {children || 'BillingCycle Component'}
    </div>
  );
};

export default BillingCycle;
