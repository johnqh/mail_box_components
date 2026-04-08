import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * UtravelUmap Component
 *
 * A reusable UtravelUmap component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UtravelUmap className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/travel-map}
 */

export interface UtravelUmapProps {
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

export const UtravelUmap = ({
  className,
  children,
  disabled = false,
  onClick,
  onTrack,
}: UtravelUmapProps) => {
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
      onClick={
        disabled
          ? undefined
          : () => {
              onTrack?.('click');
              onClick?.();
            }
      }
      role='region'
      aria-label='UtravelUmap'
    >
      {children || 'UtravelUmap Component'}
    </div>
  );
};
