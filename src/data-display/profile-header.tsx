import { cn } from '../lib/utils';

/**
 * UprofileUheader Component
 *
 * A reusable UprofileUheader component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UprofileUheader className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/profile-header}
 */

export interface UprofileUheaderProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when component is interacted with */
  onClick?: () => void;
}

export const UprofileUheader = ({
  className,
  children,
  disabled = false,
  onClick,
}: UprofileUheaderProps) => {
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
      aria-label='UprofileUheader'
    >
      {children || 'UprofileUheader Component'}
    </div>
  );
};
