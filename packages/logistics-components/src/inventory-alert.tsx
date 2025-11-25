import { cn } from '@sudobility/components';

/**
 * InventoryAlert Component
 *
 * Inventory management component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <InventoryAlert className="custom-class" />
 * ```
 */
export interface InventoryAlertProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const InventoryAlert = ({
  className,
  children,
  disabled,
}: InventoryAlertProps) => {
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
      aria-label='InventoryAlert'
    >
      {children || 'InventoryAlert Component'}
    </div>
  );
};
