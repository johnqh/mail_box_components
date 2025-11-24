/**
 * Tests for Label Component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from '../forms/inputs/label';

describe('Label Component', () => {
  it('renders label with text content', () => {
    render(<Label>Username</Label>);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('renders as label element by default', () => {
    render(<Label>Email Address</Label>);
    const label = screen.getByText('Email Address');
    expect(label.tagName).toBe('LABEL');
  });

  it('applies custom className', () => {
    render(<Label className='custom-label'>Custom Label</Label>);
    const label = screen.getByText('Custom Label');
    expect(label).toHaveClass('custom-label');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Ref Label</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
    expect(ref.current?.textContent).toBe('Ref Label');
  });

  it('supports htmlFor prop for form association', () => {
    render(
      <>
        <Label htmlFor='email-input'>Email</Label>
        <input id='email-input' type='email' />
      </>
    );

    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'email-input');
  });

  it('applies default design system styles', () => {
    render(<Label>Styled Label</Label>);
    const label = screen.getByText('Styled Label');

    // Should have the peer-disabled classes from labelVariants
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
    expect(label).toHaveClass('peer-disabled:opacity-70');
  });

  it('handles disabled state styling for associated form elements', () => {
    render(
      <div>
        <Label htmlFor='disabled-input'>Disabled Field</Label>
        <input id='disabled-input' disabled />
      </div>
    );

    const label = screen.getByText('Disabled Field');
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
    expect(label).toHaveClass('peer-disabled:opacity-70');
  });

  it('passes through additional props', () => {
    render(
      <Label data-testid='label-with-props' title='Tooltip text'>
        Label with Props
      </Label>
    );

    const label = screen.getByTestId('label-with-props');
    expect(label).toHaveAttribute('title', 'Tooltip text');
  });

  it('supports children as React nodes', () => {
    render(
      <Label>
        <span>Required</span> Field <em>*</em>
      </Label>
    );

    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByText('Field')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('works with form validation states', () => {
    render(
      <div>
        <Label htmlFor='required-field' className='text-red-600'>
          Required Field
        </Label>
        <input id='required-field' required aria-invalid='true' />
      </div>
    );

    const label = screen.getByText('Required Field');
    expect(label).toHaveClass('text-red-600');
    expect(label).toHaveAttribute('for', 'required-field');
  });
});
