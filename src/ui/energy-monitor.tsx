import { cn } from '../lib/utils';

/**
 * UenergyUmonitor Component
 * 
 * Environmental/sustainability component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <UenergyUmonitor className="custom-class" />
 * ```
 */
export interface EnergyMonitorProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const UenergyUmonitor = ({ className, children, disabled }: EnergyMonitorProps) => {
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
      role="region"
      aria-label="UenergyUmonitor"
    >
      {children || 'UenergyUmonitor Component'}
    </div>
  );
};

export default UenergyUmonitor;
