import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StepList } from '../core/StepList';

describe('StepList Component', () => {
  it('renders string items', () => {
    const items = ['Step 1', 'Step 2', 'Step 3'];
    render(<StepList items={items} />);

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders complex items with content', () => {
    const items = [
      { content: 'First step' },
      { content: <span>Second step with JSX</span> },
      { content: 'Third step' },
    ];
    render(<StepList items={items} />);

    expect(screen.getByText('First step')).toBeInTheDocument();
    expect(screen.getByText('Second step with JSX')).toBeInTheDocument();
    expect(screen.getByText('Third step')).toBeInTheDocument();
  });

  it('renders items with subitems', () => {
    const items = [
      {
        content: 'Main step',
        subItems: ['Sub item 1', 'Sub item 2'],
      },
    ];
    render(<StepList items={items} />);

    expect(screen.getByText('Main step')).toBeInTheDocument();
    expect(screen.getByText('Sub item 1')).toBeInTheDocument();
    expect(screen.getByText('Sub item 2')).toBeInTheDocument();
  });

  it('renders as ordered list by default', () => {
    render(<StepList items={['Item 1', 'Item 2']} />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('list-decimal');
  });

  it('renders as unordered list when specified', () => {
    render(<StepList items={['Item 1', 'Item 2']} type='unordered' />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('list-disc');
  });

  it('applies default variant styles', () => {
    render(<StepList items={['Item']} />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('list-inside');
  });

  it('applies enhanced variant styles', () => {
    render(<StepList items={['Item 1', 'Item 2']} variant='enhanced' />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('list-inside');
    expect(list).toHaveClass('space-y-3');

    const firstItem = screen.getByText('Item 1').parentElement?.parentElement;
    expect(firstItem).toHaveClass('relative');
    expect(firstItem).toHaveClass('pl-8');
    expect(firstItem).toHaveClass('border-l-2');
  });

  it('applies minimal variant styles', () => {
    render(<StepList items={['Item']} variant='minimal' />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('list-none');
    expect(list).toHaveClass('space-y-1');

    const item = screen.getByText('Item').parentElement?.parentElement;
    expect(item).toHaveClass('flex');
    expect(item).toHaveClass('items-start');
  });

  it('renders step numbers in enhanced ordered variant', () => {
    render(
      <StepList
        items={['Step 1', 'Step 2']}
        variant='enhanced'
        type='ordered'
      />
    );

    const stepNumbers = document.querySelectorAll('.absolute.-left-4');
    expect(stepNumbers).toHaveLength(2);
    expect(stepNumbers[0]).toHaveTextContent('1');
    expect(stepNumbers[1]).toHaveTextContent('2');
  });

  it('renders step numbers in minimal ordered variant', () => {
    render(
      <StepList items={['Step 1', 'Step 2']} variant='minimal' type='ordered' />
    );

    const stepNumbers = document.querySelectorAll('.bg-blue-100');
    expect(stepNumbers).toHaveLength(2);
    expect(stepNumbers[0]).toHaveTextContent('1');
    expect(stepNumbers[1]).toHaveTextContent('2');
  });

  it('renders bullets in minimal unordered variant', () => {
    render(
      <StepList
        items={['Item 1', 'Item 2']}
        variant='minimal'
        type='unordered'
      />
    );

    const bullets = document.querySelectorAll(
      '.w-2.h-2.bg-blue-600.rounded-full'
    );
    expect(bullets).toHaveLength(2);
  });

  it('applies custom className to list', () => {
    render(<StepList items={['Item']} className='custom-list' />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('custom-list');
  });

  it('applies custom className to items', () => {
    render(<StepList items={['Item']} itemClassName='custom-item' />);
    const item = screen.getByText('Item').parentElement?.parentElement;
    expect(item).toHaveClass('custom-item');
  });

  it('handles mixed item types', () => {
    const items = [
      'Simple string',
      { content: 'Complex item' },
      { content: 'Item with subs', subItems: ['Sub 1'] },
    ];
    render(<StepList items={items} />);

    expect(screen.getByText('Simple string')).toBeInTheDocument();
    expect(screen.getByText('Complex item')).toBeInTheDocument();
    expect(screen.getByText('Item with subs')).toBeInTheDocument();
    expect(screen.getByText('Sub 1')).toBeInTheDocument();
  });

  it('removes border on last enhanced item', () => {
    render(<StepList items={['Item 1', 'Item 2']} variant='enhanced' />);

    const lastItem = screen.getByText('Item 2').parentElement?.parentElement;
    expect(lastItem).toHaveClass('border-l-transparent');
  });

  it('renders JSX subitems correctly', () => {
    const items = [
      {
        content: 'Main',
        subItems: [<strong key='1'>Bold subitem</strong>],
      },
    ];
    render(<StepList items={items} />);

    const boldSubitem = screen.getByText('Bold subitem');
    expect(boldSubitem.tagName).toBe('STRONG');
  });

  it('applies correct text colors', () => {
    render(<StepList items={['Item']} />);
    const item = screen.getByText('Item').parentElement?.parentElement;
    expect(item).toHaveClass('text-gray-600');
    expect(item).toHaveClass('dark:text-gray-400');
  });
});
