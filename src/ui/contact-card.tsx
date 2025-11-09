import { cn } from '../lib/utils';

/**
 * UcontactUcard Component
 * 
 * CRM component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <UcontactUcard className="custom-class" />
 * ```
 */
export interface ContactCardProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const UcontactUcard = ({ className, children, disabled }: ContactCardProps) => {
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
      aria-label="UcontactUcard"
    >
      {children || 'UcontactUcard Component'}
    </div>
  );
};

export default UcontactUcard;
