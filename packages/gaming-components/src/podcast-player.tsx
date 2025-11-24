import { cn } from '@sudobility/components';

/**
 * PodcastPlayer Component
 *
 * Entertainment component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <PodcastPlayer className="custom-class" />
 * ```
 */
export interface PodcastPlayerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const PodcastPlayer = ({
  className,
  children,
  disabled,
}: PodcastPlayerProps) => {
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
      aria-label='PodcastPlayer'
    >
      {children || 'PodcastPlayer Component'}
    </div>
  );
};

export default PodcastPlayer;
