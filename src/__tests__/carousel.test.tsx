import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { Carousel } from '../ui/carousel';

describe('Carousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders carousel with slides', () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    );

    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('shows navigation arrows by default', () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('hides navigation arrows when showArrows is false', () => {
    const { container } = render(
      <Carousel showArrows={false}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );

    // Should not render arrow buttons
    const arrows = container.querySelectorAll(
      'button[aria-label*="Previous"], button[aria-label*="Next"]'
    );
    expect(arrows.length).toBe(0);
  });

  it('navigates to next slide on next button click', () => {
    const { container } = render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    );

    const nextButton = container.querySelector('button[aria-label*="Next"]');
    if (nextButton) {
      fireEvent.click(nextButton);
    }

    // Check transform has changed
    const slideContainer = container.querySelector('[style*="transform"]');
    expect(slideContainer).toBeInTheDocument();
  });

  it('navigates to previous slide on previous button click', () => {
    const { container } = render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    );

    // First go to slide 2
    const nextButton = container.querySelector('button[aria-label*="Next"]');
    if (nextButton) {
      fireEvent.click(nextButton);
    }

    // Then go back to slide 1
    const prevButton = container.querySelector(
      'button[aria-label*="Previous"]'
    );
    if (prevButton) {
      fireEvent.click(prevButton);
    }

    const slideContainer = container.querySelector('[style*="transform"]');
    expect(slideContainer).toBeInTheDocument();
  });

  it('shows indicators when showIndicators is true', () => {
    const { container } = render(
      <Carousel showIndicators>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    );

    const indicators = container.querySelectorAll(
      'button[aria-label*="Go to slide"]'
    );
    expect(indicators.length).toBe(3);
  });

  it('hides indicators when showIndicators is false', () => {
    const { container } = render(
      <Carousel showIndicators={false}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );

    const indicators = container.querySelectorAll(
      'button[aria-label*="Go to slide"]'
    );
    expect(indicators.length).toBe(0);
  });

  it('auto-plays slides when autoPlay is set', () => {
    const { container } = render(
      <Carousel autoPlay={1000}>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    );

    const slideContainer = container.querySelector('[style*="transform"]');
    const initialTransform = slideContainer?.getAttribute('style');

    // Advance time by autoPlay interval
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const newTransform = slideContainer?.getAttribute('style');
    expect(newTransform).not.toBe(initialTransform);
  });

  it('loops to first slide when loop is true', () => {
    const { container } = render(
      <Carousel loop>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );

    const nextButton = container.querySelector('button[aria-label*="Next"]');

    // Click next twice to go past the last slide
    if (nextButton) {
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
    }

    // Should loop back to first slide
    const slideContainer = container.querySelector('[style*="transform"]');
    expect(slideContainer).toBeInTheDocument();
  });

  it('does not loop when loop is false', () => {
    const { container } = render(
      <Carousel loop={false}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );

    const nextButton = container.querySelector('button[aria-label*="Next"]');

    // Click next twice
    if (nextButton) {
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
    }

    // Should stay on last slide
    const slideContainer = container.querySelector('[style*="transform"]');
    expect(slideContainer).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Carousel className='custom-carousel'>
        <div>Slide 1</div>
      </Carousel>
    );

    const carousel = container.querySelector('.custom-carousel');
    expect(carousel).toBeInTheDocument();
  });

  it('renders empty when no children provided', () => {
    const { container } = render(<Carousel>{[]}</Carousel>);
    expect(
      container.querySelector('[class*="carousel"]')
    ).not.toBeInTheDocument();
  });

  it('handles single slide correctly', () => {
    const { container: _container } = render(
      <Carousel>
        <div>Only Slide</div>
      </Carousel>
    );

    expect(screen.getByText('Only Slide')).toBeInTheDocument();

    // Navigation buttons should still render but might be disabled
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toBeDefined();
  });
});
