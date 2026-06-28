import React from 'react';
import { cn } from '../../../lib/utils';
import { MetricRating } from './MetricRow';

export interface ScoreIndicatorProps {
  /** Rating to display */
  rating: MetricRating;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show label alongside indicator */
  showLabel?: boolean;
  /** Custom className */
  className?: string;
}

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

const ratingColors: Record<MetricRating, string> = {
  good: 'bg-success',
  'needs-improvement': 'bg-warning',
  poor: 'bg-destructive',
  unknown: 'bg-muted',
  neutral: 'bg-muted',
};

const ratingLabels: Record<MetricRating, string> = {
  good: 'Good',
  'needs-improvement': 'Needs Improvement',
  poor: 'Poor',
  unknown: 'Unknown',
  neutral: 'Neutral',
};

/**
 * ScoreIndicator - Visual indicator for performance rating
 */
export const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({
  rating,
  size = 'sm',
  showLabel = false,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span
        className={cn('rounded-full', sizeClasses[size], ratingColors[rating])}
      />
      {showLabel && (
        <span className='text-xs text-muted-foreground'>
          {ratingLabels[rating]}
        </span>
      )}
    </div>
  );
};

/**
 * ScoreLegend - Legend showing all rating colors
 */
export const ScoreLegend: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={cn('flex gap-3 text-[10px] text-muted-foreground', className)}
    >
      <span className='flex items-center gap-1'>
        <span className='w-2 h-2 rounded-full bg-success' />
        Good
      </span>
      <span className='flex items-center gap-1'>
        <span className='w-2 h-2 rounded-full bg-warning' />
        Needs Improvement
      </span>
      <span className='flex items-center gap-1'>
        <span className='w-2 h-2 rounded-full bg-destructive' />
        Poor
      </span>
    </div>
  );
};
