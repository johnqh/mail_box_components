import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { TopbarProvider, TopbarVariant } from './TopbarContext';

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

const variantClasses: Record<TopbarVariant, string> = {
  default:
    'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700',
  app: 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm',
  minimal: 'bg-transparent',
  transparent:
    'bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50',
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
  return (
    <TopbarProvider variant={variant} sticky={sticky}>
      <header
        role='banner'
        aria-label={ariaLabel}
        className={cn(
          // Base styles
          'w-full',
          heightClasses[height],
          variantClasses[variant],
          zIndexClasses[zIndex],
          // Sticky positioning
          sticky && 'sticky top-0',
          // Backdrop blur for transparent variant
          blur && 'backdrop-blur-md',
          // Transition for smooth theme changes
          'transition-colors duration-200',
          className
        )}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Skip to main content
        </a>

        {/* Main topbar content container */}
        <div
          className={cn(
            'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
            heightClasses[height],
            'flex items-center justify-between'
          )}
        >
          {children}
        </div>
      </header>
    </TopbarProvider>
  );
};

export type { TopbarVariant };
