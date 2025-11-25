import { cn } from '@sudobility/components';

/**
 * VehicleStatus Component
 *
 * Automotive component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <VehicleStatus className="custom-class" />
 * ```
 */
interface VehicleStatusProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const VehicleStatus = ({
  className,
  children,
  disabled,
}: VehicleStatusProps) => {
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
      aria-label='VehicleStatus'
    >
      {children || 'VehicleStatus Component'}
    </div>
  );
};
