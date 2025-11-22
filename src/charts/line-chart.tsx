import React from 'react';
import { cn } from '../lib/utils';

export interface LineChartDataPoint {
  x: number;
  y: number;
}

export interface LineChartSeries {
  name: string;
  data: LineChartDataPoint[];
  color?: string;
}

export interface LineChartProps {
  /** Chart series */
  series: LineChartSeries[];
  /** Show legend */
  showLegend?: boolean;
  /** Show grid */
  showGrid?: boolean;
  /** Show points */
  showPoints?: boolean;
  /** Chart height */
  height?: number;
  /** X-axis labels */
  xLabels?: string[];
  /** Additional className */
  className?: string;
}

/**
 * LineChart Component
 *
 * Line chart with support for multiple series.
 * Displays trends over time or continuous data.
 *
 * @example
 * ```tsx
 * <LineChart
 *   series={[
 *     {
 *       name: 'Revenue',
 *       data: [{ x: 0, y: 100 }, { x: 1, y: 150 }, { x: 2, y: 120 }],
 *       color: '#3b82f6'
 *     },
 *     {
 *       name: 'Profit',
 *       data: [{ x: 0, y: 50 }, { x: 1, y: 80 }, { x: 2, y: 60 }],
 *       color: '#10b981'
 *     }
 *   ]}
 *   showLegend
 *   showPoints
 * />
 * ```
 */
export const LineChart: React.FC<LineChartProps> = ({
  series,
  showLegend = true,
  showGrid = true,
  showPoints = true,
  height = 300,
  xLabels,
  className,
}) => {
  const allPoints = series.flatMap(s => s.data);
  const maxY = Math.max(...allPoints.map(p => p.y));
  const minY = Math.min(...allPoints.map(p => p.y));
  const maxX = Math.max(...allPoints.map(p => p.x));

  const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const getPath = (data: LineChartDataPoint[]): string => {
    if (data.length === 0) return '';

    const points = data.map(point => {
      const x = (point.x / maxX) * 100;
      const y = 100 - ((point.y - minY) / (maxY - minY)) * 100;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Legend */}
      {showLegend && (
        <div className='flex flex-wrap gap-4 mb-4'>
          {series.map((s, i) => (
            <div key={i} className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full'
                style={{
                  backgroundColor:
                    s.color || defaultColors[i % defaultColors.length],
                }}
              />
              <span className='text-sm text-gray-700 dark:text-gray-300'>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className='bg-white dark:bg-gray-900 rounded-lg p-6'>
        <div className='relative' style={{ height: `${height}px` }}>
          {/* Grid */}
          {showGrid && (
            <div className='absolute inset-0'>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className='absolute w-full border-t border-gray-200 dark:border-gray-700'
                  style={{ top: `${i * 25}%` }}
                />
              ))}
            </div>
          )}

          {/* SVG Chart */}
          <svg
            viewBox='0 0 100 100'
            preserveAspectRatio='none'
            className='absolute inset-0 w-full h-full'
          >
            {series.map((s, i) => {
              const color = s.color || defaultColors[i % defaultColors.length];
              return (
                <g key={i}>
                  {/* Line */}
                  <path
                    d={getPath(s.data)}
                    fill='none'
                    stroke={color}
                    strokeWidth='0.5'
                    vectorEffect='non-scaling-stroke'
                  />

                  {/* Points */}
                  {showPoints &&
                    s.data.map((point, j) => {
                      const x = (point.x / maxX) * 100;
                      const y = 100 - ((point.y - minY) / (maxY - minY)) * 100;
                      return (
                        <circle
                          key={j}
                          cx={x}
                          cy={y}
                          r='1'
                          fill={color}
                          vectorEffect='non-scaling-stroke'
                        />
                      );
                    })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* X-axis labels */}
        {xLabels && (
          <div className='flex justify-between mt-2'>
            {xLabels.map((label, i) => (
              <span
                key={i}
                className='text-xs text-gray-600 dark:text-gray-400'
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;
