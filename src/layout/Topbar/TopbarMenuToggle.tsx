import React from 'react';
import { cn } from '../../lib/utils';
import { useTopbar } from './TopbarContext';

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
 * <TopbarMenuToggle hideAbove="lg" />
 * ```
 */
export const TopbarMenuToggle: React.FC<TopbarMenuToggleProps> = ({
  icon: CustomIcon,
  'aria-label': ariaLabel = 'Toggle navigation menu',
  className,
  onClick,
  hideAbove = 'lg',
}) => {
  const { mobileMenuOpen, toggleMobileMenu } = useTopbar();

  const handleClick = onClick || toggleMobileMenu;

  return (
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
        // Responsive visibility
        hideAboveClasses[hideAbove],
        className
      )}
      aria-label={ariaLabel}
      aria-expanded={mobileMenuOpen}
      aria-controls='mobile-menu'
    >
      {CustomIcon ? (
        <CustomIcon className='h-6 w-6' />
      ) : (
        <HamburgerIcon className='h-6 w-6' isOpen={mobileMenuOpen} />
      )}
    </button>
  );
};
