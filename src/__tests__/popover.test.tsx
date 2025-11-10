import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Popover } from '../ui/popover';

describe('Popover', () => {
  it('renders trigger element', () => {
    render(
      <Popover trigger={<button>Open Popover</button>}>
        <div>Popover Content</div>
      </Popover>
    );

    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });

  it('initially hides popover content', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <div>Popover Content</div>
      </Popover>
    );

    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('shows popover content when trigger is clicked', async () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <div>Popover Content</div>
      </Popover>
    );

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(screen.getByText('Popover Content')).toBeInTheDocument();
    });
  });

  it('hides popover content when trigger is clicked again', async () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <div>Popover Content</div>
      </Popover>
    );

    // Open
    fireEvent.click(screen.getByText('Open'));
    await waitFor(() => {
      expect(screen.getByText('Popover Content')).toBeInTheDocument();
    });

    // Close
    fireEvent.click(screen.getByText('Open'));
    await waitFor(() => {
      expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
    });
  });

  it('shows popover on hover when trigger_action is hover', async () => {
    render(
      <Popover trigger={<button>Hover me</button>} trigger_action='hover'>
        <div>Hover Content</div>
      </Popover>
    );

    const trigger = screen.getByText('Hover me');
    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      expect(screen.getByText('Hover Content')).toBeInTheDocument();
    });
  });

  it('hides popover when mouse leaves on hover trigger', async () => {
    render(
      <Popover trigger={<button>Hover me</button>} trigger_action='hover'>
        <div>Hover Content</div>
      </Popover>
    );

    const trigger = screen.getByText('Hover me');

    // Show
    fireEvent.mouseEnter(trigger);
    await waitFor(() => {
      expect(screen.getByText('Hover Content')).toBeInTheDocument();
    });

    // Hide
    fireEvent.mouseLeave(trigger);
    await waitFor(
      () => {
        expect(screen.queryByText('Hover Content')).not.toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  it('closes popover when clicking outside', async () => {
    render(
      <div>
        <Popover trigger={<button>Open</button>}>
          <div>Popover Content</div>
        </Popover>
        <div>Outside Element</div>
      </div>
    );

    // Open popover
    fireEvent.click(screen.getByText('Open'));
    await waitFor(() => {
      expect(screen.getByText('Popover Content')).toBeInTheDocument();
    });

    // Click outside
    fireEvent.mouseDown(screen.getByText('Outside Element'));

    await waitFor(() => {
      expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
    });
  });

  it('closes popover when Escape key is pressed', async () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <div>Popover Content</div>
      </Popover>
    );

    // Open popover
    fireEvent.click(screen.getByText('Open'));
    await waitFor(() => {
      expect(screen.getByText('Popover Content')).toBeInTheDocument();
    });

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
    });
  });

  it('supports controlled mode with isOpen prop', async () => {
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <Popover
        trigger={<button>Open</button>}
        isOpen={false}
        onOpenChange={onOpenChange}
      >
        <div>Controlled Content</div>
      </Popover>
    );

    expect(screen.queryByText('Controlled Content')).not.toBeInTheDocument();

    rerender(
      <Popover
        trigger={<button>Open</button>}
        isOpen={true}
        onOpenChange={onOpenChange}
      >
        <div>Controlled Content</div>
      </Popover>
    );

    await waitFor(() => {
      expect(screen.getByText('Controlled Content')).toBeInTheDocument();
    });
  });

  it('calls onOpenChange when popover state changes', async () => {
    const onOpenChange = vi.fn();

    render(
      <Popover trigger={<button>Open</button>} onOpenChange={onOpenChange}>
        <div>Content</div>
      </Popover>
    );

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  it('shows arrow when showArrow is true', async () => {
    const { container } = render(
      <Popover trigger={<button>Open</button>} showArrow>
        <div>Content with arrow</div>
      </Popover>
    );

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      const arrow = container.querySelector('[class*="arrow"]');
      expect(arrow).toBeInTheDocument();
    });
  });

  it('hides arrow when showArrow is false', async () => {
    const { container } = render(
      <Popover trigger={<button>Open</button>} showArrow={false}>
        <div>Content without arrow</div>
      </Popover>
    );

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(screen.getByText('Content without arrow')).toBeInTheDocument();
    });

    const arrow = container.querySelector('[class*="arrow"]');
    expect(arrow).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Popover trigger={<button>Open</button>} className='custom-popover'>
        <div>Content</div>
      </Popover>
    );

    expect(container.querySelector('.custom-popover')).toBeInTheDocument();
  });

  it('positions popover according to placement prop', async () => {
    const { container } = render(
      <Popover trigger={<button>Open</button>} placement='top'>
        <div>Top Content</div>
      </Popover>
    );

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(screen.getByText('Top Content')).toBeInTheDocument();
    });

    // Check that positioning styles are applied
    const popoverContent = container.querySelector('[style*="position"]');
    expect(popoverContent).toBeInTheDocument();
  });
});
