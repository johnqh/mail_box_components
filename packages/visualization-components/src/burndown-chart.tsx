import { cn } from '@sudobility/components';

/**
 * BurndownChart Component
 *
 * Project management component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <BurndownChart className="custom-class" />
 * ```
 */
export interface BurndownChartProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const BurndownChart = ({
  className,
  children,
  disabled,
}: BurndownChartProps) => {
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
      aria-label='BurndownChart'
    >
      {children || 'BurndownChart Component'}
    </div>
  );
};

export default BurndownChart;
