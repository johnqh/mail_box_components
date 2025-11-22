import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface TimePickerProps {
  /** Time value in HH:mm format (24-hour) */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Use 12-hour format */
  use12Hour?: boolean;
  /** Minute step interval */
  minuteStep?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * TimePicker Component
 *
 * Time selection with dropdown or scrollable columns.
 * Supports 12-hour and 24-hour formats.
 *
 * @example
 * ```tsx
 * <TimePicker
 *   value={time}
 *   onChange={setTime}
 *   use12Hour
 *   minuteStep={15}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <TimePicker
 *   value={selectedTime}
 *   onChange={handleTimeChange}
 * />
 * ```
 */
export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  use12Hour = false,
  minuteStep = 1,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalHour, setInternalHour] = useState('12');
  const [internalMinute, setInternalMinute] = useState('00');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse value to hours and minutes
  useEffect(() => {
    if (value) {
      const [hours, minutes] = value.split(':');
      const hour = parseInt(hours, 10);

      if (use12Hour) {
        const isPM = hour >= 12;
        const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        setInternalHour(hour12.toString().padStart(2, '0'));
        setPeriod(isPM ? 'PM' : 'AM');
      } else {
        setInternalHour(hours);
      }

      setInternalMinute(minutes);
    }
  }, [value, use12Hour]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format display value
  const formatDisplay = (): string => {
    if (!value) return '';

    const [hours, minutes] = value.split(':');
    const hour = parseInt(hours, 10);

    if (use12Hour) {
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? 'PM' : 'AM';
      return `${hour12}:${minutes} ${period}`;
    }

    return `${hours}:${minutes}`;
  };

  // Handle time selection
  const handleTimeChange = (
    newHour: string,
    newMinute: string,
    newPeriod?: 'AM' | 'PM'
  ) => {
    let hour = parseInt(newHour, 10);
    const minute = parseInt(newMinute, 10);

    if (use12Hour && newPeriod) {
      if (newPeriod === 'PM' && hour !== 12) {
        hour += 12;
      } else if (newPeriod === 'AM' && hour === 12) {
        hour = 0;
      }
    }

    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    onChange(formattedTime);
  };

  // Generate hour options
  const hourOptions = use12Hour
    ? Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))
    : Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

  // Generate minute options
  const minuteOptions = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, i) => (i * minuteStep).toString().padStart(2, '0')
  );

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
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
        <span
          className={cn(
            value
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-500 dark:text-gray-400'
          )}
        >
          {value ? formatDisplay() : 'Select time'}
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
            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </button>

      {/* Time picker dropdown */}
      {isOpen && (
        <div className='absolute top-full left-0 mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50'>
          <div className='flex gap-1 p-2'>
            {/* Hours */}
            <div className='flex flex-col'>
              <div className='text-xs font-medium text-gray-700 dark:text-gray-300 text-center mb-1 px-2'>
                Hour
              </div>
              <div className='h-48 overflow-y-auto w-16 border border-gray-200 dark:border-gray-700 rounded'>
                {hourOptions.map(hour => (
                  <button
                    key={hour}
                    onClick={() => {
                      setInternalHour(hour);
                      handleTimeChange(
                        hour,
                        internalMinute,
                        use12Hour ? period : undefined
                      );
                    }}
                    className={cn(
                      'w-full px-3 py-1.5 text-sm text-center',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'transition-colors',
                      hour === internalHour &&
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                    )}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div className='flex flex-col'>
              <div className='text-xs font-medium text-gray-700 dark:text-gray-300 text-center mb-1 px-2'>
                Min
              </div>
              <div className='h-48 overflow-y-auto w-16 border border-gray-200 dark:border-gray-700 rounded'>
                {minuteOptions.map(minute => (
                  <button
                    key={minute}
                    onClick={() => {
                      setInternalMinute(minute);
                      handleTimeChange(
                        internalHour,
                        minute,
                        use12Hour ? period : undefined
                      );
                    }}
                    className={cn(
                      'w-full px-3 py-1.5 text-sm text-center',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'transition-colors',
                      minute === internalMinute &&
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                    )}
                  >
                    {minute}
                  </button>
                ))}
              </div>
            </div>

            {/* AM/PM */}
            {use12Hour && (
              <div className='flex flex-col'>
                <div className='text-xs font-medium text-gray-700 dark:text-gray-300 text-center mb-1 px-2'>
                  &nbsp;
                </div>
                <div className='h-48 flex flex-col justify-center gap-2 w-16'>
                  <button
                    onClick={() => {
                      setPeriod('AM');
                      handleTimeChange(internalHour, internalMinute, 'AM');
                    }}
                    className={cn(
                      'px-3 py-2 text-sm text-center rounded',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'transition-colors',
                      period === 'AM' &&
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                    )}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => {
                      setPeriod('PM');
                      handleTimeChange(internalHour, internalMinute, 'PM');
                    }}
                    className={cn(
                      'px-3 py-2 text-sm text-center rounded',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'transition-colors',
                      period === 'PM' &&
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                    )}
                  >
                    PM
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
