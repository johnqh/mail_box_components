import React from 'react';
import { cn } from '../lib/utils';

export interface SkeletonLoaderProps {
  /** Shape/type of skeleton */
  variant?: 'text' | 'circle' | 'rectangle' | 'avatar' | 'button';
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Additional className for the skeleton */
  className?: string;
  /** Number of lines (for text variant) */
  lines?: number;
  /** Gap between lines (for multi-line text) */
  gap?: 'sm' | 'md' | 'lg';
}

/**
 * SkeletonLoader Component
 *
 * A loading placeholder component that displays a pulsing skeleton
 * while content is being fetched. Supports various shapes and sizes
 * for different content types.
 *
 * @example
 * ```tsx
 * // Loading text
 * <SkeletonLoader variant="text" width="200px" />
 * <SkeletonLoader variant="text" lines={3} />
 *
 * // Loading avatar
 * <SkeletonLoader variant="avatar" />
 *
 * // Loading button
 * <SkeletonLoader variant="button" width="120px" />
 * ```
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width,
  height,
  className,
  lines = 1,
  gap = 'md',
}) => {
  // Variant-specific styles
  const variantStyles = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rectangle: 'rounded-lg',
    avatar: 'w-10 h-10 rounded-full',
    button: 'h-10 rounded-lg',
  };

  // Gap between lines
  const gapClasses = {
    sm: 'space-y-1',
    md: 'space-y-2',
    lg: 'space-y-3',
  };

  // Single skeleton element
  const renderSkeleton = (key?: number) => {
    const style: React.CSSProperties = {};

    if (width) {
      style.width = typeof width === 'number' ? `${width}px` : width;
    }

    if (height) {
      style.height = typeof height === 'number' ? `${height}px` : height;
    }

    return (
      <div
        key={key}
        className={cn(
          'animate-pulse bg-gray-200 dark:bg-gray-700',
          variantStyles[variant],
          className
        )}
        style={style}
      />
    );
  };

  // Multi-line text skeletons
  if (variant === 'text' && lines > 1) {
    return (
      <div className={gapClasses[gap]}>
        {Array.from({ length: lines }).map((_, i) => renderSkeleton(i))}
      </div>
    );
  }

  return renderSkeleton();
};

export default SkeletonLoader;
