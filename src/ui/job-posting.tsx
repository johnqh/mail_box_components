import { cn } from '../lib/utils';

/**
 * UjobUposting Component
 * 
 * HR & recruiting component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <UjobUposting className="custom-class" />
 * ```
 */
export interface JobPostingProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const UjobUposting = ({ className, children, disabled }: JobPostingProps) => {
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
      aria-label="UjobUposting"
    >
      {children || 'UjobUposting Component'}
    </div>
  );
};

export default UjobUposting;
