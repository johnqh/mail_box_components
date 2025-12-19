import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  SubscriptionProvider,
  useSubscriptionContext,
  clearRevenueCatCheckoutSessions,
} from '../subscription-provider';

// Test component that uses the context
const TestConsumer: React.FC = () => {
  const {
    products,
    currentSubscription,
    isLoading,
    error,
    initialize,
    purchase,
    restore,
  } = useSubscriptionContext();

  return (
    <div>
      <div data-testid='loading'>{isLoading ? 'Loading' : 'Ready'}</div>
      <div data-testid='error'>{error || 'No error'}</div>
      <div data-testid='products'>{products.length} products</div>
      <div data-testid='subscription'>
        {currentSubscription?.isActive ? 'Active' : 'Inactive'}
      </div>
      <button onClick={() => initialize('test-user')}>Initialize</button>
      <button onClick={() => purchase('test-product')}>Purchase</button>
      <button onClick={() => restore()}>Restore</button>
    </div>
  );
};

describe('SubscriptionProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('renders children', () => {
    render(
      <SubscriptionProvider apiKey='' entitlementId='premium'>
        <div data-testid='child'>Child Content</div>
      </SubscriptionProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('provides context to children', () => {
    render(
      <SubscriptionProvider apiKey='' entitlementId='premium'>
        <TestConsumer />
      </SubscriptionProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
    expect(screen.getByTestId('error')).toHaveTextContent('No error');
    expect(screen.getByTestId('products')).toHaveTextContent('0 products');
    expect(screen.getByTestId('subscription')).toHaveTextContent('Inactive');
  });

  it('throws error when useSubscriptionContext is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestConsumer />);
    }).toThrow(
      'useSubscriptionContext must be used within a SubscriptionProvider'
    );

    consoleSpy.mockRestore();
  });

  it('handles development mode without API key', async () => {
    render(
      <SubscriptionProvider apiKey='' entitlementId='premium'>
        <TestConsumer />
      </SubscriptionProvider>
    );

    // In development mode, should show warning but not error
    await act(async () => {
      screen.getByText('Initialize').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
    });
  });

  it('simulates purchase in development mode', async () => {
    const onPurchaseSuccess = vi.fn();

    render(
      <SubscriptionProvider
        apiKey=''
        entitlementId='premium'
        onPurchaseSuccess={onPurchaseSuccess}
      >
        <TestConsumer />
      </SubscriptionProvider>
    );

    await act(async () => {
      screen.getByText('Initialize').click();
    });

    await act(async () => {
      screen.getByText('Purchase').click();
    });

    // Wait for the simulated delay
    await waitFor(
      () => {
        expect(screen.getByTestId('subscription')).toHaveTextContent('Active');
      },
      { timeout: 3000 }
    );

    expect(onPurchaseSuccess).toHaveBeenCalledWith('test-product');
  });

  it('simulates restore in development mode', async () => {
    render(
      <SubscriptionProvider apiKey='' entitlementId='premium'>
        <TestConsumer />
      </SubscriptionProvider>
    );

    await act(async () => {
      screen.getByText('Initialize').click();
    });

    await act(async () => {
      screen.getByText('Restore').click();
    });

    // In dev mode, restore returns "No previous purchases found"
    await waitFor(
      () => {
        expect(screen.getByTestId('error')).toHaveTextContent(
          'No previous purchases found'
        );
      },
      { timeout: 2000 }
    );
  });
});

describe('clearRevenueCatCheckoutSessions', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('removes RevenueCat-related keys from localStorage', () => {
    localStorage.setItem('revenuecat_session', 'test');
    localStorage.setItem('rcb_user', 'test');
    localStorage.setItem('rc_cache', 'test');
    localStorage.setItem('other_key', 'keep');

    clearRevenueCatCheckoutSessions();

    expect(localStorage.getItem('revenuecat_session')).toBeNull();
    expect(localStorage.getItem('rcb_user')).toBeNull();
    expect(localStorage.getItem('rc_cache')).toBeNull();
    expect(localStorage.getItem('other_key')).toBe('keep');
  });

  it('removes RevenueCat-related keys from sessionStorage', () => {
    sessionStorage.setItem('revenuecat_checkout', 'test');
    sessionStorage.setItem('other_key', 'keep');

    clearRevenueCatCheckoutSessions();

    expect(sessionStorage.getItem('revenuecat_checkout')).toBeNull();
    expect(sessionStorage.getItem('other_key')).toBe('keep');
  });
});
