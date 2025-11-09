import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

export type ResizeDirection =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface ResizableProps {
  /** Children content */
  children: React.ReactNode;
  /** Initial width */
  defaultWidth?: number;
  /** Initial height */
  defaultHeight?: number;
  /** Minimum width */
  minWidth?: number;
  /** Minimum height */
  minHeight?: number;
  /** Maximum width */
  maxWidth?: number;
  /** Maximum height */
  maxHeight?: number;
  /** Enabled resize directions */
  directions?: ResizeDirection[];
  /** Resize callback */
  onResize?: (width: number, height: number) => void;
  /** Resize end callback */
  onResizeEnd?: (width: number, height: number) => void;
  /** Show resize handles */
  showHandles?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Resizable Component
 *
 * Resizable container with draggable handles.
 * Supports all 8 resize directions with constraints.
 *
 * @example
 * ```tsx
 * <Resizable
 *   defaultWidth={400}
 *   defaultHeight={300}
 *   minWidth={200}
 *   minHeight={150}
 *   directions={['right', 'bottom', 'bottom-right']}
 *   onResize={(w, h) => console.log(w, h)}
 * >
 *   <div>Resizable content</div>
 * </Resizable>
 * ```
 *
 * @example
 * ```tsx
 * <Resizable
 *   defaultWidth={600}
 *   defaultHeight={400}
 *   maxWidth={800}
 *   maxHeight={600}
 * >
 *   <Panel />
 * </Resizable>
 * ```
 */
export const Resizable: React.FC<ResizableProps> = ({
  children,
  defaultWidth = 300,
  defaultHeight = 200,
  minWidth = 100,
  minHeight = 100,
  maxWidth,
  maxHeight,
  directions = ['right', 'bottom', 'bottom-right'],
  onResize,
  onResizeEnd,
  showHandles = true,
  className,
}) => {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] =
    useState<ResizeDirection | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  // Handle mouse down on resize handle
  const handleMouseDown =
    (direction: ResizeDirection) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsResizing(true);
      setResizeDirection(direction);
      startPos.current = {
        x: e.clientX,
        y: e.clientY,
        width,
        height,
      };
    };

  // Handle mouse move
  useEffect(() => {
    if (!isResizing || !resizeDirection) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;

      let newWidth = startPos.current.width;
      let newHeight = startPos.current.height;

      // Calculate new dimensions based on direction
      if (resizeDirection.includes('right')) {
        newWidth = startPos.current.width + deltaX;
      } else if (resizeDirection.includes('left')) {
        newWidth = startPos.current.width - deltaX;
      }

      if (resizeDirection.includes('bottom')) {
        newHeight = startPos.current.height + deltaY;
      } else if (resizeDirection.includes('top')) {
        newHeight = startPos.current.height - deltaY;
      }

      // Apply constraints
      newWidth = Math.max(minWidth, newWidth);
      newHeight = Math.max(minHeight, newHeight);

      if (maxWidth) newWidth = Math.min(maxWidth, newWidth);
      if (maxHeight) newHeight = Math.min(maxHeight, newHeight);

      setWidth(newWidth);
      setHeight(newHeight);

      if (onResize) {
        onResize(newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection(null);

      if (onResizeEnd) {
        onResizeEnd(width, height);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    isResizing,
    resizeDirection,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    onResize,
    onResizeEnd,
  ]);

  // Prevent text selection while resizing
  useEffect(() => {
    if (isResizing) {
      document.body.style.userSelect = 'none';
      document.body.style.cursor = getCursor(resizeDirection!);
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    return () => {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isResizing, resizeDirection]);

  // Get cursor for direction
  const getCursor = (direction: ResizeDirection): string => {
    const cursorMap: Record<ResizeDirection, string> = {
      top: 'ns-resize',
      right: 'ew-resize',
      bottom: 'ns-resize',
      left: 'ew-resize',
      'top-left': 'nwse-resize',
      'top-right': 'nesw-resize',
      'bottom-left': 'nesw-resize',
      'bottom-right': 'nwse-resize',
    };
    return cursorMap[direction];
  };

  // Render resize handle
  const renderHandle = (direction: ResizeDirection) => {
    if (!directions.includes(direction)) return null;

    const handleStyles: Record<ResizeDirection, string> = {
      top: 'top-0 left-0 right-0 h-1 cursor-ns-resize',
      right: 'top-0 right-0 bottom-0 w-1 cursor-ew-resize',
      bottom: 'bottom-0 left-0 right-0 h-1 cursor-ns-resize',
      left: 'top-0 left-0 bottom-0 w-1 cursor-ew-resize',
      'top-left': 'top-0 left-0 w-3 h-3 cursor-nwse-resize',
      'top-right': 'top-0 right-0 w-3 h-3 cursor-nesw-resize',
      'bottom-left': 'bottom-0 left-0 w-3 h-3 cursor-nesw-resize',
      'bottom-right': 'bottom-0 right-0 w-3 h-3 cursor-nwse-resize',
    };

    return (
      <div
        key={direction}
        className={cn(
          'absolute z-10',
          showHandles &&
            'bg-blue-500 dark:bg-blue-400 opacity-0 hover:opacity-50',
          handleStyles[direction]
        )}
        onMouseDown={handleMouseDown(direction)}
      />
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {children}

      {/* Resize handles */}
      {(
        [
          'top',
          'right',
          'bottom',
          'left',
          'top-left',
          'top-right',
          'bottom-left',
          'bottom-right',
        ] as ResizeDirection[]
      ).map(renderHandle)}
    </div>
  );
};

export default Resizable;
