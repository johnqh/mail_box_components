import { cn } from '../lib/utils';

/**
 * WeatherStation Component
 *
 * Agriculture component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <WeatherStation className="custom-class" />
 * ```
 */
export interface WeatherStationProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const WeatherStation = ({
  className,
  children,
  disabled,
}: WeatherStationProps) => {
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
      aria-label='WeatherStation'
    >
      {children || 'WeatherStation Component'}
    </div>
  );
};

export default WeatherStation;
