import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

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
        colors.component.card.default.base,
        colors.component.card.default.dark,
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
