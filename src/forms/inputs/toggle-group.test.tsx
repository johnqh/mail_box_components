/**
 * `ToggleGroup`'s ARIA, which is the part a segmented control cannot get by
 * looking right.
 *
 * The same row of buttons means three different things depending on what it
 * does — independent toggles, a panel switcher, one-of-N — and a screen reader
 * has to be told which. Presentation is identical in all three, which is
 * exactly why this needs a test rather than an eye.
 */
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ToggleGroup } from './toggle-group';

const OPTIONS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
];

describe('ToggleGroup roles', () => {
  it('defaults to independent toggles', () => {
    render(<ToggleGroup options={OPTIONS} value='a' onChange={() => {}} />);
    expect(screen.getByRole('group')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Alpha' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('announces as tabs when it switches panels', () => {
    /*
      Without this a panel switcher reads as four unrelated buttons and the
      link to the panel is lost — which is what happened when the music app's
      property sheet moved off a tab strip onto this control.
    */
    render(
      <ToggleGroup
        options={OPTIONS}
        value='a'
        onChange={() => {}}
        role='tablist'
      />
    );
    expect(screen.getByRole('tablist')).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('announces as radios when the choice is a value', () => {
    render(
      <ToggleGroup
        options={OPTIONS}
        value='b'
        onChange={() => {}}
        role='radiogroup'
      />
    );
    expect(screen.getByRole('radiogroup')).toBeTruthy();
    expect(screen.getByRole('radio', { name: 'Beta' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  it('still reports the choice whatever role it wears', () => {
    const onChange = vi.fn();
    render(
      <ToggleGroup
        options={OPTIONS}
        value='a'
        onChange={onChange}
        role='tablist'
      />
    );
    screen.getByRole('tab', { name: 'Beta' }).click();
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
