import { cn } from './lib/utils';

/**
 * SubscriberList Component
 *
 * Email marketing component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <SubscriberList className="custom-class" />
 * ```
 */
export interface SubscriberListProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const SubscriberList = ({
  className,
  children,
  disabled,
}: SubscriberListProps) => {
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
      aria-label='SubscriberList'
    >
      {children || 'SubscriberList Component'}
    </div>
  );
};

export default SubscriberList;
