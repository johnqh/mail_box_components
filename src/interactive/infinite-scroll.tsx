import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../lib/utils';

export interface InfiniteScrollProps {
  /** Child content */
  children: React.ReactNode;
  /** Load more callback */
  onLoadMore: () => void | Promise<void>;
  /** Loading state */
  loading?: boolean;
  /** Has more data */
  hasMore?: boolean;
  /** Threshold in pixels from bottom to trigger load */
  threshold?: number;
  /** Loading component */
  loader?: React.ReactNode;
  /** End message component */
  endMessage?: React.ReactNode;
  /** Container height (for scrollable container) */
  height?: string | number;
  /** Scroll direction */
  scrollDirection?: 'vertical' | 'horizontal';
  /** Reverse scroll (for chat-like interfaces) */
  reverse?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * InfiniteScroll Component
 *
 * Load more data automatically when scrolling near the end.
 * Supports vertical/horizontal scrolling and reverse mode.
 *
 * @example
 * ```tsx
 * <InfiniteScroll
 *   onLoadMore={loadMoreItems}
 *   loading={isLoading}
 *   hasMore={hasNextPage}
 *   height="500px"
 * >
 *   {items.map(item => <div key={item.id}>{item.name}</div>)}
 * </InfiniteScroll>
 * ```
 *
 * @example
 * ```tsx
 * <InfiniteScroll
 *   onLoadMore={fetchOlderMessages}
 *   loading={loading}
 *   hasMore={hasMore}
 *   reverse
 *   height="600px"
 * >
 *   {messages.map(msg => <Message key={msg.id} {...msg} />)}
 * </InfiniteScroll>
 * ```
 */
export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  onLoadMore,
  loading = false,
  hasMore = true,
  threshold = 100,
  loader,
  endMessage,
  height,
  scrollDirection = 'vertical',
  reverse = false,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container || loading || !hasMore) return;

    const handleScroll = () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
        scrollLeft,
        scrollWidth,
        clientWidth,
      } = container;

      // Show scroll to top button (only for vertical)
      if (scrollDirection === 'vertical') {
        setShowScrollTop(scrollTop > 300);
      }

      // Calculate distance from end
      let distanceFromEnd: number;

      if (scrollDirection === 'vertical') {
        if (reverse) {
          distanceFromEnd = scrollTop;
        } else {
          distanceFromEnd = scrollHeight - scrollTop - clientHeight;
        }
      } else {
        if (reverse) {
          distanceFromEnd = scrollLeft;
        } else {
          distanceFromEnd = scrollWidth - scrollLeft - clientWidth;
        }
      }

      // Trigger load more if within threshold
      if (distanceFromEnd < threshold) {
        onLoadMore();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, threshold, onLoadMore, scrollDirection, reverse]);

  // Scroll to top
  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Default loader
  const defaultLoader = (
    <div className='flex justify-center items-center py-4'>
      <div className='w-6 h-6 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin' />
      <span className='ml-2 text-sm text-gray-600 dark:text-gray-400'>
        Loading...
      </span>
    </div>
  );

  // Default end message
  const defaultEndMessage = (
    <div className='flex justify-center items-center py-4'>
      <span className='text-sm text-gray-600 dark:text-gray-400'>
        No more items to load
      </span>
    </div>
  );

  return (
    <div className={cn('relative', className)}>
      {/* Scrollable container */}
      <div
        ref={containerRef}
        className={cn(
          scrollDirection === 'vertical'
            ? 'overflow-y-auto'
            : 'overflow-x-auto',
          'overflow-auto'
        )}
        style={{
          height: scrollDirection === 'vertical' ? height : undefined,
          width: scrollDirection === 'horizontal' ? '100%' : undefined,
          display: scrollDirection === 'horizontal' ? 'flex' : undefined,
          flexDirection:
            reverse && scrollDirection === 'vertical'
              ? 'column-reverse'
              : undefined,
        }}
      >
        {/* Reverse mode: loader at top */}
        {reverse && loading && (loader || defaultLoader)}
        {reverse && !loading && !hasMore && endMessage}

        {/* Content */}
        <div
          className={cn(
            scrollDirection === 'horizontal' && 'flex',
            scrollDirection === 'horizontal' && reverse && 'flex-row-reverse'
          )}
        >
          {children}
        </div>

        {/* Normal mode: loader at bottom */}
        {!reverse && loading && (loader || defaultLoader)}
        {!reverse && !loading && !hasMore && (endMessage || defaultEndMessage)}
      </div>

      {/* Scroll to top button (vertical only) */}
      {scrollDirection === 'vertical' && !reverse && showScrollTop && (
        <button
          onClick={scrollToTop}
          className={cn(
            'absolute bottom-4 right-4',
            'p-3 rounded-full',
            'bg-blue-600 dark:bg-blue-500',
            'text-white',
            'shadow-lg',
            'hover:bg-blue-700 dark:hover:bg-blue-600',
            'transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
          )}
          aria-label='Scroll to top'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 10l7-7m0 0l7 7m-7-7v18'
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default InfiniteScroll;
