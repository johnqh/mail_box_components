import React from 'react';
import { cn } from '../lib/utils';

export interface ScrollAreaProps {
  /** Scrollable content */
  children: React.ReactNode;
  /** Maximum height */
  maxHeight?: string | number;
  /** Hide scrollbar */
  hideScrollbar?: boolean;
  /** Scroll direction */
  direction?: 'vertical' | 'horizontal' | 'both';
  /** Additional className */
  className?: string;
}

/**
 * ScrollArea Component
 *
 * Container with custom scrollbar styling and overflow control.
 * Provides consistent scrollable areas across the application.
 *
 * @example
 * ```tsx
 * <ScrollArea maxHeight="400px">
 *   <div>Long content...</div>
 * </ScrollArea>
 * ```
 *
 * @example
 * ```tsx
 * <ScrollArea direction="horizontal" hideScrollbar>
 *   <div className="w-[2000px]">Wide content</div>
 * </ScrollArea>
 * ```
 */
export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  maxHeight,
  hideScrollbar = false,
  direction = 'vertical',
  className,
}) => {
  // Overflow configurations
  const overflowClasses = {
    vertical: 'overflow-y-auto overflow-x-hidden',
    horizontal: 'overflow-x-auto overflow-y-hidden',
    both: 'overflow-auto',
  };

  // Scrollbar styling
  const scrollbarClasses = hideScrollbar
    ? 'scrollbar-hide'
    : cn(
        // Custom scrollbar styling
        'scrollbar-thin',
        'scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600',
        'scrollbar-track-gray-100 dark:scrollbar-track-gray-800',
        'hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500'
      );

  const maxHeightStyle =
    typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

  return (
    <div
      className={cn(
        'relative',
        overflowClasses[direction],
        scrollbarClasses,
        className
      )}
      style={maxHeightStyle ? { maxHeight: maxHeightStyle } : undefined}
    >
      {children}
    </div>
  );
};

export default ScrollArea;
