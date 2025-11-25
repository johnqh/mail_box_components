import { cn } from '@sudobility/components';

/**
 * AirportMap Component
 *
 * Aviation component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <AirportMap className="custom-class" />
 * ```
 */
export interface AirportMapProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const AirportMap = ({
  className,
  children,
  disabled,
}: AirportMapProps) => {
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
      aria-label='AirportMap'
    >
      {children || 'AirportMap Component'}
    </div>
  );
};
