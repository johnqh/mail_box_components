import { cn } from '../lib/utils';

/**
 * ProductionLine Component
 *
 * Manufacturing component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <ProductionLine className="custom-class" />
 * ```
 */
export interface ProductionLineProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const ProductionLine = ({
  className,
  children,
  disabled,
}: ProductionLineProps) => {
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
      aria-label='ProductionLine'
    >
      {children || 'ProductionLine Component'}
    </div>
  );
};

export default ProductionLine;
