import { cn } from '../../lib/utils';

/**
 * QuizBuilder Component
 *
 * Education component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <QuizBuilder className="custom-class" />
 * ```
 */
export interface QuizBuilderProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const QuizBuilder = ({
  className,
  children,
  disabled,
}: QuizBuilderProps) => {
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
      aria-label='QuizBuilder'
    >
      {children || 'QuizBuilder Component'}
    </div>
  );
};
