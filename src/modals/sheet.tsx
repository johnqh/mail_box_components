import React, { useEffect } from 'react';
import { cn } from '../lib/utils';
import { Portal } from '../primitives/layout/portal';
import { Overlay } from '../primitives/layout/overlay';

export interface SheetProps {
  /** Whether sheet is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Sheet content */
  children: React.ReactNode;
  /** Sheet title */
  title?: React.ReactNode;
  /** Sheet description */
  description?: React.ReactNode;
  /** Sheet footer */
  footer?: React.ReactNode;
  /** Sheet side */
  side?: 'bottom' | 'top' | 'left' | 'right';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Show drag handle */
  showHandle?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Sheet Component
 *
 * Mobile-first bottom sheet that slides up from screen edge.
 * Also supports top, left, and right positions.
 *
 * @example
 * ```tsx
 * <Sheet
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Filter Options"
 *   showHandle
 * >
 *   <div>Filter content...</div>
 * </Sheet>
 * ```
 *
 * @example
 * ```tsx
 * <Sheet
 *   isOpen={true}
 *   onClose={handleClose}
 *   side="bottom"
 *   size="lg"
 *   footer={<Button onClick={handleApply}>Apply</Button>}
 * >
 *   <FilterForm />
 * </Sheet>
 * ```
 */
export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  footer,
  side = 'bottom',
  size = 'md',
  showHandle = true,
  showCloseButton = true,
  className,
}) => {
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Size configurations
  const sizeClasses = {
    bottom: {
      sm: 'h-1/3',
      md: 'h-1/2',
      lg: 'h-2/3',
      full: 'h-full',
    },
    top: {
      sm: 'h-1/3',
      md: 'h-1/2',
      lg: 'h-2/3',
      full: 'h-full',
    },
    left: {
      sm: 'w-80',
      md: 'w-96',
      lg: 'w-[32rem]',
      full: 'w-full',
    },
    right: {
      sm: 'w-80',
      md: 'w-96',
      lg: 'w-[32rem]',
      full: 'w-full',
    },
  };

  // Position classes
  const positionClasses = {
    bottom: 'bottom-0 left-0 right-0 rounded-t-2xl',
    top: 'top-0 left-0 right-0 rounded-b-2xl',
    left: 'left-0 top-0 bottom-0 rounded-r-2xl',
    right: 'right-0 top-0 bottom-0 rounded-l-2xl',
  };

  // Animation classes
  const animationClasses = {
    bottom: 'animate-in slide-in-from-bottom duration-300',
    top: 'animate-in slide-in-from-top duration-300',
    left: 'animate-in slide-in-from-left duration-300',
    right: 'animate-in slide-in-from-right duration-300',
  };

  return (
    <Portal>
      <Overlay isOpen={isOpen} onClose={onClose} opacity='dark' />
      <div
        className={cn(
          'fixed z-50',
          'bg-white dark:bg-gray-900',
          'shadow-xl',
          'flex flex-col',
          positionClasses[side],
          sizeClasses[side][size],
          animationClasses[side],
          className
        )}
      >
        {/* Drag Handle */}
        {showHandle && (side === 'bottom' || side === 'top') && (
          <div
            className={cn(
              'flex items-center justify-center',
              side === 'bottom' ? 'pt-3 pb-2' : 'pb-3 pt-2'
            )}
          >
            <div className='w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full' />
          </div>
        )}

        {/* Header */}
        {(title || description || showCloseButton) && (
          <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                {title && (
                  <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    {title}
                  </h2>
                )}
                {description && (
                  <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className='ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors'
                  aria-label='Close sheet'
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
          </div>
        )}

        {/* Content */}
        <div className='flex-1 overflow-y-auto px-6 py-4'>{children}</div>

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

export default Sheet;
