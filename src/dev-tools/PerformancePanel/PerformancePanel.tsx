import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { cn } from '../../lib/utils';
import { PanelHeader } from './components/PanelHeader';
import { ScoreLegend } from './components/ScoreIndicator';
import { WebVitalsSection } from './sections/WebVitalsSection';
import { BundleSection } from './sections/BundleSection';
import { ApiSection } from './sections/ApiSection';
import { MemorySection } from './sections/MemorySection';
import { CustomSection, CustomMetric } from './sections/CustomSection';
import { useWebVitals, WebVitalsMetrics } from './hooks/useWebVitals';
import { useBundleMetrics, BundleMetrics } from './hooks/useBundleMetrics';
import { useApiMetrics, ApiMetrics } from './hooks/useApiMetrics';
import { useDraggable } from './hooks/useDraggable';

export type PerformancePanelSection =
  | 'webVitals'
  | 'bundle'
  | 'api'
  | 'memory'
  | 'custom';

export interface PerformancePanelProps {
  /** Enable the panel (default: only in development) */
  enabled?: boolean;
  /** Start collapsed (default: true) */
  defaultCollapsed?: boolean;
  /** Start visible (default: true) */
  defaultVisible?: boolean;
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Enable dragging (default: true) */
  draggable?: boolean;
  /** Sections to display (default: all) */
  sections?: PerformancePanelSection[];
  /** Custom metrics to display */
  customMetrics?: CustomMetric[];
  /** Custom section title */
  customSectionTitle?: string;
  /** API URL patterns to track */
  apiPatterns?: string[];
  /** Callback when metrics update */
  onMetricsUpdate?: (metrics: {
    webVitals: WebVitalsMetrics;
    bundle: BundleMetrics;
    api: ApiMetrics;
  }) => void;
  /** Custom className */
  className?: string;
}

const positionClasses = {
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
};

const DEFAULT_SECTIONS: PerformancePanelSection[] = [
  'webVitals',
  'bundle',
  'api',
  'memory',
];

/**
 * PerformancePanel - A floating dev panel for monitoring performance metrics
 *
 * @example
 * ```tsx
 * // Basic usage (dev only)
 * <PerformancePanel />
 *
 * // With custom metrics
 * <PerformancePanel
 *   customMetrics={[
 *     { id: 'walletConnect', label: 'Wallet Connect', value: 245, unit: 'ms' },
 *   ]}
 * />
 *
 * // Specific sections only
 * <PerformancePanel sections={['webVitals', 'api']} />
 * ```
 */
export const PerformancePanel: React.FC<PerformancePanelProps> = ({
  enabled,
  defaultCollapsed = true,
  defaultVisible = true,
  position = 'bottom-right',
  draggable = true,
  sections = DEFAULT_SECTIONS,
  customMetrics = [],
  customSectionTitle = 'Custom Metrics',
  apiPatterns,
  onMetricsUpdate,
  className,
}) => {
  // Determine if enabled (default: dev mode only)
  const isEnabled =
    enabled ??
    (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production');

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isVisible, setIsVisible] = useState(defaultVisible);

  // Memoize apiPatterns to prevent infinite re-renders
  // Use JSON.stringify for deep comparison of array contents
  const stableApiPatterns = useMemo(
    () => apiPatterns,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(apiPatterns)]
  );

  // Use refs for callbacks to avoid dependency issues in hooks
  const onMetricsUpdateRef = useRef(onMetricsUpdate);
  useEffect(() => {
    onMetricsUpdateRef.current = onMetricsUpdate;
  }, [onMetricsUpdate]);

  // Hooks for metrics collection (without onUpdate to avoid infinite loops)
  const { metrics: webVitalsMetrics } = useWebVitals({
    enabled: isEnabled && sections.includes('webVitals'),
    // Don't pass onUpdate here - it causes infinite loops
  });

  const { metrics: bundleMetrics } = useBundleMetrics({
    enabled: isEnabled && sections.includes('bundle'),
  });

  const { metrics: apiMetrics } = useApiMetrics({
    enabled: isEnabled && sections.includes('api'),
    patterns: stableApiPatterns,
  });

  // Call onMetricsUpdate when metrics change (using ref to avoid infinite loops)
  useEffect(() => {
    if (onMetricsUpdateRef.current) {
      onMetricsUpdateRef.current({
        webVitals: webVitalsMetrics,
        bundle: bundleMetrics,
        api: apiMetrics,
      });
    }
  }, [webVitalsMetrics, bundleMetrics, apiMetrics]);

  // Draggable functionality
  const {
    position: dragPosition,
    isDragging,
    handleMouseDown,
    ref: panelRef,
  } = useDraggable({
    enabled: draggable,
    horizontalOnly: position.includes('bottom') || position.includes('top'),
  });

  const handleToggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleShow = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Don't render if not enabled
  if (!isEnabled) return null;

  // Show button when closed
  if (!isVisible) {
    return (
      <button
        onClick={handleShow}
        className={cn(
          'fixed z-[9999]',
          positionClasses[position],
          'bg-gray-900 text-white px-3 py-2 rounded-lg',
          'shadow-lg border border-gray-700',
          'hover:bg-gray-800 transition-colors',
          'text-xs font-mono'
        )}
        type='button'
      >
        🚀 Performance
      </button>
    );
  }

  // Calculate position style
  const positionStyle: React.CSSProperties =
    dragPosition.x !== null
      ? {
          left: `${dragPosition.x}px`,
          bottom: position.includes('bottom') ? '1rem' : undefined,
          top: position.includes('top') ? '1rem' : undefined,
          position: 'fixed',
          transition: isDragging ? 'none' : 'height 0.2s ease-in-out',
        }
      : {
          transition: 'height 0.2s ease-in-out',
        };

  // Determine if we have custom metrics to show
  const hasCustomMetrics =
    customMetrics.length > 0 || sections.includes('custom');

  return (
    <div
      ref={panelRef}
      className={cn(
        dragPosition.x !== null ? '' : `fixed ${positionClasses[position]}`,
        'z-[9999] font-mono text-xs',
        isDragging && 'cursor-grabbing',
        className
      )}
      style={{ maxWidth: '320px', ...positionStyle }}
    >
      {/* Header */}
      <PanelHeader
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onClose={handleClose}
        onMouseDown={draggable ? handleMouseDown : undefined}
        isDragging={isDragging}
      />

      {/* Content */}
      <div
        className={cn(
          'bg-gray-800 text-gray-100 rounded-b-lg',
          'shadow-lg border-x border-b border-gray-700',
          'overflow-hidden transition-all duration-300 ease-in-out',
          isCollapsed
            ? 'max-h-0 opacity-0'
            : 'max-h-[70vh] opacity-100 py-2 px-3'
        )}
      >
        <div className='overflow-y-auto max-h-full space-y-3'>
          {/* Web Vitals */}
          {sections.includes('webVitals') && (
            <WebVitalsSection metrics={webVitalsMetrics} />
          )}

          {/* Bundle Performance */}
          {sections.includes('bundle') && (
            <div className='pt-3 border-t border-gray-700'>
              <BundleSection metrics={bundleMetrics} />
            </div>
          )}

          {/* API Calls */}
          {sections.includes('api') && apiMetrics.callCount > 0 && (
            <div className='pt-3 border-t border-gray-700'>
              <ApiSection metrics={apiMetrics} />
            </div>
          )}

          {/* Memory */}
          {sections.includes('memory') && (
            <div className='pt-3 border-t border-gray-700'>
              <MemorySection />
            </div>
          )}

          {/* Custom Metrics */}
          {hasCustomMetrics && customMetrics.length > 0 && (
            <div className='pt-3 border-t border-gray-700'>
              <CustomSection
                title={customSectionTitle}
                metrics={customMetrics}
              />
            </div>
          )}

          {/* Legend */}
          <div className='pt-3 border-t border-gray-700'>
            <ScoreLegend />
          </div>
        </div>
      </div>
    </div>
  );
};
