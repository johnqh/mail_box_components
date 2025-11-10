import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { Tooltip } from '../ui/tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders trigger element', () => {
    render(
      <Tooltip content='Tooltip text'>
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('initially hides tooltip content', () => {
    render(
      <Tooltip content='Tooltip text'>
        <button>Trigger</button>
      </Tooltip>
    );

    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });

  it('shows tooltip on hover', () => {
    render(
      <Tooltip content='Tooltip text'>
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover me');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  it('hides tooltip when mouse leaves', () => {
    render(
      <Tooltip content='Tooltip text'>
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover me');

    fireEvent.mouseEnter(trigger);
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus', () => {
    render(
      <Tooltip content='Tooltip text'>
        <button>Focus me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Focus me');
    fireEvent.focus(trigger);

    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  it('hides tooltip on blur', () => {
    render(
      <Tooltip content='Tooltip text'>
        <button>Focus me</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Focus me');

    fireEvent.focus(trigger);
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();

    fireEvent.blur(trigger);
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });

  it('delays showing tooltip when delayShow is set', () => {
    render(
      <Tooltip content='Delayed tooltip' delayShow={200}>
        <button>Hover</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover');
    fireEvent.mouseEnter(trigger);

    // Should not show immediately
    expect(screen.queryByText('Delayed tooltip')).not.toBeInTheDocument();

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByText('Delayed tooltip')).toBeInTheDocument();
  });

  it('delays hiding tooltip when delayHide is set', () => {
    render(
      <Tooltip content='Tooltip text' delayHide={200}>
        <button>Hover</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Hover');

    fireEvent.mouseEnter(trigger);
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);

    // Should still be visible during delay
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Tooltip content='Tooltip' className='custom-tooltip'>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    const tooltip = container.querySelector('.custom-tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  it('positions tooltip at top by default', () => {
    const { container: _container } = render(
      <Tooltip content='Top tooltip'>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    const tooltip = screen.getByText('Top tooltip').closest('[role="tooltip"]');
    expect(tooltip).toBeInTheDocument();
  });

  it('positions tooltip at specified placement', () => {
    render(
      <Tooltip content='Bottom tooltip' placement='bottom'>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText('Bottom tooltip')).toBeInTheDocument();
  });

  it('renders with arrow when showArrow is true', () => {
    const { container } = render(
      <Tooltip content='Tooltip with arrow' showArrow>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    const arrow = container.querySelector('[class*="arrow"]');
    expect(arrow).toBeInTheDocument();
  });

  it('hides arrow when showArrow is false', () => {
    const { container } = render(
      <Tooltip content='Tooltip without arrow' showArrow={false}>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText('Tooltip without arrow')).toBeInTheDocument();

    const arrow = container.querySelector('[class*="arrow"]');
    expect(arrow).not.toBeInTheDocument();
  });

  it('does not show tooltip when disabled', () => {
    render(
      <Tooltip content='Disabled tooltip' disabled>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    expect(screen.queryByText('Disabled tooltip')).not.toBeInTheDocument();
  });

  it('renders with custom content component', () => {
    const CustomContent = () => (
      <div data-testid='custom-content'>Custom tooltip content</div>
    );

    render(
      <Tooltip content={<CustomContent />}>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { container } = render(
      <Tooltip content='Info tooltip' variant='info'>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    const tooltip = container.querySelector('[class*="bg-blue"]');
    expect(tooltip).toBeInTheDocument();
  });

  it('handles click trigger', () => {
    render(
      <Tooltip content='Click tooltip' trigger='click'>
        <button>Click me</button>
      </Tooltip>
    );

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(screen.getByText('Click tooltip')).toBeInTheDocument();
  });

  it('closes click tooltip on second click', () => {
    render(
      <Tooltip content='Click tooltip' trigger='click'>
        <button>Click me</button>
      </Tooltip>
    );

    const button = screen.getByText('Click me');

    // Open
    fireEvent.click(button);
    expect(screen.getByText('Click tooltip')).toBeInTheDocument();

    // Close
    fireEvent.click(button);
    expect(screen.queryByText('Click tooltip')).not.toBeInTheDocument();
  });

  it('closes tooltip when clicking outside', () => {
    render(
      <div>
        <Tooltip content='Click tooltip' trigger='click'>
          <button>Click me</button>
        </Tooltip>
        <div>Outside element</div>
      </div>
    );

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(screen.getByText('Click tooltip')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByText('Outside element'));

    expect(screen.queryByText('Click tooltip')).not.toBeInTheDocument();
  });

  it('supports controlled mode', () => {
    const { rerender } = render(
      <Tooltip content='Controlled tooltip' isOpen={false}>
        <button>Trigger</button>
      </Tooltip>
    );

    expect(screen.queryByText('Controlled tooltip')).not.toBeInTheDocument();

    rerender(
      <Tooltip content='Controlled tooltip' isOpen={true}>
        <button>Trigger</button>
      </Tooltip>
    );

    expect(screen.getByText('Controlled tooltip')).toBeInTheDocument();
  });

  it('calls onVisibilityChange when tooltip shows/hides', () => {
    const handleVisibilityChange = vi.fn();

    render(
      <Tooltip content='Tooltip' onVisibilityChange={handleVisibilityChange}>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');

    fireEvent.mouseEnter(trigger);
    expect(handleVisibilityChange).toHaveBeenCalledWith(true);

    fireEvent.mouseLeave(trigger);
    expect(handleVisibilityChange).toHaveBeenCalledWith(false);
  });
});
