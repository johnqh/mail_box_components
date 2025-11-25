import React from 'react';
import { cn } from '../lib/utils';

export interface AspectRatioProps {
  /** Content to maintain aspect ratio */
  children: React.ReactNode;
  /** Aspect ratio (width/height or preset) */
  ratio?: number | '16/9' | '4/3' | '1/1' | '21/9' | '3/2';
  /** Additional className */
  className?: string;
}

/**
 * AspectRatio Component
 *
 * Maintains a specific aspect ratio for its content.
 * Useful for responsive images, videos, and embeds.
 *
 * @example
 * ```tsx
 * <AspectRatio ratio="16/9">
 *   <img src="/image.jpg" alt="Example" />
 * </AspectRatio>
 * ```
 *
 * @example
 * ```tsx
 * <AspectRatio ratio={1.5}>
 *   <iframe src="..." />
 * </AspectRatio>
 * ```
 */
export const AspectRatio: React.FC<AspectRatioProps> = ({
  children,
  ratio = '16/9',
  className,
}) => {
  // Convert preset ratios to numbers
  const ratioMap = {
    '16/9': 16 / 9,
    '4/3': 4 / 3,
    '1/1': 1,
    '21/9': 21 / 9,
    '3/2': 3 / 2,
  };

  const numericRatio = typeof ratio === 'string' ? ratioMap[ratio] : ratio;
  const paddingBottom = `${(1 / numericRatio) * 100}%`;

  return (
    <div className={cn('relative w-full', className)} style={{ paddingBottom }}>
      <div className='absolute inset-0'>{children}</div>
    </div>
  );
};
