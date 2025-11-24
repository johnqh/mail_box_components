import { cn } from '@sudobility/components';

/**
 * MaterialOrder Component
 *
 * Construction component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <MaterialOrder className="custom-class" />
 * ```
 */
export interface MaterialOrderProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const MaterialOrder = ({
  className,
  children,
  disabled,
}: MaterialOrderProps) => {
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
      aria-label='MaterialOrder'
    >
      {children || 'MaterialOrder Component'}
    </div>
  );
};

export default MaterialOrder;
