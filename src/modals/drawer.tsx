import React, { useEffect } from 'react';
import { cn } from '../lib/utils';
import { Portal } from './portal';
import { Overlay } from './overlay';

export interface DrawerProps {
  /** Whether drawer is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Drawer content */
  children: React.ReactNode;
  /** Side to slide from */
  side?: 'left' | 'right' | 'top' | 'bottom';
  /** Drawer size */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Show close button */
  showCloseButton?: boolean;
  /** Drawer title */
  title?: React.ReactNode;
  /** Drawer footer */
  footer?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Drawer Component
 *
 * Side panel that slides in from screen edges.
 * Useful for navigation menus, filters, settings panels.
 *
 * @example
 * ```tsx
 * <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} side="right">
 *   <div>Drawer content</div>
 * </Drawer>
 * ```
 *
 * @example
 * ```tsx
 * <Drawer
 *   isOpen={true}
 *   onClose={handleClose}
 *   side="left"
 *   size="md"
 *   title="Navigation"
 *   footer={<Button>Close</Button>}
 * >
 *   <nav>Menu items</nav>
 * </Drawer>
 * ```
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  side = 'right',
  size = 'md',
  showCloseButton = true,
  title,
  footer,
  className,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Size configurations
  const sizeClasses = {
    left: {
      sm: 'w-64',
      md: 'w-80',
      lg: 'w-96',
      full: 'w-full',
    },
    right: {
      sm: 'w-64',
      md: 'w-80',
      lg: 'w-96',
      full: 'w-full',
    },
    top: {
      sm: 'h-64',
      md: 'h-80',
      lg: 'h-96',
      full: 'h-full',
    },
    bottom: {
      sm: 'h-64',
      md: 'h-80',
      lg: 'h-96',
      full: 'h-full',
    },
  };

  // Position and animation classes
  const positionClasses = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  };

  const animationClasses = {
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    top: isOpen ? 'translate-y-0' : '-translate-y-full',
    bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
  };

  return (
    <Portal>
      <Overlay isOpen={isOpen} onClose={onClose} opacity='medium' />
      <div
        className={cn(
          'fixed z-50',
          'bg-white dark:bg-gray-900',
          'shadow-xl',
          'transition-transform duration-300 ease-in-out',
          positionClasses[side],
          sizeClasses[side][size],
          animationClasses[side],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
            {title && (
              <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'
                aria-label='Close drawer'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className='flex-1 overflow-y-auto p-6'>{children}</div>

        {/* Footer */}
        {footer && (
          <div className='px-6 py-4 border-t border-gray-200 dark:border-gray-700'>
            {footer}
          </div>
        )}
      </div>
    </Portal>
  );
};

export default Drawer;
