import { cn } from '@sudobility/components';

/**
 * TicketSystem Component
 *
 * Customer support component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <TicketSystem className="custom-class" />
 * ```
 */
export interface TicketSystemProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const TicketSystem = ({
  className,
  children,
  disabled,
}: TicketSystemProps) => {
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
      aria-label='TicketSystem'
    >
      {children || 'TicketSystem Component'}
    </div>
  );
};

export default TicketSystem;
