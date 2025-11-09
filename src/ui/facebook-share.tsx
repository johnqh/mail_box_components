import { cn } from '../lib/utils';

/**
 * FacebookShare Component
 * 
 * Social media integration component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <FacebookShare className="custom-class" />
 * ```
 */
export interface FacebookShareProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const FacebookShare = ({ className, children, disabled }: FacebookShareProps) => {
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
      aria-label="FacebookShare"
    >
      {children || 'FacebookShare Component'}
    </div>
  );
};

export default FacebookShare;
