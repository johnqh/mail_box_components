import { cn } from '../lib/utils';

/**
 * MachineMonitor Component
 *
 * Manufacturing component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <MachineMonitor className="custom-class" />
 * ```
 */
export interface MachineMonitorProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const MachineMonitor = ({
  className,
  children,
  disabled,
}: MachineMonitorProps) => {
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
      aria-label='MachineMonitor'
    >
      {children || 'MachineMonitor Component'}
    </div>
  );
};

export default MachineMonitor;
