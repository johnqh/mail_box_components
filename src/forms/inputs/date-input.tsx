import React from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { cn } from '../../lib/utils';

export interface DateInputProps {
  /** Current value (ISO date string YYYY-MM-DD or Date object) */
  value: string | Date;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Input type */
  type?: 'date' | 'time' | 'datetime-local' | 'month' | 'week';
  /** Minimum date/time */
  min?: string;
  /** Maximum date/time */
  max?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Show calendar icon */
  showIcon?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
  /** Additional input props */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * DateInput Component
 *
 * Date, time, or datetime input field with optional icon.
 * Supports various input types and formats with consistent styling.
 *
 * @example
 * ```tsx
 * <DateInput
 *   value={startDate}
 *   onChange={setStartDate}
 *   type="date"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <DateInput
 *   value={appointmentTime}
 *   onChange={setAppointmentTime}
 *   type="datetime-local"
 *   min={new Date().toISOString().slice(0, 16)}
 *   showIcon
 * />
 * ```
 */
export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  type = 'date',
  min,
  max,
  disabled = false,
  showIcon = false,
  placeholder,
  size = 'md',
  className,
  inputProps,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      input: 'py-1.5 text-sm',
      icon: 'h-4 w-4',
      padding: showIcon ? 'pl-8 pr-3' : 'px-3',
      iconLeft: 'left-0 pl-2.5',
    },
    md: {
      input: 'py-2 text-base',
      icon: 'h-5 w-5',
      padding: showIcon ? 'pl-10 pr-4' : 'px-4',
      iconLeft: 'left-0 pl-3',
    },
    lg: {
      input: 'py-3 text-lg',
      icon: 'h-6 w-6',
      padding: showIcon ? 'pl-12 pr-4' : 'px-4',
      iconLeft: 'left-0 pl-3.5',
    },
  };

  const sizeConfig = sizeClasses[size];

  // Convert Date object to string if needed
  const stringValue =
    value instanceof Date ? formatDateForInput(value, type) : value;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn('relative', className)}>
      {/* Calendar Icon */}
      {showIcon && (
        <div
          className={cn(
            'absolute inset-y-0 flex items-center pointer-events-none',
            sizeConfig.iconLeft
          )}
        >
          <CalendarIcon
            className={cn(sizeConfig.icon, 'text-gray-400 dark:text-gray-500')}
          />
        </div>
      )}

      {/* Input */}
      <input
        type={type}
        value={stringValue}
        onChange={handleChange}
        min={min}
        max={max}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          'block w-full rounded-lg border',
          'bg-white dark:bg-gray-800',
          'text-gray-900 dark:text-gray-100',
          'placeholder-gray-400 dark:placeholder-gray-500',
          'border-gray-300 dark:border-gray-600',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'transition-colors duration-200',
          sizeConfig.input,
          sizeConfig.padding,
          disabled && 'opacity-50 cursor-not-allowed',
          // Ensure calendar picker icon is visible on the right
          'appearance-none',
          '[&::-webkit-calendar-picker-indicator]:opacity-100',
          '[&::-webkit-calendar-picker-indicator]:cursor-pointer'
        )}
        {...inputProps}
      />
    </div>
  );
};

/**
 * Format Date object to string for input based on type
 */
function formatDateForInput(date: Date, type: DateInputProps['type']): string {
  const pad = (n: number) => String(n).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  switch (type) {
    case 'date':
      return `${year}-${month}-${day}`;
    case 'time':
      return `${hours}:${minutes}`;
    case 'datetime-local':
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    case 'month':
      return `${year}-${month}`;
    case 'week': {
      // Calculate ISO week number
      const firstDayOfYear = new Date(year, 0, 1);
      const daysSinceFirstDay = Math.floor(
        (date.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000)
      );
      const weekNumber = Math.ceil(
        (daysSinceFirstDay + firstDayOfYear.getDay() + 1) / 7
      );
      return `${year}-W${pad(weekNumber)}`;
    }
    default:
      return `${year}-${month}-${day}`;
  }
}
