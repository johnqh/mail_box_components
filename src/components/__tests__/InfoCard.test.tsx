import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InfoCard } from '../InfoCard';

describe('InfoCard Component', () => {
  it('renders children content', () => {
    render(<InfoCard>Test content</InfoCard>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<InfoCard title="Important Information">Content</InfoCard>);
    expect(screen.getByText('Important Information')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies info variant by default', () => {
    render(<InfoCard>Content</InfoCard>);
    const card = screen.getByTestId('info-card');
    expect(card).toHaveClass('bg-blue-50');
    expect(card).toHaveClass('border-blue-200');
  });

  it('applies success variant styles', () => {
    render(<InfoCard variant="success">Content</InfoCard>);
    const card = screen.getByTestId('info-card');
    expect(card).toHaveClass('bg-green-50');
    expect(card).toHaveClass('border-green-200');
  });

  it('applies warning variant styles', () => {
    render(<InfoCard variant="warning">Content</InfoCard>);
    const card = screen.getByTestId('info-card');
    expect(card).toHaveClass('bg-yellow-50');
    expect(card).toHaveClass('border-yellow-200');
  });

  it('applies error variant styles', () => {
    render(<InfoCard variant="error">Content</InfoCard>);
    const card = screen.getByTestId('info-card');
    expect(card).toHaveClass('bg-red-50');
    expect(card).toHaveClass('border-red-200');
  });

  it('applies neutral variant styles', () => {
    render(<InfoCard variant="neutral">Content</InfoCard>);
    const card = screen.getByTestId('info-card');
    expect(card).toHaveClass('bg-gray-50');
    expect(card).toHaveClass('border-gray-200');
  });

  it('applies default size styles', () => {
    render(<InfoCard>Content</InfoCard>);
    const card = screen.getByTestId('info-card');
    expect(card).toHaveClass('p-6');
  });

  it('applies small size styles', () => {
    render(<InfoCard size="sm">Content</InfoCard>);
    const card = screen.getByTestId('info-card');
    expect(card).toHaveClass('p-4');
    expect(card).toHaveClass('text-sm');
  });

  it('applies large size styles', () => {
    render(<InfoCard size="lg">Content</InfoCard>);
    const card = screen.getByTestId('info-card');
    expect(card).toHaveClass('p-8');
    expect(card).toHaveClass('text-lg');
  });

  it('applies custom className', () => {
    render(<InfoCard className="custom-class">Content</InfoCard>);
    const card = screen.getByTestId('info-card');
    expect(card).toHaveClass('custom-class');
  });

  it('applies correct title styles based on variant', () => {
    render(<InfoCard title="Title" variant="error">Content</InfoCard>);
    const title = screen.getByText('Title');
    expect(title).toHaveClass('text-red-900');
    expect(title).toHaveClass('dark:text-red-300');
  });

  it('applies correct title size based on size prop', () => {
    const { rerender } = render(<InfoCard title="Title" size="sm">Content</InfoCard>);
    let title = screen.getByText('Title');
    expect(title).toHaveClass('text-base');

    rerender(<InfoCard title="Title" size="default">Content</InfoCard>);
    title = screen.getByText('Title');
    expect(title).toHaveClass('text-lg');

    rerender(<InfoCard title="Title" size="lg">Content</InfoCard>);
    title = screen.getByText('Title');
    expect(title).toHaveClass('text-xl');
  });

  it('applies correct content color based on variant', () => {
    render(<InfoCard variant="success">Content</InfoCard>);
    const content = screen.getByText('Content');
    expect(content).toHaveClass('text-green-800');
    expect(content).toHaveClass('dark:text-green-400');
  });

  it('renders complex children', () => {
    render(
      <InfoCard>
        <div>Line 1</div>
        <p>Line 2</p>
        <span>Line 3</span>
      </InfoCard>
    );
    expect(screen.getByText('Line 1')).toBeInTheDocument();
    expect(screen.getByText('Line 2')).toBeInTheDocument();
    expect(screen.getByText('Line 3')).toBeInTheDocument();
  });

  it('has rounded corners', () => {
    render(<InfoCard>Content</InfoCard>);
    const card = screen.getByTestId('info-card');
    expect(card).toHaveClass('rounded-lg');
  });
});