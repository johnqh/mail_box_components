import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';
import { Button } from './button';

/** Props for the {@link FormModal} component. */
export interface FormModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Title shown in the top bar. */
  title: string;
  /** Called when the user cancels (top-bar close button, overlay click, or Escape). */
  onClose: () => void;
  /** Called when the user activates the primary confirmation button. */
  onSave: () => void;
  /** Whether the confirm action is in progress (shows a loading button, blocks close). */
  saving?: boolean;
  /** Whether the confirm action is currently allowed. */
  canSave?: boolean;
  /** Label for the primary confirmation button (e.g. "Save", "OK"). */
  saveLabel?: string;
  /** Dialog width on tablet/desktop. */
  size?: 'small' | 'medium' | 'large';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  closeAriaLabel?: string;
  /** Extra element rendered in the top bar, before the close button. */
  headerRight?: React.ReactNode;
  /** Extra class names on the dialog container. */
  className?: string;
  children: React.ReactNode;
}

const SIZE_CLASS: Record<NonNullable<FormModalProps['size']>, string> = {
  small: 'sm:max-w-sm',
  medium: 'sm:max-w-md',
  large: 'sm:max-w-2xl',
};

/**
 * A responsive form dialog with a fixed top bar (title + cancel), a vertically
 * scrollable content area, and a sticky bottom bar holding the positive
 * confirmation button.
 *
 * Layout is full-screen on phones and a centered dialog on tablets/desktops.
 *
 * Prefer this over composing `Modal` + `ModalHeader/Content/Footer` for forms:
 * it guarantees the content scrolls (never pushing the confirm button off
 * screen) and keeps the confirm CTA reachable.
 *
 * @example
 * ```tsx
 * <FormModal open={open} title="Edit item" onClose={close} onSave={save}
 *   saving={saving} canSave={!!name} saveLabel="Save">
 *   <FormField ... />
 * </FormModal>
 * ```
 */
export const FormModal: React.FC<FormModalProps> = ({
  open,
  title,
  onClose,
  onSave,
  saving = false,
  canSave = true,
  saveLabel = 'Save',
  size = 'medium',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  closeAriaLabel = 'Cancel',
  headerRight,
  className,
  children,
}) => {
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !saving) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeOnEscape, saving, onClose]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick && !saving) onClose();
  };

  return createPortal(
    <div className='fixed inset-0 z-50 flex sm:items-center sm:justify-center sm:p-4'>
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={handleOverlayClick}
        aria-hidden='true'
      />
      <div
        role='dialog'
        aria-modal='true'
        className={cn(
          // Base: flex column so header/footer pin and body scrolls between them.
          'relative z-10 flex w-full flex-col bg-card text-foreground',
          // Phone: full-screen.
          'h-full',
          // Tablet/desktop: centered dialog.
          'sm:h-auto sm:max-h-[85vh] sm:rounded-lg sm:shadow-xl sm:border sm:border-border',
          SIZE_CLASS[size],
          className
        )}
      >
        {/* Top bar: title + cancel */}
        <div className='flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3'>
          <h2 className='truncate text-lg font-semibold'>{title}</h2>
          <div className='flex items-center gap-1'>
            {headerRight}
            <button
              type='button'
              onClick={onClose}
              disabled={saving}
              aria-label={closeAriaLabel}
              className='rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50'
            >
              <XMarkIcon className='h-5 w-5' />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className='flex-1 overflow-y-auto px-4 py-4'>{children}</div>

        {/* Bottom bar: sticky positive CTA */}
        <div className='shrink-0 border-t border-border px-4 py-3'>
          <Button
            type='button'
            variant='primary'
            className='w-full'
            onClick={onSave}
            disabled={!canSave || saving}
          >
            {saving ? 'Saving…' : saveLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};
