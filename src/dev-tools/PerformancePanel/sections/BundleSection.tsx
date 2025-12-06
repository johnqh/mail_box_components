import React from 'react';
import { cn } from '../../../lib/utils';
import { MetricRow } from '../components/MetricRow';
import { BundleMetrics, formatBytes } from '../hooks/useBundleMetrics';

export interface BundleSectionProps {
  /** Bundle metrics data */
  metrics: BundleMetrics;
  /** Custom className */
  className?: string;
}

/**
 * BundleSection - Display bundle/resource loading metrics
 */
export const BundleSection: React.FC<BundleSectionProps> = ({
  metrics,
  className,
}) => {
  const formatTime = (value?: number): string => {
    if (value === undefined) return 'N/A';
    return value.toFixed(0);
  };

  return (
    <div className={cn('space-y-1', className)}>
      <h3 className='font-semibold text-blue-400 mb-2 text-xs'>
        Bundle Performance
      </h3>
      <div className='space-y-1.5'>
        <MetricRow
          label='JS Load'
          value={formatTime(metrics.jsLoadTime)}
          unit='ms'
          rating='neutral'
        />
        <MetricRow
          label='CSS Load'
          value={formatTime(metrics.cssLoadTime)}
          unit='ms'
          rating='neutral'
        />
        <MetricRow
          label='JS Files'
          value={metrics.jsCount ?? 'N/A'}
          rating='neutral'
        />
        <MetricRow
          label='Transfer Size'
          value={formatBytes(metrics.totalTransferSize)}
          rating='neutral'
        />
      </div>
    </div>
  );
};
