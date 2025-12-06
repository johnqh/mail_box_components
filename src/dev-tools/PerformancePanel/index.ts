/**
 * PerformancePanel - A floating dev panel for monitoring performance metrics
 *
 * @example
 * ```tsx
 * import { PerformancePanel, useWebVitals, useApiMetrics } from '@sudobility/components';
 *
 * // Basic usage (automatically shows in dev mode)
 * function App() {
 *   return (
 *     <>
 *       <YourApp />
 *       <PerformancePanel />
 *     </>
 *   );
 * }
 *
 * // With custom metrics
 * function App() {
 *   return (
 *     <PerformancePanel
 *       customMetrics={[
 *         { id: 'walletConnect', label: 'Wallet Connect', value: 245, unit: 'ms', thresholds: { good: 300, poor: 1000 } },
 *         { id: 'pendingTxs', label: 'Pending Txs', value: 3 },
 *       ]}
 *     />
 *   );
 * }
 *
 * // Use hooks directly for custom UI
 * function CustomMetricsDisplay() {
 *   const { metrics } = useWebVitals();
 *   return <div>LCP: {metrics.lcp}ms</div>;
 * }
 * ```
 */

// Main component
export {
  PerformancePanel,
  type PerformancePanelProps,
  type PerformancePanelSection,
} from './PerformancePanel';

// Hooks
export {
  useWebVitals,
  getWebVitalRating,
  type WebVitalsMetrics as PanelWebVitalsMetrics,
  type UseWebVitalsOptions,
} from './hooks/useWebVitals';

export {
  useBundleMetrics,
  formatBytes,
  type BundleMetrics,
  type UseBundleMetricsOptions,
} from './hooks/useBundleMetrics';

export {
  useApiMetrics,
  type ApiMetrics,
  type UseApiMetricsOptions,
} from './hooks/useApiMetrics';

export {
  useDraggable,
  type DraggablePosition,
  type UseDraggableOptions,
  type UseDraggableReturn,
} from './hooks/useDraggable';

// Components (for custom implementations)
export {
  MetricRow,
  formatMetricValue,
  type MetricRowProps,
  type MetricRating,
} from './components/MetricRow';
export {
  ScoreIndicator,
  ScoreLegend,
  type ScoreIndicatorProps,
} from './components/ScoreIndicator';
export { PanelHeader, type PanelHeaderProps } from './components/PanelHeader';

// Sections (for custom implementations)
export {
  WebVitalsSection,
  type WebVitalsSectionProps,
} from './sections/WebVitalsSection';
export {
  BundleSection,
  type BundleSectionProps,
} from './sections/BundleSection';
export { ApiSection, type ApiSectionProps } from './sections/ApiSection';
export {
  MemorySection,
  type MemoryMetrics,
  type MemorySectionProps,
} from './sections/MemorySection';
export {
  CustomSection,
  type CustomMetric,
  type CustomSectionProps,
} from './sections/CustomSection';
