import { cn } from '../lib/utils';

/**
 * AppointmentBooking Component
 *
 * Healthcare component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <AppointmentBooking className="custom-class" />
 * ```
 */
export interface AppointmentBookingProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const AppointmentBooking = ({
  className,
  children,
  disabled,
}: AppointmentBookingProps) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-colors',
        'bg-white dark:bg-gray-900',
        'border-gray-200 dark:border-gray-700',
        'text-gray-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      role='region'
      aria-label='AppointmentBooking'
    >
      {children || 'AppointmentBooking Component'}
    </div>
  );
};

export default AppointmentBooking;
