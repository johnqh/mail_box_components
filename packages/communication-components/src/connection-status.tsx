import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * UconnectionUstatus Component
 *
 * A reusable UconnectionUstatus component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UconnectionUstatus className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/connection-status}
 */

export interface UconnectionUstatusProps {
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

export const UconnectionUstatus = ({
  className,
  children,
  disabled = false,
  onClick,
  onTrack,
}: UconnectionUstatusProps) => {
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
      aria-label='UconnectionUstatus'
    >
      {children || 'UconnectionUstatus Component'}
    </div>
  );
};
