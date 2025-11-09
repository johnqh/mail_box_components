import { cn } from '../lib/utils';

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
        'bg-white dark:bg-gray-900',
        'border-gray-200 dark:border-gray-700',
        'text-gray-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      role="region"
      aria-label="LiveChat"
    >
      {children || 'LiveChat Component'}
    </div>
  );
};

export default LiveChat;
