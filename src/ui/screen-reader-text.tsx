import { cn } from '../lib/utils';

/**
 * UscreenUreaderUtext Component
 *
 * A reusable UscreenUreaderUtext component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UscreenUreaderUtext className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/screen-reader-text}
 */

export interface UscreenUreaderUtextProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when component is interacted with */
  onClick?: () => void;
}

export const UscreenUreaderUtext = ({
  className,
  children,
  disabled = false,
  onClick,
}: UscreenUreaderUtextProps) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-colors',
        'bg-background',
        'border-border',
        'text-foreground',
        disabled && 'opacity-50 cursor-not-allowed',
        'hover:bg-muted',
        className
      )}
      onClick={disabled ? undefined : onClick}
      role='region'
      aria-label='UscreenUreaderUtext'
    >
      {children || 'UscreenUreaderUtext Component'}
    </div>
  );
};
