import React from 'react';
import { cn } from '../lib/utils';

export interface BackdropProps {
  /** Whether the backdrop is visible */
  isOpen: boolean;
  /** Click handler for backdrop */
  onClick?: () => void;
  /** Backdrop opacity variant */
  opacity?: 'light' | 'medium' | 'dark';
  /** Apply blur effect */
  blur?: boolean;
  /** Z-index value */
  zIndex?: number;
  /** Additional className */
  className?: string;
  /** Children to render on top of backdrop */
  children?: React.ReactNode;
}

/**
 * Backdrop Component
 *
 * Reusable backdrop/overlay for modals, drawers, and dialogs.
 * Provides consistent darkening and blur effects.
 *
 * @example
 * ```tsx
 * <Backdrop isOpen={isModalOpen} onClick={closeModal} blur>
 *   <div onClick={(e) => e.stopPropagation()}>
 *     <ModalContent />
 *   </div>
 * </Backdrop>
 * ```
 *
 * @example
 * ```tsx
 * <Backdrop
 *   isOpen={isDrawerOpen}
 *   onClick={closeDrawer}
 *   opacity="medium"
 *   zIndex={40}
 * >
 *   <Drawer />
 * </Backdrop>
 * ```
 */
export const Backdrop: React.FC<BackdropProps> = ({
  isOpen,
  onClick,
  opacity = 'medium',
  blur = false,
  zIndex = 50,
  className,
  children,
}) => {
  // Opacity configurations
  const opacityClasses = {
    light: 'bg-black/20 dark:bg-black/30',
    medium: 'bg-black/50 dark:bg-black/60',
    dark: 'bg-black/75 dark:bg-black/80',
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClick}
      className={cn(
        'fixed inset-0',
        'transition-all duration-200',
        opacityClasses[opacity],
        blur && 'backdrop-blur-sm',
        className
      )}
      style={{ zIndex }}
      role='presentation'
      aria-hidden='true'
    >
      {children}
    </div>
  );
};

export default Backdrop;
