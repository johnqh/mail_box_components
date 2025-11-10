import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '../ui/accordion';

describe('Accordion', () => {
  const mockItems = [
    { id: '1', title: 'Section 1', content: 'Content 1' },
    { id: '2', title: 'Section 2', content: 'Content 2' },
    { id: '3', title: 'Section 3', content: 'Content 3' },
  ];

  it('renders accordion with all items', () => {
    render(<Accordion items={mockItems} />);

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  it('initially renders with all items collapsed', () => {
    render(<Accordion items={mockItems} />);

    // Content should not be visible initially
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('expands item when clicked', () => {
    render(<Accordion items={mockItems} />);

    const firstItem = screen.getByText('Section 1');
    fireEvent.click(firstItem);

    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('collapses item when clicked again', () => {
    render(<Accordion items={mockItems} />);

    const firstItem = screen.getByText('Section 1');

    // Expand
    fireEvent.click(firstItem);
    expect(screen.getByText('Content 1')).toBeVisible();

    // Collapse
    fireEvent.click(firstItem);
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('allows only one item open at a time by default', () => {
    render(<Accordion items={mockItems} />);

    // Open first item
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeVisible();

    // Open second item
    fireEvent.click(screen.getByText('Section 2'));
    expect(screen.getByText('Content 2')).toBeVisible();

    // First item should be closed
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('allows multiple items open when allowMultiple is true', () => {
    render(<Accordion items={mockItems} allowMultiple />);

    // Open first item
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeVisible();

    // Open second item
    fireEvent.click(screen.getByText('Section 2'));
    expect(screen.getByText('Content 2')).toBeVisible();

    // Both items should be open
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('opens default item when defaultOpenId is provided', () => {
    render(<Accordion items={mockItems} defaultOpenId='2' />);

    expect(screen.getByText('Content 2')).toBeVisible();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Accordion items={mockItems} className='custom-accordion' />
    );

    const accordion = container.querySelector('.custom-accordion');
    expect(accordion).toBeInTheDocument();
  });

  it('renders with icons when showIcons is true', () => {
    const { container } = render(<Accordion items={mockItems} showIcons />);

    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('renders empty when no items provided', () => {
    const { container } = render(<Accordion items={[]} />);

    const items = container.querySelectorAll('[role="button"]');
    expect(items.length).toBe(0);
  });

  it('handles keyboard navigation', () => {
    render(<Accordion items={mockItems} />);

    const firstItem = screen.getByText('Section 1');

    // Simulate Enter key
    fireEvent.keyDown(firstItem, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('Content 1')).toBeVisible();

    // Simulate Space key
    fireEvent.keyDown(firstItem, { key: ' ', code: 'Space' });
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });
});
