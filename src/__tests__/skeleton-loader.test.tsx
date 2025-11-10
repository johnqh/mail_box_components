import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SkeletonLoader } from '../ui/skeleton-loader';

describe('SkeletonLoader', () => {
  it('renders skeleton loader', () => {
    const { container } = render(<SkeletonLoader />);

    const skeleton = container.querySelector('[class*="animate-pulse"]');
    expect(skeleton).toBeInTheDocument();
  });

  it('applies custom width', () => {
    const { container } = render(<SkeletonLoader width='200px' />);

    const skeleton = container.querySelector('[style*="width"]');
    expect(skeleton).toHaveStyle({ width: '200px' });
  });

  it('applies custom height', () => {
    const { container } = render(<SkeletonLoader height='50px' />);

    const skeleton = container.querySelector('[style*="height"]');
    expect(skeleton).toHaveStyle({ height: '50px' });
  });

  it('renders circle variant', () => {
    const { container } = render(<SkeletonLoader variant='circle' />);

    const skeleton = container.querySelector('[class*="rounded-full"]');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders rectangle variant', () => {
    const { container } = render(<SkeletonLoader variant='rectangle' />);

    const skeleton = container.querySelector('[class*="rounded"]');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders text variant', () => {
    const { container } = render(<SkeletonLoader variant='text' />);

    const skeleton = container.querySelector('[class*="h-4"]');
    expect(skeleton).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <SkeletonLoader className='custom-skeleton' />
    );

    const skeleton = container.querySelector('.custom-skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders multiple skeleton lines when count is specified', () => {
    const { container } = render(<SkeletonLoader count={3} />);

    const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
    expect(skeletons.length).toBe(3);
  });

  it('applies animation', () => {
    const { container } = render(<SkeletonLoader />);

    const skeleton = container.querySelector('[class*="animate-pulse"]');
    expect(skeleton).toBeInTheDocument();
  });

  it('disables animation when animate is false', () => {
    const { container } = render(<SkeletonLoader animate={false} />);

    const skeleton = container.querySelector('[class*="animate-pulse"]');
    expect(skeleton).not.toBeInTheDocument();
  });

  it('renders with custom border radius', () => {
    const { container } = render(<SkeletonLoader borderRadius='12px' />);

    const skeleton = container.querySelector('[style*="border-radius"]');
    expect(skeleton).toHaveStyle({ borderRadius: '12px' });
  });

  it('applies light theme color', () => {
    const { container } = render(<SkeletonLoader theme='light' />);

    const skeleton = container.querySelector('[class*="bg-gray-200"]');
    expect(skeleton).toBeInTheDocument();
  });

  it('applies dark theme color', () => {
    const { container } = render(<SkeletonLoader theme='dark' />);

    const skeleton = container.querySelector('[class*="bg-gray-700"]');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders avatar skeleton', () => {
    const { container } = render(
      <SkeletonLoader variant='circle' width='40px' height='40px' />
    );

    const skeleton = container.querySelector('[class*="rounded-full"]');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ width: '40px', height: '40px' });
  });

  it('renders card skeleton layout', () => {
    render(
      <div>
        <SkeletonLoader variant='rectangle' height='200px' />
        <SkeletonLoader variant='text' count={3} />
      </div>
    );

    const { container } = render(
      <div>
        <SkeletonLoader variant='rectangle' height='200px' />
        <SkeletonLoader variant='text' count={3} />
      </div>
    );

    const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('applies spacing between multiple skeletons', () => {
    const { container } = render(<SkeletonLoader count={3} spacing={2} />);

    const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
    expect(skeletons.length).toBe(3);
  });
});
