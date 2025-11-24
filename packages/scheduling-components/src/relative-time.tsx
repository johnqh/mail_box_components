import React from 'react';
import { cn } from '@sudobility/components';

export interface RelativeTimeProps {
  /** Date to display */
  date: Date | string | number;
  /** Show full date on hover */
  showTooltip?: boolean;
  /** Update interval in seconds (0 to disable) */
  updateInterval?: number;
  /** Additional className */
  className?: string;
}

/**
 * RelativeTime Component
 *
 * Displays relative time (e.g., "2 hours ago", "just now").
 * Optionally shows full timestamp on hover and auto-updates.
 *
 * @example
 * ```tsx
 * <RelativeTime date={new Date()} />
 * <RelativeTime date="2024-01-15T10:30:00Z" showTooltip />
 * ```
 *
 * @example
 * ```tsx
 * <RelativeTime
 *   date={message.timestamp}
 *   updateInterval={60}
 *   showTooltip
 * />
 * ```
 */
export const RelativeTime: React.FC<RelativeTimeProps> = ({
  date,
  showTooltip = true,
  updateInterval = 0,
  className,
}) => {
  const [, setUpdateTrigger] = React.useState(0);

  // Parse date
  const parsedDate = React.useMemo(() => {
    if (date instanceof Date) return date;
    return new Date(date);
  }, [date]);

  // Setup auto-update
  React.useEffect(() => {
    if (updateInterval === 0) return;

    const interval = setInterval(() => {
      setUpdateTrigger(prev => prev + 1);
    }, updateInterval * 1000);

    return () => clearInterval(interval);
  }, [updateInterval]);

  // Calculate relative time
  const getRelativeTime = (): string => {
    const now = new Date();
    const diffMs = now.getTime() - parsedDate.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSeconds < 60) {
      return 'just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else if (diffWeeks < 4) {
      return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffMonths < 12) {
      return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    } else {
      return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
    }
  };

  const relativeTime = getRelativeTime();
  const fullDate = parsedDate.toLocaleString();

  return (
    <time
      dateTime={parsedDate.toISOString()}
      title={showTooltip ? fullDate : undefined}
      className={cn(className)}
    >
      {relativeTime}
    </time>
  );
};

export default RelativeTime;
