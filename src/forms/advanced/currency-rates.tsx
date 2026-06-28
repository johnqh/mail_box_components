import { cn } from '../../lib/utils';

/**
 * UcurrencyUrates Component
 *
 * A reusable UcurrencyUrates component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UcurrencyUrates className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/currency-rates}
 */

export interface UcurrencyUratesProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when component is interacted with */
  onClick?: () => void;
}

export const UcurrencyUrates = ({
  className,
  children,
  disabled = false,
  onClick,
}: UcurrencyUratesProps) => {
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
      aria-label='UcurrencyUrates'
    >
      {children || 'UcurrencyUrates Component'}
    </div>
  );
};
