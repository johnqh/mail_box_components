import React from 'react';
import { cn } from '../lib/utils';

export interface WaveFormProps {
  /** Audio data (amplitude values 0-1) */
  data: number[];
  /** Width */
  width?: number;
  /** Height */
  height?: number;
  /** Bar color */
  color?: string;
  /** Bar gap */
  gap?: number;
  /** Additional className */
  className?: string;
}

/**
 * WaveForm Component
 *
 * Audio waveform visualization with vertical bars.
 * Displays amplitude data as a bar chart.
 *
 * @example
 * ```tsx
 * <WaveForm
 *   data={audioAmplitudes}
 *   width={300}
 *   height={60}
 *   color="#3b82f6"
 * />
 * ```
 */
export const WaveForm: React.FC<WaveFormProps> = ({
  data,
  width = 200,
  height = 40,
  color = '#3b82f6',
  gap = 2,
  className,
}) => {
  if (data.length === 0) return null;

  const barWidth = (width - (data.length - 1) * gap) / data.length;

  return (
    <svg
      width={width}
      height={height}
      className={cn('inline-block', className)}
    >
      {data.map((amplitude, index) => {
        const barHeight = Math.max(2, amplitude * height);
        const x = index * (barWidth + gap);
        const y = (height - barHeight) / 2;

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            fill={color}
            rx={barWidth / 2}
          />
        );
      })}
    </svg>
  );
};
