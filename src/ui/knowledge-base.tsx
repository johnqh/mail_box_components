import { cn } from '../lib/utils';

/**
 * UknowledgeUbase Component
 * 
 * Customer support component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <UknowledgeUbase className="custom-class" />
 * ```
 */
export interface KnowledgeBaseProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const UknowledgeUbase = ({ className, children, disabled }: KnowledgeBaseProps) => {
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
      aria-label="UknowledgeUbase"
    >
      {children || 'UknowledgeUbase Component'}
    </div>
  );
};

export default UknowledgeUbase;
