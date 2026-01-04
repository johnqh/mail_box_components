import { cn } from '@sudobility/components';

/**
 * UuploadUprogress Component
 *
 * A reusable UuploadUprogress component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 *
 * @component
 * @example
 * ```tsx
 * <UuploadUprogress className="custom-class" />
 * ```
 *
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 *
 * @see {@link https://docs.example.com/components/upload-progress}
 */

/** Tracking data for UploadProgress actions */
export interface UploadProgressTrackingData {
  action: 'click';
  trackingLabel?: string;
  componentName?: string;
}

export interface UuploadUprogressProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when component is interacted with */
  onClick?: () => void;
  /** Optional tracking callback */
  onTrack?: (data: UploadProgressTrackingData) => void;
  /** Optional tracking label */
  trackingLabel?: string;
  /** Optional component name for tracking */
  componentName?: string;
}

export const UuploadUprogress = ({
  className,
  children,
  disabled = false,
  onClick,
  onTrack,
  trackingLabel,
  componentName = 'UuploadUprogress',
}: UuploadUprogressProps) => {
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
      aria-label='UuploadUprogress'
    >
      {children || 'UuploadUprogress Component'}
    </div>
  );
};
