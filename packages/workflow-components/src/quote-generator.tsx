import { cn } from '@sudobility/components';

/**
 * QuoteGenerator Component
 *
 * Insurance component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <QuoteGenerator className="custom-class" />
 * ```
 */
export interface QuoteGeneratorProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const QuoteGenerator = ({
  className,
  children,
  disabled,
}: QuoteGeneratorProps) => {
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
      aria-label='QuoteGenerator'
    >
      {children || 'QuoteGenerator Component'}
    </div>
  );
};

export default QuoteGenerator;
