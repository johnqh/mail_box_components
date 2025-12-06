import React, { useState, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { MetricRow, MetricRating } from '../components/MetricRow';

export interface MemoryMetrics {
  /** Used JS heap size (bytes) */
  usedJSHeapSize?: number;
  /** Total JS heap size (bytes) */
  totalJSHeapSize?: number;
  /** JS heap size limit (bytes) */
  jsHeapSizeLimit?: number;
}

export interface MemorySectionProps {
  /** Refresh interval in ms (default: 2000) */
  refreshInterval?: number;
  /** Custom className */
  className?: string;
}

/**
 * Format bytes to MB string
 */
const formatMB = (bytes?: number): string => {
  if (bytes === undefined) return 'N/A';
  return (bytes / (1024 * 1024)).toFixed(1);
};

/**
 * Get memory usage rating
 */
const getMemoryRating = (used?: number, limit?: number): MetricRating => {
  if (used === undefined || limit === undefined) return 'unknown';
  const ratio = used / limit;
  if (ratio <= 0.5) return 'good';
  if (ratio <= 0.75) return 'needs-improvement';
  return 'poor';
};

/**
 * MemorySection - Display JavaScript memory metrics
 * Note: Only available in Chrome/Chromium browsers with performance.memory
 */
export const MemorySection: React.FC<MemorySectionProps> = ({
  refreshInterval = 2000,
  className,
}) => {
  const [metrics, setMetrics] = useState<MemoryMetrics>({});
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if memory API is available (Chrome only)
    // eslint-disable-next-line no-undef
    const perf = performance as Performance & {
      memory?: {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
    };

    if (!perf.memory) {
      setIsSupported(false);
      return;
    }

    const collectMetrics = () => {
      if (perf.memory) {
        setMetrics({
          usedJSHeapSize: perf.memory.usedJSHeapSize,
          totalJSHeapSize: perf.memory.totalJSHeapSize,
          jsHeapSizeLimit: perf.memory.jsHeapSizeLimit,
        });
      }
    };

    collectMetrics();
    const interval = setInterval(collectMetrics, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  if (!isSupported) {
    return null;
  }

  const usagePercent =
    metrics.usedJSHeapSize && metrics.jsHeapSizeLimit
      ? ((metrics.usedJSHeapSize / metrics.jsHeapSizeLimit) * 100).toFixed(0)
      : 'N/A';

  return (
    <div className={cn('space-y-1', className)}>
      <h3 className='font-semibold text-cyan-400 mb-2 text-xs'>Memory</h3>
      <div className='space-y-1.5'>
        <MetricRow
          label='Used Heap'
          value={formatMB(metrics.usedJSHeapSize)}
          unit='MB'
          rating={getMemoryRating(
            metrics.usedJSHeapSize,
            metrics.jsHeapSizeLimit
          )}
        />
        <MetricRow
          label='Total Heap'
          value={formatMB(metrics.totalJSHeapSize)}
          unit='MB'
          rating='neutral'
        />
        <MetricRow
          label='Usage'
          value={usagePercent}
          unit='%'
          rating={getMemoryRating(
            metrics.usedJSHeapSize,
            metrics.jsHeapSizeLimit
          )}
        />
      </div>
    </div>
  );
};
