import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * LiveChat Component
 *
 * Customer support component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <LiveChat className="custom-class" />
 * ```
 */
export interface LiveChatProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const LiveChat = ({ className, children, disabled }: LiveChatProps) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-colors',
        colors.component.card.default.base,
        colors.component.card.default.dark,
        'text-gray-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      role='region'
      aria-label='LiveChat'
    >
      {children || 'LiveChat Component'}
    </div>
  );
};
