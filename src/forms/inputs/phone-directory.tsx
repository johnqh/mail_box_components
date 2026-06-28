import { cn } from '../../lib/utils';

/**
 * PhoneDirectory Component
 *
 * Telecommunications component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <PhoneDirectory className="custom-class" />
 * ```
 */
export interface PhoneDirectoryProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const PhoneDirectory = ({
  className,
  children,
  disabled,
}: PhoneDirectoryProps) => {
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
      aria-label='PhoneDirectory'
    >
      {children || 'PhoneDirectory Component'}
    </div>
  );
};
