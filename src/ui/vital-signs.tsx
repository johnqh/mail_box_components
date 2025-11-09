import { cn } from '../lib/utils';

/**
 * VitalSigns Component
 *
 * Healthcare component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <VitalSigns className="custom-class" />
 * ```
 */
export interface VitalSignsProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const VitalSigns = ({
  className,
  children,
  disabled,
}: VitalSignsProps) => {
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
      aria-label='VitalSigns'
    >
      {children || 'VitalSigns Component'}
    </div>
  );
};

export default VitalSigns;
