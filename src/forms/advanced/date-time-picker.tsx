import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Calendar } from './calendar';
import { TimePicker } from './time-picker';

export interface DateTimePickerProps {
  /** Date time value */
  value: Date;
  /** Change handler */
  onChange: (value: Date) => void;
  /** Use 12-hour format for time */
  use12Hour?: boolean;
  /** Minute step interval */
  minuteStep?: number;
  /** Minimum date */
  minDate?: Date;
  /** Maximum date */
  maxDate?: Date;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * DateTimePicker Component
 *
 * Combined date and time picker with calendar and time selection.
 * Supports min/max dates and 12/24 hour formats.
 *
 * @example
 * ```tsx
 * <DateTimePicker
 *   value={appointment}
 *   onChange={setAppointment}
 *   use12Hour
 *   minDate={new Date()}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <DateTimePicker
 *   value={deadline}
 *   onChange={setDeadline}
 *   minuteStep={15}
 * />
 * ```
 */
export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  use12Hour = false,
  minuteStep = 1,
  minDate,
  maxDate,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(value);

  // Format date time for display
  const formatDisplay = (date: Date): string => {
    const dateStr = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (use12Hour) {
      const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? 'PM' : 'AM';
      return `${dateStr}, ${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    return `${dateStr}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Handle date change
  const handleDateChange = (date: Date) => {
    const newDateTime = new Date(date);
    newDateTime.setHours(selectedDate.getHours());
    newDateTime.setMinutes(selectedDate.getMinutes());
    setSelectedDate(newDateTime);
    onChange(newDateTime);
  };

  // Handle time change
  const handleTimeChange = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const newDateTime = new Date(selectedDate);
    newDateTime.setHours(hours);
    newDateTime.setMinutes(minutes);
    setSelectedDate(newDateTime);
    onChange(newDateTime);
  };

  // Get time string from date
  const getTimeString = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn('relative w-full', className)}>
      {/* Input trigger */}
      <button
        type='button'
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full px-3 py-2 text-sm text-left flex items-center justify-between',
          'bg-white dark:bg-gray-900',
          'border border-gray-300 dark:border-gray-700',
          'rounded-md',
          'hover:bg-gray-50 dark:hover:bg-gray-800',
          'transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          isOpen && 'ring-2 ring-blue-500 dark:ring-blue-400'
        )}
      >
        <span className='text-gray-900 dark:text-white'>
          {formatDisplay(value)}
        </span>
        <svg
          className='w-5 h-5 text-gray-600 dark:text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
      </button>

      {/* Picker dropdown */}
      {isOpen && (
        <div className='absolute top-full left-0 mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50 p-3'>
          <div className='space-y-3'>
            {/* Calendar */}
            <div>
              <label className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Select Date
              </label>
              <Calendar
                value={selectedDate}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>

            {/* Divider */}
            <div className='h-px bg-gray-200 dark:bg-gray-700' />

            {/* Time picker */}
            <div>
              <label className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Select Time
              </label>
              <TimePicker
                value={getTimeString(selectedDate)}
                onChange={handleTimeChange}
                use12Hour={use12Hour}
                minuteStep={minuteStep}
              />
            </div>

            {/* Actions */}
            <div className='flex gap-2 pt-2'>
              <button
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex-1 px-3 py-1.5 text-sm',
                  'bg-gray-100 dark:bg-gray-800',
                  'text-gray-700 dark:text-gray-300',
                  'rounded-md',
                  'hover:bg-gray-200 dark:hover:bg-gray-700',
                  'transition-colors'
                )}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onChange(selectedDate);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex-1 px-3 py-1.5 text-sm',
                  'bg-blue-600 dark:bg-blue-500',
                  'text-white',
                  'rounded-md',
                  'hover:bg-blue-700 dark:hover:bg-blue-600',
                  'transition-colors'
                )}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className='fixed inset-0 z-40' onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default DateTimePicker;
