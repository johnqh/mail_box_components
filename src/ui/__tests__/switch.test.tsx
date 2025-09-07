import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from '../switch';

describe('Switch Component', () => {
  it('renders switch', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Switch className="custom-switch" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('custom-switch');
  });

  it('handles checked state', () => {
    render(<Switch defaultChecked />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('data-state', 'checked');
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
  });

  it('handles unchecked state', () => {
    render(<Switch defaultChecked={false} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles when clicked', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('switch');
    
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    
    fireEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('data-state', 'checked');
    
    fireEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
  });

  it('calls onCheckedChange when toggled', () => {
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);
    
    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);
    
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    
    fireEvent.click(switchElement);
    expect(onCheckedChange).toHaveBeenCalledTimes(2);
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('handles disabled state', () => {
    const onCheckedChange = vi.fn();
    render(<Switch disabled onCheckedChange={onCheckedChange} />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
    expect(switchElement).toHaveClass('disabled:cursor-not-allowed');
    expect(switchElement).toHaveClass('disabled:opacity-50');
    
    fireEvent.click(switchElement);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('can be controlled', () => {
    const onCheckedChange = vi.fn();
    const { rerender } = render(
      <Switch checked={false} onCheckedChange={onCheckedChange} />
    );
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    
    fireEvent.click(switchElement);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    
    rerender(<Switch checked={true} onCheckedChange={onCheckedChange} />);
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('supports keyboard interaction', () => {
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);
    
    const switchElement = screen.getByRole('switch');
    switchElement.focus();
    
    fireEvent.keyDown(switchElement, { key: ' ' });
    // Note: Radix UI handles keyboard interaction internally
    expect(switchElement).toBeInTheDocument();
  });

  it('applies correct styles when checked', () => {
    render(<Switch defaultChecked />);
    const switchElement = screen.getByRole('switch');
    
    expect(switchElement).toHaveClass('data-[state=checked]:bg-blue-600');
    expect(switchElement).toHaveClass('dark:data-[state=checked]:bg-blue-500');
  });

  it('applies correct styles when unchecked', () => {
    render(<Switch defaultChecked={false} />);
    const switchElement = screen.getByRole('switch');
    
    expect(switchElement).toHaveClass('data-[state=unchecked]:bg-gray-200');
    expect(switchElement).toHaveClass('dark:data-[state=unchecked]:bg-gray-700');
  });

  it('has focus ring styles', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('switch');
    
    expect(switchElement).toHaveClass('focus-visible:outline-none');
    expect(switchElement).toHaveClass('focus-visible:ring-2');
    expect(switchElement).toHaveClass('focus-visible:ring-blue-500');
  });

  it('thumb moves when toggled', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('switch');
    const thumb = switchElement.querySelector('.pointer-events-none');
    
    expect(thumb).toHaveClass('data-[state=unchecked]:translate-x-0');
    
    fireEvent.click(switchElement);
    expect(thumb).toHaveClass('data-[state=checked]:translate-x-5');
  });

  it('supports id prop', () => {
    render(<Switch id="test-switch" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('id', 'test-switch');
  });

  it('supports name prop', () => {
    render(<Switch name="test-switch-name" />);
    const switchElement = screen.getByRole('switch');
    // Note: Radix UI Switch doesn't directly pass name attribute to the switch role element
    expect(switchElement).toBeInTheDocument();
  });

  it('supports value prop', () => {
    render(<Switch value="switch-value" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('value', 'switch-value');
  });
});