import React from 'react';
import { cn } from '@sudobility/components';

export interface PieChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  /** Chart data */
  data: PieChartDataPoint[];
  /** Chart variant */
  variant?: 'pie' | 'donut';
  /** Show legend */
  showLegend?: boolean;
  /** Show percentages */
  showPercentages?: boolean;
  /** Chart size */
  size?: number;
  /** Donut hole size (percentage) */
  donutHoleSize?: number;
  /** Additional className */
  className?: string;
}

/**
 * PieChart Component
 *
 * Pie or donut chart for displaying proportional data.
 * Automatically calculates percentages and angles.
 *
 * @example
 * ```tsx
 * <PieChart
 *   data={[
 *     { label: 'Chrome', value: 60, color: '#3b82f6' },
 *     { label: 'Firefox', value: 25, color: '#f59e0b' },
 *     { label: 'Safari', value: 15, color: '#10b981' }
 *   ]}
 *   variant="donut"
 *   showLegend
 *   showPercentages
 * />
 * ```
 */
export const PieChart: React.FC<PieChartProps> = ({
  data,
  variant = 'pie',
  showLegend = true,
  showPercentages = false,
  size = 200,
  donutHoleSize = 40,
  className,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const defaultColors = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
  ];

  const slices = data.reduce<
    Array<{
      label: string;
      value: number;
      color: string;
      percentage: number;
      startAngle: number;
      endAngle: number;
    }>
  >((acc, item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = acc.length > 0 ? acc[acc.length - 1].endAngle : -90;
    const endAngle = startAngle + angle;

    acc.push({
      ...item,
      percentage,
      startAngle,
      endAngle,
      color: item.color || defaultColors[index % defaultColors.length],
    });

    return acc;
  }, []);

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    if (variant === 'donut') {
      const innerRadius = (radius * donutHoleSize) / 100;
      const innerStart = polarToCartesian(x, y, innerRadius, endAngle);
      const innerEnd = polarToCartesian(x, y, innerRadius, startAngle);

      return [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
        'L',
        innerEnd.x,
        innerEnd.y,
        'A',
        innerRadius,
        innerRadius,
        0,
        largeArcFlag,
        1,
        innerStart.x,
        innerStart.y,
        'Z',
      ].join(' ');
    }

    return [
      'M',
      x,
      y,
      'L',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      'Z',
    ].join(' ');
  };

  const center = size / 2;
  const radius = size / 2 - 10;

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* Chart */}
      <svg width={size} height={size} className='transform rotate-0'>
        {slices.map((slice, index) => (
          <path
            key={index}
            d={describeArc(
              center,
              center,
              radius,
              slice.startAngle,
              slice.endAngle
            )}
            fill={slice.color}
            className='transition-opacity hover:opacity-80'
          />
        ))}
      </svg>

      {/* Legend */}
      {showLegend && (
        <div className='flex flex-col gap-2'>
          {slices.map((slice, index) => (
            <div key={index} className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-sm'
                style={{ backgroundColor: slice.color }}
              />
              <span className='text-sm text-gray-700 dark:text-gray-300'>
                {slice.label}
                {showPercentages && (
                  <span className='text-gray-500 dark:text-gray-400 ml-1'>
                    ({Math.round(slice.percentage)}%)
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PieChart;
