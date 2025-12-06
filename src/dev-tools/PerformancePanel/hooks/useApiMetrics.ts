import { useState, useEffect, useCallback, useRef } from 'react';

export interface ApiMetrics {
  /** Total API call count */
  callCount: number;
  /** Total time spent on API calls (ms) */
  totalTime: number;
  /** Average API call duration (ms) */
  averageTime: number;
  /** Slowest API call (ms) */
  slowestCall?: number;
  /** Failed API calls */
  failedCalls: number;
}

export interface UseApiMetricsOptions {
  /** Enable tracking (default: true) */
  enabled?: boolean;
  /** URL patterns to match API calls (default: ['/api/', 'graphql']) */
  patterns?: string[];
  /** Refresh interval in ms (default: 5000) */
  refreshInterval?: number;
  /** Callback when metrics update */
  onUpdate?: (metrics: ApiMetrics) => void;
}

const DEFAULT_PATTERNS = ['/api/', 'graphql', '.json'];

/**
 * Hook to track API call metrics
 *
 * @example
 * ```tsx
 * const { metrics } = useApiMetrics({
 *   patterns: ['/api/', 'graphql']
 * });
 * console.log('API Calls:', metrics.callCount);
 * ```
 */
export const useApiMetrics = (options: UseApiMetricsOptions = {}) => {
  const {
    enabled = true,
    patterns = DEFAULT_PATTERNS,
    refreshInterval = 5000,
    onUpdate,
  } = options;

  const [metrics, setMetrics] = useState<ApiMetrics>({
    callCount: 0,
    totalTime: 0,
    averageTime: 0,
    failedCalls: 0,
  });

  // Use refs to avoid infinite loops when patterns/onUpdate change
  const patternsRef = useRef(patterns);
  const onUpdateRef = useRef(onUpdate);

  useEffect(() => {
    patternsRef.current = patterns;
  }, [patterns]);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  const collectMetrics = useCallback(() => {
    if (typeof performance === 'undefined') return;

    try {
      const resources = performance.getEntriesByType(
        'resource'
      ) as PerformanceResourceTiming[];

      // Filter API calls based on patterns (use ref for stable reference)
      const currentPatterns = patternsRef.current;
      const apiCalls = resources.filter(r =>
        currentPatterns.some(pattern => r.name.includes(pattern))
      );

      if (apiCalls.length === 0) {
        return;
      }

      const totalTime = apiCalls.reduce((sum, r) => sum + r.duration, 0);
      const slowestCall = Math.max(...apiCalls.map(r => r.duration));

      // Count failed calls (response status >= 400 or no response)
      const failedCalls = apiCalls.filter(r => {
        // responseStatus is available in newer browsers
        const status = (
          r as PerformanceResourceTiming & { responseStatus?: number }
        ).responseStatus;
        return status !== undefined && status >= 400;
      }).length;

      const newMetrics: ApiMetrics = {
        callCount: apiCalls.length,
        totalTime,
        averageTime: totalTime / apiCalls.length,
        slowestCall,
        failedCalls,
      };

      setMetrics(newMetrics);
      onUpdateRef.current?.(newMetrics);
    } catch {
      // Performance API not available
    }
  }, []); // No dependencies - uses refs internally

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
