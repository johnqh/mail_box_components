import React from 'react';
import { cn } from '../../lib/utils';

export interface DataSkeletonProps {
  /** Type of skeleton */
  variant?: 'chart' | 'table' | 'card' | 'list' | 'stat';
  /** Height of the skeleton */
  height?: string | number;
  /** Width of the skeleton */
  width?: string | number;
  /** Number of items for list/table variants */
  count?: number;
  /** Number of columns for table variant */
  columns?: number;
  /** Whether to animate the skeleton */
  animate?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * DataSkeleton Component
 *
 * Skeleton loading placeholders for various data visualization types.
 * Use as Suspense fallback for lazy-loaded charts and data components.
 *
 * @example
 * ```tsx
 * // Chart skeleton
 * <Suspense fallback={<DataSkeleton variant="chart" height={300} />}>
 *   <LazyChart data={data} />
 * </Suspense>
 * ```
 *
 * @example
 * ```tsx
 * // Table skeleton
 * <DataSkeleton variant="table" count={5} columns={4} />
 * ```
 *
 * @example
 * ```tsx
 * // Stats cards
 * <div className="grid grid-cols-4 gap-4">
 *   <DataSkeleton variant="stat" />
 *   <DataSkeleton variant="stat" />
 *   <DataSkeleton variant="stat" />
 *   <DataSkeleton variant="stat" />
 * </div>
 * ```
 */
export const DataSkeleton: React.FC<DataSkeletonProps> = ({
  variant = 'chart',
  height = 256,
  width = '100%',
  count = 5,
  columns = 4,
  animate = true,
  className,
}) => {
  const baseClasses = cn(
    'bg-gray-200 dark:bg-gray-700 rounded',
    animate && 'animate-pulse'
  );

  const heightStyle = typeof height === 'number' ? `${height}px` : height;
  const widthStyle = typeof width === 'number' ? `${width}px` : width;

  // Chart skeleton - simple rectangle with centered indicator
  if (variant === 'chart') {
    return (
      <div
        className={cn('flex items-center justify-center', className)}
        style={{ height: heightStyle, width: widthStyle }}
      >
        <div className={cn(baseClasses, 'w-full h-full')} />
      </div>
    );
  }

  // Table skeleton - header + rows
  if (variant === 'table') {
    return (
      <div className={cn('space-y-3', className)} style={{ width: widthStyle }}>
        {/* Header */}
        <div className='flex gap-4'>
          {Array.from({ length: columns }).map((_, i) => (
            <div
              key={`header-${i}`}
              className={cn(baseClasses, 'h-4 flex-1')}
            />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: count }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className='flex gap-4'>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className={cn(baseClasses, 'h-8 flex-1')}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Card skeleton - title, content, footer
  if (variant === 'card') {
    return (
      <div
        className={cn(
          'p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4',
          className
        )}
        style={{ width: widthStyle }}
      >
        <div className={cn(baseClasses, 'h-4 w-1/3')} />
        <div className='space-y-2'>
          <div className={cn(baseClasses, 'h-3 w-full')} />
          <div className={cn(baseClasses, 'h-3 w-5/6')} />
          <div className={cn(baseClasses, 'h-3 w-4/6')} />
        </div>
        <div className='flex gap-2 pt-2'>
          <div className={cn(baseClasses, 'h-8 w-20')} />
          <div className={cn(baseClasses, 'h-8 w-20')} />
        </div>
      </div>
    );
  }

  // List skeleton - items with icon and text
  if (variant === 'list') {
    return (
      <div className={cn('space-y-3', className)} style={{ width: widthStyle }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className='flex items-center gap-3'>
            <div className={cn(baseClasses, 'h-10 w-10 rounded-full')} />
            <div className='flex-1 space-y-2'>
              <div className={cn(baseClasses, 'h-4 w-3/4')} />
              <div className={cn(baseClasses, 'h-3 w-1/2')} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Stat skeleton - single metric card
  if (variant === 'stat') {
    return (
      <div
        className={cn(
          'p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3',
          className
        )}
        style={{ width: widthStyle }}
      >
        <div className={cn(baseClasses, 'h-3 w-1/2')} />
        <div className={cn(baseClasses, 'h-8 w-2/3')} />
        <div className={cn(baseClasses, 'h-3 w-1/3')} />
      </div>
    );
  }

  return null;
};

export default DataSkeleton;
