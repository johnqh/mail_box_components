import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { useLayout } from './Layout/LayoutContext';
import { ui, textVariants } from '@sudobility/design';

/**
 * MasterListItem - Standardized list item with rounded selection overlay
 *
 * Provides consistent selection styling across all master-detail layouts
 */
export interface MasterListItemProps {
  /** Whether this item is currently selected */
  isSelected: boolean;
  /** Click handler */
  onClick: () => void;
  /** Icon component to display (optional) */
  icon?: React.ComponentType<{ className?: string }>;
  /** Main label text */
  label: string;
  /** Description text (optional) */
  description?: string;
  /** Custom className for additional styling */
  className?: string;
}

export const MasterListItem: React.FC<MasterListItemProps> = ({
  isSelected,
  onClick,
  icon: Icon,
  label,
  description,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-start p-4 cursor-pointer transition-all border-b ${ui.border.default} last:border-b-0 group ${className}`}
    >
      {/* Rounded selection overlay - positioned absolutely to create overlay effect */}
      {isSelected && (
        <div className='absolute inset-1 bg-primary/10 rounded-lg pointer-events-none' />
      )}

      {/* Content wrapper with z-index to sit above overlay */}
      <div className='relative z-10 flex items-start w-full'>
        {Icon && (
          <Icon
            className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 transition-colors ${
              isSelected
                ? 'text-primary'
                : 'text-muted-foreground group-hover:text-foreground'
            }`}
          />
        )}
        <div className='flex-1 min-w-0'>
          <div
            className={`font-medium transition-colors ${
              isSelected
                ? 'text-primary'
                : 'text-foreground group-hover:text-foreground'
            }`}
          >
            {label}
          </div>
          {description && (
            <div
              className={`text-xs mt-0.5 transition-colors ${
                isSelected ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export interface MasterDetailLayoutProps {
  /** Title shown above the master panel (navigation/sidebar) */
  masterTitle?: string;
  /** Subtitle shown below master title, above the content list (e.g., wallet address) */
  masterSubtitle?: string;
  /** Text shown in the back button on mobile (e.g., page name like "Documentation") */
  backButtonText?: string;
  /** Content for the master panel (left side on desktop, navigation view on mobile) */
  masterContent: ReactNode;
  /** Content for the detail panel (right side on desktop, content view on mobile) */
  detailContent: ReactNode;
  /** Title for the detail panel - should match the selected item from master list */
  detailTitle?: string;
  /** Optional content rendered above the master-detail area, sticky to top */
  topContent?: ReactNode;
  /** Optional content rendered below the master-detail area, sticky to bottom */
  bottomContent?: ReactNode;
  /** Current mobile view state - "navigation" shows master, "content" shows detail */
  mobileView?: 'navigation' | 'content';
  /** Callback when user wants to switch to navigation view on mobile */
  onBackToNavigation?: () => void;
  /** Custom class for master panel container */
  masterClassName?: string;
  /** Custom class for detail panel container */
  detailClassName?: string;
  /** Custom class for detail title */
  detailTitleClassName?: string;
  /** Width of the master panel on desktop (default: 320px) */
  masterWidth?: number;
  /**
   * Max width in pixels for the detail panel (default: 960px).
   *
   * The panel stays full width while the space left over by the master panel is
   * narrower than this value, and caps at this width — horizontally centered in
   * that space — once there is room to spare. Pass 0 to opt out and let the
   * detail panel fill all remaining space.
   */
  detailMaxWidth?: number;
  /** Whether to make the master panel sticky on desktop (default: true) */
  stickyMaster?: boolean;
  /** Top offset for sticky master panel (default: 96px / top-24) */
  stickyTopOffset?: number;
  /** Gap between master and detail panels on desktop (default: 32px / gap-8) */
  desktopGap?: number;
  /** Whether to show the master panel background on mobile (default: true) */
  showMasterBackground?: boolean;
  /** Enable smooth fade animations when content changes (default: true) */
  enableAnimations?: boolean;
  /** Animation duration in milliseconds (default: 300) */
  animationDuration?: number;
  /** Content key to trigger animations when changed (e.g., section ID) */
  contentKey?: string;
  /** Ref to access animation trigger function */
  animationRef?: React.MutableRefObject<{
    triggerTransition: (onContentChange: () => void) => void;
  } | null>;
}

/**
 * MasterDetailLayout - A responsive master-detail layout component
 *
 * Features:
 * - Desktop: Side-by-side layout with sticky master panel (sidebar)
 * - Mobile: Toggle between master (navigation) and detail (content) views
 * - Customizable widths, gaps, and styling
 * - Detail panel capped and centered at `detailMaxWidth` (default 960px)
 * - Built-in back button for mobile navigation
 * - Dark mode support
 * - Smooth transitions support via refs
 * - Sticky top/bottom content panels
 *
 * @example
 * ```tsx
 * <MasterDetailLayout
 *   masterTitle="Table of Contents"
 *   masterContent={<NavigationMenu items={sections} />}
 *   detailContent={<Article content={currentSection} />}
 *   mobileView={view}
 *   onBackToNavigation={() => setView('navigation')}
 * />
 * ```
 */
export const MasterDetailLayout: React.FC<MasterDetailLayoutProps> = ({
  masterTitle,
  masterSubtitle,
  backButtonText,
  masterContent,
  detailContent,
  detailTitle,
  topContent,
  bottomContent,
  mobileView = 'navigation',
  onBackToNavigation,
  masterClassName = '',
  detailClassName = '',
  detailTitleClassName = '',
  masterWidth = 320,
  detailMaxWidth = 960,
  // stickyMaster and stickyTopOffset are accepted for API compatibility but no longer used
  // The flex column layout pins top/bottom content without sticky positioning
  desktopGap: _desktopGap = 32,
  showMasterBackground = true,
  enableAnimations = true,
  animationDuration = 300,
  contentKey,
  animationRef,
}) => {
  // maxWidthClass, not containerClass: the layout adds no padding of its own,
  // so consumers control the inset on both panels.
  const { maxWidthClass } = useLayout();

  // Extract first part of title before dash for back button
  const extractFirstPart = (text: string | undefined) => {
    if (!text) return 'Back';
    return text.split('-')[0].trim();
  };

  const buttonText = backButtonText
    ? extractFirstPart(backButtonText)
    : masterTitle
      ? extractFirstPart(masterTitle)
      : 'Back';

  /**
   * The master↔detail move on a narrow screen, animated.
   *
   * The two mobile panes used to swap with `block`/`hidden`, which is a cut:
   * the list vanishes and the detail is simply there. On a phone — and in a
   * browser side panel, which is the same shape — that reads as a redraw rather
   * than as going somewhere, and there is nothing to tell a reader whether they
   * moved forward or back.
   *
   * Animated the way a stack is: the DETAIL slides, the master does not. Going
   * in, the detail comes from the right over the list; coming out, it leaves the
   * same way and reveals the list underneath. One direction of travel, so "back"
   * looks like back.
   *
   * The master stays in NORMAL FLOW throughout and only the detail is lifted
   * into an overlay, and only while it moves. That is what keeps this safe for
   * every existing caller: at rest the markup is exactly what it was, so no
   * page that uses this component changes height or layout.
   */
  const [slide, setSlide] = useState<null | { direction: 'in' | 'out'; settled: boolean }>(null);
  const previousView = useRef(mobileView);

  useEffect(() => {
    if (previousView.current === mobileView) return;
    const from = previousView.current;
    previousView.current = mobileView;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!enableAnimations || reducedMotion) return;

    // Starts at the far side, then settles on the next frame — a transform
    // applied in the same paint as the mount animates from nothing.
    setSlide({ direction: from === 'navigation' ? 'in' : 'out', settled: false });
    const frame = requestAnimationFrame(() =>
      setSlide(current => (current ? { ...current, settled: true } : current))
    );
    const done = setTimeout(() => setSlide(null), animationDuration);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(done);
    };
  }, [mobileView, enableAnimations, animationDuration]);

  /** Where the detail sits right now: off to the right, or covering the list. */
  const detailOffset = slide
    ? (slide.direction === 'in') === slide.settled
      ? 'translate-x-0'
      : 'translate-x-full'
    : 'translate-x-0';

  // Internal animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | 'auto'>('auto');
  const contentRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Expose triggerTransition function via ref
  useEffect(() => {
    if (animationRef) {
      animationRef.current = {
        triggerTransition: (onContentChange: () => void) => {
          if (!enableAnimations) {
            onContentChange();
            return;
          }

          // Capture current height before transition
          if (contentRef.current) {
            const currentHeight = contentRef.current.scrollHeight;
            setContentHeight(currentHeight);
          }

          setIsAnimating(true);

          // Clear any existing timeout
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
          }

          animationTimeoutRef.current = setTimeout(() => {
            onContentChange();

            // After content change, animate to new height
            setTimeout(() => {
              if (contentRef.current) {
                const newHeight = contentRef.current.scrollHeight;
                setContentHeight(newHeight);

                // After height animation completes, set to auto
                setTimeout(() => {
                  setContentHeight('auto');
                  setIsAnimating(false);
                }, animationDuration);
              }
            }, 50);
          }, animationDuration / 2);
        },
      };
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [enableAnimations, animationDuration, animationRef]);

  // Scroll detail panel to top when content changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [contentKey, detailTitle]);

  // Detail panel style with animation support
  const detailPanelStyle: React.CSSProperties = enableAnimations
    ? {
        height: contentHeight === 'auto' ? 'auto' : `${contentHeight}px`,
        transition: `height ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        width: '100%',
        maxWidth: '100%',
      }
    : { width: '100%', maxWidth: '100%' };

  // Caps the detail panel and centers it in whatever space is available.
  // `max-width` alone gives the "full width until there is room to spare"
  // behaviour; the auto margins absorb the leftover space once there is any.
  const detailConstraintStyle: React.CSSProperties | undefined = detailMaxWidth
    ? {
        maxWidth: `${detailMaxWidth}px`,
        marginLeft: 'auto',
        marginRight: 'auto',
      }
    : undefined;

  // Content wrapper style with fade animation
  const contentWrapperClass = enableAnimations
    ? `${
        isAnimating
          ? 'opacity-0 transform translate-y-2'
          : 'opacity-100 transform translate-y-0'
      }`
    : '';

  const contentWrapperStyle: React.CSSProperties = enableAnimations
    ? {
        transition: `opacity ${animationDuration}ms ease-in-out, transform ${animationDuration}ms ease-in-out`,
      }
    : {};

  // When a detail item is selected, hide master list from search engines
  // so Google indexes the detail content, not the full navigation list
  const hasDetailSelection = !!detailTitle;

  return (
    <div className='w-full flex-1 min-h-0 flex flex-col'>
      {/* Top Content - desktop only (mobile renders topContent inside nav view) */}
      {topContent && (
        <div className='z-10 flex-shrink-0 hidden md:block'>{topContent}</div>
      )}

      {/* Middle: Master-Detail area (fills remaining space).
          `relative` is inert at rest and is what the sliding detail overlay
          positions against; the clip is applied only while it moves, so nothing
          that overflows this box at rest is affected. */}
      <div
        className={`relative flex-1 min-h-0 flex flex-col ${slide ? 'overflow-hidden' : ''}`}
      >
        {/* Desktop Layout — rendered FIRST in the DOM (before the mobile views) so
            the detail-first content leads the HTML source for search engines.
            Visual layout (master left, detail right) is restored via CSS `order`. */}
        <div
          className={`hidden md:flex flex-1 min-h-0`}
          style={{ width: '100%' }}
        >
          {/* Desktop Detail Panel (Main Content) — first in DOM for search engine priority */}
          <div className='flex-1 min-w-0 flex flex-col min-h-0 order-2'>
            {/* Constraint box — title and content share it so they stay aligned
                with each other when the panel is capped and centered. */}
            <div
              className='w-full min-w-0 flex-1 min-h-0 flex flex-col'
              style={detailConstraintStyle}
            >
              {detailTitle && (
                <h1
                  className={`${textVariants.heading.h1()} mb-4 flex-shrink-0 ${detailTitleClassName}`}
                >
                  {detailTitle}
                </h1>
              )}
              <div
                ref={contentRef}
                className={`flex-1 min-h-0 overflow-y-auto ${detailClassName}`}
                style={detailPanelStyle}
              >
                <div
                  className={`h-full ${contentWrapperClass}`}
                  style={contentWrapperStyle}
                >
                  {detailContent}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Master Panel (Sidebar) — hidden from search engines when detail is selected */}
          <aside
            className='flex-shrink-0 flex flex-col min-h-0 order-1'
            style={{
              width: `${masterWidth}px`,
              minWidth: `${masterWidth}px`,
            }}
            aria-hidden={hasDetailSelection ? true : undefined}
          >
            {masterTitle && (
              <h2 className={`${textVariants.heading.h5()} mb-4 flex-shrink-0`}>
                {masterTitle}
              </h2>
            )}
            {masterSubtitle && (
              <p
                className={`${textVariants.body.sm()} mb-6 break-all flex-shrink-0`}
              >
                {masterSubtitle}
              </p>
            )}
            <div
              className={`border-r ${ui.border.default} flex-1 min-h-0 overflow-y-auto ${masterClassName}`}
            >
              {masterContent}
            </div>
          </aside>
        </div>

        {/* Mobile Navigation View - Full Width */}
        <div
          className={`md:hidden ${
            mobileView === 'navigation' || slide ? 'block' : 'hidden'
          } flex-1 overflow-y-auto`}
          aria-hidden={hasDetailSelection ? true : undefined}
        >
          {topContent && <div className='flex-shrink-0'>{topContent}</div>}
          <div className={showMasterBackground ? ui.background.surface : ''}>
            {masterTitle && (
              <div className={maxWidthClass}>
                <h2 className={`${textVariants.heading.h4()} mb-4`}>
                  {masterTitle}
                </h2>
                {masterSubtitle && (
                  <p className={`${textVariants.body.sm()} mb-6 break-all`}>
                    {masterSubtitle}
                  </p>
                )}
              </div>
            )}
            <div className={masterClassName}>{masterContent}</div>
          </div>
        </div>

        {/* Mobile Content View */}
        <div
          className={`md:hidden ${
            mobileView === 'content' || slide ? 'flex flex-col flex-1 min-h-0' : 'hidden'
          } ${maxWidthClass} ${
            slide
              ? `absolute inset-0 z-10 ${ui.background.surface} transition-transform ease-out ${detailOffset}`
              : ''
          }`}
          style={
            slide
              ? { ...detailConstraintStyle, transitionDuration: `${animationDuration}ms` }
              : detailConstraintStyle
          }
        >
          {/* Mobile back button */}
          {mobileView === 'content' && onBackToNavigation && (
            <button
              onClick={onBackToNavigation}
              className={`mb-4 px-4 py-2 border ${ui.border.default} rounded-md text-sm font-medium ${ui.background.surface} hover:bg-muted transition-colors flex-shrink-0 ${textVariants.body.sm()}`}
            >
              ← {buttonText}
            </button>
          )}
          <div
            className={`${ui.background.surface} rounded-lg border ${ui.border.default} flex-1 min-h-0 overflow-y-auto ${detailClassName}`}
            style={detailPanelStyle}
          >
            <div className={contentWrapperClass} style={contentWrapperStyle}>
              {detailTitle && (
                <h1
                  className={`${textVariants.heading.h1()} mb-6 ${detailTitleClassName}`}
                >
                  {detailTitle}
                </h1>
              )}
              {detailContent}
            </div>
          </div>
          {bottomContent && (
            <div className='flex-shrink-0'>{bottomContent}</div>
          )}
        </div>
      </div>

      {/* Bottom Content - desktop only (mobile renders bottomContent inline) */}
      {bottomContent && (
        <div className='z-10 flex-shrink-0 hidden md:block'>
          {bottomContent}
        </div>
      )}
    </div>
  );
};
