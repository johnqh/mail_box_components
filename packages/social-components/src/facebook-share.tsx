import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * FacebookShare Component
 *
 * Social media integration component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <FacebookShare className="custom-class" />
 * ```
 */
export interface FacebookShareProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const FacebookShare = ({
  className,
  children,
  disabled,
}: FacebookShareProps) => {
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
      aria-label='FacebookShare'
    >
      {children || 'FacebookShare Component'}
    </div>
  );
};
