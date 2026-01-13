import React, { ReactNode } from 'react';
import { LayoutProvider } from './Layout';
import { cn } from '../lib/utils';

export interface ScreenContainerProps {
  /** Main content of the screen */
  children: ReactNode;
  /** TopBar component to render at the top */
  topBar?: ReactNode;
  /** Footer component to render at the bottom */
  footer?: ReactNode;
  /** Optional breadcrumb section between topbar and content */
  breadcrumbSection?: ReactNode;
  /** Whether the header (topbar + breadcrumbs) should be sticky */
  stickyHeader?: boolean;
  /** Layout mode for the LayoutProvider */
  layoutMode?: 'standard' | 'wide' | 'full';
  /** Custom className for the outer container */
  className?: string;
  /** Custom className for the content area */
  contentClassName?: string;
  /** Z-index for the sticky header (default: 40) */
  headerZIndex?: number;
}

/**
 * ScreenContainer - A reusable screen layout with sticky header and footer behavior.
 *
 * Provides a consistent page structure with:
 * - Optional sticky header containing topbar and breadcrumbs
 * - Flexible content area that grows to fill available space
 * - Footer that sticks to bottom when content is short
 * - Dark mode support
 *
 * @example
 * ```tsx
 * // Basic usage with slots
 * <ScreenContainer
 *   topBar={<MyTopBar />}
 *   footer={<MyFooter />}
 *   breadcrumbSection={<BreadcrumbSection items={items} />}
 * >
 *   <PageContent />
 * </ScreenContainer>
 *
 * // Minimal usage
 * <ScreenContainer>
 *   <PageContent />
 * </ScreenContainer>
 * ```
 */
export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  topBar,
  footer,
  breadcrumbSection,
  stickyHeader = true,
  layoutMode = 'standard',
  className,
  contentClassName,
  headerZIndex = 40,
}) => {
  const hasHeader = topBar || breadcrumbSection;

  return (
    <LayoutProvider mode={layoutMode}>
      <div
        className={cn(
          'min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col',
          className
        )}
      >
        {/* Header containing topbar and breadcrumbs */}
        {hasHeader && (
          <div
            className={stickyHeader ? 'sticky top-0' : ''}
            style={stickyHeader ? { zIndex: headerZIndex } : undefined}
          >
            {topBar}
            {breadcrumbSection}
          </div>
        )}

        {/* Main content area - grows to fill available space */}
        <div className={cn('flex-1', contentClassName)}>{children}</div>

        {/* Footer */}
        {footer}
      </div>
    </LayoutProvider>
  );
};

export default ScreenContainer;
