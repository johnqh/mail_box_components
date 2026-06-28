import { cn } from '@sudobility/components';
import { colors } from '@sudobility/design';

/**
 * UtrainingUprogress Component
 *
 * A reusable UtrainingUprogress component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UtrainingUprogress className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/training-progress}
 */

/** Tracking data for TrainingProgress actions */
export interface TrainingProgressTrackingData {
  action: 'click';
  trackingLabel?: string;
  componentName?: string;
}

export interface UtrainingUprogressProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when component is interacted with */
  onClick?: () => void;
  /** Optional tracking callback */
  onTrack?: (data: TrainingProgressTrackingData) => void;
  /** Optional tracking label */
  trackingLabel?: string;
  /** Optional component name for tracking */
  componentName?: string;
}

export const UtrainingUprogress = ({
  className,
  children,
  disabled = false,
  onClick,
  onTrack,
  trackingLabel,
  componentName = 'UtrainingUprogress',
}: UtrainingUprogressProps) => {
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
      aria-label='UtrainingUprogress'
    >
      {children || 'UtrainingUprogress Component'}
    </div>
  );
};
