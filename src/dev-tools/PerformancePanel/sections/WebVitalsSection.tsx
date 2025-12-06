import React from 'react';
import { cn } from '../../../lib/utils';
import { MetricRow } from '../components/MetricRow';
import { WebVitalsMetrics, getWebVitalRating } from '../hooks/useWebVitals';

export interface WebVitalsSectionProps {
  /** Web Vitals metrics data */
  metrics: WebVitalsMetrics;
  /** Custom className */
  className?: string;
}

/**
 * WebVitalsSection - Display Core Web Vitals metrics
 */
export const WebVitalsSection: React.FC<WebVitalsSectionProps> = ({
  metrics,
  className,
}) => {
  const formatValue = (value?: number, decimals: number = 0): string => {
    if (value === undefined) return 'N/A';
    return value.toFixed(decimals);
  };

  return (
    <div className={cn('space-y-1', className)}>
      <h3 className='font-semibold text-yellow-400 mb-2 text-xs'>Web Vitals</h3>
      <div className='space-y-1.5'>
        <MetricRow
          label='LCP'
          value={formatValue(metrics.lcp)}
          unit='ms'
          rating={getWebVitalRating('lcp', metrics.lcp)}
          description='Largest Contentful Paint'
        />
        <MetricRow
          label='FID'
          value={formatValue(metrics.fid)}
          unit='ms'
          rating={getWebVitalRating('fid', metrics.fid)}
          description='First Input Delay'
        />
        <MetricRow
          label='CLS'
          value={formatValue(metrics.cls, 3)}
          rating={getWebVitalRating('cls', metrics.cls)}
          description='Cumulative Layout Shift'
        />
        <MetricRow
          label='FCP'
          value={formatValue(metrics.fcp)}
          unit='ms'
          rating={getWebVitalRating('fcp', metrics.fcp)}
          description='First Contentful Paint'
        />
        <MetricRow
          label='TTFB'
          value={formatValue(metrics.ttfb)}
          unit='ms'
          rating={getWebVitalRating('ttfb', metrics.ttfb)}
          description='Time to First Byte'
        />
        {metrics.inp !== undefined && (
          <MetricRow
            label='INP'
            value={formatValue(metrics.inp)}
            unit='ms'
            rating={getWebVitalRating('inp', metrics.inp)}
            description='Interaction to Next Paint'
          />
        )}
      </div>
    </div>
  );
};
