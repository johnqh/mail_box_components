import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Spinner } from '../spinner';

describe('Spinner Component', () => {
  it('renders spinner', () => {
    render(<Spinner />);
    // Look for the spinner by its role or test id if available
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Spinner size="sm" />);
    let spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();

    rerender(<Spinner size="md" />);
    spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();

    rerender(<Spinner size="lg" />);
    spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Spinner className="custom-spinner" />);
    expect(container.firstChild).toHaveClass('custom-spinner');
  });

  it('renders with custom color', () => {
    const { container } = render(<Spinner color="blue" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});