import { cn } from '../lib/utils';

/**
 * CustomerLoyalty Component
 *
 * Retail component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <CustomerLoyalty className="custom-class" />
 * ```
 */
export interface CustomerLoyaltyProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const CustomerLoyalty = ({
  className,
  children,
  disabled,
}: CustomerLoyaltyProps) => {
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
      aria-label='CustomerLoyalty'
    >
      {children || 'CustomerLoyalty Component'}
    </div>
  );
};

export default CustomerLoyalty;
