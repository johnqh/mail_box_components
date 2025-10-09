import React, { memo, useMemo } from 'react';

/**
 * High-performance component wrappers and utilities
 */

// Enhanced memo with custom comparison and debugging
export const createMemoComponent = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean,
  displayName?: string
) => {
  const MemoizedComponent = memo(Component, areEqual);

  if (displayName) {
    MemoizedComponent.displayName = `Memo(${displayName})`;
  }

  // Add development debugging
  if (process.env.NODE_ENV === 'development') {
    return (props: P) => {
      const renderCount = useMemo(() => {
        let count = 0;
        return () => ++count;
      }, []);

      const currentRender = renderCount();

      if (currentRender > 1) {
        // Component re-rendered multiple times - could indicate optimization opportunities
      }

      return <MemoizedComponent {...(props as any)} />;
    };
  }

  return MemoizedComponent;
};

// Component that only re-renders when specific props change
export const createSelectiveMemoComponent = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  watchedProps: Array<keyof P>
) => {
  return memo(Component, (prevProps, nextProps) => {
    return watchedProps.every(prop => prevProps[prop] === nextProps[prop]);
  });
};

// Expensive computation wrapper
export interface ExpensiveComponentProps {
  children: (result: unknown) => React.ReactNode;
  compute: () => unknown;
  deps: unknown[];
  fallback?: React.ReactNode;
}

export const ExpensiveComponent: React.FC<ExpensiveComponentProps> = memo(
  ({ children, compute, deps }) => {
    const prevDeps = React.useRef(deps);
    const prevCompute = React.useRef(compute);
    const prevResult = React.useRef<unknown>(undefined);

    const result = useMemo(() => {
      const depsChanged =
        deps.length !== prevDeps.current.length ||
        deps.some((dep, index) => dep !== prevDeps.current[index]);
      const computeChanged = compute !== prevCompute.current;

      if (depsChanged || computeChanged || prevResult.current === undefined) {
        let computedResult: unknown;

        if (process.env.NODE_ENV === 'development') {
          const start = performance.now();
          computedResult = compute();
          const end = performance.now();

          if (end - start > 16) {
            console.warn(`Expensive computation took ${end - start}ms`);
          }
        } else {
          computedResult = compute();
        }

        prevDeps.current = deps;
        prevCompute.current = compute;
        prevResult.current = computedResult;

        return computedResult;
      }

      return prevResult.current;
    }, [compute, deps]);

    return <>{children(result)}</>;
  }
);

// Virtual list item for large lists
export interface VirtualListItemProps<T> {
  item: T;
  index: number;
  style: React.CSSProperties;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const VirtualListItem = memo(
  <T,>({ item, index, style, renderItem }: VirtualListItemProps<T>) => {
    return <div style={style}>{renderItem(item, index)}</div>;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.index === nextProps.index &&
      prevProps.item === nextProps.item &&
      prevProps.style.height === nextProps.style.height &&
      prevProps.style.top === nextProps.style.top
    );
  }
) as <T>(props: VirtualListItemProps<T>) => React.JSX.Element;

// Conditional render component that avoids creating DOM nodes
export interface ConditionalRenderProps {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ConditionalRender: React.FC<ConditionalRenderProps> = memo(
  ({ condition, children, fallback = null }) => {
    return condition ? <>{children}</> : <>{fallback}</>;
  }
);

// Lazy component with intersection observer
export interface LazyComponentProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
}

export const LazyComponent: React.FC<LazyComponentProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = null,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return <div ref={elementRef}>{isVisible ? children : fallback}</div>;
};

// Performance boundary component
export interface PerformanceBoundaryProps {
  children: React.ReactNode;
  maxRenderTime?: number;
  onSlowRender?: (renderTime: number) => void;
}

export const PerformanceBoundary: React.FC<PerformanceBoundaryProps> = ({
  children,
  maxRenderTime = 16, // 16ms = 60fps
  onSlowRender,
}) => {
  const renderStart = React.useRef<number>(0);

  React.useLayoutEffect(() => {
    renderStart.current = performance.now();
  });

  React.useEffect(() => {
    const renderTime = performance.now() - renderStart.current;
    if (renderTime > maxRenderTime) {
      onSlowRender?.(renderTime);
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `Slow render detected: ${renderTime}ms (threshold: ${maxRenderTime}ms)`
        );
      }
    }
  });

  return <>{children}</>;
};

// Batch render component for multiple children
export interface BatchRenderProps {
  children: React.ReactNode[];
  batchSize?: number;
  delay?: number;
}

export const BatchRender: React.FC<BatchRenderProps> = ({
  children,
  batchSize = 5,
  delay = 0,
}) => {
  const [renderIndex, setRenderIndex] = React.useState(batchSize);

  React.useEffect(() => {
    if (renderIndex < children.length) {
      const timer = setTimeout(() => {
        setRenderIndex(prev => Math.min(prev + batchSize, children.length));
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [renderIndex, children.length, batchSize, delay]);

  return <>{children.slice(0, renderIndex)}</>;
};

export default {
  createMemoComponent,
  createSelectiveMemoComponent,
  ExpensiveComponent,
  VirtualListItem,
  ConditionalRender,
  LazyComponent,
  PerformanceBoundary,
  BatchRender,
};
