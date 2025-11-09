import { cn } from '../lib/utils';

/**
 * SmsComposer Component
 *
 * Telecommunications component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <SmsComposer className="custom-class" />
 * ```
 */
export interface SmsComposerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const SmsComposer = ({
  className,
  children,
  disabled,
}: SmsComposerProps) => {
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
      aria-label='SmsComposer'
    >
      {children || 'SmsComposer Component'}
    </div>
  );
};

export default SmsComposer;
