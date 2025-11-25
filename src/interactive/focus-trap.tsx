import React, { useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

export interface FocusTrapProps {
  /** Children content */
  children: React.ReactNode;
  /** Enable focus trap */
  active?: boolean;
  /** Initial focus element selector */
  initialFocus?: string;
  /** Return focus on deactivate */
  returnFocus?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * FocusTrap Component
 *
 * Traps keyboard focus within a container.
 * Useful for modals, dialogs, and accessibility.
 *
 * @example
 * ```tsx
 * <FocusTrap active={isModalOpen} returnFocus>
 *   <Modal>
 *     <input type="text" />
 *     <button>Submit</button>
 *   </Modal>
 * </FocusTrap>
 * ```
 *
 * @example
 * ```tsx
 * <FocusTrap
 *   active={showDialog}
 *   initialFocus=".primary-button"
 * >
 *   <Dialog />
 * </FocusTrap>
 * ```
 */
export const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  active = true,
  initialFocus,
  returnFocus = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    // Store previously focused element
    if (returnFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    // Get all focusable elements
    const getFocusableElements = (): HTMLElement[] => {
      if (!containerRef.current) return [];

      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(',');

      return Array.from(
        containerRef.current.querySelectorAll(focusableSelectors)
      ) as HTMLElement[];
    };

    // Focus initial element
    const focusInitial = () => {
      if (initialFocus) {
        const element = containerRef.current?.querySelector(
          initialFocus
        ) as HTMLElement;
        if (element) {
          element.focus();
          return;
        }
      }

      // Focus first focusable element
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    };

    // Handle tab key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
      // Tab
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Focus initial element after a brief delay
    const timeoutId = setTimeout(focusInitial, 0);

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('keydown', handleKeyDown);

      // Return focus to previous element
      if (returnFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [active, initialFocus, returnFocus]);

  if (!active) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
};
