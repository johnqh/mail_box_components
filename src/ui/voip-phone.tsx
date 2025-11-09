import { cn } from '../lib/utils';

/**
 * VoipPhone Component
 *
 * Telecommunications component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <VoipPhone className="custom-class" />
 * ```
 */
export interface VoipPhoneProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const VoipPhone = ({
  className,
  children,
  disabled,
}: VoipPhoneProps) => {
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
      aria-label='VoipPhone'
    >
      {children || 'VoipPhone Component'}
    </div>
  );
};

export default VoipPhone;
