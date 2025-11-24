import { cn } from '@sudobility/components';

/**
 * ProcurementForm Component
 *
 * Supply chain component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <ProcurementForm className="custom-class" />
 * ```
 */
export interface ProcurementFormProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const ProcurementForm = ({
  className,
  children,
  disabled,
}: ProcurementFormProps) => {
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
      aria-label='ProcurementForm'
    >
      {children || 'ProcurementForm Component'}
    </div>
  );
};

export default ProcurementForm;
