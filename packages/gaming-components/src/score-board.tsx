import { cn } from '@sudobility/components';

/**
 * ScoreBoard Component
 *
 * Sports component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <ScoreBoard className="custom-class" />
 * ```
 */
export interface ScoreBoardProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const ScoreBoard = ({
  className,
  children,
  disabled,
}: ScoreBoardProps) => {
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
      aria-label='ScoreBoard'
    >
      {children || 'ScoreBoard Component'}
    </div>
  );
};

export default ScoreBoard;
