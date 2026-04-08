import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * VoterRegistration Component
 *
 * Government component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <VoterRegistration className="custom-class" />
 * ```
 */
export interface VoterRegistrationProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const VoterRegistration = ({
  className,
  children,
  disabled,
}: VoterRegistrationProps) => {
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
      aria-label='VoterRegistration'
    >
      {children || 'VoterRegistration Component'}
    </div>
  );
};
