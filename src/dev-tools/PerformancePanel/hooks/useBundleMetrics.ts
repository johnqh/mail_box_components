import { useState, useEffect, useCallback, useRef } from 'react';

export interface BundleMetrics {
  /** Total JS load time (ms) */
  jsLoadTime?: number;
  /** Total CSS load time (ms) */
  cssLoadTime?: number;
  /** Number of JS resources */
  jsCount?: number;
  /** Number of CSS resources */
  cssCount?: number;
  /** Total transfer size (bytes) */
  totalTransferSize?: number;
}

export interface UseBundleMetricsOptions {
  /** Enable tracking (default: true) */
  enabled?: boolean;
  /** Refresh interval in ms (default: 5000) */
  refreshInterval?: number;
  /** Callback when metrics update */
  onUpdate?: (metrics: BundleMetrics) => void;
}

/**
 * Hook to track bundle/resource loading metrics
 *
 * @example
 * ```tsx
 * const { metrics, refresh } = useBundleMetrics();
 * console.log('JS Load Time:', metrics.jsLoadTime);
 * ```
 */
export const useBundleMetrics = (options: UseBundleMetricsOptions = {}) => {
  const { enabled = true, refreshInterval = 5000, onUpdate } = options;
  const [metrics, setMetrics] = useState<BundleMetrics>({});

  // Use ref to avoid infinite loops when onUpdate changes
  const onUpdateRef = useRef(onUpdate);
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  const collectMetrics = useCallback(() => {
    if (typeof performance === 'undefined') return;

    try {
      const resources = performance.getEntriesByType(
        'resource'
      ) as PerformanceResourceTiming[];

      // JS resources
      const jsResources = resources.filter(
        r => r.name.endsWith('.js') || r.initiatorType === 'script'
      );
      const jsLoadTime = jsResources.reduce((sum, r) => sum + r.duration, 0);

      // CSS resources
      const cssResources = resources.filter(
        r => r.name.endsWith('.css') || r.initiatorType === 'link'
      );
      const cssLoadTime = cssResources.reduce((sum, r) => sum + r.duration, 0);

      // Total transfer size
      const totalTransferSize = resources.reduce(
        (sum, r) => sum + (r.transferSize || 0),
        0
      );

      const newMetrics: BundleMetrics = {
        jsLoadTime,
        cssLoadTime,
        jsCount: jsResources.length,
        cssCount: cssResources.length,
        totalTransferSize,
      };

      setMetrics(newMetrics);
      onUpdateRef.current?.(newMetrics);
    } catch {
      // Performance API not available
    }
  }, []); // No dependencies - uses ref internally

  const refresh = useCallback(() => {
    collectMetrics();
  }, [collectMetrics]);

  useEffect(() => {
    if (!enabled) return;

    // Initial collection
    collectMetrics();

    // Set up refresh interval
    const interval = setInterval(collectMetrics, refreshInterval);

    return () => clearInterval(interval);
  }, [enabled, refreshInterval, collectMetrics]);

  return { metrics, refresh };
};

/**
 * Format bytes to human readable string
 */
export const formatBytes = (bytes?: number): string => {
  if (bytes === undefined) return 'N/A';
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};
