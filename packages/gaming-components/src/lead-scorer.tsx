import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * LeadScorer Component
 *
 * CRM component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <LeadScorer className="custom-class" />
 * ```
 */
export interface LeadScorerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const LeadScorer = ({
  className,
  children,
  disabled,
}: LeadScorerProps) => {
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
      aria-label='LeadScorer'
    >
      {children || 'LeadScorer Component'}
    </div>
  );
};
