import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '../lib/utils';
import { variants } from '@sudobility/design';
import { SelectContent, SelectTrigger } from './select';

export interface CheckableSelectOption {
  /** Stable identity, reported to `onChange`/`onCheckedChange`. */
  value: string;
  /** Shown on the row, and on the trigger when this option is chosen. */
  label: string;
  /** Greys the row out: it can be neither chosen nor ticked. */
  disabled?: boolean;
}

export interface CheckableSelectProps {
  options: CheckableSelectOption[];
  /** The chosen option's value. */
  value: string;
  /** Called with the newly chosen option's value. */
  onChange: (value: string) => void;
  /** The ticked options' values. */
  checked: string[];
  /** Called with the whole new ticked set, in `options` order. */
  onCheckedChange: (checked: string[]) => void;
  /**
   * How few options may stay ticked. At the floor every *ticked* box is
   * disabled — unticked rows stay clickable, or the set could never grow back.
   */
  minChecked?: number;
  ariaLabel?: string;
  className?: string;
  /** Shown on the trigger when `value` matches no option. */
  placeholder?: string;
}

/**
 * A select whose rows each carry a checkbox: one chosen value, plus an
 * independent set of ticked options.
 *
 * Distinct from `MultiSelect`, whose whole model is "value is an array". Here
 * the two pieces of state are independent, and collapsing them into one makes
 * both harder to read.
 *
 * Built on `Select` rather than on `MultiSelect`'s hand-rolled absolutely
 * positioned dropdown, so the menu is portalled. That is not incidental: this
 * control is meant for toolbars, which scroll horizontally, and an ancestor
 * with `overflow-x` set makes the y axis non-visible too — an absolutely
 * positioned menu would be clipped by it.
 */
export const CheckableSelect: React.FC<CheckableSelectProps> = ({
  options,
  value,
  onChange,
  checked,
  onCheckedChange,
  minChecked = 1,
  ariaLabel,
  className,
  placeholder = 'Select…',
}) => {
  const checkedSet = React.useMemo(() => new Set(checked), [checked]);
  const atFloor = checkedSet.size <= minChecked;
  const chosen = options.find(option => option.value === value);

  const toggle = (option: CheckableSelectOption): void => {
    // Guarded here rather than only by the `disabled` attribute: the rules that
    // matter — a disabled option never moves, and the set never falls below the
    // floor — should hold in the function, not depend on the DOM suppressing
    // the event.
    if (option.disabled) return;
    const isChecked = checkedSet.has(option.value);
    if (isChecked && atFloor) return;

    const next = new Set(checkedSet);
    if (isChecked) next.delete(option.value);
    else next.add(option.value);
    // Reported in `options` order rather than click order: callers persist
    // this, and a set that reshuffles itself on every click is noise in a diff.
    onCheckedChange(options.filter(o => next.has(o.value)).map(o => o.value));
  };

  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectTrigger aria-label={ariaLabel} className={className}>
        <span className='truncate'>{chosen ? chosen.label : placeholder}</span>
      </SelectTrigger>

      <SelectContent>
        {options.map(option => {
          const isChecked = checkedSet.has(option.value);
          return (
            <SelectPrimitive.Item
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={cn(
                variants.overlays.dropdown.item(),
                'relative select-none gap-2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
              )}
            >
              <input
                type='checkbox'
                aria-label={`Show ${option.label}`}
                checked={isChecked}
                disabled={option.disabled || (isChecked && atFloor)}
                onChange={() => toggle(option)}
                // Radix treats a click anywhere in an Item as choosing it, and
                // closes the menu. Both are wrong for the checkbox: ticking is
                // not choosing, and closing after each tick would make setting
                // several a chore.
                onClick={e => e.stopPropagation()}
                onPointerDown={e => e.stopPropagation()}
                onKeyDown={e => e.stopPropagation()}
                className='h-4 w-4 flex-shrink-0 accent-current'
              />
              <SelectPrimitive.ItemText>
                {option.label}
              </SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          );
        })}
      </SelectContent>
    </SelectPrimitive.Root>
  );
};
