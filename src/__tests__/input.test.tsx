import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../ui/input';

describe('Input Component', () => {
  it('renders input field', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  });

  it('shows error state', () => {
    render(<Input aria-invalid="true" placeholder="Error input" />);
    const input = screen.getByPlaceholderText('Error input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" placeholder="Small" />);
    expect(screen.getByPlaceholderText('Small')).toBeInTheDocument();

    rerender(<Input size="md" placeholder="Medium" />);
    expect(screen.getByPlaceholderText('Medium')).toBeInTheDocument();

    rerender(<Input size="lg" placeholder="Large" />);
    expect(screen.getByPlaceholderText('Large')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Input className="custom-input" placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('custom-input');
  });
});