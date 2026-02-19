import React, { type ReactNode } from 'react';
import { cn } from '../lib/utils';

export interface AspectFitViewProps {
  /** Aspect ratio as width / height (e.g. 16/9) */
  aspectRatio: number;
  /** Content to render inside the aspect ratio container */
  children: ReactNode;
  /** Custom className for the outer container */
  className?: string;
  /** Custom className for the inner aspect ratio box */
  innerClassName?: string;
}

/**
 * AspectFitView - A container that maintains a fixed aspect ratio using AspectFit behavior.
 *
 * The inner box scales to be as large as possible while fitting entirely within
 * the parent, constrained by both max-width and max-height. Content that overflows
 * the box is scrollable. The box is horizontally centered.
 *
 * @example
 * ```tsx
 * <AspectFitView aspectRatio={16 / 9}>
 *   <MyContent />
 * </AspectFitView>
 * ```
 */
export const AspectFitView: React.FC<AspectFitViewProps> = ({
  aspectRatio,
  children,
  className,
  innerClassName,
}) => {
  return (
    <div className={cn('h-full w-full', className)}>
      <div
        className={cn(
          'mx-auto max-h-full max-w-full overflow-auto',
          innerClassName
        )}
        style={{ aspectRatio }}
      >
        {children}
      </div>
    </div>
  );
};

export default AspectFitView;
