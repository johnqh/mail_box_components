import { cn } from '@sudobility/components';

/**
 * EnergyMonitor Component
 *
 * Environmental/sustainability component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <EnergyMonitor className="custom-class" />
 * ```
 */
export interface EnergyMonitorProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const EnergyMonitor = ({
  className,
  children,
  disabled,
}: EnergyMonitorProps) => {
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
      aria-label='EnergyMonitor'
    >
      {children || 'EnergyMonitor Component'}
    </div>
  );
};

export default EnergyMonitor;
