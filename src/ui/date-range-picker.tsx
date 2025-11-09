import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface DateRange {
  /** Start date */
  start: Date | null;
  /** End date */
  end: Date | null;
}

export interface DateRangePickerProps {
  /** Selected date range */
  value: DateRange;
  /** Change handler */
  onChange: (range: DateRange) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disabled dates */
  disabledDates?: Date[];
  /** Number of months to show */
  months?: number;
  /** Additional className */
  className?: string;
}

/**
 * DateRangePicker Component
 *
 * Date range picker with start and end date selection.
 * Displays multiple months side by side.
 *
 * @example
 * ```tsx
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   months={2}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <DateRangePicker
 *   value={range}
 *   onChange={handleRangeChange}
 *   minDate={new Date()}
 *   disabledDates={blockedDates}
 * />
 * ```
 */
export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  months = 2,
  className,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Helper functions
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some((disabledDate) => isSameDay(date, disabledDate));
  };

  const isInRange = (date: Date) => {
    if (!value.start) return false;
    if (!value.end && !hoverDate) return false;

    const end = value.end || hoverDate;
    if (!end) return false;

    return date > value.start && date < end;
  };

  const isRangeStart = (date: Date) => {
    return value.start ? isSameDay(date, value.start) : false;
  };

  const isRangeEnd = (date: Date) => {
    return value.end ? isSameDay(date, value.end) : false;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!value.start || (value.start && value.end)) {
      // Start new range
      onChange({ start: date, end: null });
    } else {
      // Complete range
      if (date < value.start) {
        onChange({ start: date, end: value.start });
      } else {
        onChange({ start: value.start, end: date });
      }
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = (monthOffset: number) => {
    const targetDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthOffset
    );
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const daysInMonth = getDaysInMonth(targetDate);
    const firstDay = getFirstDayOfMonth(targetDate);
    const days: (Date | null)[] = [];

    // Add empty slots for days before month start
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return { days, monthName: targetDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) };
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={cn('bg-white dark:bg-gray-900 rounded-lg p-4', className)}>
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Months */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${months}, 1fr)` }}>
        {Array.from({ length: months }, (_, i) => {
          const { days, monthName } = generateCalendarDays(i);

          return (
            <div key={i}>
              {/* Month header */}
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 text-center">
                {monthName}
              </h3>

              {/* Week days */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-600 dark:text-gray-400 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => {
                  if (!date) {
                    return <div key={index} className="aspect-square" />;
                  }

                  const isDisabled = isDateDisabled(date);
                  const isStart = isRangeStart(date);
                  const isEnd = isRangeEnd(date);
                  const inRange = isInRange(date);
                  const isToday = isSameDay(date, new Date());

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(date)}
                      onMouseEnter={() => setHoverDate(date)}
                      onMouseLeave={() => setHoverDate(null)}
                      disabled={isDisabled}
                      className={cn(
                        'aspect-square flex items-center justify-center rounded-md text-sm transition-colors relative',
                        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent',
                        inRange && 'bg-blue-100 dark:bg-blue-900/30',
                        (isStart || isEnd) &&
                          'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
                        !isStart && !isEnd && !inRange && 'hover:bg-gray-100 dark:hover:bg-gray-800',
                        isToday && !isStart && !isEnd && 'border-2 border-blue-600 dark:border-blue-400'
                      )}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected range display */}
      {(value.start || value.end) && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Start: </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {value.start?.toLocaleDateString() || 'Not selected'}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">End: </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {value.end?.toLocaleDateString() || 'Not selected'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
