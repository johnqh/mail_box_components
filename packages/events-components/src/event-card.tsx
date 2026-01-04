import { cn } from '@sudobility/components';

/**
 * UeventUcard Component
 *
 * A reusable UeventUcard component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UeventUcard className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/event-card}
 */

/** Tracking data for EventCard actions */
export interface EventCardTrackingData {
  action: 'click';
  trackingLabel?: string;
  componentName?: string;
}

export interface UeventUcardProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when component is interacted with */
  onClick?: () => void;
  /** Optional tracking callback */
  onTrack?: (data: EventCardTrackingData) => void;
  /** Optional tracking label */
  trackingLabel?: string;
  /** Optional component name for tracking */
  componentName?: string;
}

export const UeventUcard = ({
  className,
  children,
  disabled = false,
  onClick,
  onTrack,
  trackingLabel,
  componentName = 'UeventUcard',
}: UeventUcardProps) => {
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
        'bg-white dark:bg-gray-900',
        'border-gray-200 dark:border-gray-700',
        'text-gray-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        className
      )}
      onClick={handleClick}
      role='region'
      aria-label='UeventUcard'
    >
      {children || 'UeventUcard Component'}
    </div>
  );
};
