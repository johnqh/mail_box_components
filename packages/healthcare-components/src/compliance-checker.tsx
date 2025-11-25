import { cn } from '@sudobility/components';

/**
 * ComplianceChecker Component
 *
 * Legal & compliance component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <ComplianceChecker className="custom-class" />
 * ```
 */
export interface ComplianceCheckerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const ComplianceChecker = ({
  className,
  children,
  disabled,
}: ComplianceCheckerProps) => {
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
      aria-label='ComplianceChecker'
    >
      {children || 'ComplianceChecker Component'}
    </div>
  );
};
