import React from 'react';
import { cn } from '../../../lib/utils';
import { MetricRow, MetricRating } from '../components/MetricRow';

export interface CustomMetric {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Metric value */
  value: number | string;
  /** Unit suffix (e.g., 'ms', 'KB') */
  unit?: string;
  /** Description text */
  description?: string;
  /** Thresholds for rating (only for numeric values) */
  thresholds?: {
    good: number;
    poor: number;
  };
  /** Override rating color */
  rating?: MetricRating;
}

export interface CustomSectionProps {
  /** Section title */
  title?: string;
  /** Title color class */
  titleColor?: string;
  /** Custom metrics to display */
  metrics: CustomMetric[];
  /** Custom className */
  className?: string;
}

/**
 * Get rating for a custom metric based on thresholds
 */
const getCustomMetricRating = (metric: CustomMetric): MetricRating => {
  // Use explicit rating if provided
  if (metric.rating) return metric.rating;

  // Calculate rating from thresholds for numeric values
  if (typeof metric.value === 'number' && metric.thresholds) {
    const { good, poor } = metric.thresholds;
    if (metric.value <= good) return 'good';
    if (metric.value <= poor) return 'needs-improvement';
    return 'poor';
  }

  return 'neutral';
};

/**
 * CustomSection - Display user-defined custom metrics
 *
 * @example
 * ```tsx
 * <CustomSection
 *   title="Web3 Metrics"
 *   titleColor="text-orange-400"
 *   metrics={[
 *     { id: 'walletConnect', label: 'Wallet Connect', value: 245, unit: 'ms', thresholds: { good: 300, poor: 1000 } },
 *     { id: 'txPending', label: 'Pending Txs', value: 3 },
 *   ]}
 * />
 * ```
 */
export const CustomSection: React.FC<CustomSectionProps> = ({
  title = 'Custom Metrics',
  titleColor = 'text-orange-400',
  metrics,
  className,
}) => {
  if (metrics.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-1', className)}>
      <h3 className={cn('font-semibold mb-2 text-xs', titleColor)}>{title}</h3>
      <div className='space-y-1.5'>
        {metrics.map(metric => (
          <MetricRow
            key={metric.id}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            rating={getCustomMetricRating(metric)}
            description={metric.description}
          />
        ))}
      </div>
    </div>
  );
};
