import React, { useCallback, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

/** A single choice offered by {@link SheetSelector}. */
export interface SheetSelectorOption {
  /** Option value. */
  value: string;
  /** Option label; defaults to the value when omitted. */
  label?: React.ReactNode;
  /** Disabled state. */
  disabled?: boolean;
}

/** Props for the {@link SheetSelector} component. */
export interface SheetSelectorProps {
  /** Available options. */
  options: SheetSelectorOption[];
  /** Currently selected value. */
  value: string;
  /** Called with the chosen value. Not called when the user cancels. */
  onChange: (value: string) => void;
  /** Title shown in the modal's top bar. */
  title?: string;
  /** Trigger text when nothing is selected. */
  placeholder?: string;
  /** Disables the trigger. */
  disabled?: boolean;
  /** Dialog width on tablet/desktop. Phones are always full-screen. */
  size?: 'small' | 'medium' | 'large';
  /** Shown in place of the list when `options` is empty. */
  emptyMessage?: string;
  /** Label for the cancel control. */
  cancelLabel?: string;
  /** Extra class names for the trigger. */
  className?: string;
  /** Extra class names for the dialog container. */
  modalClassName?: string;
  /** Accessible name for the trigger, when the visible text is not enough. */
  'aria-label'?: string;
}

const SIZE_CLASS: Record<NonNullable<SheetSelectorProps['size']>, string> = {
  small: 'sm:max-w-sm',
  medium: 'sm:max-w-md',
  large: 'sm:max-w-2xl',
};

/**
 * SheetSelector Component
 *
 * Picks one option from a list, like a select — but presents the list in a
 * modal rather than a dropdown, which is what makes it suitable for long
 * lists. A dropdown anchored to its trigger is constrained by the space
 * around it; a modal is not, so a hundred options stay comfortably scrollable.
 *
 * The modal is full-screen on phones and a centered dialog on tablet and
 * desktop, matching {@link FormModal}. It has no confirm button on purpose:
 * choosing an option *is* the confirmation, and a second step would be
 * redundant. Cancelling is therefore always explicit — the top-bar cancel
 * button, Escape, or (on tablet/desktop, where there is an outside to click)
 * the overlay.
 *
 * @example
 * ```tsx
 * <SheetSelector
 *   title="Choose a timezone"
 *   options={timezones.map(zone => ({ value: zone.id, label: zone.name }))}
 *   value={timezone}
 *   onChange={setTimezone}
 * />
 * ```
 */
export const SheetSelector: React.FC<SheetSelectorProps> = ({
  options,
  value,
  onChange,
  title = 'Select an option',
  placeholder = 'Select…',
  disabled = false,
  size = 'medium',
  emptyMessage = 'No options available',
  cancelLabel = 'Cancel',
  className,
  modalClassName,
  'aria-label': ariaLabel,
}) => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const selected = options.find(option => option.value === value);

  const close = useCallback(() => {
    setOpen(false);
    // Send focus back where it came from, or the trigger is lost to keyboard
    // and screen-reader users the moment the modal closes.
    triggerRef.current?.focus();
  }, []);

  const choose = useCallback(
    (next: string) => {
      onChange(next);
      close();
    },
    [onChange, close]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    // The list scrolls inside the dialog; the page behind it must not.
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type='button'
        disabled={disabled}
        aria-haspopup='dialog'
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen(true)}
        className={cn(
          'flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      >
        <span className={cn('truncate', !selected && 'text-muted-foreground')}>
          {selected ? (selected.label ?? selected.value) : placeholder}
        </span>
        <ChevronDownIcon className='ml-2 h-4 w-4 flex-shrink-0 opacity-50' />
      </button>

      {open &&
        createPortal(
          <div className='fixed inset-0 z-50 flex sm:items-center sm:justify-center sm:p-4'>
            <div
              data-testid='sheet-selector-overlay'
              className='absolute inset-0 bg-black/50 backdrop-blur-sm'
              onClick={close}
              aria-hidden='true'
            />
            <div
              role='dialog'
              aria-modal='true'
              aria-labelledby={titleId}
              className={cn(
                // Flex column so the top bar pins and the list scrolls under it.
                'relative z-10 flex w-full flex-col bg-card text-foreground',
                // Phone: full-screen. There is no outside to click here, which
                // is why the cancel button is not optional.
                'h-full',
                // Tablet/desktop: centered dialog.
                'sm:h-auto sm:max-h-[85vh] sm:rounded-lg sm:border sm:border-border sm:shadow-xl',
                SIZE_CLASS[size],
                modalClassName
              )}
            >
              <div className='flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3'>
                <h2 id={titleId} className='truncate text-lg font-semibold'>
                  {title}
                </h2>
                <button
                  type='button'
                  onClick={close}
                  aria-label={cancelLabel}
                  className='rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
                >
                  <XMarkIcon className='h-5 w-5' />
                </button>
              </div>

              <div
                className='flex-1 overflow-y-auto p-2'
                role='listbox'
                aria-labelledby={titleId}
              >
                {options.length === 0 ? (
                  <p className='px-2 py-6 text-center text-sm text-muted-foreground'>
                    {emptyMessage}
                  </p>
                ) : (
                  options.map(option => {
                    const isSelected = option.value === value;
                    return (
                      <button
                        key={option.value}
                        type='button'
                        role='option'
                        aria-selected={isSelected}
                        disabled={option.disabled}
                        onClick={() => choose(option.value)}
                        className={cn(
                          'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted focus:bg-muted focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                          isSelected && 'bg-muted font-medium'
                        )}
                      >
                        <span className='truncate'>
                          {option.label ?? option.value}
                        </span>
                        {isSelected && (
                          <CheckIcon className='h-4 w-4 flex-shrink-0' />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
