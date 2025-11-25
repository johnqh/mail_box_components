import { cn } from '@sudobility/components';

/**
 * QaReport Component
 *
 * Quality assurance component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <QaReport className="custom-class" />
 * ```
 */
export interface QaReportProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const QaReport = ({ className, children, disabled }: QaReportProps) => {
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
      aria-label='QaReport'
    >
      {children || 'QaReport Component'}
    </div>
  );
};
