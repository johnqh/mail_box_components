import { cn } from '@sudobility/components';

/**
 * QualityControl Component
 *
 * Manufacturing component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <QualityControl className="custom-class" />
 * ```
 */
export interface QualityControlProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const QualityControl = ({
  className,
  children,
  disabled,
}: QualityControlProps) => {
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
      aria-label='QualityControl'
    >
      {children || 'QualityControl Component'}
    </div>
  );
};

export default QualityControl;
