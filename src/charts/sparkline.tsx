import React from 'react';
import { cn } from '../lib/utils';

export interface SparklineProps {
  /** Data points */
  data: number[];
  /** Width */
  width?: number;
  /** Height */
  height?: number;
  /** Line color */
  color?: string;
  /** Fill area */
  fill?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Sparkline Component
 *
 * Mini inline chart for showing trends.
 * Renders a simple line chart without axes.
 *
 * @example
 * ```tsx
 * <Sparkline data={[1, 5, 2, 8, 3, 7]} color="#10b981" />
 * ```
 */
export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 100,
  height = 30,
  color = '#3b82f6',
  fill = false,
  className,
}) => {
  if (data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      width={width}
      height={height}
      className={cn('inline-block', className)}
    >
      {fill && (
        <polygon
          points={`0,${height} ${points} ${width},${height}`}
          fill={color}
          opacity='0.2'
        />
      )}
      <polyline
        points={points}
        fill='none'
        stroke={color}
        strokeWidth='2'
        strokeLinejoin='round'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default Sparkline;
