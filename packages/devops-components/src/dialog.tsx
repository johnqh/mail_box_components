import React, { useEffect } from 'react';
import { cn, Portal, Overlay } from '@sudobility/components';

export interface DialogProps {
  /** Whether dialog is open */
  isOpen: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Dialog content */
  children: React.ReactNode;
  /** Dialog size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Show close button */
  showCloseButton?: boolean;
  /** Close on outside click */
  closeOnOutsideClick?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Dialog Component
 *
 * Simple, flexible dialog/modal container.
 * More flexible than AlertDialog, suitable for any content.
 *
 * @example
 * ```tsx
 * <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <div className="p-6">
 *     <h2>Dialog Title</h2>
 *     <p>Dialog content...</p>
 *   </div>
 * </Dialog>
 * ```
 *
 * @example
 * ```tsx
 * <Dialog
 *   isOpen={true}
 *   onClose={handleClose}
 *   size="lg"
 *   closeOnOutsideClick={false}
 * >
 *   <CustomContent />
 * </Dialog>
 * ```
 */
export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  className,
}) => {
  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen || !onClose) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  // Size configurations
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  const handleOverlayClick = () => {
    if (closeOnOutsideClick && onClose) {
      onClose();
    }
  };

  return (
    <Portal>
      <Overlay
        isOpen={isOpen}
        onClose={handleOverlayClick}
        opacity='dark'
        blur
      />
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <div
          className={cn(
            'relative w-full',
            sizeClasses[size],
            'bg-white dark:bg-gray-900',
            'rounded-lg shadow-xl',
            'animate-in fade-in zoom-in-95 duration-200',
            className
          )}
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              className='absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors'
              aria-label='Close dialog'
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

          {/* Content */}
          {children}
        </div>
      </div>
    </Portal>
  );
};
