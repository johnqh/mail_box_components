import type { ReactNode } from 'react';
import { getCardVariantColors, textVariant } from '@sudobility/design';
import { cn } from '../lib/utils';

export interface GridTileProps {
  /** Leading icon / indicator shown top-left. */
  leading?: ReactNode;
  /** A small classifier badge shown top-right (priority, status, type…). */
  topRight?: ReactNode;
  /** Primary line (object name). Clamped to 2 lines. */
  title: ReactNode;
  /** Secondary line (path / short description). Truncated, monospace. */
  subtitle?: ReactNode;
  /** Footer row of small badges / metrics. */
  footer?: ReactNode;
  /** Interactive trailing content (menu/remove) — pinned top-right, click-isolated. */
  actions?: ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * A compact, clickable card that packs an object's identity vertically so many
 * fit across a wide container — the grid counterpart to a full-width list row.
 * Use inside {@link CardGrid}. Surfaces and text follow the design system
 * (`@sudobility/design` card + text variants).
 *
 * Layout: `[leading icon ……… topRight badge]` / title (2-line clamp) / subtitle
 * (truncated path) / optional footer badge row. `actions` pin to the top-right
 * and stay independently clickable (they sit outside the main clickable button).
 */
export function GridTile({
  leading,
  topRight,
  title,
  subtitle,
  footer,
  actions,
  onClick,
  className,
}: GridTileProps) {
  const mutedIcon = 'text-muted-foreground';

  const body = (
    <>
      {(leading != null || topRight != null) && (
        <div className='flex items-center justify-between gap-2'>
          {leading != null ? (
            <span className={cn('flex shrink-0 items-center', mutedIcon)}>
              {leading}
            </span>
          ) : (
            <span />
          )}
          {topRight != null && <span className='shrink-0'>{topRight}</span>}
        </div>
      )}
      <div className={cn('mt-2 line-clamp-2', textVariant('sm', 'medium'))}>
        {title}
      </div>
      {subtitle != null && subtitle !== '' && (
        <div
          className={cn(
            'mt-0.5 truncate font-mono',
            textVariant('xs', 'normal', 'muted')
          )}
        >
          {subtitle}
        </div>
      )}
      {footer != null && (
        <div
          className={cn(
            'mt-3 flex flex-wrap items-center gap-1.5 border-t pt-2',
            'border-border'
          )}
        >
          {footer}
        </div>
      )}
    </>
  );

  return (
    <div
      className={cn(
        'relative rounded-lg p-3',
        getCardVariantColors('bordered'),
        onClick && cn('transition-colors', 'hover:bg-muted'),
        className
      )}
    >
      {onClick ? (
        <button
          type='button'
          onClick={onClick}
          className='block w-full text-left'
        >
          {body}
        </button>
      ) : (
        body
      )}
      {actions != null && (
        <div className='absolute right-2 top-2 flex items-center gap-1'>
          {actions}
        </div>
      )}
    </div>
  );
}
