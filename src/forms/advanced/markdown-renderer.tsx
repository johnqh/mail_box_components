import { cn } from '../../lib/utils';

/**
 * UmarkdownUrenderer Component
 *
 * A reusable UmarkdownUrenderer component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UmarkdownUrenderer className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/markdown-renderer}
 */

export interface UmarkdownUrendererProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when component is interacted with */
  onClick?: () => void;
}

export const UmarkdownUrenderer = ({
  className,
  children,
  disabled = false,
  onClick,
}: UmarkdownUrendererProps) => {
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
      aria-label='UmarkdownUrenderer'
    >
      {children || 'UmarkdownUrenderer Component'}
    </div>
  );
};
