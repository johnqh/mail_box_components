import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * UcursorUtracker Component
 *
 * A reusable UcursorUtracker component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UcursorUtracker className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/cursor-tracker}
 */

export interface UcursorUtrackerProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when component is interacted with */
  onClick?: () => void;
}

export const UcursorUtracker = ({
  className,
  children,
  disabled = false,
  onClick,
}: UcursorUtrackerProps) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-colors',
        colors.component.card.default.base,
        colors.component.card.default.dark,
        'text-gray-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        className
      )}
      onClick={disabled ? undefined : onClick}
      role='region'
      aria-label='UcursorUtracker'
    >
      {children || 'UcursorUtracker Component'}
    </div>
  );
};
