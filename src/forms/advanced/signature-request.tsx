import { cn } from '../../lib/utils';

/**
 * SignatureRequest Component
 *
 * Legal & compliance component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <SignatureRequest className="custom-class" />
 * ```
 */
export interface SignatureRequestProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const SignatureRequest = ({
  className,
  children,
  disabled,
}: SignatureRequestProps) => {
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
      aria-label='SignatureRequest'
    >
      {children || 'SignatureRequest Component'}
    </div>
  );
};
