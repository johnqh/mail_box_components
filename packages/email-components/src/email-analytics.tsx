import { cn } from './lib/utils';

/**
 * EmailAnalytics Component
 *
 * Email marketing component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <EmailAnalytics className="custom-class" />
 * ```
 */
export interface EmailAnalyticsProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const EmailAnalytics = ({
  className,
  children,
  disabled,
}: EmailAnalyticsProps) => {
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
      aria-label='EmailAnalytics'
    >
      {children || 'EmailAnalytics Component'}
    </div>
  );
};

export default EmailAnalytics;
