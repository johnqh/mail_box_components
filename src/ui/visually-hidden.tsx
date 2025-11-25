import React from 'react';

export interface VisuallyHiddenProps {
  /** Content to hide visually but keep accessible to screen readers */
  children: React.ReactNode;
  /** HTML element to render */
  as?: 'span' | 'div';
}

/**
 * VisuallyHidden Component
 *
 * Hides content visually while keeping it accessible to screen readers.
 * Uses the sr-only pattern for accessibility.
 *
 * @example
 * ```tsx
 * <button>
 *   <Icon />
 *   <VisuallyHidden>Delete</VisuallyHidden>
 * </button>
 * ```
 *
 * @example
 * ```tsx
 * <VisuallyHidden as="div">
 *   Skip to main content
 * </VisuallyHidden>
 * ```
 */
export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  as: Component = 'span',
}) => {
  return <Component className='sr-only'>{children}</Component>;
};
