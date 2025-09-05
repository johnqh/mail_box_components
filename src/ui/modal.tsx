 
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';
import { variants } from '../design-system';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large' | 'extraLarge' | 'fullWidth';
  variant?: 'default' | 'web3wallet' | 'web3transaction' | 'web3confirmation';
  overlay?: 'default' | 'dark' | 'light';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
  className?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

 
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'medium',
  variant: _variant = 'default',
  overlay: _overlay = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  className,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle focus management
  useEffect(() => {
    if (!isOpen) return;

    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore body scroll
      document.body.style.overflow = 'unset';
      
      // Restore focus to the previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getContainerClass = () => {
    const baseClass = variants.overlays.modal.content();
    const sizeClass = variants.overlays.modal[size]();
    return cn(baseClass, sizeClass);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <>
      <div className={variants.overlays.modal.backdrop()} onClick={handleOverlayClick} />
      <div 
        className={variants.overlays.modal.container()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
      >
        <div
          ref={modalRef}
          className={cn(getContainerClass(), className)}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className={variants.overlays.modal.header()}>
              <h2 id={ariaLabelledBy} className={variants.overlays.modal.title()}>
                {title}
              </h2>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className={variants.overlays.modal.closeButton()}
                  aria-label="Close modal"
                >
                  <XMarkIcon className={variants.icon.variant.muted.md()} />
                </button>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export interface ModalHeaderProps {
  children: React.ReactNode;
  variant?: 'default' | 'centered' | 'minimal';
  className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  variant: _variant = 'default',
  className
}) => (
  <div className={cn(variants.overlays.modal.header(), className)}>
    {children}
  </div>
);

export interface ModalContentProps {
  children: React.ReactNode;
  variant?: 'default' | 'padded' | 'compact' | 'scrollable';
  className?: string;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  variant: _variant = 'default',
  className
}) => (
  <div className={cn(variants.overlays.modal.body(), className)}>
    {children}
  </div>
);

export interface ModalFooterProps {
  children: React.ReactNode;
  variant?: 'default' | 'centered' | 'spaceBetween' | 'minimal';
  className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  variant: _variant = 'default',
  className
}) => (
  <div className={cn(variants.overlays.modal.footer(), className)}>
    {children}
  </div>
);

export default Modal;