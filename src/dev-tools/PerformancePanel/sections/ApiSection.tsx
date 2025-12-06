import React from 'react';
import { cn } from '../../../lib/utils';
import { MetricRow, MetricRating } from '../components/MetricRow';
import { ApiMetrics } from '../hooks/useApiMetrics';

export interface ApiSectionProps {
  /** API metrics data */
  metrics: ApiMetrics;
  /** Custom className */
  className?: string;
}

/**
 * Get rating for average API time
 */
const getApiTimeRating = (avgTime?: number): MetricRating => {
  if (avgTime === undefined) return 'unknown';
  if (avgTime <= 200) return 'good';
  if (avgTime <= 500) return 'needs-improvement';
  return 'poor';
};

/**
 * ApiSection - Display API call metrics
 */
export const ApiSection: React.FC<ApiSectionProps> = ({
  metrics,
  className,
}) => {
  const formatTime = (value?: number): string => {
    if (value === undefined || isNaN(value)) return 'N/A';
    return value.toFixed(0);
  };

  // Don't render if no API calls
  if (metrics.callCount === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-1', className)}>
      <h3 className='font-semibold text-purple-400 mb-2 text-xs'>API Calls</h3>
      <div className='space-y-1.5'>
        <MetricRow label='Count' value={metrics.callCount} rating='neutral' />
        <MetricRow
          label='Total Time'
          value={formatTime(metrics.totalTime)}
          unit='ms'
          rating='neutral'
        />
        <MetricRow
          label='Avg Time'
          value={formatTime(metrics.averageTime)}
          unit='ms'
          rating={getApiTimeRating(metrics.averageTime)}
        />
        {metrics.slowestCall !== undefined && (
          <MetricRow
            label='Slowest'
            value={formatTime(metrics.slowestCall)}
            unit='ms'
            rating={metrics.slowestCall > 1000 ? 'poor' : 'neutral'}
          />
        )}
        {metrics.failedCalls > 0 && (
          <MetricRow label='Failed' value={metrics.failedCalls} rating='poor' />
        )}
      </div>
    </div>
  );
};
