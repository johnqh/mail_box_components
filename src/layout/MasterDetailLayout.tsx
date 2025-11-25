import React, { ReactNode, useEffect, useState, useRef } from 'react';

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
      className={`relative flex items-start p-4 cursor-pointer transition-all border-b border-gray-200 dark:border-gray-700 last:border-b-0 group ${className}`}
    >
      {/* Rounded selection overlay - positioned absolutely to create overlay effect */}
      {isSelected && (
        <div className='absolute inset-1 bg-blue-500/10 dark:bg-blue-400/10 rounded-lg pointer-events-none' />
      )}

      {/* Content wrapper with z-index to sit above overlay */}
      <div className='relative z-10 flex items-start w-full'>
        {Icon && (
          <Icon
            className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 transition-colors ${
              isSelected
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
            }`}
          />
        )}
        <div className='flex-1 min-w-0'>
          <div
            className={`font-medium transition-colors ${
              isSelected
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300'
            }`}
          >
            {label}
          </div>
          {description && (
            <div
              className={`text-xs mt-0.5 transition-colors ${
                isSelected
                  ? 'text-blue-500 dark:text-blue-300'
                  : 'text-gray-500 dark:text-gray-400'
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
 * - Built-in back button for mobile navigation
 * - Dark mode support
 * - Smooth transitions support via refs
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
  mobileView = 'navigation',
  onBackToNavigation,
  masterClassName = '',
  detailClassName = '',
  detailTitleClassName = '',
  masterWidth = 320,
  stickyMaster = true,
  stickyTopOffset = 96,
  desktopGap = 32,
  showMasterBackground = true,
  enableAnimations = true,
  animationDuration = 300,
  animationRef,
}) => {
  const gapClass = `gap-${Math.round(desktopGap / 4)}` || 'gap-8';

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

  // Detail panel style with animation support
  const detailPanelStyle: React.CSSProperties = enableAnimations
    ? {
        height: contentHeight === 'auto' ? 'auto' : `${contentHeight}px`,
        transition: `height ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        width: '100%',
        maxWidth: '100%',
      }
    : { width: '100%', maxWidth: '100%' };

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

  return (
    <>
      {/* Mobile Navigation View - Full Width */}
      <div
        className={`md:hidden ${
          mobileView === 'navigation' ? 'block' : 'hidden'
        } flex-1`}
      >
        <div
          className={
            showMasterBackground ? 'bg-white dark:bg-gray-800 p-6' : 'p-6'
          }
        >
          {masterTitle && (
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                {masterTitle}
              </h2>
              {masterSubtitle && (
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-6 break-all'>
                  {masterSubtitle}
                </p>
              )}
            </div>
          )}
          <div className={masterClassName}>{masterContent}</div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Mobile Content View */}
        <div
          className={`md:hidden ${
            mobileView === 'content' ? 'block' : 'hidden'
          }`}
        >
          {/* Mobile back button - outline button with page/master title */}
          {mobileView === 'content' && onBackToNavigation && (
            <button
              onClick={onBackToNavigation}
              className='mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
            >
              ← {buttonText}
            </button>
          )}
          <div
            ref={contentRef}
            className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 overflow-hidden ${detailClassName}`}
            style={detailPanelStyle}
          >
            <div className={contentWrapperClass} style={contentWrapperStyle}>
              {detailTitle && (
                <h1
                  className={`text-4xl font-bold text-gray-900 dark:text-white mb-6 ${detailTitleClassName}`}
                >
                  {detailTitle}
                </h1>
              )}
              {detailContent}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div
          className={`hidden md:flex min-h-full ${gapClass}`}
          style={{ width: '100%' }}
        >
          {/* Desktop Master Panel (Sidebar) */}
          <aside
            className='flex-shrink-0'
            style={{ width: `${masterWidth}px`, minWidth: `${masterWidth}px` }}
          >
            <div
              className={stickyMaster ? 'sticky' : ''}
              style={stickyMaster ? { top: `${stickyTopOffset}px` } : undefined}
            >
              {masterTitle && (
                <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  {masterTitle}
                </h2>
              )}
              {masterSubtitle && (
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-6 break-all'>
                  {masterSubtitle}
                </p>
              )}
              <div
                className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${
                  stickyMaster
                    ? 'max-h-[calc(100vh-200px)] overflow-y-auto'
                    : ''
                } ${masterClassName}`}
              >
                {masterContent}
              </div>
            </div>
          </aside>

          {/* Desktop Detail Panel (Main Content) */}
          <div
            className='flex-1 min-w-0'
            style={{ width: `calc(100% - ${masterWidth + desktopGap}px)` }}
          >
            <div
              ref={contentRef}
              className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 overflow-hidden ${detailClassName}`}
              style={detailPanelStyle}
            >
              <div className={contentWrapperClass} style={contentWrapperStyle}>
                {detailTitle && (
                  <h1
                    className={`text-4xl font-bold text-gray-900 dark:text-white mb-6 ${detailTitleClassName}`}
                  >
                    {detailTitle}
                  </h1>
                )}
                {detailContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
