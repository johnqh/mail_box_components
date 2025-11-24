import { cn } from '@sudobility/components';

/**
 * UsageForecast Component
 *
 * Energy component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <UsageForecast className="custom-class" />
 * ```
 */
export interface UsageForecastProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const UsageForecast = ({
  className,
  children,
  disabled,
}: UsageForecastProps) => {
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
      aria-label='UsageForecast'
    >
      {children || 'UsageForecast Component'}
    </div>
  );
};

export default UsageForecast;
