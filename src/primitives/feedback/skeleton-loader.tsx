import React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonLoaderProps {
  /** Shape/type of skeleton */
  variant?: 'text' | 'circle' | 'rectangle' | 'avatar' | 'button';
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Additional className for the skeleton */
  className?: string;
  /** Number of skeleton elements to render */
  count?: number;
  /** Number of lines (for text variant) - alias for count */
  lines?: number;
  /** Enable/disable animation */
  animate?: boolean;
  /** Custom border radius */
  borderRadius?: string;
  /** Theme color scheme */
  theme?: 'light' | 'dark';
  /** Spacing between multiple skeletons (in Tailwind units) */
  spacing?: number;
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
 * <SkeletonLoader variant="text" count={3} />
 *
 * // Loading avatar
 * <SkeletonLoader variant="circle" width="40px" height="40px" />
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
  count,
  lines = 1,
  animate = true,
  borderRadius,
  theme,
  spacing,
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

  // Theme-specific colors
  const themeClasses = {
    light: 'bg-gray-200',
    dark: 'bg-gray-700',
  };

  // Gap between lines
  const gapClasses = {
    sm: 'space-y-1',
    md: 'space-y-2',
    lg: 'space-y-3',
  };

  // Determine number of elements to render
  const elementCount = count ?? lines;

  // Single skeleton element
  const renderSkeleton = (key?: number) => {
    const style: React.CSSProperties = {};

    if (width) {
      style.width = typeof width === 'number' ? `${width}px` : width;
    }

    if (height) {
      style.height = typeof height === 'number' ? `${height}px` : height;
    }

    if (borderRadius) {
      style.borderRadius = borderRadius;
    }

    return (
      <div
        key={key}
        className={cn(
          animate && 'animate-pulse',
          theme ? themeClasses[theme] : 'bg-gray-200 dark:bg-gray-700',
          variantStyles[variant],
          className
        )}
        style={style}
      />
    );
  };

  // Multiple skeletons
  if (elementCount > 1) {
    // Use spacing prop if provided, otherwise use gap classes
    const spacingClass =
      spacing !== undefined ? `space-y-${spacing}` : gapClasses[gap];

    return (
      <div className={cn(spacingClass)}>
        {Array.from({ length: elementCount }).map((_, i) => renderSkeleton(i))}
      </div>
    );
  }

  return renderSkeleton();
};

export default SkeletonLoader;
