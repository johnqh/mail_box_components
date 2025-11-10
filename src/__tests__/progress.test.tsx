import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from '../ui/progress';

describe('Progress', () => {
  it('renders progress bar', () => {
    const { container } = render(<Progress value={50} />);

    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('displays correct progress value', () => {
    const { container } = render(<Progress value={75} />);

    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');
  });

  it('sets aria-valuemin and aria-valuemax', () => {
    const { container } = render(<Progress value={50} />);

    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('applies correct width based on value', () => {
    const { container } = render(<Progress value={60} />);

    const progressFill = container.querySelector('[style*="width"]');
    expect(progressFill).toHaveStyle({ width: '60%' });
  });

  it('handles 0% progress', () => {
    const { container } = render(<Progress value={0} />);

    const progressFill = container.querySelector('[style*="width"]');
    expect(progressFill).toHaveStyle({ width: '0%' });
  });

  it('handles 100% progress', () => {
    const { container } = render(<Progress value={100} />);

    const progressFill = container.querySelector('[style*="width"]');
    expect(progressFill).toHaveStyle({ width: '100%' });
  });

  it('shows label when showLabel is true', () => {
    render(<Progress value={45} showLabel />);

    expect(screen.getByText('45%')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<Progress value={45} showLabel={false} />);

    expect(screen.queryByText('45%')).not.toBeInTheDocument();
  });

  it('applies custom label', () => {
    render(<Progress value={50} label='Half complete' />);

    expect(screen.getByText('Half complete')).toBeInTheDocument();
  });

  it('applies success variant', () => {
    const { container } = render(<Progress value={80} variant='success' />);

    const progressFill = container.querySelector('[class*="bg-green"]');
    expect(progressFill).toBeInTheDocument();
  });

  it('applies warning variant', () => {
    const { container } = render(<Progress value={60} variant='warning' />);

    const progressFill = container.querySelector('[class*="bg-yellow"]');
    expect(progressFill).toBeInTheDocument();
  });

  it('applies danger variant', () => {
    const { container } = render(<Progress value={20} variant='danger' />);

    const progressFill = container.querySelector('[class*="bg-red"]');
    expect(progressFill).toBeInTheDocument();
  });

  it('applies default variant', () => {
    const { container } = render(<Progress value={50} />);

    const progressFill = container.querySelector('[class*="bg-blue"]');
    expect(progressFill).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Progress value={50} className='custom-progress' />
    );

    const progress = container.querySelector('.custom-progress');
    expect(progress).toBeInTheDocument();
  });

  it('applies small size', () => {
    const { container } = render(<Progress value={50} size='sm' />);

    const progressBar = container.querySelector('[class*="h-1"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('applies medium size by default', () => {
    const { container } = render(<Progress value={50} />);

    const progressBar = container.querySelector('[class*="h-2"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('applies large size', () => {
    const { container } = render(<Progress value={50} size='lg' />);

    const progressBar = container.querySelector('[class*="h-4"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders indeterminate state', () => {
    const { container } = render(<Progress indeterminate />);

    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();

    // Indeterminate progress bars often have animation classes
    const animatedElement = container.querySelector('[class*="animate"]');
    expect(animatedElement).toBeInTheDocument();
  });

  it('clamps value between 0 and 100', () => {
    const { container: over } = render(<Progress value={150} />);
    const overProgressFill = over.querySelector('[style*="width"]');
    expect(overProgressFill).toHaveStyle({ width: '100%' });

    const { container: under } = render(<Progress value={-10} />);
    const underProgressFill = under.querySelector('[style*="width"]');
    expect(underProgressFill).toHaveStyle({ width: '0%' });
  });

  it('renders with striped style', () => {
    const { container } = render(<Progress value={50} striped />);

    const stripedElement = container.querySelector('[class*="bg-stripe"]');
    expect(stripedElement).toBeInTheDocument();
  });

  it('renders with animated stripes', () => {
    const { container } = render(<Progress value={50} striped animated />);

    const animatedElement = container.querySelector('[class*="animate"]');
    expect(animatedElement).toBeInTheDocument();
  });

  it('combines multiple props correctly', () => {
    render(
      <Progress
        value={75}
        variant='success'
        size='lg'
        showLabel
        striped
        className='custom'
      />
    );

    expect(screen.getByText('75%')).toBeInTheDocument();
  });
});
