import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GradientButton } from '../gradient-button';

describe('GradientButton Component', () => {
  it('renders gradient button with text', () => {
    render(<GradientButton>Gradient Button</GradientButton>);
    expect(screen.getByRole('button', { name: 'Gradient Button' })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<GradientButton onClick={handleClick}>Click me</GradientButton>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const { rerender } = render(<GradientButton variant="primary">Primary</GradientButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<GradientButton variant="secondary">Secondary</GradientButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<GradientButton variant="success">Success</GradientButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<GradientButton variant="warning">Warning</GradientButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<GradientButton variant="error">Error</GradientButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<GradientButton size="sm">Small</GradientButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<GradientButton size="md">Medium</GradientButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<GradientButton size="lg">Large</GradientButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<GradientButton disabled>Disabled</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<GradientButton loading>Loading</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders full width', () => {
    render(<GradientButton fullWidth>Full Width</GradientButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<GradientButton className="custom-class">Test</GradientButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('handles different button types', () => {
    const { rerender } = render(<GradientButton type="button">Button</GradientButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');

    rerender(<GradientButton type="submit">Submit</GradientButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<GradientButton type="reset">Reset</GradientButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });
});