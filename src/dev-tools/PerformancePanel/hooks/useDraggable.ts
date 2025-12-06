import { useState, useEffect, useCallback, useRef, RefObject } from 'react';

export interface DraggablePosition {
  x: number | null;
  y: number | null;
}

export interface UseDraggableOptions {
  /** Enable dragging (default: true) */
  enabled?: boolean;
  /** Constrain to viewport (default: true) */
  constrainToViewport?: boolean;
  /** Only allow horizontal dragging */
  horizontalOnly?: boolean;
  /** Only allow vertical dragging */
  verticalOnly?: boolean;
  /** Initial position */
  initialPosition?: { x?: number; y?: number };
}

export interface UseDraggableReturn {
  /** Current position */
  position: DraggablePosition;
  /** Whether currently dragging */
  isDragging: boolean;
  /** Mouse down handler for drag handle */
  handleMouseDown: (e: React.MouseEvent) => void;
  /** Reset position to initial/default */
  resetPosition: () => void;
  /** Ref to attach to draggable element */
  ref: RefObject<HTMLDivElement>;
}

/**
 * Hook to make an element draggable
 *
 * @example
 * ```tsx
 * const { position, isDragging, handleMouseDown, ref } = useDraggable({
 *   horizontalOnly: true,
 * });
 *
 * return (
 *   <div ref={ref} style={{ left: position.x ?? 'auto' }}>
 *     <div onMouseDown={handleMouseDown}>Drag Handle</div>
 *   </div>
 * );
 * ```
 */
export const useDraggable = (
  options: UseDraggableOptions = {}
): UseDraggableReturn => {
  const {
    enabled = true,
    constrainToViewport = true,
    horizontalOnly = false,
    verticalOnly = false,
    initialPosition,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<DraggablePosition>({
    x: initialPosition?.x ?? null,
    y: initialPosition?.y ?? null,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      // Initialize position if not set
      if (position.x === null || position.y === null) {
        setPosition({
          x: horizontalOnly ? rect.left : (position.x ?? rect.left),
          y: verticalOnly ? rect.top : (position.y ?? rect.top),
        });
      }

      e.preventDefault();
    },
    [enabled, position, horizontalOnly, verticalOnly]
  );

  const resetPosition = useCallback(() => {
    setPosition({
      x: initialPosition?.x ?? null,
      y: initialPosition?.y ?? null,
    });
  }, [initialPosition]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      // Constrain to viewport
      if (constrainToViewport) {
        const maxX = window.innerWidth - ref.current.offsetWidth;
        const maxY = window.innerHeight - ref.current.offsetHeight;
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
      }

      setPosition({
        x: horizontalOnly ? newX : verticalOnly ? position.x : newX,
        y: verticalOnly ? newY : horizontalOnly ? position.y : newY,
      });
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
    dragOffset,
    constrainToViewport,
    horizontalOnly,
    verticalOnly,
    position.x,
    position.y,
  ]);

  return {
    position,
    isDragging,
    handleMouseDown,
    resetPosition,
    ref: ref as RefObject<HTMLDivElement>,
  };
};
