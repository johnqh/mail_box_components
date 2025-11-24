import { cn } from '@sudobility/components';

/**
 * PlayerStats Component
 *
 * Gaming component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <PlayerStats className="custom-class" />
 * ```
 */
export interface PlayerStatsProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const PlayerStats = ({
  className,
  children,
  disabled,
}: PlayerStatsProps) => {
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
      aria-label='PlayerStats'
    >
      {children || 'PlayerStats Component'}
    </div>
  );
};

export default PlayerStats;
