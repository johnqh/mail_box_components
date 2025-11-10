import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Collapsible } from '../ui/collapsible';

describe('Collapsible', () => {
  it('renders collapsible component', () => {
    render(
      <Collapsible trigger='Click to expand'>
        <div>Content</div>
      </Collapsible>
    );

    expect(screen.getByText('Click to expand')).toBeInTheDocument();
  });

  it('initially hides content when closed', () => {
    render(
      <Collapsible trigger='Trigger'>
        <div>Hidden Content</div>
      </Collapsible>
    );

    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
  });

  it('shows content when trigger is clicked', () => {
    render(
      <Collapsible trigger='Trigger'>
        <div>Visible Content</div>
      </Collapsible>
    );

    fireEvent.click(screen.getByText('Trigger'));

    expect(screen.getByText('Visible Content')).toBeVisible();
  });

  it('hides content when trigger is clicked again', () => {
    render(
      <Collapsible trigger='Trigger'>
        <div>Toggle Content</div>
      </Collapsible>
    );

    const trigger = screen.getByText('Trigger');

    // Open
    fireEvent.click(trigger);
    expect(screen.getByText('Toggle Content')).toBeVisible();

    // Close
    fireEvent.click(trigger);
    expect(screen.queryByText('Toggle Content')).not.toBeInTheDocument();
  });

  it('starts open when defaultOpen is true', () => {
    render(
      <Collapsible trigger='Trigger' defaultOpen>
        <div>Initially Open</div>
      </Collapsible>
    );

    expect(screen.getByText('Initially Open')).toBeVisible();
  });

  it('supports controlled mode with isOpen prop', () => {
    const { rerender } = render(
      <Collapsible trigger='Trigger' isOpen={false}>
        <div>Controlled Content</div>
      </Collapsible>
    );

    expect(screen.queryByText('Controlled Content')).not.toBeInTheDocument();

    rerender(
      <Collapsible trigger='Trigger' isOpen={true}>
        <div>Controlled Content</div>
      </Collapsible>
    );

    expect(screen.getByText('Controlled Content')).toBeVisible();
  });

  it('calls onToggle when opened/closed', () => {
    const handleToggle = vi.fn();
    render(
      <Collapsible trigger='Trigger' onToggle={handleToggle}>
        <div>Content</div>
      </Collapsible>
    );

    const trigger = screen.getByText('Trigger');

    fireEvent.click(trigger);
    expect(handleToggle).toHaveBeenCalledWith(true);

    fireEvent.click(trigger);
    expect(handleToggle).toHaveBeenCalledWith(false);
  });

  it('applies custom className', () => {
    const { container } = render(
      <Collapsible trigger='Trigger' className='custom-collapsible'>
        <div>Content</div>
      </Collapsible>
    );

    const collapsible = container.querySelector('.custom-collapsible');
    expect(collapsible).toBeInTheDocument();
  });

  it('renders custom trigger element', () => {
    const CustomTrigger = <button data-testid='custom-trigger'>Custom</button>;

    render(
      <Collapsible trigger={CustomTrigger}>
        <div>Content</div>
      </Collapsible>
    );

    expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
  });

  it('shows chevron icon by default', () => {
    const { container } = render(
      <Collapsible trigger='Trigger'>
        <div>Content</div>
      </Collapsible>
    );

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('hides chevron icon when showIcon is false', () => {
    const { container } = render(
      <Collapsible trigger='Trigger' showIcon={false}>
        <div>Content</div>
      </Collapsible>
    );

    const icon = container.querySelector('svg');
    expect(icon).not.toBeInTheDocument();
  });

  it('rotates chevron when opened', () => {
    const { container } = render(
      <Collapsible trigger='Trigger'>
        <div>Content</div>
      </Collapsible>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    const icon = container.querySelector('[class*="rotate"]');
    expect(icon).toBeInTheDocument();
  });

  it('handles keyboard interaction with Enter', () => {
    render(
      <Collapsible trigger='Trigger'>
        <div>Content</div>
      </Collapsible>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.keyDown(trigger, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('Content')).toBeVisible();
  });

  it('handles keyboard interaction with Space', () => {
    render(
      <Collapsible trigger='Trigger'>
        <div>Content</div>
      </Collapsible>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.keyDown(trigger, { key: ' ', code: 'Space' });

    expect(screen.getByText('Content')).toBeVisible();
  });

  it('applies disabled state', () => {
    render(
      <Collapsible trigger='Trigger' disabled>
        <div>Content</div>
      </Collapsible>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('applies disabled styles', () => {
    const { container } = render(
      <Collapsible trigger='Trigger' disabled>
        <div>Content</div>
      </Collapsible>
    );

    const trigger = container.querySelector(
      '[class*="opacity"], [class*="cursor-not-allowed"]'
    );
    expect(trigger).toBeInTheDocument();
  });

  it('renders with custom transition duration', () => {
    const { container } = render(
      <Collapsible trigger='Trigger' transitionDuration={500}>
        <div>Content</div>
      </Collapsible>
    );

    const content = container.querySelector('[class*="transition"]');
    expect(content).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { container } = render(
      <Collapsible trigger='Trigger' variant='outlined'>
        <div>Content</div>
      </Collapsible>
    );

    const outlined = container.querySelector('[class*="border"]');
    expect(outlined).toBeInTheDocument();
  });

  it('renders nested collapsibles', () => {
    render(
      <Collapsible trigger='Parent'>
        <div>
          Parent Content
          <Collapsible trigger='Child'>
            <div>Child Content</div>
          </Collapsible>
        </div>
      </Collapsible>
    );

    // Open parent
    fireEvent.click(screen.getByText('Parent'));
    expect(screen.getByText('Parent Content')).toBeVisible();

    // Open child
    fireEvent.click(screen.getByText('Child'));
    expect(screen.getByText('Child Content')).toBeVisible();
  });

  it('renders with animation', () => {
    const { container } = render(
      <Collapsible trigger='Trigger' animated>
        <div>Animated Content</div>
      </Collapsible>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    const content = container.querySelector(
      '[class*="transition"], [class*="animate"]'
    );
    expect(content).toBeInTheDocument();
  });
});
