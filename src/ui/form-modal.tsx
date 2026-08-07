import React, { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';
import { Button } from './button';
import type { ButtonProps } from './button';

/**
 * One button in the modal's bottom bar.
 *
 * Exists so the same shell can carry the footers real dialogs need — a
 * destructive confirm, a wizard's Back/Next pair, three peer choices — rather
 * than only the single primary CTA a save-form wants.
 */
export interface FormModalAction {
  /** Button text, also its accessible name unless `ariaLabel` overrides it. */
  label: string;
  onClick: () => void;
  /** Defaults to `'primary'` for the last action and `'ghost'` for the others. */
  variant?: ButtonProps['variant'];
  disabled?: boolean;
  /** Shows `loadingLabel` in place of `label` and disables the button. */
  loading?: boolean;
  /** Defaults to `'Working…'`. */
  loadingLabel?: string;
  autoFocus?: boolean;
  /** Overrides the accessible name when `label` is ambiguous elsewhere on the page. */
  ariaLabel?: string;
}

/** Props for the {@link FormModal} component. */
export interface FormModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Title shown in the top bar. */
  title: string;
  /** Called when the user cancels (top-bar close button, overlay click, or Escape). */
  onClose: () => void;
  /**
   * Called when the user activates the primary confirmation button. Renders a
   * single full-width CTA. Omit it and pass {@link FormModalProps.actions} for
   * any other footer; omit both for a modal with no actions at all.
   */
  onSave?: () => void;
  /**
   * Bottom-bar buttons, in visual order — the last is the primary one. Takes
   * precedence over `onSave`/`saveLabel`. Pass `[]` for no bottom bar.
   */
  actions?: FormModalAction[];
  /** Whether the confirm action is in progress (shows a loading button, blocks close). */
  saving?: boolean;
  /** Whether the confirm action is currently allowed. */
  canSave?: boolean;
  /** Label for the primary confirmation button (e.g. "Save", "OK"). */
  saveLabel?: string;
  /** Label shown on the confirmation button while `saving`. Defaults to `'Saving…'`. */
  savingLabel?: string;
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
  actions,
  saving = false,
  canSave = true,
  saveLabel = 'Save',
  savingLabel = 'Saving…',
  size = 'medium',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  closeAriaLabel = 'Cancel',
  headerRight,
  className,
  children,
}) => {
  // The dialog owns its title, so it must also own the label pointing at it:
  // a consumer that adds its own heading to `children` would render the title
  // twice, and one that does not would leave the dialog with no accessible name.
  const titleId = useId();

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

  // `actions` wins when given; otherwise `onSave` produces the full-width CTA
  // this component shipped with, so existing consumers render unchanged.
  const singleCta = actions === undefined && onSave !== undefined;
  const footerActions: FormModalAction[] =
    actions ??
    (onSave
      ? [
          {
            label: saveLabel,
            onClick: onSave,
            variant: 'primary',
            disabled: !canSave,
            loading: saving,
            loadingLabel: savingLabel,
          },
        ]
      : []);

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
        aria-labelledby={titleId}
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
          <h2 id={titleId} className='truncate text-lg font-semibold'>
            {title}
          </h2>
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

        {/* Bottom bar: sticky actions */}
        {footerActions.length > 0 && (
          <div
            className={cn(
              'shrink-0 border-t border-border px-4 py-3',
              // A lone CTA spans the bar; a set of them is a right-aligned row
              // that stacks on phones, primary (last) on top.
              !singleCta &&
                'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'
            )}
          >
            {footerActions.map((action, i) => (
              <Button
                key={action.label}
                type='button'
                variant={
                  action.variant ??
                  (i === footerActions.length - 1 ? 'primary' : 'ghost')
                }
                className={singleCta ? 'w-full' : undefined}
                onClick={action.onClick}
                disabled={action.disabled || action.loading}
                autoFocus={action.autoFocus}
                aria-label={action.ariaLabel}
              >
                {action.loading
                  ? (action.loadingLabel ?? 'Working…')
                  : action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
