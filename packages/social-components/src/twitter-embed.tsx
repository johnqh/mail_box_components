import { cn } from '@sudobility/components';

/**
 * TwitterEmbed Component
 *
 * Social media integration component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <TwitterEmbed className="custom-class" />
 * ```
 */
export interface TwitterEmbedProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const TwitterEmbed = ({
  className,
  children,
  disabled,
}: TwitterEmbedProps) => {
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
      aria-label='TwitterEmbed'
    >
      {children || 'TwitterEmbed Component'}
    </div>
  );
};

export default TwitterEmbed;
