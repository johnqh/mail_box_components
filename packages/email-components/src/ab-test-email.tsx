import { cn } from '@sudobility/components';

/**
 * AbTestEmail Component
 *
 * Email marketing component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <AbTestEmail className="custom-class" />
 * ```
 */
export interface AbTestEmailProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const AbTestEmail = ({
  className,
  children,
  disabled,
}: AbTestEmailProps) => {
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
      aria-label='AbTestEmail'
    >
      {children || 'AbTestEmail Component'}
    </div>
  );
};
