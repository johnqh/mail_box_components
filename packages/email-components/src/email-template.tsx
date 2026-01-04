import { cn } from '@sudobility/components';

/**
 * UemailUtemplate Component
 *
 * A reusable UemailUtemplate component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UemailUtemplate className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/email-template}
 */

export interface UemailUtemplateProps {
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

export const UemailUtemplate = ({
  className,
  children,
  disabled = false,
  onClick,
  onTrack,
}: UemailUtemplateProps) => {
  const handleClick = () => {
    if (disabled) return;
    onTrack?.('click');
    onClick?.();
  };

  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-colors',
        'bg-white dark:bg-gray-900',
        'border-gray-200 dark:border-gray-700',
        'text-gray-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        className
      )}
      onClick={handleClick}
      role='region'
      aria-label='UemailUtemplate'
    >
      {children || 'UemailUtemplate Component'}
    </div>
  );
};
