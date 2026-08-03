import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CheckableSelect } from '../ui/checkable-select';

const OPTIONS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
];

function renderSelect(
  props: Partial<React.ComponentProps<typeof CheckableSelect>> = {}
) {
  const onChange = vi.fn();
  const onCheckedChange = vi.fn();
  const utils = render(
    <CheckableSelect
      options={OPTIONS}
      value='a'
      onChange={onChange}
      checked={['a', 'b', 'c']}
      onCheckedChange={onCheckedChange}
      ariaLabel='Pick one'
      {...props}
    />
  );
  return { onChange, onCheckedChange, ...utils };
}

/** Radix opens on a plain click in jsdom; there is no pointer-capture dance. */
function open() {
  fireEvent.click(screen.getByLabelText('Pick one'));
}

describe('CheckableSelect', () => {
  it('shows the chosen option on the trigger', () => {
    renderSelect();
    expect(screen.getByLabelText('Pick one')).toHaveTextContent('Alpha');
  });

  it('shows the placeholder when the value matches no option', () => {
    renderSelect({ value: 'gone', placeholder: 'Nothing chosen' });
    expect(screen.getByLabelText('Pick one')).toHaveTextContent(
      'Nothing chosen'
    );
  });

  it('choosing a row reports the new value', () => {
    const { onChange } = renderSelect();
    open();
    fireEvent.click(screen.getByRole('option', { name: /Beta/ }));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('unticking a checkbox reports the smaller set without choosing that row', () => {
    const { onChange, onCheckedChange } = renderSelect();
    open();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Show Beta' }));
    expect(onCheckedChange).toHaveBeenCalledWith(['a', 'c']);
    // The click was on the checkbox, not the row — toggling visibility must
    // not also change which item is chosen.
    expect(onChange).not.toHaveBeenCalled();
  });

  it('ticking a checkbox reports the larger set', () => {
    const { onCheckedChange } = renderSelect({ checked: ['a'] });
    open();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Show Beta' }));
    expect(onCheckedChange).toHaveBeenCalledWith(['a', 'b']);
  });

  it('reports the ticked set in options order, not click order', () => {
    // Callers persist this; a set that reshuffles on every click is noise in
    // a diff.
    const { onCheckedChange } = renderSelect({ checked: ['c'] });
    open();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Show Alpha' }));
    expect(onCheckedChange).toHaveBeenCalledWith(['a', 'c']);
  });

  it('disables the last ticked checkbox so the set cannot be emptied', () => {
    renderSelect({ checked: ['a'] });
    open();
    expect(screen.getByRole('checkbox', { name: 'Show Alpha' })).toBeDisabled();
    // Unticked rows stay clickable, or the set could never grow back.
    expect(screen.getByRole('checkbox', { name: 'Show Beta' })).toBeEnabled();
  });

  it('respects a higher minChecked', () => {
    renderSelect({ checked: ['a', 'b'], minChecked: 2 });
    open();
    expect(screen.getByRole('checkbox', { name: 'Show Alpha' })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: 'Show Beta' })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: 'Show Gamma' })).toBeEnabled();
  });

  it('renders its menu outside an overflow-hidden ancestor', () => {
    // The control is meant for toolbars, which scroll horizontally. An
    // absolutely-positioned menu would be clipped by that ancestor; a
    // portalled one is not. Assert the portal, since clipping itself is
    // invisible to getBoundingClientRect in jsdom.
    const { container } = render(
      <div style={{ overflowX: 'auto' }}>
        <CheckableSelect
          options={OPTIONS}
          value='a'
          onChange={() => {}}
          checked={['a', 'b', 'c']}
          onCheckedChange={() => {}}
          ariaLabel='In a scroller'
        />
      </div>
    );
    fireEvent.click(screen.getByLabelText('In a scroller'));
    expect(
      container.contains(screen.getByRole('checkbox', { name: 'Show Beta' }))
    ).toBe(false);
  });

  it('never moves a disabled option, however the click arrives', () => {
    // The disabled attribute is the first line of defence, but a real browser
    // suppressing the click is not something to rely on -- the rule holds in
    // the toggle function too.
    const { onCheckedChange } = renderSelect({
      options: [
        ...OPTIONS.slice(0, 2),
        { value: 'c', label: 'Gamma', disabled: true },
      ],
    });
    open();
    expect(screen.getByRole('checkbox', { name: 'Show Gamma' })).toBeDisabled();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Show Gamma' }));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('ticks under a real pointer sequence, not just a bare click', async () => {
    // fireEvent dispatches only `click`, which cannot see this class of bug:
    // Radix selects an Item on `pointerup`, so without stopping that event the
    // row is chosen and the menu unmounts before the checkbox's own click
    // lands -- ticking silently does nothing for a real user while every
    // fireEvent test still passes.
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onCheckedChange = vi.fn();
    render(
      <CheckableSelect
        options={OPTIONS}
        value='a'
        onChange={onChange}
        checked={['a', 'b', 'c']}
        onCheckedChange={onCheckedChange}
        ariaLabel='Pick one'
      />
    );

    await user.click(screen.getByLabelText('Pick one'));
    await user.click(screen.getByRole('checkbox', { name: 'Show Beta' }));

    expect(onCheckedChange).toHaveBeenCalledWith(['a', 'c']);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('never falls below the floor, however the click arrives', () => {
    const { onCheckedChange } = renderSelect({ checked: ['a'] });
    open();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Show Alpha' }));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
