import { useState, useEffect, useCallback, useRef } from 'react';

export interface WebVitalsMetrics {
  lcp?: number; // Largest Contentful Paint (ms)
  fid?: number; // First Input Delay (ms)
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint (ms)
  ttfb?: number; // Time to First Byte (ms)
  inp?: number; // Interaction to Next Paint (ms)
}

export interface UseWebVitalsOptions {
  /** Enable tracking (default: true in dev, false in prod) */
  enabled?: boolean;
  /** Callback when metrics update */
  onUpdate?: (metrics: WebVitalsMetrics) => void;
}

/**
 * Hook to track Core Web Vitals metrics
 *
 * @example
 * ```tsx
 * const { metrics, isSupported } = useWebVitals();
 * console.log('LCP:', metrics.lcp);
 * ```
 */
export const useWebVitals = (options: UseWebVitalsOptions = {}) => {
  const { enabled = true, onUpdate } = options;
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({});
  const [isSupported, setIsSupported] = useState(true);

  // Use ref to avoid infinite loops when onUpdate changes
  const onUpdateRef = useRef(onUpdate);
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  const updateMetrics = useCallback(
    (newMetrics: Partial<WebVitalsMetrics>) => {
      setMetrics(prev => {
        const updated = { ...prev, ...newMetrics };
        onUpdateRef.current?.(updated);
        return updated;
      });
    },
    [] // No dependencies - uses ref internally
  );

  useEffect(() => {
    if (!enabled) return;

    // Check if PerformanceObserver is supported
    if (typeof PerformanceObserver === 'undefined') {
      setIsSupported(false);
      return;
    }

    const observers: PerformanceObserver[] = [];

    // LCP - Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };
        updateMetrics({ lcp: lastEntry.renderTime || lastEntry.loadTime });
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      observers.push(lcpObserver);
    } catch {
      // LCP not supported
    }

    // FID - First Input Delay
    try {
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(
          (entry: PerformanceEntry & { processingStart?: number }) => {
            if (entry.processingStart) {
              updateMetrics({ fid: entry.processingStart - entry.startTime });
            }
          }
        );
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      observers.push(fidObserver);
    } catch {
      // FID not supported
    }

    // CLS - Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries() as Array<
          PerformanceEntry & { hadRecentInput?: boolean; value?: number }
        >) {
          if (!entry.hadRecentInput && entry.value) {
            clsValue += entry.value;
            updateMetrics({ cls: clsValue });
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      observers.push(clsObserver);
    } catch {
      // CLS not supported
    }

    // FCP - First Contentful Paint
    try {
      const fcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            updateMetrics({ fcp: entry.startTime });
          }
        });
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
      observers.push(fcpObserver);
    } catch {
      // FCP not supported
    }

    // INP - Interaction to Next Paint
    try {
      const inpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries() as Array<
          PerformanceEntry & { duration?: number }
        >;
        entries.forEach(entry => {
          if (entry.duration) {
            updateMetrics({ inp: entry.duration });
          }
        });
      });
      inpObserver.observe({ type: 'event', buffered: true });
      observers.push(inpObserver);
    } catch {
      // INP not supported
    }

    // TTFB - Time to First Byte (from Navigation Timing)
    try {
      const navTiming = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      if (navTiming) {
        updateMetrics({
          ttfb: navTiming.responseStart - navTiming.requestStart,
        });
      }
    } catch {
      // Navigation timing not supported
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [enabled, updateMetrics]);

  return { metrics, isSupported };
};

/**
 * Get rating for a Web Vital metric
 */
export const getWebVitalRating = (
  metric: keyof WebVitalsMetrics,
  value?: number
): 'good' | 'needs-improvement' | 'poor' | 'unknown' => {
  if (value === undefined) return 'unknown';

  const thresholds: Record<
    keyof WebVitalsMetrics,
    { good: number; poor: number }
  > = {
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
    fcp: { good: 1800, poor: 3000 },
    ttfb: { good: 800, poor: 1800 },
    inp: { good: 200, poor: 500 },
  };

  const threshold = thresholds[metric];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};
