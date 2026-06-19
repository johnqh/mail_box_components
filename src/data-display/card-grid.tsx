import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

export type CardGridDensity = 'default' | 'dense' | 'wide';

const DENSITY_COLS: Record<CardGridDensity, string> = {
  // Standard browseable objects.
  default: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  // Lightweight objects with very little content.
  dense: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  // Content-richer tiles (e.g. with thumbnails) that need more width.
  wide: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
};

export interface CardGridProps {
  children: ReactNode;
  /** Column density preset. Defaults to `default`. */
  density?: CardGridDensity;
  className?: string;
}

/**
 * Responsive grid for {@link GridTile} cards. Use in place of a full-width
 * `space-y` stack for sparse, browseable object lists so they fill the
 * horizontal space on wide containers instead of rendering one-per-row.
 */
export function CardGrid({
  children,
  density = 'default',
  className,
}: CardGridProps) {
  return (
    <div className={cn('grid gap-3', DENSITY_COLS[density], className)}>
      {children}
    </div>
  );
}
