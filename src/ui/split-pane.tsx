import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

export interface SplitPaneProps {
  /** Left/Top panel content */
  left: React.ReactNode;
  /** Right/Bottom panel content */
  right: React.ReactNode;
  /** Split direction */
  direction?: 'horizontal' | 'vertical';
  /** Initial split position (0-1) */
  initialSplit?: number;
  /** Controlled split position */
  split?: number;
  /** Split change handler */
  onSplitChange?: (split: number) => void;
  /** Minimum left/top panel size (pixels or %) */
  minLeftSize?: number | string;
  /** Minimum right/bottom panel size (pixels or %) */
  minRightSize?: number | string;
  /** Divider size in pixels */
  dividerSize?: number;
  /** Allow resize */
  resizable?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * SplitPane Component
 *
 * Resizable split panel layout with draggable divider.
 * Supports horizontal and vertical splits.
 *
 * @example
 * ```tsx
 * <SplitPane
 *   left={<Sidebar />}
 *   right={<MainContent />}
 *   direction="horizontal"
 *   initialSplit={0.3}
 *   minLeftSize={200}
 *   minRightSize={400}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <SplitPane
 *   left={<Editor />}
 *   right={<Preview />}
 *   direction="vertical"
 *   split={editorHeight}
 *   onSplitChange={setEditorHeight}
 * />
 * ```
 */
export const SplitPane: React.FC<SplitPaneProps> = ({
  left,
  right,
  direction = 'horizontal',
  initialSplit = 0.5,
  split: controlledSplit,
  onSplitChange,
  minLeftSize = 100,
  minRightSize = 100,
  dividerSize = 8,
  resizable = true,
  className,
}) => {
  const [internalSplit, setInternalSplit] = useState(initialSplit);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const split = controlledSplit !== undefined ? controlledSplit : internalSplit;

  // Handle mouse down on divider
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!resizable) return;
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle mouse move
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      let newSplit: number;

      if (direction === 'horizontal') {
        const x = e.clientX - rect.left;
        newSplit = x / rect.width;
      } else {
        const y = e.clientY - rect.top;
        newSplit = y / rect.height;
      }

      // Clamp between 0 and 1
      newSplit = Math.max(0, Math.min(1, newSplit));

      // Apply min sizes
      const containerSize =
        direction === 'horizontal' ? rect.width : rect.height;

      const minLeftPx =
        typeof minLeftSize === 'string'
          ? (parseFloat(minLeftSize) / 100) * containerSize
          : minLeftSize;

      const minRightPx =
        typeof minRightSize === 'string'
          ? (parseFloat(minRightSize) / 100) * containerSize
          : minRightSize;

      const minLeftRatio = minLeftPx / containerSize;
      const maxLeftRatio = 1 - minRightPx / containerSize;

      newSplit = Math.max(minLeftRatio, Math.min(maxLeftRatio, newSplit));

      if (controlledSplit !== undefined && onSplitChange) {
        onSplitChange(newSplit);
      } else {
        setInternalSplit(newSplit);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    isDragging,
    direction,
    minLeftSize,
    minRightSize,
    controlledSplit,
    onSplitChange,
  ]);

  // Prevent text selection while dragging
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = 'none';
      document.body.style.cursor =
        direction === 'horizontal' ? 'col-resize' : 'row-resize';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    return () => {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, direction]);

  const isHorizontal = direction === 'horizontal';

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full h-full flex',
        isHorizontal ? 'flex-row' : 'flex-col',
        className
      )}
    >
      {/* Left/Top panel */}
      <div
        className='overflow-auto'
        style={{
          [isHorizontal ? 'width' : 'height']: `${split * 100}%`,
        }}
      >
        {left}
      </div>

      {/* Divider */}
      <div
        onMouseDown={handleMouseDown}
        className={cn(
          'flex-shrink-0 group',
          'bg-gray-300 dark:bg-gray-700',
          resizable && 'hover:bg-blue-500 dark:hover:bg-blue-400',
          'transition-colors',
          isDragging && 'bg-blue-500 dark:bg-blue-400',
          isHorizontal ? 'cursor-col-resize' : 'cursor-row-resize',
          !resizable && 'cursor-default'
        )}
        style={{
          [isHorizontal ? 'width' : 'height']: `${dividerSize}px`,
        }}
      >
        {/* Divider handle indicator */}
        {resizable && (
          <div
            className={cn(
              'flex items-center justify-center w-full h-full',
              'text-gray-600 dark:text-gray-400',
              'group-hover:text-white',
              isDragging && 'text-white'
            )}
          >
            {isHorizontal ? (
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                <circle cx='10' cy='6' r='1.5' />
                <circle cx='10' cy='12' r='1.5' />
                <circle cx='10' cy='18' r='1.5' />
                <circle cx='14' cy='6' r='1.5' />
                <circle cx='14' cy='12' r='1.5' />
                <circle cx='14' cy='18' r='1.5' />
              </svg>
            ) : (
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                <circle cx='6' cy='10' r='1.5' />
                <circle cx='12' cy='10' r='1.5' />
                <circle cx='18' cy='10' r='1.5' />
                <circle cx='6' cy='14' r='1.5' />
                <circle cx='12' cy='14' r='1.5' />
                <circle cx='18' cy='14' r='1.5' />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Right/Bottom panel */}
      <div
        className='overflow-auto flex-1'
        style={{
          [isHorizontal ? 'width' : 'height']: `${(1 - split) * 100}%`,
        }}
      >
        {right}
      </div>
    </div>
  );
};
