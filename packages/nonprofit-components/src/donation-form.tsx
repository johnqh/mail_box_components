import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * DonationForm Component
 *
 * Non-profit component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <DonationForm className="custom-class" />
 * ```
 */
export interface DonationFormProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const DonationForm = ({
  className,
  children,
  disabled,
}: DonationFormProps) => {
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
      aria-label='DonationForm'
    >
      {children || 'DonationForm Component'}
    </div>
  );
};
