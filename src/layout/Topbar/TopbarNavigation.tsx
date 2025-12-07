import React, { ReactNode } from 'react';
import {
  TopbarNav,
  type TopbarNavItem,
  type TopbarNavProps,
} from './TopbarNav';
import { TopbarMenuToggle } from './TopbarMenuToggle';

export interface TopbarNavigationProps {
  /** Navigation items to display */
  items: TopbarNavItem[];
  /** Custom link component for routing integration */
  LinkComponent?: TopbarNavProps['LinkComponent'];
  /** Breakpoint at which to collapse navigation into mobile dropdown */
  collapseBelow?: 'sm' | 'md' | 'lg' | 'xl';
  /** Alignment of nav items on desktop */
  align?: 'left' | 'center' | 'right';
  /** Additional CSS classes for the container */
  className?: string;
  /** ARIA label for the mobile menu toggle */
  mobileMenuLabel?: string;
  /** Content to render between toggle and nav (e.g., logo) */
  children?: ReactNode;
}

/**
 * TopbarNavigation - Unified navigation component that handles both desktop and mobile layouts
 *
 * On desktop (above collapseBelow breakpoint): Shows horizontal nav links
 * On mobile (below collapseBelow breakpoint): Shows hamburger menu with dropdown
 *
 * @example
 * ```tsx
 * const navItems = [
 *   { id: 'home', label: 'Home', href: '/' },
 *   { id: 'about', label: 'About', href: '/about' },
 *   { id: 'contact', label: 'Contact', href: '/contact' },
 * ];
 *
 * <Topbar>
 *   <TopbarLeft>
 *     <TopbarNavigation
 *       items={navItems}
 *       LinkComponent={LocalizedLink}
 *       collapseBelow="lg"
 *     />
 *     <TopbarLogo>...</TopbarLogo>
 *   </TopbarLeft>
 * </Topbar>
 * ```
 */
export const TopbarNavigation: React.FC<TopbarNavigationProps> = ({
  items,
  LinkComponent,
  collapseBelow = 'lg',
  align = 'center',
  className,
  mobileMenuLabel = 'Toggle navigation menu',
  children,
}) => {
  return (
    <>
      {/* Mobile: Hamburger menu with dropdown */}
      <TopbarMenuToggle
        hideAbove={collapseBelow}
        menuItems={items}
        LinkComponent={LinkComponent}
        aria-label={mobileMenuLabel}
        className={className}
      />

      {/* Content between toggle and nav (e.g., logo) */}
      {children}

      {/* Desktop: Horizontal navigation */}
      <TopbarNav
        items={items}
        collapseBelow={collapseBelow}
        LinkComponent={LinkComponent}
        align={align}
        className={className}
      />
    </>
  );
};
