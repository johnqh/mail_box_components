import { cn } from '@sudobility/components';

/**
 * KnowledgeBase Component
 *
 * Customer support component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <KnowledgeBase className="custom-class" />
 * ```
 */
export interface KnowledgeBaseProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const KnowledgeBase = ({
  className,
  children,
  disabled,
}: KnowledgeBaseProps) => {
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
      aria-label='KnowledgeBase'
    >
      {children || 'KnowledgeBase Component'}
    </div>
  );
};

export default KnowledgeBase;
