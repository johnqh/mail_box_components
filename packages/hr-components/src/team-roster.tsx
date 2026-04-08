import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * TeamRoster Component
 *
 * Sports component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <TeamRoster className="custom-class" />
 * ```
 */
export interface TeamRosterProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const TeamRoster = ({
  className,
  children,
  disabled,
}: TeamRosterProps) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-colors',
        colors.component.card.default.base,
        colors.component.card.default.dark,
        'text-gray-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      role='region'
      aria-label='TeamRoster'
    >
      {children || 'TeamRoster Component'}
    </div>
  );
};
