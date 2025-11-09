import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

export interface MasonryProps {
  /** Children elements */
  children: React.ReactNode;
  /** Number of columns */
  columns?: number;
  /** Gap between items */
  gap?: number;
  /** Responsive breakpoints */
  breakpoints?: { [key: number]: number };
  /** Additional className */
  className?: string;
}

/**
 * Masonry Component
 *
 * Pinterest-style masonry grid layout.
 * Automatically arranges items in columns with optimal spacing.
 *
 * @example
 * ```tsx
 * <Masonry columns={3} gap={16}>
 *   {items.map(item => <Card key={item.id}>{item.content}</Card>)}
 * </Masonry>
 * ```
 *
 * @example
 * ```tsx
 * <Masonry
 *   breakpoints={{ 768: 2, 1024: 3, 1280: 4 }}
 *   gap={20}
 * >
 *   {photos.map(photo => <Image key={photo.id} src={photo.url} />)}
 * </Masonry>
 * ```
 */
export const Masonry: React.FC<MasonryProps> = ({
  children,
  columns: defaultColumns = 3,
  gap = 16,
  breakpoints,
  className,
}) => {
  const [columns, setColumns] = useState(defaultColumns);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle responsive columns
  useEffect(() => {
    if (!breakpoints) return;

    const handleResize = () => {
      const width = window.innerWidth;
      const breakpointKeys = Object.keys(breakpoints)
        .map(Number)
        .sort((a, b) => b - a);

      for (const breakpoint of breakpointKeys) {
        if (width >= breakpoint) {
          setColumns(breakpoints[breakpoint]);
          return;
        }
      }

      setColumns(defaultColumns);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints, defaultColumns]);

  // Distribute items into columns
  const childArray = React.Children.toArray(children);
  const columnArrays: React.ReactNode[][] = Array.from({ length: columns }, () => []);

  childArray.forEach((child, index) => {
    columnArrays[index % columns].push(child);
  });

  return (
    <div
      ref={containerRef}
      className={cn('flex', className)}
      style={{ gap: `${gap}px` }}
    >
      {columnArrays.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex-1 flex flex-col"
          style={{ gap: `${gap}px` }}
        >
          {column}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
