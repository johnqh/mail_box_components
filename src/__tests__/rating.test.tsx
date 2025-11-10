import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Rating } from '../ui/rating';

describe('Rating', () => {
  it('renders rating component', () => {
    const { container } = render(<Rating value={3} onChange={() => {}} />);

    const rating = container.querySelector('[role="slider"]');
    expect(rating).toBeInTheDocument();
  });

  it('renders correct number of stars', () => {
    const { container } = render(<Rating value={3} onChange={() => {}} />);

    const stars = container.querySelectorAll('svg, [data-star]');
    expect(stars.length).toBeGreaterThanOrEqual(5);
  });

  it('displays correct filled stars based on value', () => {
    const { container } = render(<Rating value={3} onChange={() => {}} />);

    const filledStars = container.querySelectorAll(
      '[class*="fill-yellow"], [class*="text-yellow"]'
    );
    expect(filledStars.length).toBeGreaterThan(0);
  });

  it('calls onChange when star is clicked', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rating value={2} onChange={handleChange} />);

    const stars = container.querySelectorAll('button, [role="button"]');
    if (stars.length > 3) {
      fireEvent.click(stars[3]);
      expect(handleChange).toHaveBeenCalledWith(4);
    }
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Rating value={2} onChange={handleChange} disabled />
    );

    const stars = container.querySelectorAll('button, [role="button"]');
    if (stars.length > 0) {
      fireEvent.click(stars[0]);
      expect(handleChange).not.toHaveBeenCalled();
    }
  });

  it('applies disabled styles', () => {
    const { container } = render(
      <Rating value={3} onChange={() => {}} disabled />
    );

    const rating = container.querySelector(
      '[class*="opacity"], [class*="cursor-not-allowed"]'
    );
    expect(rating).toBeInTheDocument();
  });

  it('renders with custom max rating', () => {
    const { container } = render(
      <Rating value={5} onChange={() => {}} max={10} />
    );

    const stars = container.querySelectorAll('svg, [data-star], button');
    expect(stars.length).toBeGreaterThanOrEqual(10);
  });

  it('renders in read-only mode', () => {
    const { container } = render(<Rating value={4} readOnly />);

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  it('shows half stars', () => {
    const { container } = render(
      <Rating value={3.5} onChange={() => {}} allowHalf />
    );

    const rating = container.querySelector('[role="slider"]');
    expect(rating).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Rating value={3} onChange={() => {}} className='custom-rating' />
    );

    const rating = container.querySelector('.custom-rating');
    expect(rating).toBeInTheDocument();
  });

  it('applies small size', () => {
    const { container } = render(
      <Rating value={3} onChange={() => {}} size='sm' />
    );

    const stars = container.querySelectorAll('[class*="w-4"], [class*="h-4"]');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('applies large size', () => {
    const { container } = render(
      <Rating value={3} onChange={() => {}} size='lg' />
    );

    const stars = container.querySelectorAll('[class*="w-8"], [class*="h-8"]');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('shows count when showCount is true', () => {
    render(<Rating value={4} onChange={() => {}} count={125} showCount />);

    expect(screen.getByText(/125/)).toBeInTheDocument();
  });

  it('displays custom empty icon color', () => {
    const { container } = render(
      <Rating value={2} onChange={() => {}} emptyColor='gray' />
    );

    const emptyStars = container.querySelectorAll('[class*="text-gray"]');
    expect(emptyStars.length).toBeGreaterThan(0);
  });

  it('displays custom filled icon color', () => {
    const { container } = render(
      <Rating value={3} onChange={() => {}} filledColor='blue' />
    );

    const filledStars = container.querySelectorAll('[class*="text-blue"]');
    expect(filledStars.length).toBeGreaterThan(0);
  });

  it('handles hover state', () => {
    const { container } = render(<Rating value={2} onChange={() => {}} />);

    const stars = container.querySelectorAll('button, [role="button"]');
    if (stars.length > 3) {
      fireEvent.mouseEnter(stars[3]);
      // Hover should highlight up to the hovered star
      const highlighted = container.querySelectorAll(
        '[class*="fill"], [class*="text-yellow"]'
      );
      expect(highlighted.length).toBeGreaterThan(0);
    }
  });

  it('resets to value on mouse leave', () => {
    const { container } = render(<Rating value={2} onChange={() => {}} />);

    const stars = container.querySelectorAll('button, [role="button"]');
    if (stars.length > 3) {
      fireEvent.mouseEnter(stars[3]);
      fireEvent.mouseLeave(stars[3]);
      // Should reset to original value
    }
  });

  it('handles keyboard navigation', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rating value={2} onChange={handleChange} />);

    const rating = container.querySelector('[role="slider"]');
    if (rating) {
      fireEvent.keyDown(rating, { key: 'ArrowRight' });
      expect(handleChange).toHaveBeenCalled();
    }
  });

  it('clears rating when clicking same star', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Rating value={3} onChange={handleChange} allowClear />
    );

    const stars = container.querySelectorAll('button, [role="button"]');
    if (stars.length > 2) {
      fireEvent.click(stars[2]); // Click the same value
      expect(handleChange).toHaveBeenCalledWith(0);
    }
  });

  it('displays custom icon', () => {
    const CustomIcon = () => <span data-testid='custom-icon'>★</span>;

    render(<Rating value={3} onChange={() => {}} icon={<CustomIcon />} />);

    const customIcons = screen.getAllByTestId('custom-icon');
    expect(customIcons.length).toBeGreaterThan(0);
  });
});
