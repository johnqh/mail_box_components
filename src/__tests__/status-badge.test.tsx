import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge, ChainBadge } from '../ui/status-badge';

describe('StatusBadge Component', () => {
  it('renders with default label', () => {
    render(<StatusBadge status='verified' />);
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<StatusBadge status='connected' label='Custom Connected' />);
    expect(screen.getByText('Custom Connected')).toBeInTheDocument();
  });

  it('renders with different statuses', () => {
    const statuses = [
      'verified',
      'connected',
      'disconnected',
      'pending',
      'error',
      'success',
      'warning',
    ] as const;

    statuses.forEach(status => {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(
        screen.getByText(status.charAt(0).toUpperCase() + status.slice(1))
      ).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<StatusBadge status='verified' size='sm' />);
    expect(screen.getByText('Verified')).toBeInTheDocument();

    rerender(<StatusBadge status='verified' size='md' />);
    expect(screen.getByText('Verified')).toBeInTheDocument();

    rerender(<StatusBadge status='verified' size='lg' />);
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('can hide the dot indicator', () => {
    render(<StatusBadge status='verified' showDot={false} />);
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });
});

describe('ChainBadge Component', () => {
  it('renders Ethereum badge', () => {
    render(<ChainBadge chainType='evm' />);
    expect(screen.getByText('ETH')).toBeInTheDocument();
  });

  it('renders Solana badge', () => {
    render(<ChainBadge chainType='solana' />);
    expect(screen.getByText('SOL')).toBeInTheDocument();
  });

  it('does not render for unknown chain', () => {
    const { container } = render(<ChainBadge chainType='unknown' />);
    expect(container.firstChild).toBeNull();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<ChainBadge chainType='evm' size='sm' />);
    expect(screen.getByText('ETH')).toBeInTheDocument();

    rerender(<ChainBadge chainType='evm' size='md' />);
    expect(screen.getByText('ETH')).toBeInTheDocument();

    rerender(<ChainBadge chainType='evm' size='lg' />);
    expect(screen.getByText('ETH')).toBeInTheDocument();
  });
});
