import { cn } from '@sudobility/components';

/**
 * PowerGrid Component
 *
 * Energy component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <PowerGrid className="custom-class" />
 * ```
 */
export interface PowerGridProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const PowerGrid = ({
  className,
  children,
  disabled,
}: PowerGridProps) => {
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
      aria-label='PowerGrid'
    >
      {children || 'PowerGrid Component'}
    </div>
  );
};
