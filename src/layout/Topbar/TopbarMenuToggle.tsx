import React, { useState, useRef } from 'react';
import { cn } from '../../lib/utils';
import { useTopbar } from './TopbarContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import type { TopbarNavItem } from './TopbarNav';

export interface TopbarMenuToggleProps {
  /** Custom icon component to use instead of default hamburger */
  icon?: React.ComponentType<{ className?: string }>;
  /** ARIA label for the toggle button */
  'aria-label'?: string;
  /** Additional CSS classes */
  className?: string;
  /** Custom onClick handler (overrides default toggle behavior) */
  onClick?: () => void;
  /** Breakpoint at which to hide the toggle (shows on smaller screens) */
  hideAbove?: 'sm' | 'md' | 'lg' | 'xl';
  /** Menu items to display in dropdown (optional - if provided, shows dropdown instead of toggling mobile nav) */
  menuItems?: TopbarNavItem[];
  /** Custom link component for routing integration */
  LinkComponent?: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
}

const hideAboveClasses = {
  sm: 'sm:hidden',
  md: 'md:hidden',
  lg: 'lg:hidden',
  xl: 'xl:hidden',
};

/**
 * Default hamburger icon component
 */
const HamburgerIcon: React.FC<{ className?: string; isOpen?: boolean }> = ({
  className,
  isOpen,
}) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
    aria-hidden='true'
  >
    {isOpen ? (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 18L18 6M6 6l12 12'
      />
    ) : (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4 6h16M4 12h16M4 18h16'
      />
    )}
  </svg>
);

/**
 * TopbarMenuToggle - Hamburger menu toggle button for mobile navigation
 *
 * @example
 * ```tsx
 * // Simple toggle (controls TopbarMobileNav)
 * <TopbarMenuToggle hideAbove="lg" />
 *
 * // With dropdown menu
 * <TopbarMenuToggle
 *   hideAbove="lg"
 *   menuItems={[
 *     { id: 'home', label: 'Home', href: '/' },
 *     { id: 'about', label: 'About', href: '/about' },
 *   ]}
 *   LinkComponent={LocalizedLink}
 * />
 * ```
 */
export const TopbarMenuToggle: React.FC<TopbarMenuToggleProps> = ({
  icon: CustomIcon,
  'aria-label': ariaLabel = 'Toggle navigation menu',
  className,
  onClick,
  hideAbove = 'lg',
  menuItems,
  LinkComponent,
}) => {
  const { mobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useTopbar();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef as React.RefObject<HTMLElement>, () => {
    setDropdownOpen(false);
  });

  // If menuItems provided, use local dropdown state; otherwise use context
  const isOpen = menuItems ? dropdownOpen : mobileMenuOpen;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (menuItems) {
      setDropdownOpen(!dropdownOpen);
    } else {
      toggleMobileMenu();
    }
  };

  const handleItemClick = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <div
      className={cn('relative', hideAboveClasses[hideAbove])}
      ref={dropdownRef}
    >
      <button
        type='button'
        onClick={handleClick}
        className={cn(
          // Base styles
          'p-2 rounded-lg',
          'text-gray-600 dark:text-gray-400',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          'hover:text-gray-900 dark:hover:text-gray-100',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'transition-colors duration-200',
          className
        )}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup={menuItems ? 'menu' : undefined}
        aria-controls={menuItems ? 'topbar-dropdown-menu' : 'mobile-menu'}
      >
        {CustomIcon ? (
          <CustomIcon className='h-6 w-6' />
        ) : (
          <HamburgerIcon className='h-6 w-6' isOpen={isOpen} />
        )}
      </button>

      {/* Dropdown menu when menuItems are provided */}
      {menuItems && dropdownOpen && (
        <div
          id='topbar-dropdown-menu'
          role='menu'
          className={cn(
            'absolute left-0 top-full mt-2',
            'min-w-[200px] py-2 rounded-lg',
            'bg-white dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-700',
            'shadow-lg',
            'z-50'
          )}
        >
          {menuItems.map(item => {
            const Icon = item.icon;
            const itemContent = (
              <>
                {Icon && <Icon className='h-5 w-5 mr-3 flex-shrink-0' />}
                <span>{item.label}</span>
              </>
            );

            const itemClasses = cn(
              'flex items-center w-full px-4 py-2.5 text-sm font-medium',
              'text-gray-700 dark:text-gray-300',
              'hover:bg-gray-100 dark:hover:bg-gray-700',
              'hover:text-gray-900 dark:hover:text-gray-100',
              'transition-colors duration-150',
              item.active &&
                'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
              item.disabled && 'opacity-50 cursor-not-allowed'
            );

            if (item.href && LinkComponent) {
              return (
                <LinkComponent
                  key={item.id}
                  href={item.href}
                  className={itemClasses}
                >
                  <div className='flex items-center' onClick={handleItemClick}>
                    {itemContent}
                  </div>
                </LinkComponent>
              );
            }

            if (item.href) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  role='menuitem'
                  className={itemClasses}
                  onClick={handleItemClick}
                >
                  {itemContent}
                </a>
              );
            }

            return (
              <button
                key={item.id}
                type='button'
                role='menuitem'
                className={itemClasses}
                onClick={() => {
                  handleItemClick();
                  item.onClick?.();
                }}
                disabled={item.disabled}
              >
                {itemContent}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
