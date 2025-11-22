import React from 'react';
import { cn } from '../../lib/utils';
import { Portal } from './portal';

export interface OverlayProps {
  /** Whether overlay is visible */
  isOpen: boolean;
  /** Click handler for overlay backdrop */
  onClose?: () => void;
  /** Overlay content */
  children?: React.ReactNode;
  /** Blur backdrop */
  blur?: boolean;
  /** Opacity level */
  opacity?: 'light' | 'medium' | 'dark';
  /** Z-index level */
  zIndex?: number;
  /** Prevent body scroll when open */
  lockScroll?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Overlay Component
 *
 * Full-screen backdrop overlay with optional blur and click-to-close.
 * Typically used with modals, drawers, and popups.
 *
 * @example
 * ```tsx
 * <Overlay isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
 *   <Modal>Content</Modal>
 * </Overlay>
 * ```
 *
 * @example
 * ```tsx
 * <Overlay isOpen={true} blur opacity="dark" />
 * ```
 */
export const Overlay: React.FC<OverlayProps> = ({
  isOpen,
  onClose,
  children,
  blur = false,
  opacity = 'medium',
  zIndex = 40,
  lockScroll = true,
  className,
}) => {
  // Handle body scroll locking
  React.useEffect(() => {
    if (!lockScroll) return;

    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, lockScroll]);

  if (!isOpen) return null;

  // Opacity configurations
  const opacityClasses = {
    light: 'bg-black/20 dark:bg-black/30',
    medium: 'bg-black/50 dark:bg-black/60',
    dark: 'bg-black/75 dark:bg-black/85',
  };

  return (
    <Portal>
      <div
        className={cn(
          'fixed inset-0',
          'transition-opacity duration-300',
          blur && 'backdrop-blur-sm',
          opacityClasses[opacity],
          className
        )}
        style={{ zIndex }}
        onClick={onClose}
        aria-hidden='true'
      >
        {children && (
          <div
            className='relative h-full w-full'
            onClick={e => e.stopPropagation()}
          >
            {children}
          </div>
        )}
      </div>
    </Portal>
  );
};

export default Overlay;
