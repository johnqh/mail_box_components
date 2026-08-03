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
});
