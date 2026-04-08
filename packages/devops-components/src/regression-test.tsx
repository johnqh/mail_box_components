import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * RegressionTest Component
 *
 * Quality assurance component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <RegressionTest className="custom-class" />
 * ```
 */
export interface RegressionTestProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const RegressionTest = ({
  className,
  children,
  disabled,
}: RegressionTestProps) => {
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
      aria-label='RegressionTest'
    >
      {children || 'RegressionTest Component'}
    </div>
  );
};
