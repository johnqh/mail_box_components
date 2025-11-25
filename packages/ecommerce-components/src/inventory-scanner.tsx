import { cn } from './lib/utils';

/**
 * InventoryScanner Component
 *
 * Retail component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <InventoryScanner className="custom-class" />
 * ```
 */
export interface InventoryScannerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const InventoryScanner = ({
  className,
  children,
  disabled,
}: InventoryScannerProps) => {
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
      aria-label='InventoryScanner'
    >
      {children || 'InventoryScanner Component'}
    </div>
  );
};
