import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface CalendarProps {
  /** Selected date */
  value?: Date;
  /** Change handler */
  onChange: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disabled dates */
  disabledDates?: Date[];
  /** Show outside days */
  showOutsideDays?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Calendar Component
 *
 * Interactive calendar for date selection.
 * Supports min/max dates and disabled dates.
 *
 * @example
 * ```tsx
 * <Calendar
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 *   minDate={new Date()}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Calendar
 *   value={date}
 *   onChange={handleDateChange}
 *   disabledDates={blockedDates}
 *   showOutsideDays={false}
 * />
 * ```
 */
export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  showOutsideDays = true,
  className,
}) => {
  const [currentMonth, setCurrentMonth] = useState(value || new Date());

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // Check if date is same day
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Check if date is disabled
  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some(disabledDate => isSameDay(date, disabledDate));
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (Date | null)[] = [];

    // Add previous month days
    if (showOutsideDays) {
      const prevMonthDays = getDaysInMonth(new Date(year, month - 1));
      for (let i = firstDay - 1; i >= 0; i--) {
        days.push(new Date(year, month - 1, prevMonthDays - i));
      }
    } else {
      for (let i = 0; i < firstDay; i++) {
        days.push(null);
      }
    }

    // Add current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    // Add next month days to fill grid
    if (showOutsideDays) {
      const remainingDays = 42 - days.length; // 6 rows * 7 days
      for (let day = 1; day <= remainingDays; day++) {
        days.push(new Date(year, month + 1, day));
      }
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDayClick = (date: Date | null) => {
    if (!date || isDateDisabled(date)) return;
    onChange(date);
  };

  const monthYear = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={cn('bg-white dark:bg-gray-900 rounded-lg p-4', className)}>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <button
          onClick={goToPreviousMonth}
          className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors'
          aria-label='Previous month'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        <h2 className='text-base font-semibold text-gray-900 dark:text-white'>
          {monthYear}
        </h2>

        <button
          onClick={goToNextMonth}
          className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors'
          aria-label='Next month'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>

      {/* Week days */}
      <div className='grid grid-cols-7 gap-1 mb-2'>
        {weekDays.map(day => (
          <div
            key={day}
            className='text-center text-xs font-medium text-gray-600 dark:text-gray-400 py-2'
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className='grid grid-cols-7 gap-1'>
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={index} className='aspect-square' />;
          }

          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const isSelected = value && isSameDay(date, value);
          const isToday = isSameDay(date, new Date());
          const isDisabled = isDateDisabled(date);

          return (
            <button
              key={index}
              onClick={() => handleDayClick(date)}
              disabled={isDisabled}
              className={cn(
                'aspect-square flex items-center justify-center rounded-md text-sm transition-colors',
                'hover:bg-gray-100 dark:hover:bg-gray-800',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent',
                isCurrentMonth
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-400 dark:text-gray-600',
                isSelected &&
                  'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
                isToday &&
                  !isSelected &&
                  'border-2 border-blue-600 dark:border-blue-400'
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
