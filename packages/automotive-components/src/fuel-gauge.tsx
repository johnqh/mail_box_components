import { cn } from '@sudobility/components';

/**
 * FuelGauge Component
 *
 * Automotive component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <FuelGauge className="custom-class" />
 * ```
 */
export interface FuelGaugeProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const FuelGauge = ({
  className,
  children,
  disabled,
}: FuelGaugeProps) => {
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
      aria-label='FuelGauge'
    >
      {children || 'FuelGauge Component'}
    </div>
  );
};
