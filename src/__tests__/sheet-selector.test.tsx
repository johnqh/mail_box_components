import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SheetSelector } from '../ui/sheet-selector';

const OPTIONS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Bravo' },
  { value: 'c', label: 'Charlie', disabled: true },
];

function renderSelector(
  props: Partial<React.ComponentProps<typeof SheetSelector>> = {}
) {
  const onChange = vi.fn();
  render(
    <SheetSelector options={OPTIONS} value='' onChange={onChange} {...props} />
  );
  return { onChange };
}

describe('SheetSelector', () => {
  it('shows the placeholder until something is selected', () => {
    renderSelector({ placeholder: 'Pick one' });
    expect(
      screen.getByRole('button', { name: 'Pick one' })
    ).toBeInTheDocument();
  });

  it('shows the selected option label on the trigger', () => {
    renderSelector({ value: 'b' });
    expect(screen.getByRole('button', { name: 'Bravo' })).toBeInTheDocument();
  });

  it('falls back to the value when an option has no label', () => {
    render(
      <SheetSelector
        options={[{ value: 'raw' }]}
        value='raw'
        onChange={vi.fn()}
      />
    );
    expect(screen.getByRole('button', { name: 'raw' })).toBeInTheDocument();
  });

  it('opens a modal rather than a dropdown, which is the whole point', () => {
    renderSelector();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('option', { name: 'Alpha' })).toBeInTheDocument();
  });

  it('reports the chosen value and closes', () => {
    const { onChange } = renderSelector();
    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByRole('option', { name: 'Bravo' }));

    expect(onChange).toHaveBeenCalledWith('b');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('marks the current option selected', () => {
    renderSelector({ value: 'a' });
    fireEvent.click(screen.getByRole('button', { name: 'Alpha' }));

    expect(screen.getByRole('option', { name: /Alpha/ })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('option', { name: 'Bravo' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('does not choose a disabled option', () => {
    const { onChange } = renderSelector();
    fireEvent.click(screen.getByRole('button'));

    const disabled = screen.getByRole('option', { name: 'Charlie' });
    expect(disabled).toBeDisabled();
    fireEvent.click(disabled);

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  describe('cancelling', () => {
    it('closes on the cancel button without reporting a change', () => {
      const { onChange } = renderSelector({ cancelLabel: 'Cancel' });
      fireEvent.click(screen.getByRole('button'));

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('closes when the overlay is clicked', () => {
      // The overlay is the "outside" on tablet and desktop. On phones the
      // dialog is full-screen, so there is nothing outside to click and the
      // cancel button is the only way out — which is why it is not optional.
      const { onChange } = renderSelector();
      fireEvent.click(screen.getByRole('button'));

      fireEvent.click(screen.getByTestId('sheet-selector-overlay'));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('closes on Escape', () => {
      const { onChange } = renderSelector();
      fireEvent.click(screen.getByRole('button'));

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('returns focus to the trigger, so keyboard users do not lose their place', () => {
      renderSelector();
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      fireEvent.keyDown(document, { key: 'Escape' });

      expect(document.activeElement).toBe(trigger);
    });
  });

  it('locks the page behind the modal and releases it again', () => {
    // The list scrolls inside the dialog; without this the page scrolls too.
    renderSelector();
    fireEvent.click(screen.getByRole('button'));
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.body.style.overflow).toBe('unset');
  });

  it('renders an empty state instead of a bare list', () => {
    render(
      <SheetSelector
        options={[]}
        value=''
        onChange={vi.fn()}
        emptyMessage='Nothing here'
      />
    );
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('cannot be opened while disabled', () => {
    renderSelector({ disabled: true });
    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();

    fireEvent.click(trigger);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  describe('grouping', () => {
    const GROUPED = [
      { value: 'p1', label: 'Piano', group: 'Keys' },
      { value: 'p2', label: 'Organ', group: 'Keys' },
      { value: 'g1', label: 'Guitar', group: 'Strings' },
    ];

    it('renders one heading per run of options, not one per option', () => {
      // A heading per option would be noise; the point of grouping a long list
      // is that the headings are landmarks.
      render(<SheetSelector options={GROUPED} value='' onChange={vi.fn()} />);
      fireEvent.click(screen.getByRole('button'));

      expect(screen.getAllByText('Keys')).toHaveLength(1);
      expect(screen.getAllByText('Strings')).toHaveLength(1);
    });

    it('keeps every option selectable under its heading', () => {
      const onChange = vi.fn();
      render(<SheetSelector options={GROUPED} value='' onChange={onChange} />);
      fireEvent.click(screen.getByRole('button'));

      expect(screen.getAllByRole('option')).toHaveLength(3);
      fireEvent.click(screen.getByRole('option', { name: 'Guitar' }));
      expect(onChange).toHaveBeenCalledWith('g1');
    });

    it('renders no headings when options are ungrouped', () => {
      render(<SheetSelector options={OPTIONS} value='' onChange={vi.fn()} />);
      fireEvent.click(screen.getByRole('button'));

      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });
  });
});
