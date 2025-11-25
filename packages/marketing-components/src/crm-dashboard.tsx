import { cn } from '@sudobility/components';

/**
 * CrmDashboard Component
 *
 * CRM component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <CrmDashboard className="custom-class" />
 * ```
 */
export interface CrmDashboardProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const CrmDashboard = ({
  className,
  children,
  disabled,
}: CrmDashboardProps) => {
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
      aria-label='CrmDashboard'
    >
      {children || 'CrmDashboard Component'}
    </div>
  );
};
