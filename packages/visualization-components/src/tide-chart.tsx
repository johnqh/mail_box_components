import { cn } from '@sudobility/components';

/**
 * TideChart Component
 *
 * Maritime component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <TideChart className="custom-class" />
 * ```
 */
export interface TideChartProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const TideChart = ({
  className,
  children,
  disabled,
}: TideChartProps) => {
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
      aria-label='TideChart'
    >
      {children || 'TideChart Component'}
    </div>
  );
};

export default TideChart;
