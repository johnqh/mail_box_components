/* global TouchEvent */
import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  disabled?: boolean;
  refreshingText?: string;
  pullDownText?: string;
  releaseText?: string;
  threshold?: number;
  maxPullDistance?: number;
  className?: string;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  disabled = false,
  refreshingText = 'Refreshing...',
  pullDownText = 'Pull down to refresh',
  releaseText = 'Release to refresh',
  threshold = 80,
  maxPullDistance = 120,
  className = '',
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Add native event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStartNative = (e: TouchEvent) => {
      if (disabled || isRefreshing) return;

      const isAtTop = container.scrollTop <= 0;

      if (isAtTop) {
        startY.current = e.touches[0].clientY;
        setIsPulling(true);
      }
    };

    const handleTouchMoveNative = (e: TouchEvent) => {
      if (!isPulling) return;

      const currentY = e.touches[0].clientY;
      const distance = currentY - startY.current;

      if (distance > 0 && container.scrollTop <= 0) {
        const resistanceFactor = Math.min(distance / maxPullDistance, 1);
        const adjustedDistance = Math.min(
          distance * (1 - resistanceFactor * 0.5),
          maxPullDistance
        );
        setPullDistance(adjustedDistance);

        if (distance > 10) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEndNative = async () => {
      if (!isPulling) return;

      setIsPulling(false);

      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } catch {
          // Refresh failed
        } finally {
          setIsRefreshing(false);
          setPullDistance(0);
        }
      } else {
        setPullDistance(0);
      }
    };

    container.addEventListener('touchstart', handleTouchStartNative, {
      passive: true,
    });
    container.addEventListener('touchmove', handleTouchMoveNative, {
      passive: false,
    });
    container.addEventListener('touchend', handleTouchEndNative);

    return () => {
      container.removeEventListener('touchstart', handleTouchStartNative);
      container.removeEventListener('touchmove', handleTouchMoveNative);
      container.removeEventListener('touchend', handleTouchEndNative);
    };
  }, [
    disabled,
    isRefreshing,
    isPulling,
    pullDistance,
    threshold,
    maxPullDistance,
    onRefresh,
  ]);

  const pullProgress = Math.min(pullDistance / threshold, 1);
  const showIndicator = isPulling || isRefreshing;
  const indicatorHeight = isPulling
    ? pullDistance
    : isRefreshing
      ? threshold
      : 0;

  const getStatusText = () => {
    if (isRefreshing) return refreshingText;
    if (pullDistance >= threshold) return releaseText;
    return pullDownText;
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        height: '100%',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
      }}
    >
      {/* Pull indicator */}
      <div
        className='sticky top-0 left-0 right-0 flex items-center justify-center bg-gradient-to-b from-blue-50/90 to-transparent dark:from-blue-900/20 dark:to-transparent backdrop-blur-sm z-10 transition-all duration-300 ease-out'
        style={{
          height: `${indicatorHeight}px`,
          marginTop: isPulling ? 0 : `-${indicatorHeight}px`,
          opacity: showIndicator ? 1 : 0,
          pointerEvents: 'none',
        }}
      >
        <div className='flex flex-col items-center justify-center gap-2'>
          <ArrowPathIcon
            className={`w-6 h-6 text-blue-600 dark:text-blue-400 transition-transform duration-200 ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            style={{
              transform: `rotate(${pullProgress * 360}deg)`,
            }}
          />
          {pullDistance > 20 && (
            <span className='text-xs font-medium text-blue-600 dark:text-blue-400'>
              {getStatusText()}
            </span>
          )}
        </div>
      </div>

      {/* Content - no transform to avoid breaking scroll */}
      <div
        style={{
          paddingTop: isPulling ? `${pullDistance}px` : 0,
          transition: isPulling ? 'none' : 'padding-top 200ms ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};
