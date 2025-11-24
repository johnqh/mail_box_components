import { cn } from '@sudobility/components';

/**
 * LiveStream Component
 *
 * Gaming component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <LiveStream className="custom-class" />
 * ```
 */
export interface LiveStreamProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const LiveStream = ({
  className,
  children,
  disabled,
}: LiveStreamProps) => {
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
      aria-label='LiveStream'
    >
      {children || 'LiveStream Component'}
    </div>
  );
};

export default LiveStream;
