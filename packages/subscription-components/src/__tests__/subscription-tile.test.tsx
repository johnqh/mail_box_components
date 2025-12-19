import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SubscriptionTile } from '../subscription-tile';

// Mock @sudobility/design
vi.mock('@sudobility/design', () => ({
  textVariants: {
    heading: {
      h4: () => 'text-xl font-semibold',
    },
  },
}));

describe('SubscriptionTile', () => {
  const defaultProps = {
    id: 'test-plan',
    title: 'Test Plan',
    price: '$9.99',
    features: ['Feature 1', 'Feature 2'],
    isSelected: false,
    onSelect: vi.fn(),
  };

  it('renders with basic props', () => {
    render(<SubscriptionTile {...defaultProps} />);

    expect(screen.getByText('Test Plan')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  it('renders with period label', () => {
    render(<SubscriptionTile {...defaultProps} periodLabel='/month' />);

    expect(screen.getByText('/month')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<SubscriptionTile {...defaultProps} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('radio'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('does not call onSelect when disabled', () => {
    const onSelect = vi.fn();
    render(<SubscriptionTile {...defaultProps} onSelect={onSelect} disabled />);

    fireEvent.click(screen.getByRole('radio'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders top badge when provided', () => {
    render(
      <SubscriptionTile
        {...defaultProps}
        topBadge={{ text: 'Best Value', color: 'purple' }}
      />
    );

    expect(screen.getByText('Best Value')).toBeInTheDocument();
  });

  it('renders discount badge when provided', () => {
    render(
      <SubscriptionTile
        {...defaultProps}
        discountBadge={{ text: 'Save 40%', isBestValue: true }}
      />
    );

    expect(screen.getByText('Save 40%')).toBeInTheDocument();
  });

  it('renders premium callout when provided', () => {
    render(
      <SubscriptionTile
        {...defaultProps}
        premiumCallout={{
          title: 'Premium Features',
          features: ['Premium Feature 1', 'Premium Feature 2'],
        }}
      />
    );

    expect(screen.getByText('Premium Features')).toBeInTheDocument();
    expect(screen.getByText('• Premium Feature 1')).toBeInTheDocument();
    expect(screen.getByText('• Premium Feature 2')).toBeInTheDocument();
  });

  it('renders bottom note when provided', () => {
    render(
      <SubscriptionTile {...defaultProps} bottomNote='Expires Dec 31, 2025' />
    );

    expect(screen.getByText('Expires Dec 31, 2025')).toBeInTheDocument();
  });

  it('renders intro price note when provided', () => {
    render(
      <SubscriptionTile
        {...defaultProps}
        introPriceNote='$4.99 for first 3 months'
      />
    );

    expect(screen.getByText('$4.99 for first 3 months')).toBeInTheDocument();
  });

  it('renders custom children content', () => {
    render(
      <SubscriptionTile {...defaultProps}>
        <div data-testid='custom-content'>Custom Content</div>
      </SubscriptionTile>
    );

    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });

  it('applies selected styles when isSelected is true', () => {
    const { container } = render(
      <SubscriptionTile {...defaultProps} isSelected />
    );

    expect(container.firstChild).toHaveClass('border-blue-500');
  });

  it('applies best value styles when isBestValue is true', () => {
    const { container } = render(
      <SubscriptionTile {...defaultProps} isSelected isBestValue />
    );

    expect(container.firstChild).toHaveClass('border-purple-500');
  });

  it('handles keyboard navigation', () => {
    const onSelect = vi.fn();
    render(<SubscriptionTile {...defaultProps} onSelect={onSelect} />);

    const tile = screen.getByRole('radio');
    fireEvent.keyDown(tile, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(tile, { key: ' ' });
    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it('has correct accessibility attributes', () => {
    render(<SubscriptionTile {...defaultProps} isSelected />);

    const tile = screen.getByRole('radio');
    expect(tile).toHaveAttribute('aria-checked', 'true');
    expect(tile).toHaveAttribute('aria-label', 'Test Plan - $9.99');
  });
});
