import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastProvider, useToast } from '../ui/toast';
import { act } from 'react';

// Test component that uses the toast hook
const TestComponent = () => {
  const { addToast } = useToast();

  return (
    <div>
      <button
        onClick={() =>
          addToast({
            title: 'Test Toast',
            description: 'Test Description',
            variant: 'success',
          })
        }
      >
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
    }).toThrow('useToast must be used within ToastProvider');

    spy.mockRestore();
  });

  it('displays toast when addToast is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Toast');
    fireEvent.click(button);

    expect(screen.getByText('Test Toast')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('displays success variant correctly', () => {
    const TestSuccess = () => {
      const { addToast } = useToast();
      return (
        <button
          onClick={() => addToast({ title: 'Success', variant: 'success' })}
        >
          Success Toast
        </button>
      );
    };

    const { container } = render(
      <ToastProvider>
        <TestSuccess />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Success Toast'));

    expect(screen.getByText('Success')).toBeInTheDocument();
    // Check for success-related classes
    const toast = container.querySelector('[class*="green"]');
    expect(toast).toBeInTheDocument();
  });

  it('displays error variant correctly', () => {
    const TestError = () => {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast({ title: 'Error', variant: 'error' })}>
          Error Toast
        </button>
      );
    };

    const { container } = render(
      <ToastProvider>
        <TestError />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Error Toast'));

    expect(screen.getByText('Error')).toBeInTheDocument();
    // Check for error-related classes
    const toast = container.querySelector('[class*="red"]');
    expect(toast).toBeInTheDocument();
  });

  it('displays warning variant correctly', () => {
    const TestWarning = () => {
      const { addToast } = useToast();
      return (
        <button
          onClick={() => addToast({ title: 'Warning', variant: 'warning' })}
        >
          Warning Toast
        </button>
      );
    };

    const { container } = render(
      <ToastProvider>
        <TestWarning />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Warning Toast'));

    expect(screen.getByText('Warning')).toBeInTheDocument();
    // Check for warning-related classes
    const toast = container.querySelector('[class*="yellow"]');
    expect(toast).toBeInTheDocument();
  });

  it('removes toast when close button is clicked', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Test Toast')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close notification');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
  });

  it('auto-removes toast after duration', () => {
    const TestWithDuration = () => {
      const { addToast } = useToast();
      return (
        <button
          onClick={() => addToast({ title: 'Auto Close', duration: 3000 })}
        >
          Show Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestWithDuration />
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

  it('displays toast with action button', () => {
    const actionFn = vi.fn();

    const TestWithAction = () => {
      const { addToast } = useToast();
      return (
        <button
          onClick={() =>
            addToast({
              title: 'Action Toast',
              action: { label: 'Undo', onClick: actionFn },
            })
          }
        >
          Show Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestWithAction />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Action Toast')).toBeInTheDocument();

    const actionButton = screen.getByText('Undo');
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(actionFn).toHaveBeenCalledTimes(1);
  });

  it('displays multiple toasts simultaneously', () => {
    const TestMultiple = () => {
      const { addToast } = useToast();
      return (
        <div>
          <button onClick={() => addToast({ title: 'Toast 1' })}>
            Show Toast 1
          </button>
          <button onClick={() => addToast({ title: 'Toast 2' })}>
            Show Toast 2
          </button>
        </div>
      );
    };

    render(
      <ToastProvider>
        <TestMultiple />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast 1'));
    fireEvent.click(screen.getByText('Show Toast 2'));

    expect(screen.getByText('Toast 1')).toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
  });

  it('does not auto-remove when duration is 0', async () => {
    const TestNoDuration = () => {
      const { addToast } = useToast();
      return (
        <button
          onClick={() => addToast({ title: 'Persistent Toast', duration: 0 })}
        >
          Show Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestNoDuration />
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
});
