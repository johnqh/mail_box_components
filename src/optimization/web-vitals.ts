/**
 * Web Vitals measurement utilities
 * Implements Google's Core Web Vitals metrics
 */

/* global PerformanceEntryList */

export type MetricName = 'CLS' | 'FCP' | 'FID' | 'LCP' | 'TTFB' | 'INP';

export interface WebVitalMetric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export type WebVitalReportCallback = (metric: WebVitalMetric) => void;

// Thresholds for rating metrics (based on Google's Web Vitals guidelines)
const THRESHOLDS: Record<MetricName, [number, number]> = {
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  FID: [100, 300],
  LCP: [2500, 4000],
  TTFB: [800, 1800],
  INP: [200, 500],
};

function getRating(
  name: MetricName,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const [good, poor] = THRESHOLDS[name];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

function observe(
  type: string,
  callback: (entries: PerformanceEntryList) => void
): PerformanceObserver | undefined {
  try {
    if (PerformanceObserver.supportedEntryTypes?.includes(type)) {
      const observer = new PerformanceObserver(list => {
        callback(list.getEntries());
      });
      observer.observe({ type, buffered: true });
      return observer;
    }
  } catch {
    // PerformanceObserver not supported
  }
  return undefined;
}

/**
 * Measure Cumulative Layout Shift (CLS)
 */
export function measureCLS(onReport: WebVitalReportCallback): void {
  let clsValue = 0;

  observe('layout-shift', entries => {
    for (const entry of entries) {
      const layoutShift = entry as PerformanceEntry & {
        hadRecentInput: boolean;
        value: number;
      };
      if (!layoutShift.hadRecentInput) {
        clsValue += layoutShift.value;
      }
    }
  });

  // Report on page hide
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      onReport({
        name: 'CLS',
        value: clsValue,
        rating: getRating('CLS', clsValue),
      });
    }
  });
}

/**
 * Measure First Contentful Paint (FCP)
 */
export function measureFCP(onReport: WebVitalReportCallback): void {
  observe('paint', entries => {
    for (const entry of entries) {
      if (entry.name === 'first-contentful-paint') {
        onReport({
          name: 'FCP',
          value: entry.startTime,
          rating: getRating('FCP', entry.startTime),
        });
      }
    }
  });
}

/**
 * Measure Largest Contentful Paint (LCP)
 */
export function measureLCP(onReport: WebVitalReportCallback): void {
  let lcpValue = 0;

  observe('largest-contentful-paint', entries => {
    const lastEntry = entries[entries.length - 1];
    if (lastEntry) {
      lcpValue = lastEntry.startTime;
    }
  });

  // Report on user interaction or page hide
  const reportLCP = () => {
    if (lcpValue > 0) {
      onReport({
        name: 'LCP',
        value: lcpValue,
        rating: getRating('LCP', lcpValue),
      });
    }
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      reportLCP();
    }
  });

  ['keydown', 'click'].forEach(type => {
    document.addEventListener(type, reportLCP, { once: true, capture: true });
  });
}

/**
 * Measure First Input Delay (FID)
 */
export function measureFID(onReport: WebVitalReportCallback): void {
  observe('first-input', entries => {
    const firstInput = entries[0] as PerformanceEntry & {
      processingStart: number;
    };
    if (firstInput) {
      const value = firstInput.processingStart - firstInput.startTime;
      onReport({
        name: 'FID',
        value,
        rating: getRating('FID', value),
      });
    }
  });
}

/**
 * Measure Time to First Byte (TTFB)
 */
export function measureTTFB(onReport: WebVitalReportCallback): void {
  const navEntry = performance.getEntriesByType(
    'navigation'
  )[0] as PerformanceNavigationTiming;
  if (navEntry) {
    const value = navEntry.responseStart - navEntry.requestStart;
    onReport({
      name: 'TTFB',
      value,
      rating: getRating('TTFB', value),
    });
  }
}

/**
 * Measure Interaction to Next Paint (INP)
 */
export function measureINP(onReport: WebVitalReportCallback): void {
  const interactions: number[] = [];

  observe('event', entries => {
    for (const entry of entries) {
      const eventEntry = entry as PerformanceEntry & {
        interactionId: number;
        processingStart: number;
        processingEnd: number;
      };
      if (eventEntry.interactionId) {
        const duration = eventEntry.processingEnd - eventEntry.processingStart;
        interactions.push(duration);
      }
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && interactions.length > 0) {
      // INP is typically the 98th percentile of interactions
      interactions.sort((a, b) => a - b);
      const idx = Math.min(
        interactions.length - 1,
        Math.ceil(interactions.length * 0.98) - 1
      );
      const value = interactions[idx];
      onReport({
        name: 'INP',
        value,
        rating: getRating('INP', value),
      });
    }
  });
}

/**
 * Initialize all Web Vitals measurements
 */
export function initWebVitals(onReport?: WebVitalReportCallback): void {
  const report: WebVitalReportCallback =
    onReport ||
    (metric => {
      // Default: log to console in development
      if (
        typeof window !== 'undefined' &&
        (window as unknown as Record<string, unknown>).__DEV__
      ) {
        const color =
          metric.rating === 'good'
            ? '\x1b[32m'
            : metric.rating === 'needs-improvement'
              ? '\x1b[33m'
              : '\x1b[31m';
        // eslint-disable-next-line no-console
        console.log(
          `${color}[WebVitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})\x1b[0m`
        );
      }
    });

  measureCLS(report);
  measureFCP(report);
  measureLCP(report);
  measureFID(report);
  measureTTFB(report);
  measureINP(report);
}

/**
 * Report route change performance
 * @param fromRoute - Previous route
 * @param toRoute - New route
 * @param duration - Time taken in milliseconds
 */
export function reportRouteChange(
  fromRoute: string,
  toRoute: string,
  duration: number
): void {
  if (
    typeof window !== 'undefined' &&
    (window as unknown as Record<string, unknown>).__DEV__
  ) {
    const rating =
      duration < 100 ? 'good' : duration < 300 ? 'needs-improvement' : 'poor';
    const color =
      rating === 'good'
        ? '\x1b[32m'
        : rating === 'needs-improvement'
          ? '\x1b[33m'
          : '\x1b[31m';
    // eslint-disable-next-line no-console
    console.log(
      `${color}[RouteChange] ${fromRoute} -> ${toRoute}: ${duration}ms (${rating})\x1b[0m`
    );
  }
}

/**
 * Report custom performance metric
 * @param metricName - Name of the custom metric
 * @param value - Numeric value of the metric
 * @param attributes - Optional attributes to add context
 */
export function reportCustomMetric(
  metricName: string,
  value: number,
  attributes?: Record<string, string>
): void {
  if (
    typeof window !== 'undefined' &&
    (window as unknown as Record<string, unknown>).__DEV__
  ) {
    // eslint-disable-next-line no-console
    console.log(`[CustomMetric] ${metricName}: ${value}`, attributes || '');
  }
}

/**
 * Report API call performance
 * @param endpoint - API endpoint
 * @param duration - Time taken in milliseconds
 * @param status - HTTP status code
 * @param method - HTTP method
 */
export function reportApiCall(
  endpoint: string,
  duration: number,
  status: number,
  method = 'GET'
): void {
  if (
    typeof window !== 'undefined' &&
    (window as unknown as Record<string, unknown>).__DEV__
  ) {
    const rating =
      duration < 200 ? 'good' : duration < 500 ? 'needs-improvement' : 'poor';
    const color =
      rating === 'good'
        ? '\x1b[32m'
        : rating === 'needs-improvement'
          ? '\x1b[33m'
          : '\x1b[31m';
    // eslint-disable-next-line no-console
    console.log(
      `${color}[API] ${method} ${endpoint}: ${duration}ms (${status})\x1b[0m`
    );
  }
}
