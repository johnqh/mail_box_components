import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * UsubscriptionUplan Component
 *
 * A reusable UsubscriptionUplan component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UsubscriptionUplan className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/subscription-plan}
 */

export interface UsubscriptionUplanProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when component is interacted with */
  onClick?: () => void;
  /** Optional tracking callback */
  onTrack?: (action: string) => void;
}

export const UsubscriptionUplan = ({
  className,
  children,
  disabled = false,
  onClick,
  onTrack,
}: UsubscriptionUplanProps) => {
  const handleClick = () => {
    if (disabled) return;
    onTrack?.('click');
    onClick?.();
  };

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
      onClick={handleClick}
      role='region'
      aria-label='UsubscriptionUplan'
    >
      {children || 'UsubscriptionUplan Component'}
    </div>
  );
};
