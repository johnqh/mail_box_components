import { cn } from '../lib/utils';

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
        'bg-background',
        'border-border',
        'text-foreground',
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
