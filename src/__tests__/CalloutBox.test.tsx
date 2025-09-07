import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CalloutBox } from '../components/CalloutBox';

describe('CalloutBox Component', () => {
  it('renders children content', () => {
    render(<CalloutBox>Test content</CalloutBox>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<CalloutBox title="Important Note">Content</CalloutBox>);
    expect(screen.getByText('Important Note')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(<CalloutBox icon="🚀">Content</CalloutBox>);
    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies gradient variant by default', () => {
    render(<CalloutBox>Content</CalloutBox>);
    const box = screen.getByTestId('callout-box');
    expect(box).toHaveClass('bg-gradient-to-r');
    expect(box).toHaveClass('from-green-50');
    expect(box).toHaveClass('to-blue-50');
  });

  it('applies info variant styles', () => {
    render(<CalloutBox variant="info">Content</CalloutBox>);
    const box = screen.getByTestId('callout-box');
    expect(box).toHaveClass('from-blue-50');
    expect(box).toHaveClass('to-indigo-50');
    expect(box).toHaveClass('border-blue-200');
  });

  it('applies success variant styles', () => {
    render(<CalloutBox variant="success">Content</CalloutBox>);
    const box = screen.getByTestId('callout-box');
    expect(box).toHaveClass('from-green-50');
    expect(box).toHaveClass('to-emerald-50');
    expect(box).toHaveClass('border-green-200');
  });

  it('applies warning variant styles', () => {
    render(<CalloutBox variant="warning">Content</CalloutBox>);
    const box = screen.getByTestId('callout-box');
    expect(box).toHaveClass('from-yellow-50');
    expect(box).toHaveClass('to-orange-50');
    expect(box).toHaveClass('border-yellow-200');
  });

  it('applies error variant styles', () => {
    render(<CalloutBox variant="error">Content</CalloutBox>);
    const box = screen.getByTestId('callout-box');
    expect(box).toHaveClass('from-red-50');
    expect(box).toHaveClass('to-rose-50');
    expect(box).toHaveClass('border-red-200');
  });

  it('applies neutral variant styles', () => {
    render(<CalloutBox variant="neutral">Content</CalloutBox>);
    const box = screen.getByTestId('callout-box');
    expect(box).toHaveClass('from-gray-50');
    expect(box).toHaveClass('to-slate-50');
    expect(box).toHaveClass('border-gray-200');
  });

  it('applies default size styles', () => {
    render(<CalloutBox>Content</CalloutBox>);
    const box = screen.getByTestId('callout-box');
    expect(box).toHaveClass('p-6');
    expect(box).toHaveClass('rounded-xl');
  });

  it('applies small size styles', () => {
    render(<CalloutBox size="sm">Content</CalloutBox>);
    const box = screen.getByTestId('callout-box');
    expect(box).toHaveClass('p-4');
    expect(box).toHaveClass('rounded-lg');
  });

  it('applies large size styles', () => {
    render(<CalloutBox size="lg">Content</CalloutBox>);
    const box = screen.getByTestId('callout-box');
    expect(box).toHaveClass('p-8');
    expect(box).toHaveClass('rounded-2xl');
  });

  it('applies custom className', () => {
    render(<CalloutBox className="custom-class">Content</CalloutBox>);
    const box = screen.getByTestId('callout-box');
    expect(box).toHaveClass('custom-class');
  });

  it('centers content when centered prop is true', () => {
    render(<CalloutBox centered>Content</CalloutBox>);
    const container = screen.getByTestId('callout-box-content');
    expect(container).toHaveClass('text-center');
  });

  it('applies correct title styles based on variant', () => {
    render(<CalloutBox title="Title" variant="info">Content</CalloutBox>);
    const title = screen.getByText('Title');
    expect(title).toHaveClass('text-transparent');
    expect(title).toHaveClass('bg-clip-text');
    expect(title).toHaveClass('bg-gradient-to-r');
    expect(title).toHaveClass('from-blue-600');
    expect(title).toHaveClass('to-indigo-600');
  });

  it('applies neutral title styles for neutral variant', () => {
    render(<CalloutBox title="Title" variant="neutral">Content</CalloutBox>);
    const title = screen.getByText('Title');
    expect(title).toHaveClass('text-gray-900');
    expect(title).toHaveClass('dark:text-white');
  });

  it('applies correct title size based on size prop', () => {
    const { rerender } = render(<CalloutBox title="Title" size="sm">Content</CalloutBox>);
    let title = screen.getByText('Title');
    expect(title).toHaveClass('text-lg');

    rerender(<CalloutBox title="Title" size="default">Content</CalloutBox>);
    title = screen.getByText('Title');
    expect(title).toHaveClass('text-2xl');

    rerender(<CalloutBox title="Title" size="lg">Content</CalloutBox>);
    title = screen.getByText('Title');
    expect(title).toHaveClass('text-3xl');
  });

  it('applies correct icon size based on size prop', () => {
    const { rerender } = render(<CalloutBox icon="🚀" size="sm">Content</CalloutBox>);
    let icon = screen.getByText('🚀');
    expect(icon).toHaveClass('text-2xl');

    rerender(<CalloutBox icon="🚀" size="default">Content</CalloutBox>);
    icon = screen.getByText('🚀');
    expect(icon).toHaveClass('text-4xl');

    rerender(<CalloutBox icon="🚀" size="lg">Content</CalloutBox>);
    icon = screen.getByText('🚀');
    expect(icon).toHaveClass('text-5xl');
  });

  it('centers icon when centered prop is true', () => {
    render(<CalloutBox icon="🚀" centered>Content</CalloutBox>);
    const icon = screen.getByText('🚀');
    expect(icon).toHaveClass('text-center');
  });

  it('applies correct content size based on size prop', () => {
    const { rerender } = render(<CalloutBox size="sm">Content</CalloutBox>);
    let content = screen.getByText('Content');
    expect(content).toHaveClass('text-sm');

    rerender(<CalloutBox size="default">Content</CalloutBox>);
    content = screen.getByText('Content');
    expect(content).toHaveClass('text-base');

    rerender(<CalloutBox size="lg">Content</CalloutBox>);
    content = screen.getByText('Content');
    expect(content).toHaveClass('text-lg');
  });

  it('renders complex children', () => {
    render(
      <CalloutBox>
        <div>Line 1</div>
        <p>Line 2</p>
        <span>Line 3</span>
      </CalloutBox>
    );
    expect(screen.getByText('Line 1')).toBeInTheDocument();
    expect(screen.getByText('Line 2')).toBeInTheDocument();
    expect(screen.getByText('Line 3')).toBeInTheDocument();
  });

  it('renders JSX icons', () => {
    const icon = <svg data-testid="svg-icon"><path /></svg>;
    render(<CalloutBox icon={icon}>Content</CalloutBox>);
    expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
  });

  it('applies content color classes', () => {
    render(<CalloutBox>Content</CalloutBox>);
    const content = screen.getByText('Content');
    expect(content).toHaveClass('text-gray-600');
    expect(content).toHaveClass('dark:text-gray-400');
  });

  it('has proper spacing between elements', () => {
    render(<CalloutBox title="Title" icon="🚀">Content</CalloutBox>);
    const container = screen.getByTestId('callout-box-content');
    expect(container).toHaveClass('space-y-4');
  });
});