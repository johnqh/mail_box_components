import { cn } from './lib/utils';

/**
 * SupplierCard Component
 *
 * Supply chain component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <SupplierCard className="custom-class" />
 * ```
 */
interface SupplierCardProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const SupplierCard = ({
  className,
  children,
  disabled,
}: SupplierCardProps) => {
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
      aria-label='SupplierCard'
    >
      {children || 'SupplierCard Component'}
    </div>
  );
};
