import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * UtaxUcalculator Component
 *
 * A reusable UtaxUcalculator component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UtaxUcalculator className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/tax-calculator}
 */

/** Tracking data for TaxCalculator actions */
export interface TaxCalculatorTrackingData {
  action: 'click';
  trackingLabel?: string;
  componentName?: string;
}

export interface UtaxUcalculatorProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when component is interacted with */
  onClick?: () => void;
  /** Optional tracking callback */
  onTrack?: (data: TaxCalculatorTrackingData) => void;
  /** Optional tracking label */
  trackingLabel?: string;
  /** Optional component name for tracking */
  componentName?: string;
}

export const UtaxUcalculator = ({
  className,
  children,
  disabled = false,
  onClick,
  onTrack,
  trackingLabel,
  componentName = 'UtaxUcalculator',
}: UtaxUcalculatorProps) => {
  const handleClick = () => {
    if (!disabled) {
      onTrack?.({ action: 'click', trackingLabel, componentName });
      onClick?.();
    }
  };

  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-colors',
        colors.component.card.default.base,
        colors.component.card.default.dark,
        'text-foreground',
        disabled && 'opacity-50 cursor-not-allowed',
        'hover:bg-muted',
        className
      )}
      onClick={handleClick}
      role='region'
      aria-label='UtaxUcalculator'
    >
      {children || 'UtaxUcalculator Component'}
    </div>
  );
};
