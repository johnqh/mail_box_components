import { cn } from '../lib/utils';

/**
 * AccountOverview Component
 *
 * Banking component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <AccountOverview className="custom-class" />
 * ```
 */
export interface AccountOverviewProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const AccountOverview = ({
  className,
  children,
  disabled,
}: AccountOverviewProps) => {
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
      aria-label='AccountOverview'
    >
      {children || 'AccountOverview Component'}
    </div>
  );
};

export default AccountOverview;
