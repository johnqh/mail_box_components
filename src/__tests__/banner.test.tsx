import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { Banner, useBanner, BannerVariant } from '../ui/banner';
import React from 'react';

// Test component for useBanner hook
const TestBannerHook = ({
  variant = 'info',
  duration,
}: {
  variant?: BannerVariant;
  duration?: number;
}) => {
  const { isVisible, bannerProps, showBanner, hideBanner } = useBanner();

  return (
    <div>
      <button
        onClick={() =>
          showBanner({
            title: 'Test Title',
            description: 'Test Description',
            variant,
            duration,
          })
        }
      >
        Show Banner
      </button>
      <button onClick={hideBanner}>Hide Banner</button>
      {bannerProps && (
        <Banner isVisible={isVisible} onDismiss={hideBanner} {...bannerProps} />
      )}
    </div>
  );
};

describe('Banner', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Basic rendering', () => {
    it('renders when isVisible is true', () => {
      const onDismiss = vi.fn();
      render(
        <Banner isVisible={true} onDismiss={onDismiss} title='Test Banner' />
      );

      expect(screen.getByText('Test Banner')).toBeInTheDocument();
    });

    it('does not render when isVisible is false', () => {
      const onDismiss = vi.fn();
      render(
        <Banner isVisible={false} onDismiss={onDismiss} title='Test Banner' />
      );

      expect(screen.queryByText('Test Banner')).not.toBeInTheDocument();
    });

    it('renders title and description', () => {
      const onDismiss = vi.fn();
      render(
        <Banner
          isVisible={true}
          onDismiss={onDismiss}
          title='Test Title'
          description='Test Description'
        />
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders with role="alert"', () => {
      const onDismiss = vi.fn();
      render(
        <Banner isVisible={true} onDismiss={onDismiss} title='Test Banner' />
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders info variant with correct styling', () => {
      const onDismiss = vi.fn();
      render(
        <Banner
          isVisible={true}
          onDismiss={onDismiss}
          title='Info Banner'
          variant='info'
        />
      );

      // Banner renders via portal to document.body
      const banner = document.body.querySelector('[class*="blue"]');
      expect(banner).toBeInTheDocument();
    });

    it('renders success variant with correct styling', () => {
      const onDismiss = vi.fn();
      render(
        <Banner
          isVisible={true}
          onDismiss={onDismiss}
          title='Success Banner'
          variant='success'
        />
      );

      // Banner renders via portal to document.body
      const banner = document.body.querySelector('[class*="green"]');
      expect(banner).toBeInTheDocument();
    });

    it('renders warning variant with correct styling', () => {
      const onDismiss = vi.fn();
      render(
        <Banner
          isVisible={true}
          onDismiss={onDismiss}
          title='Warning Banner'
          variant='warning'
        />
      );

      // Banner renders via portal to document.body
      const banner = document.body.querySelector('[class*="yellow"]');
      expect(banner).toBeInTheDocument();
    });

    it('renders error variant with correct styling', () => {
      const onDismiss = vi.fn();
      render(
        <Banner
          isVisible={true}
          onDismiss={onDismiss}
          title='Error Banner'
          variant='error'
        />
      );

      // Banner renders via portal to document.body
      const banner = document.body.querySelector('[class*="red"]');
      expect(banner).toBeInTheDocument();
    });
  });

  describe('Close button', () => {
    it('renders close button with correct aria-label', () => {
      const onDismiss = vi.fn();
      render(
        <Banner
          isVisible={true}
          onDismiss={onDismiss}
          title='Test Banner'
          closeAriaLabel='Close this banner'
        />
      );

      expect(screen.getByLabelText('Close this banner')).toBeInTheDocument();
    });

    it('calls onDismiss when close button is clicked', async () => {
      const onDismiss = vi.fn();
      render(
        <Banner isVisible={true} onDismiss={onDismiss} title='Test Banner' />
      );

      const closeButton = screen.getByLabelText('Dismiss banner');
      fireEvent.click(closeButton);

      // Wait for animation to complete
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('Auto-dismiss', () => {
    it('auto-dismisses after default duration (5000ms)', async () => {
      const onDismiss = vi.fn();
      render(
        <Banner
          isVisible={true}
          onDismiss={onDismiss}
          title='Auto Dismiss Banner'
        />
      );

      // Wait for initial animation
      act(() => {
        vi.advanceTimersByTime(10);
      });

      expect(screen.getByText('Auto Dismiss Banner')).toBeInTheDocument();

      // Advance past auto-dismiss duration
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // Wait for exit animation
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('auto-dismisses after custom duration', async () => {
      const onDismiss = vi.fn();
      render(
        <Banner
          isVisible={true}
          onDismiss={onDismiss}
          title='Custom Duration Banner'
          duration={2000}
        />
      );

      // Wait for initial animation
      act(() => {
        vi.advanceTimersByTime(10);
      });

      // Should still be visible before duration
      act(() => {
        vi.advanceTimersByTime(1500);
      });
      expect(onDismiss).not.toHaveBeenCalled();

      // Advance past duration
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Wait for exit animation
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('does not auto-dismiss when duration is 0', async () => {
      const onDismiss = vi.fn();
      render(
        <Banner
          isVisible={true}
          onDismiss={onDismiss}
          title='Persistent Banner'
          duration={0}
        />
      );

      // Wait for initial animation
      act(() => {
        vi.advanceTimersByTime(10);
      });

      // Advance time significantly
      act(() => {
        vi.advanceTimersByTime(10000);
      });

      expect(onDismiss).not.toHaveBeenCalled();
      expect(screen.getByText('Persistent Banner')).toBeInTheDocument();
    });
  });

  describe('Custom icon', () => {
    it('renders custom icon when provided', () => {
      const onDismiss = vi.fn();
      render(
        <Banner
          isVisible={true}
          onDismiss={onDismiss}
          title='Custom Icon Banner'
          icon={<span data-testid='custom-icon'>Custom</span>}
        />
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      const onDismiss = vi.fn();
      render(
        <Banner
          isVisible={true}
          onDismiss={onDismiss}
          title='Custom Class Banner'
          className='custom-test-class'
        />
      );

      const banner = screen.getByTestId('banner');
      const innerContainer = banner.querySelector('.custom-test-class');
      expect(innerContainer).toBeInTheDocument();
    });
  });
});

describe('useBanner hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('shows banner when showBanner is called', () => {
    render(<TestBannerHook duration={0} />);

    fireEvent.click(screen.getByText('Show Banner'));

    // Wait for entering animation to start
    act(() => {
      vi.advanceTimersByTime(10);
    });

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('hides banner when hideBanner is called', () => {
    render(<TestBannerHook duration={0} />);

    fireEvent.click(screen.getByText('Show Banner'));

    // Wait for entering animation
    act(() => {
      vi.advanceTimersByTime(10);
    });

    expect(screen.getByText('Test Title')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Hide Banner'));

    // Wait for exit animation
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('shows banner with correct variant', () => {
    render(<TestBannerHook variant='error' duration={0} />);

    fireEvent.click(screen.getByText('Show Banner'));

    // Wait for entering animation
    act(() => {
      vi.advanceTimersByTime(10);
    });

    expect(screen.getByText('Test Title')).toBeInTheDocument();

    // Banner renders via portal to document.body
    const banner = document.body.querySelector('[class*="red"]');
    expect(banner).toBeInTheDocument();
  });
});
