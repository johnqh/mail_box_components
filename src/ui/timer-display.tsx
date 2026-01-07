import React from 'react';
import { cn } from '../lib/utils';
import { Text } from './text';

export interface TimerDisplayProps {
  /** Formatted time string (e.g., "12:34", "1:23:45") */
  time: string;
  /** Whether the timer is active/running */
  isActive?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show clock icon */
  showIcon?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * TimerDisplay Component
 *
 * Displays a formatted time with optional clock icon.
 * Uses monospace font for consistent digit width.
 *
 * @example
 * ```tsx
 * <TimerDisplay time="12:34" isActive />
 * ```
 *
 * @example
 * ```tsx
 * <TimerDisplay time="1:23:45" size="lg" showIcon={false} />
 * ```
 */
export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  time,
  isActive = true,
  size = 'sm',
  showIcon = true,
  className,
}) => {
  const sizeClasses = {
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-2.5',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizes: Record<string, 'sm' | 'base' | 'lg'> = {
    sm: 'sm',
    md: 'base',
    lg: 'lg',
  };

  return (
    <div
      className={cn('flex items-center', sizeClasses[size], className)}
      role='timer'
      aria-label={`Timer: ${time}`}
    >
      {showIcon && (
        <svg
          className={cn(
            iconSizes[size],
            isActive
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-400 dark:text-gray-500'
          )}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      )}
      <Text
        as='span'
        size={textSizes[size]}
        weight='medium'
        color={isActive ? 'default' : 'muted'}
        className='font-mono tabular-nums'
      >
        {time}
      </Text>
    </div>
  );
};
