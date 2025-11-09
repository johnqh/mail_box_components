import { cn } from '../lib/utils';

/**
 * FundraiserProgress Component
 *
 * Charity component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <FundraiserProgress className="custom-class" />
 * ```
 */
export interface FundraiserProgressProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const FundraiserProgress = ({
  className,
  children,
  disabled,
}: FundraiserProgressProps) => {
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
      aria-label='FundraiserProgress'
    >
      {children || 'FundraiserProgress Component'}
    </div>
  );
};

export default FundraiserProgress;
