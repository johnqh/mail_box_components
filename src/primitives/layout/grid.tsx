import React from 'react';
import { cn } from '../../lib/utils';

export interface GridProps {
  /** Grid content */
  children: React.ReactNode;
  /** Number of columns (responsive object or number) */
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  /** Gap between items */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Auto-fit columns with minimum width */
  autoFit?: string;
  /** Auto-fill columns with minimum width */
  autoFill?: string;
  /** Align items */
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  /** Justify items */
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  /** Additional className */
  className?: string;
}

/**
 * Grid Component
 *
 * CSS Grid layout component with responsive columns and flexible configurations.
 * Supports auto-fit, auto-fill, and explicit column counts.
 *
 * @example
 * ```tsx
 * <Grid cols={3} gap="md">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 * ```
 *
 * @example
 * ```tsx
 * <Grid
 *   cols={{ sm: 1, md: 2, lg: 3, xl: 4 }}
 *   gap="lg"
 * >
 *   {items.map(item => <Card key={item.id}>{item.content}</Card>)}
 * </Grid>
 * ```
 *
 * @example
 * ```tsx
 * <Grid autoFit="250px" gap="md">
 *   <Card>Dynamic Item</Card>
 * </Grid>
 * ```
 */
export const Grid: React.FC<GridProps> = ({
  children,
  cols = 1,
  gap = 'md',
  autoFit,
  autoFill,
  alignItems = 'stretch',
  justifyItems = 'stretch',
  className,
}) => {
  // Gap configurations
  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-12',
  };

  // Align items configurations
  const alignItemsClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  // Justify items configurations
  const justifyItemsClasses = {
    start: 'justify-items-start',
    center: 'justify-items-center',
    end: 'justify-items-end',
    stretch: 'justify-items-stretch',
  };

  // Column classes
  const getColumnClasses = () => {
    if (autoFit || autoFill) return '';

    if (typeof cols === 'number') {
      const colsMap: Record<number, string> = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
        10: 'grid-cols-10',
        11: 'grid-cols-11',
        12: 'grid-cols-12',
      };
      return colsMap[cols] || 'grid-cols-1';
    }

    // Responsive columns
    const classes: string[] = [];
    if (cols.sm) classes.push('grid-cols-' + cols.sm);
    if (cols.md) classes.push('md:grid-cols-' + cols.md);
    if (cols.lg) classes.push('lg:grid-cols-' + cols.lg);
    if (cols.xl) classes.push('xl:grid-cols-' + cols.xl);
    return classes.join(' ');
  };

  // Auto-fit/Auto-fill styles
  let gridTemplateColumns: string | undefined;
  if (autoFit) {
    gridTemplateColumns = 'repeat(auto-fit, minmax(' + autoFit + ', 1fr))';
  } else if (autoFill) {
    gridTemplateColumns = 'repeat(auto-fill, minmax(' + autoFill + ', 1fr))';
  }

  return (
    <div
      className={cn(
        'grid',
        getColumnClasses(),
        gapClasses[gap],
        alignItemsClasses[alignItems],
        justifyItemsClasses[justifyItems],
        className
      )}
      style={gridTemplateColumns ? { gridTemplateColumns } : undefined}
    >
      {children}
    </div>
  );
};

export default Grid;
