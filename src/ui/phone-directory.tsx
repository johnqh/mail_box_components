import { cn } from '../lib/utils';

/**
 * PhoneDirectory Component
 *
 * Telecommunications component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <PhoneDirectory className="custom-class" />
 * ```
 */
export interface PhoneDirectoryProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const PhoneDirectory = ({
  className,
  children,
  disabled,
}: PhoneDirectoryProps) => {
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
      aria-label='PhoneDirectory'
    >
      {children || 'PhoneDirectory Component'}
    </div>
  );
};

export default PhoneDirectory;
