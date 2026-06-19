import { default as React, ReactNode } from 'react';

export interface ContentLayoutProps {
  /**
   * Fixed header region, pinned to the top of the scroll area — it stays put
   * while the content scrolls beneath it. The consumer owns its content,
   * background, padding, and styling.
   */
  header: ReactNode;
  /**
   * Scrollable content region that fills the space between the header and
   * footer. The consumer owns its content and padding.
   */
  children: ReactNode;
  /**
   * Optional fixed footer region, pinned to the bottom of the scroll area. The
   * consumer owns its content, background, padding, and styling.
   */
  footer?: ReactNode;
  /** Optional class for the root container. */
  className?: string;
  /** Optional class for the content region. */
  contentClassName?: string;
}

/**
 * A pure layout primitive: a header pinned to the top, a scrollable content
 * region in the middle, and an optional footer pinned to the bottom.
 *
 * It draws nothing and adds no padding or margins of its own — every visual
 * concern (background, borders, spacing) belongs to the header / content /
 * footer the consumer provides. Because the pinned regions overlay the
 * scrolling content, the consumer should give the header and footer their own
 * opaque background so content does not show through.
 *
 * Pinning is done with `position: sticky`, so it works inside any scrolling
 * ancestor (e.g. a master/detail detail panel) with no height plumbing. When
 * the parent is height-bounded the footer rests at the bottom; otherwise it
 * sits after the content and pins on scroll.
 */
export const ContentLayout: React.FC<ContentLayoutProps> = ({
  header,
  children,
  footer,
  className = '',
  contentClassName = '',
}) => {
  return (
    <div className={`flex min-h-full flex-col ${className}`}>
      <div className='sticky top-0 z-20 flex-shrink-0'>{header}</div>
      <div className={`flex-1 ${contentClassName}`}>{children}</div>
      {footer != null && (
        <div className='sticky bottom-0 z-20 flex-shrink-0'>{footer}</div>
      )}
    </div>
  );
};
