import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  chooseMenuSide,
} from '../ui/select';

describe('Select Component', () => {
  it('renders select trigger', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder='Select an option' />
        </SelectTrigger>
      </Select>
    );

    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Select>
        <SelectTrigger className='custom-class'>
          <SelectValue />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveClass('custom-class');
  });

  it('handles disabled state', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('data-disabled', '');
  });

  it('opens dropdown on trigger click', () => {
    render(
      <Select>
        <SelectTrigger data-testid='select-trigger'>
          <SelectValue placeholder='Select' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='option1'>Option 1</SelectItem>
          <SelectItem value='option2'>Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId('select-trigger');
    fireEvent.click(trigger);

    expect(
      screen.getByRole('option', { name: 'Option 1' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Option 2' })
    ).toBeInTheDocument();
  });

  it('selects an item when clicked', () => {
    const onValueChange = vi.fn();

    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger data-testid='select-trigger'>
          <SelectValue placeholder='Select' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='option1'>Option 1</SelectItem>
          <SelectItem value='option2'>Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId('select-trigger');
    fireEvent.click(trigger);

    const option = screen.getByRole('option', { name: 'Option 1' });
    fireEvent.click(option);

    expect(onValueChange).toHaveBeenCalledWith('option1');
  });

  it('renders with groups and labels', () => {
    render(
      <Select>
        <SelectTrigger data-testid='select-trigger'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Group 1</SelectLabel>
            <SelectItem value='option1'>Option 1</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Group 2</SelectLabel>
            <SelectItem value='option2'>Option 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId('select-trigger');
    fireEvent.click(trigger);

    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2')).toBeInTheDocument();
  });

  it('applies hover styles to items', () => {
    render(
      <Select>
        <SelectTrigger data-testid='select-trigger'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='option1'>Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId('select-trigger');
    fireEvent.click(trigger);

    const option = screen.getByRole('option', { name: 'Option 1' });
    expect(option).toHaveClass('hover:bg-blue-50');
    expect(option).toHaveClass('dark:hover:bg-blue-900/20');
  });

  it('shows checkmark for selected item', () => {
    render(
      <Select defaultValue='option1'>
        <SelectTrigger data-testid='select-trigger'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='option1'>Option 1</SelectItem>
          <SelectItem value='option2'>Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId('select-trigger');
    fireEvent.click(trigger);

    const selectedOption = screen.getByRole('option', { name: 'Option 1' });
    expect(selectedOption).toHaveAttribute('data-state', 'checked');
  });

  it('sizes its menu to its own content, not to the trigger', () => {
    // An icon-only trigger is ~30px wide. Pinning the menu to that width
    // clipped every label in it, which is what made an icon-triggered select
    // unusable.
    render(
      <Select defaultOpen>
        <SelectTrigger aria-label='Articulation' className='w-8'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='staccato'>Staccato</SelectItem>
          <SelectItem value='marcato'>Marcato</SelectItem>
        </SelectContent>
      </Select>
    );

    const item = screen.getByText('Staccato');
    const content = item.closest('[class*="min-w-"]');
    expect(content, 'menu grows past the trigger width').not.toBeNull();
    expect(content?.className).toContain(
      'min-w-[var(--radix-select-trigger-width)]'
    );
    expect(content?.className).not.toContain(
      ' w-[var(--radix-select-trigger-width)]'
    );
  });

  describe('which way the menu opens', () => {
    const openAt = (top: number, viewport: number, side?: 'top' | 'bottom') => {
      const original = Element.prototype.getBoundingClientRect;
      const height = window.innerHeight;
      Object.defineProperty(window, 'innerHeight', {
        value: viewport,
        configurable: true,
      });
      Element.prototype.getBoundingClientRect = function () {
        const isTrigger = this.getAttribute('role') === 'combobox';
        return {
          top: isTrigger ? top : 0,
          bottom: isTrigger ? top + 36 : 0,
          left: 0,
          right: 200,
          width: 200,
          height: isTrigger ? 36 : 0,
          x: 0,
          y: isTrigger ? top : 0,
          toJSON: () => ({}),
        } as DOMRect;
      };
      const view = render(
        <Select>
          <SelectTrigger data-testid='t'>
            <SelectValue placeholder='Kind' />
          </SelectTrigger>
          <SelectContent side={side}>
            {Array.from({ length: 24 }, (_, i) => (
              <SelectItem key={i} value={`k${i}`}>
                Kind {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
      fireEvent.click(screen.getByTestId('t'));
      const menu = document.querySelector('[role="listbox"]');
      const found = menu?.getAttribute('data-side') ?? null;
      const style = menu?.getAttribute('style') ?? '';
      view.unmount();
      Element.prototype.getBoundingClientRect = original;
      Object.defineProperty(window, 'innerHeight', {
        value: height,
        configurable: true,
      });
      return { side: found, style };
    };

    it('opens below when there is room, above when the trigger is at the bottom of the window', () => {
      expect(chooseMenuSide({ top: 100, bottom: 136 }, 900, 384)).toBe(
        'bottom'
      );
      expect(chooseMenuSide({ top: 700, bottom: 736 }, 900, 384)).toBe('top');
      // room on neither side for all of it: the side with more room
      expect(chooseMenuSide({ top: 327, bottom: 363 }, 520, 384)).toBe('top');
      expect(chooseMenuSide({ top: 100, bottom: 136 }, 400, 384)).toBe(
        'bottom'
      );
      // a short menu that fits below stays below, even low in the window
      expect(chooseMenuSide({ top: 700, bottom: 736 }, 900, 120)).toBe(
        'bottom'
      );
    });

    // Which side the menu ends up on is decided by the positioning library from real geometry, which jsdom does
    // not have: that is checked in a browser (screenwriter_app's e2e/catalog-extras.e2e.ts). Here: that the menu
    // is capped to the room it has, whichever side that is.
    it('is never taller than the room on the side it opened on', () => {
      expect(openAt(760, 900).style).toContain(
        '--radix-select-content-available-height'
      );
    });
  });
});
