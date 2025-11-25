import React, { useState, useRef } from 'react';
import { cn } from '../lib/utils';

export interface VirtualListProps<T> {
  /** List items */
  items: T[];
  /** Item height in pixels */
  itemHeight: number;
  /** Container height */
  height: number;
  /** Render item function */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Item key extractor */
  keyExtractor: (item: T, index: number) => string;
  /** Overscan count (items to render outside viewport) */
  overscan?: number;
  /** Additional className */
  className?: string;
}

/**
 * VirtualList Component
 *
 * Virtualized list for rendering large datasets efficiently.
 * Only renders visible items plus overscan buffer.
 *
 * @example
 * ```tsx
 * <VirtualList
 *   items={largeDataset}
 *   itemHeight={48}
 *   height={600}
 *   renderItem={(item) => <div>{item.name}</div>}
 *   keyExtractor={(item) => item.id}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <VirtualList
 *   items={messages}
 *   itemHeight={80}
 *   height={500}
 *   renderItem={(msg, index) => <MessageItem message={msg} index={index} />}
 *   keyExtractor={(msg) => msg.id}
 *   overscan={5}
 * />
 * ```
 */
export function VirtualList<T>({
  items,
  itemHeight,
  height,
  renderItem,
  keyExtractor,
  overscan = 3,
  className,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Calculate visible range
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + height) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      style={{ height }}
      onScroll={handleScroll}
    >
      {/* Total height spacer */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* Visible items */}
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;
          return (
            <div
              key={keyExtractor(item, actualIndex)}
              style={{
                position: 'absolute',
                top: actualIndex * itemHeight,
                height: itemHeight,
                width: '100%',
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
