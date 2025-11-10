import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from '../ui/avatar';

describe('Avatar', () => {
  it('renders with image src', () => {
    render(<Avatar src='https://example.com/avatar.jpg' alt='User Avatar' />);

    const img = screen.getByAltText('User Avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders fallback when no src provided', () => {
    render(<Avatar fallback='JD' />);

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders fallback when image fails to load', () => {
    const { container } = render(
      <Avatar src='invalid-url.jpg' fallback='FB' />
    );

    const img = container.querySelector('img');
    if (img) {
      // Simulate image load error using fireEvent
      fireEvent.error(img);
    }

    expect(screen.getByText('FB')).toBeInTheDocument();
  });

  it('applies small size class', () => {
    const { container } = render(<Avatar size='sm' fallback='SM' />);

    const avatar = container.querySelector('[class*="h-8"]');
    expect(avatar).toBeInTheDocument();
  });

  it('applies medium size class by default', () => {
    const { container } = render(<Avatar fallback='MD' />);

    const avatar = container.querySelector('[class*="h-10"]');
    expect(avatar).toBeInTheDocument();
  });

  it('applies large size class', () => {
    const { container } = render(<Avatar size='lg' fallback='LG' />);

    const avatar = container.querySelector('[class*="h-12"]');
    expect(avatar).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Avatar fallback='CL' className='custom-avatar' />
    );

    const avatar = container.querySelector('.custom-avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('renders with alt text', () => {
    render(<Avatar src='https://example.com/user.jpg' alt='John Doe Avatar' />);

    const img = screen.getByAltText('John Doe Avatar');
    expect(img).toBeInTheDocument();
  });

  it('renders circular by default', () => {
    const { container } = render(<Avatar fallback='RD' />);

    const avatar = container.querySelector('[class*="rounded-full"]');
    expect(avatar).toBeInTheDocument();
  });

  it('renders with status indicator when provided', () => {
    const { container } = render(<Avatar fallback='ST' status='online' />);

    expect(screen.getByText('ST')).toBeInTheDocument();
    const statusIndicator = container.querySelector('[class*="bg-green"]');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('shows offline status correctly', () => {
    const { container } = render(<Avatar fallback='OF' status='offline' />);

    const statusIndicator = container.querySelector('[class*="bg-gray"]');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('shows busy status correctly', () => {
    const { container } = render(<Avatar fallback='BS' status='busy' />);

    const statusIndicator = container.querySelector('[class*="bg-red"]');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('shows away status correctly', () => {
    const { container } = render(<Avatar fallback='AW' status='away' />);

    const statusIndicator = container.querySelector('[class*="bg-yellow"]');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('does not show status indicator when status is not provided', () => {
    const { container } = render(<Avatar fallback='NS' />);

    const statusIndicator = container.querySelector(
      '[class*="absolute"][class*="bottom"]'
    );
    expect(statusIndicator).not.toBeInTheDocument();
  });

  it('handles onClick event', () => {
    const handleClick = vi.fn();
    render(<Avatar fallback='CK' onClick={handleClick} />);

    const avatar = screen.getByRole('button');
    fireEvent.click(avatar);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies hover styles when clickable', () => {
    const { container } = render(<Avatar fallback='HV' onClick={() => {}} />);

    const avatar = container.querySelector('[class*="cursor-pointer"]');
    expect(avatar).toBeInTheDocument();
  });

  it('renders with initials from name', () => {
    render(<Avatar name='John Doe' />);

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders single initial when name has one word', () => {
    render(<Avatar name='John' />);

    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('uses fallback prop over generated initials', () => {
    render(<Avatar name='John Doe' fallback='XX' />);

    expect(screen.getByText('XX')).toBeInTheDocument();
    expect(screen.queryByText('JD')).not.toBeInTheDocument();
  });
});
