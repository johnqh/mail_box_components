import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { useLayout, LayoutMode } from './LayoutContext';

export interface ContentContainerProps {
  /** Content to render */
  children: ReactNode;
  /** Override the layout mode from context */
  mode?: LayoutMode;
  /** Additional CSS classes */
  className?: string;
  /** HTML element to render as */
  as?: 'div' | 'main' | 'section' | 'article';
  /** Whether to include padding (default: true) */
  withPadding?: boolean;
}

/**
 * ContentContainer - Applies consistent width constraints based on layout context
 *
 * @example
 * ```tsx
 * // Uses layout mode from context
 * <LayoutProvider mode="standard">
 *   <ContentContainer>
 *     <h1>Page Title</h1>
 *     <p>Content here...</p>
 *   </ContentContainer>
 * </LayoutProvider>
 *
 * // Override mode locally
 * <ContentContainer mode="wide">
 *   <Dashboard />
 * </ContentContainer>
 *
 * // As main element
 * <ContentContainer as="main" className="py-8">
 *   <PageContent />
 * </ContentContainer>
 * ```
 */
export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  mode,
  className,
  as: Component = 'div',
  withPadding = true,
}) => {
  const layout = useLayout();

  // Use provided mode or fall back to context
  const containerClass = mode
    ? getContainerClass(mode, withPadding)
    : withPadding
      ? layout.containerClass
      : layout.maxWidthClass;

  return (
    <Component className={cn(containerClass, className)}>{children}</Component>
  );
};

function getContainerClass(mode: LayoutMode, withPadding: boolean): string {
  const maxWidthClasses: Record<LayoutMode, string> = {
    standard: 'max-w-7xl mx-auto',
    wide: 'max-w-[1920px] mx-auto',
    full: 'w-full',
  };

  const padding = 'px-4';

  return withPadding
    ? `${maxWidthClasses[mode]} ${padding}`
    : maxWidthClasses[mode];
}
