import React, { useState, useEffect } from 'react';
import { cn } from '@sudobility/components';

export interface CountdownTimerProps {
  /** Target date/time */
  targetDate: Date;
  /** Completion callback */
  onComplete?: () => void;
  /** Show labels */
  showLabels?: boolean;
  /** Show days */
  showDays?: boolean;
  /** Show hours */
  showHours?: boolean;
  /** Show minutes */
  showMinutes?: boolean;
  /** Show seconds */
  showSeconds?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * CountdownTimer Component
 *
 * Countdown timer displaying days, hours, minutes, and seconds.
 * Auto-updates every second until target date is reached.
 *
 * @example
 * ```tsx
 * <CountdownTimer
 *   targetDate={new Date('2024-12-31T23:59:59')}
 *   onComplete={() => console.log('Countdown finished!')}
 *   showLabels
 * />
 * ```
 *
 * @example
 * ```tsx
 * <CountdownTimer
 *   targetDate={deadline}
 *   showDays={false}
 *   compact
 * />
 * ```
 */
export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  onComplete,
  showLabels = true,
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  compact = false,
  className,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        if (onComplete) {
          onComplete();
        }
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  // Render time unit
  const renderTimeUnit = (value: number, label: string, show: boolean) => {
    if (!show) return null;

    if (compact) {
      return (
        <span className='inline-flex items-baseline'>
          <span className='text-2xl font-bold text-gray-900 dark:text-white tabular-nums'>
            {value.toString().padStart(2, '0')}
          </span>
          {showLabels && (
            <span className='text-xs text-gray-600 dark:text-gray-400 ml-0.5'>
              {label[0].toLowerCase()}
            </span>
          )}
        </span>
      );
    }

    return (
      <div className='flex flex-col items-center'>
        <div
          className={cn(
            'min-w-[60px] px-4 py-3 rounded-lg',
            'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
            'shadow-lg'
          )}
        >
          <span className='text-3xl font-bold text-white tabular-nums'>
            {value.toString().padStart(2, '0')}
          </span>
        </div>
        {showLabels && (
          <span className='text-xs font-medium text-gray-600 dark:text-gray-400 mt-2 uppercase tracking-wider'>
            {label}
          </span>
        )}
      </div>
    );
  };

  if (timeLeft.isExpired) {
    return (
      <div className={cn('text-center', className)}>
        <div className='text-2xl font-bold text-gray-900 dark:text-white'>
          Time's Up!
        </div>
        <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
          The countdown has ended
        </p>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'flex items-center justify-center',
          compact ? 'gap-2' : 'gap-4'
        )}
      >
        {renderTimeUnit(timeLeft.days, 'Days', showDays)}
        {!compact && showDays && showHours && (
          <div className='text-3xl font-bold text-gray-400 dark:text-gray-600'>
            :
          </div>
        )}
        {renderTimeUnit(timeLeft.hours, 'Hours', showHours)}
        {!compact && showHours && showMinutes && (
          <div className='text-3xl font-bold text-gray-400 dark:text-gray-600'>
            :
          </div>
        )}
        {renderTimeUnit(timeLeft.minutes, 'Minutes', showMinutes)}
        {!compact && showMinutes && showSeconds && (
          <div className='text-3xl font-bold text-gray-400 dark:text-gray-600'>
            :
          </div>
        )}
        {renderTimeUnit(timeLeft.seconds, 'Seconds', showSeconds)}
      </div>
    </div>
  );
};
