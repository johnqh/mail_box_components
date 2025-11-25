import { cn } from '@sudobility/components';

/**
 * DriverLog Component
 *
 * Transportation component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <DriverLog className="custom-class" />
 * ```
 */
export interface DriverLogProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const DriverLog = ({
  className,
  children,
  disabled,
}: DriverLogProps) => {
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
      aria-label='DriverLog'
    >
      {children || 'DriverLog Component'}
    </div>
  );
};
