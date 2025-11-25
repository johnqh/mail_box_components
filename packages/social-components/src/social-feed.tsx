import { cn } from '@sudobility/components';

/**
 * SocialFeed Component
 *
 * Social media integration component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <SocialFeed className="custom-class" />
 * ```
 */
export interface SocialFeedProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const SocialFeed = ({
  className,
  children,
  disabled,
}: SocialFeedProps) => {
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
      aria-label='SocialFeed'
    >
      {children || 'SocialFeed Component'}
    </div>
  );
};
