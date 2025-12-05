import React, { useState, useRef } from 'react';
import { cn } from '../../lib/utils';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useTopbar } from './TopbarContext';

export interface TopbarNavItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label: string;
  /** Navigation path or URL */
  href?: string;
  /** Click handler (alternative to href) */
  onClick?: () => void;
  /** Icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Whether this item is currently active */
  active?: boolean;
  /** Sub-navigation items for dropdown */
  children?: TopbarNavItem[];
  /** Whether this item is disabled */
  disabled?: boolean;
}

export interface TopbarNavProps {
  /** Navigation items to display */
  items: TopbarNavItem[];
  /** Additional CSS classes */
  className?: string;
  /** Breakpoint at which to collapse navigation into dropdown */
  collapseBelow?: 'sm' | 'md' | 'lg' | 'xl';
  /** Custom link component for routing integration */
  LinkComponent?: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
  /** Alignment of nav items */
  align?: 'left' | 'center' | 'right';
}

const collapseClasses = {
  sm: { show: 'hidden sm:flex', hide: 'sm:hidden' },
  md: { show: 'hidden md:flex', hide: 'md:hidden' },
  lg: { show: 'hidden lg:flex', hide: 'lg:hidden' },
  xl: { show: 'hidden xl:flex', hide: 'xl:hidden' },
};

const alignClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

/**
 * TopbarNav - Navigation component with responsive collapse
 *
 * @example
 * ```tsx
 * const navItems = [
 *   { id: 'home', label: 'Home', href: '/' },
 *   { id: 'about', label: 'About', href: '/about' },
 *   { id: 'contact', label: 'Contact', href: '/contact' },
 * ];
 *
 * <TopbarNav items={navItems} collapseBelow="md" />
 * ```
 */
export const TopbarNav: React.FC<TopbarNavProps> = ({
  items,
  className,
  collapseBelow = 'lg',
  LinkComponent,
  align = 'center',
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef as React.RefObject<HTMLElement>, () =>
    setOpenDropdown(null)
  );

  const renderNavItem = (item: TopbarNavItem, isMobile = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openDropdown === item.id;

    const baseItemClasses = cn(
      'px-3 py-2 rounded-md text-sm font-medium',
      'transition-colors duration-200',
      item.active
        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700',
      item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      isMobile && 'w-full text-left'
    );

    // If item has children, render as dropdown
    if (hasChildren) {
      return (
        <div key={item.id} className='relative' ref={dropdownRef}>
          <button
            type='button'
            onClick={() => setOpenDropdown(isOpen ? null : item.id)}
            className={cn(baseItemClasses, 'flex items-center gap-1')}
            aria-expanded={isOpen}
            aria-haspopup='true'
            disabled={item.disabled}
          >
            {item.icon && <item.icon className='h-4 w-4 mr-1' />}
            {item.label}
            <svg
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>

          {isOpen && (
            <div
              className={cn(
                'absolute top-full left-0 mt-1 py-1',
                'min-w-[200px] rounded-md shadow-lg',
                'bg-white dark:bg-gray-800',
                'border border-gray-200 dark:border-gray-700',
                'z-50'
              )}
            >
              {item.children?.map(child => (
                <NavItemLink
                  key={child.id}
                  item={child}
                  LinkComponent={LinkComponent}
                  className={cn(
                    'block px-4 py-2 text-sm',
                    'text-gray-700 dark:text-gray-300',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    child.active &&
                      'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  )}
                  onClick={() => setOpenDropdown(null)}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    // Regular nav item
    return (
      <NavItemLink
        key={item.id}
        item={item}
        LinkComponent={LinkComponent}
        className={baseItemClasses}
      />
    );
  };

  return (
    <nav
      className={cn(
        'flex items-center gap-1',
        collapseClasses[collapseBelow].show,
        alignClasses[align],
        className
      )}
      aria-label='Main navigation'
    >
      {items.map(item => renderNavItem(item))}
    </nav>
  );
};

/**
 * Helper component to render nav item as link or button
 */
interface NavItemLinkProps {
  item: TopbarNavItem;
  LinkComponent?: TopbarNavProps['LinkComponent'];
  className?: string;
  onClick?: () => void;
}

const NavItemLink: React.FC<NavItemLinkProps> = ({
  item,
  LinkComponent,
  className,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.();
    item.onClick?.();
  };

  const content = (
    <>
      {item.icon && <item.icon className='h-4 w-4 mr-2' />}
      {item.label}
    </>
  );

  // Use custom LinkComponent if provided (for react-router, etc.)
  if (item.href && LinkComponent) {
    return (
      <LinkComponent
        href={item.href}
        className={cn(className, 'flex items-center')}
      >
        {content}
      </LinkComponent>
    );
  }

  // Use native anchor for external links
  if (item.href) {
    return (
      <a
        href={item.href}
        className={cn(className, 'flex items-center')}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  // Use button for click handlers
  return (
    <button
      type='button'
      onClick={handleClick}
      className={cn(className, 'flex items-center')}
      disabled={item.disabled}
    >
      {content}
    </button>
  );
};

/**
 * TopbarMobileNav - Mobile navigation dropdown menu
 * Renders navigation items in a full-width dropdown on mobile
 */
export interface TopbarMobileNavProps {
  /** Navigation items to display */
  items: TopbarNavItem[];
  /** Whether the menu is open */
  isOpen?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom link component for routing integration */
  LinkComponent?: TopbarNavProps['LinkComponent'];
}

export const TopbarMobileNav: React.FC<TopbarMobileNavProps> = ({
  items,
  isOpen: controlledIsOpen,
  className,
  LinkComponent,
}) => {
  const { mobileMenuOpen, setMobileMenuOpen } = useTopbar();
  const isOpen = controlledIsOpen ?? mobileMenuOpen;

  if (!isOpen) return null;

  return (
    <div
      id='mobile-menu'
      className={cn(
        'lg:hidden',
        'border-t border-gray-200 dark:border-gray-700',
        'bg-white dark:bg-gray-900',
        'shadow-lg',
        className
      )}
    >
      <nav className='px-4 py-2 space-y-1' aria-label='Mobile navigation'>
        {items.map(item => (
          <NavItemLink
            key={item.id}
            item={item}
            LinkComponent={LinkComponent}
            className={cn(
              'flex items-center w-full px-3 py-2 rounded-md text-base font-medium',
              'transition-colors duration-200',
              item.active
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
            onClick={() => setMobileMenuOpen(false)}
          />
        ))}
      </nav>
    </div>
  );
};
