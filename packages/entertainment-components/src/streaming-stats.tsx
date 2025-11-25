import { cn } from '@sudobility/components';

/**
 * StreamingStats Component
 *
 * Entertainment component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <StreamingStats className="custom-class" />
 * ```
 */
export interface StreamingStatsProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const StreamingStats = ({
  className,
  children,
  disabled,
}: StreamingStatsProps) => {
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
      aria-label='StreamingStats'
    >
      {children || 'StreamingStats Component'}
    </div>
  );
};
