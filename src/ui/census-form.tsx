import { cn } from '../lib/utils';

/**
 * CensusForm Component
 *
 * Government component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <CensusForm className="custom-class" />
 * ```
 */
export interface CensusFormProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const CensusForm = ({
  className,
  children,
  disabled,
}: CensusFormProps) => {
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
      aria-label='CensusForm'
    >
      {children || 'CensusForm Component'}
    </div>
  );
};

export default CensusForm;
