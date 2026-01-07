import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastProvider, ToastContainer, useToast } from '../ui/toast';
import { act } from 'react';

// Consumer component that renders toasts
const ToastConsumer = () => {
  const { toasts, removeToast } = useToast();
  return <ToastContainer toasts={toasts} onDismiss={removeToast} />;
};

// Test component that uses the toast hook
const TestComponent = () => {
  const { addToast } = useToast();

  return (
    <div>
      <button onClick={() => addToast('success', 'Test Toast')}>
        Show Toast
      </button>
    </div>
  );
};

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders ToastProvider without errors', () => {
    const { container } = render(
      <ToastProvider>
        <div>Test Content</div>
      </ToastProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });

  it('throws error when useToast is used outside ToastProvider', () => {
    // Suppress console.error for this test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useToast must be used within a ToastProvider');

    spy.mockRestore();
  });

  it('displays toast when addToast is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
        <ToastConsumer />
      </ToastProvider>
    );

    const button = screen.getByText('Show Toast');
    fireEvent.click(button);

    expect(screen.getByText('Test Toast')).toBeInTheDocument();
  });

  it('displays success variant correctly', () => {
    const TestSuccess = () => {
      const { success } = useToast();
      return (
        <button onClick={() => success('Success message')}>
          Success Toast
        </button>
      );
    };

    const { container } = render(
      <ToastProvider>
        <TestSuccess />
        <ToastConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Success Toast'));

    expect(screen.getByText('Success message')).toBeInTheDocument();
    // Check for success-related classes
    const toast = container.querySelector('[class*="green"]');
    expect(toast).toBeInTheDocument();
  });

  it('displays error variant correctly', () => {
    const TestError = () => {
      const { error } = useToast();
      return (
        <button onClick={() => error('Error message')}>Error Toast</button>
      );
    };

    const { container } = render(
      <ToastProvider>
        <TestError />
        <ToastConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Error Toast'));

    expect(screen.getByText('Error message')).toBeInTheDocument();
    // Check for error-related classes
    const toast = container.querySelector('[class*="red"]');
    expect(toast).toBeInTheDocument();
  });

  it('displays warning variant correctly', () => {
    const TestWarning = () => {
      const { warning } = useToast();
      return (
        <button onClick={() => warning('Warning message')}>
          Warning Toast
        </button>
      );
    };

    const { container } = render(
      <ToastProvider>
        <TestWarning />
        <ToastConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Warning Toast'));

    expect(screen.getByText('Warning message')).toBeInTheDocument();
    // Check for warning-related classes
    const toast = container.querySelector('[class*="yellow"]');
    expect(toast).toBeInTheDocument();
  });

  it('displays info variant correctly', () => {
    const TestInfo = () => {
      const { info } = useToast();
      return <button onClick={() => info('Info message')}>Info Toast</button>;
    };

    const { container } = render(
      <ToastProvider>
        <TestInfo />
        <ToastConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Info Toast'));

    expect(screen.getByText('Info message')).toBeInTheDocument();
    // Check for info-related classes
    const toast = container.querySelector('[class*="blue"]');
    expect(toast).toBeInTheDocument();
  });

  it('removes toast when close button is clicked', () => {
    render(
      <ToastProvider>
        <TestComponent />
        <ToastConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Test Toast')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Dismiss notification');
    fireEvent.click(closeButton);

    // Wait for animation delay before toast is removed
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
  });

  it('auto-removes toast after duration', () => {
    const TestWithDuration = () => {
      const { success } = useToast();
      return (
        <button onClick={() => success('Auto Close', 3000)}>Show Toast</button>
      );
    };

    render(
      <ToastProvider>
        <TestWithDuration />
        <ToastConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Auto Close')).toBeInTheDocument();

    // Advance timers by duration
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Auto Close')).not.toBeInTheDocument();
  });

  it('displays multiple toasts simultaneously', () => {
    const TestMultiple = () => {
      const { success, error } = useToast();
      return (
        <div>
          <button onClick={() => success('Toast 1')}>Show Toast 1</button>
          <button onClick={() => error('Toast 2')}>Show Toast 2</button>
        </div>
      );
    };

    render(
      <ToastProvider>
        <TestMultiple />
        <ToastConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast 1'));
    fireEvent.click(screen.getByText('Show Toast 2'));

    expect(screen.getByText('Toast 1')).toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
  });

  it('does not auto-remove when duration is 0', async () => {
    const TestNoDuration = () => {
      const { success } = useToast();
      return (
        <button onClick={() => success('Persistent Toast', 0)}>
          Show Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestNoDuration />
        <ToastConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Persistent Toast')).toBeInTheDocument();

    // Advance timers significantly
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    // Toast should still be there
    expect(screen.getByText('Persistent Toast')).toBeInTheDocument();
  });

  it('respects maxToasts limit', () => {
    const TestMaxToasts = () => {
      const { success } = useToast();
      return (
        <button onClick={() => success(`Toast ${Date.now()}`)}>
          Add Toast
        </button>
      );
    };

    render(
      <ToastProvider maxToasts={3}>
        <TestMaxToasts />
        <ToastConsumer />
      </ToastProvider>
    );

    // Add 5 toasts
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByText('Add Toast'));
    }

    // Should only show 3 toasts (maxToasts limit)
    const toasts = screen.getAllByRole('alert');
    expect(toasts.length).toBe(3);
  });

  it('uses custom default duration', () => {
    const TestCustomDuration = () => {
      const { success } = useToast();
      return (
        <button onClick={() => success('Custom Duration')}>Add Toast</button>
      );
    };

    render(
      <ToastProvider defaultDuration={1000}>
        <TestCustomDuration />
        <ToastConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByText('Custom Duration')).toBeInTheDocument();

    // Advance timers by custom duration
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('Custom Duration')).not.toBeInTheDocument();
  });
});
