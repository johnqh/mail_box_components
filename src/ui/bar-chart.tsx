import React from 'react';
import { cn } from '../lib/utils';

export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  /** Chart data */
  data: BarChartDataPoint[];
  /** Chart orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Show values on bars */
  showValues?: boolean;
  /** Show grid lines */
  showGrid?: boolean;
  /** Bar width */
  barWidth?: number;
  /** Chart height */
  height?: number;
  /** Additional className */
  className?: string;
}

/**
 * BarChart Component
 *
 * Simple bar chart for displaying categorical data.
 * Supports vertical and horizontal orientations.
 *
 * @example
 * ```tsx
 * <BarChart
 *   data={[
 *     { label: 'Jan', value: 120, color: '#3b82f6' },
 *     { label: 'Feb', value: 150, color: '#3b82f6' },
 *     { label: 'Mar', value: 90, color: '#3b82f6' }
 *   ]}
 *   orientation="vertical"
 *   showValues
 * />
 * ```
 */
export const BarChart: React.FC<BarChartProps> = ({
  data,
  orientation = 'vertical',
  showValues = false,
  showGrid = true,
  barWidth = 40,
  height = 300,
  className,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const defaultColor = '#3b82f6';

  return (
    <div className={cn('w-full', className)}>
      <div
        className="relative bg-white dark:bg-gray-900 rounded-lg p-6"
        style={{ height: `${height}px` }}
      >
        {/* Grid lines */}
        {showGrid && (
          <div className="absolute inset-6 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="border-t border-gray-200 dark:border-gray-700"
              />
            ))}
          </div>
        )}

        {/* Chart */}
        {orientation === 'vertical' ? (
          <div className="relative h-full flex items-end justify-around gap-2">
            {data.map((item, index) => {
              const barHeight = (item.value / maxValue) * 100;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2"
                  style={{ width: `${barWidth}px` }}
                >
                  {showValues && (
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {item.value}
                    </span>
                  )}
                  <div
                    className="w-full rounded-t transition-all hover:opacity-80"
                    style={{
                      height: `${barHeight}%`,
                      backgroundColor: item.color || defaultColor,
                    }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative h-full flex flex-col justify-around gap-2">
            {data.map((item, index) => {
              const barWidth = (item.value / maxValue) * 100;
              return (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">
                    {item.label}
                  </span>
                  <div className="flex-1 flex items-center gap-2">
                    <div
                      className="h-8 rounded transition-all hover:opacity-80"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: item.color || defaultColor,
                      }}
                    />
                    {showValues && (
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BarChart;
