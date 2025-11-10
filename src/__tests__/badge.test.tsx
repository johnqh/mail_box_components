import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge } from '../ui/badge';

describe('Badge', () => {
  it('renders badge with text', () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies default variant', () => {
    const { container } = render(<Badge>Default</Badge>);

    expect(screen.getByText('Default')).toBeInTheDocument();
    const badge = container.querySelector('[class*="bg-gray"]');
    expect(badge).toBeInTheDocument();
  });

  it('applies primary variant correctly', () => {
    const { container } = render(<Badge variant='primary'>Primary</Badge>);

    expect(screen.getByText('Primary')).toBeInTheDocument();
    const badge = container.querySelector('[class*="bg-blue"]');
    expect(badge).toBeInTheDocument();
  });

  it('applies success variant correctly', () => {
    const { container } = render(<Badge variant='success'>Success</Badge>);

    expect(screen.getByText('Success')).toBeInTheDocument();
    const badge = container.querySelector('[class*="bg-green"]');
    expect(badge).toBeInTheDocument();
  });

  it('applies warning variant correctly', () => {
    const { container } = render(<Badge variant='warning'>Warning</Badge>);

    expect(screen.getByText('Warning')).toBeInTheDocument();
    const badge = container.querySelector('[class*="bg-yellow"]');
    expect(badge).toBeInTheDocument();
  });

  it('applies danger variant correctly', () => {
    const { container } = render(<Badge variant='danger'>Danger</Badge>);

    expect(screen.getByText('Danger')).toBeInTheDocument();
    const badge = container.querySelector('[class*="bg-red"]');
    expect(badge).toBeInTheDocument();
  });

  it('applies info variant correctly', () => {
    const { container } = render(<Badge variant='info'>Info</Badge>);

    expect(screen.getByText('Info')).toBeInTheDocument();
    const badge = container.querySelector('[class*="bg-blue"]');
    expect(badge).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Badge className='custom-badge'>Custom</Badge>
    );

    const badge = container.querySelector('.custom-badge');
    expect(badge).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const Icon = () => <svg data-testid='badge-icon' />;

    render(<Badge icon={<Icon />}>With Icon</Badge>);

    expect(screen.getByText('With Icon')).toBeInTheDocument();
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
  });

  it('applies dot style when dot prop is true', () => {
    const { container } = render(<Badge dot>Dot Badge</Badge>);

    const dot = container.querySelector('[class*="w-2"][class*="h-2"]');
    expect(dot).toBeInTheDocument();
  });

  it('renders as pill when pill prop is true', () => {
    const { container } = render(<Badge pill>Pill Badge</Badge>);

    const badge = container.querySelector('[class*="rounded-full"]');
    expect(badge).toBeInTheDocument();
  });

  it('renders as outline when outline prop is true', () => {
    const { container } = render(<Badge outline>Outline Badge</Badge>);

    const badge = container.querySelector('[class*="border"]');
    expect(badge).toBeInTheDocument();
  });

  it('handles onClick event', () => {
    const handleClick = vi.fn();

    render(<Badge onClick={handleClick}>Clickable</Badge>);

    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies hover styles when clickable', () => {
    const { container } = render(<Badge onClick={() => {}}>Hover</Badge>);

    const badge = container.querySelector('[class*="cursor-pointer"]');
    expect(badge).toBeInTheDocument();
  });

  it('renders with close button when dismissible', () => {
    const onDismiss = vi.fn();
    const { container } = render(
      <Badge dismissible onDismiss={onDismiss}>
        Dismissible
      </Badge>
    );

    const closeButton = container.querySelector('button');
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onDismiss when close button is clicked', () => {
    const onDismiss = vi.fn();
    const { container } = render(
      <Badge dismissible onDismiss={onDismiss}>
        Dismissible
      </Badge>
    );

    const closeButton = container.querySelector('button');
    if (closeButton) {
      fireEvent.click(closeButton);
    }

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders with count', () => {
    render(<Badge count={5}>Messages</Badge>);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders with max count indicator', () => {
    render(
      <Badge count={100} maxCount={99}>
        Messages
      </Badge>
    );

    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('applies small size correctly', () => {
    const { container } = render(<Badge size='sm'>Small</Badge>);

    const badge = container.querySelector('[class*="text-xs"]');
    expect(badge).toBeInTheDocument();
  });

  it('applies large size correctly', () => {
    const { container } = render(<Badge size='lg'>Large</Badge>);

    const badge = container.querySelector('[class*="text-base"]');
    expect(badge).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <Badge>
        <span>Complex Content</span>
      </Badge>
    );

    expect(screen.getByText('Complex Content')).toBeInTheDocument();
  });

  it('combines multiple props correctly', () => {
    const { container } = render(
      <Badge variant='success' pill outline size='lg'>
        Combined
      </Badge>
    );

    expect(screen.getByText('Combined')).toBeInTheDocument();

    const badge = container.querySelector('[class*="border"]');
    expect(badge).toBeInTheDocument();
  });
});
