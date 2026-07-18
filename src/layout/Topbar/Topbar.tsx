import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { colors, ui } from '@sudobility/design';
import { TopbarProvider, TopbarVariant } from './TopbarContext';
import { useLayout } from '../Layout/LayoutContext';

export interface TopbarProps {
  /** Content to render inside the topbar */
  children: ReactNode;
  /** Visual variant of the topbar */
  variant?: TopbarVariant;
  /** Whether the topbar should stick to the top of the viewport */
  sticky?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Height variant */
  height?: 'sm' | 'md' | 'lg';
  /** Whether to show a backdrop blur effect (for transparent variant) */
  blur?: boolean;
  /** Z-index level */
  zIndex?: 'default' | 'high' | 'highest';
  /** ARIA label for the header landmark */
  'aria-label'?: string;
}

const heightClasses = {
  sm: 'min-h-12',
  md: 'min-h-14',
  lg: 'min-h-16',
};

// Evaluated per render (not at module load) so the theme-aware `ui` getters
// reflect the theme configured via configureTheme() at app startup.
const variantClasses = (variant: TopbarVariant): string => {
  switch (variant) {
    case 'app':
      return `${ui.background.surface} ${ui.border.default} border-b shadow-sm`;
    case 'minimal':
      return 'bg-transparent';
    case 'transparent':
      return 'bg-background/80 border-b border-border/50';
    default:
      return `${ui.background.surface} ${ui.border.default} border-b`;
  }
};

const zIndexClasses = {
  default: 'z-40',
  high: 'z-50',
  highest: 'z-[60]',
};

/**
 * Topbar - A flexible, responsive top navigation bar component
 *
 * @example
 * ```tsx
 * <Topbar variant="app" sticky>
 *   <TopbarLeft>
 *     <TopbarMenuToggle />
 *     <TopbarLogo src="/logo.svg" alt="App Logo" />
 *   </TopbarLeft>
 *   <TopbarCenter>
 *     <TopbarNav items={navItems} />
 *   </TopbarCenter>
 *   <TopbarRight>
 *     <TopbarActions>
 *       <Button>Sign In</Button>
 *     </TopbarActions>
 *   </TopbarRight>
 * </Topbar>
 * ```
 */
export const Topbar: React.FC<TopbarProps> = ({
  children,
  variant = 'default',
  sticky = true,
  className,
  height = 'md',
  blur = false,
  zIndex = 'high',
  'aria-label': ariaLabel = 'Main navigation',
}) => {
  const { containerClass } = useLayout();

  return (
    <TopbarProvider variant={variant} sticky={sticky}>
      <header
        role='banner'
        aria-label={ariaLabel}
        className={cn(
          // Base styles
          'w-full',
          heightClasses[height],
          variantClasses(variant),
          zIndexClasses[zIndex],
          // Sticky positioning
          sticky && 'sticky top-0',
          // Backdrop blur for transparent variant
          blur && 'backdrop-blur-md',
          // Transition for smooth theme changes
          ui.transition.default,
          className
        )}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href='#main-content'
          className={cn(
            'sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            colors.component.button.primary.base,
            colors.component.button.primary.dark
          )}
        >
          Skip to main content
        </a>

        {/* Main topbar content container */}
        <div
          className={cn(
            containerClass,
            heightClasses[height],
            'flex flex-wrap items-center justify-between'
          )}
        >
          {children}
        </div>
      </header>
    </TopbarProvider>
  );
};

export type { TopbarVariant };
