import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../ui/checkbox';

describe('Checkbox', () => {
  it('renders checkbox', () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Checkbox label='Accept terms' />);

    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('handles checked state', () => {
    render(<Checkbox checked />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('handles unchecked state', () => {
    render(<Checkbox checked={false} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('passes checked value to onChange', () => {
    const handleChange = vi.fn();
    render(<Checkbox checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Checkbox disabled onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies disabled styles', () => {
    render(<Checkbox disabled />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('supports indeterminate state', () => {
    const { container } = render(<Checkbox indeterminate />);

    const checkbox = container.querySelector('[data-indeterminate="true"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Checkbox className='custom-checkbox' />);

    const checkbox = container.querySelector('.custom-checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <Checkbox label='Newsletter' description='Receive weekly updates' />
    );

    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Receive weekly updates')).toBeInTheDocument();
  });

  it('applies error state', () => {
    const { container } = render(<Checkbox error />);

    const errorElement = container.querySelector('[class*="border-red"]');
    expect(errorElement).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Checkbox error errorMessage='This field is required' />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies small size', () => {
    const { container } = render(<Checkbox size='sm' />);

    const checkbox = container.querySelector('[class*="w-4"], [class*="h-4"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('applies large size', () => {
    const { container } = render(<Checkbox size='lg' />);

    const checkbox = container.querySelector('[class*="w-6"], [class*="h-6"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('handles keyboard interaction', () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.keyDown(checkbox, { key: ' ', code: 'Space' });

    expect(handleChange).toHaveBeenCalled();
  });

  it('supports defaultChecked', () => {
    render(<Checkbox defaultChecked />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('works in uncontrolled mode', () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('renders with custom icon', () => {
    const CustomIcon = () => <span data-testid='custom-icon'>✓</span>;

    render(<Checkbox checked icon={<CustomIcon />} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('applies color variant', () => {
    const { container } = render(<Checkbox checked color='green' />);

    const checkbox = container.querySelector('[class*="bg-green"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders in a group with other checkboxes', () => {
    render(
      <div>
        <Checkbox label='Option 1' />
        <Checkbox label='Option 2' />
        <Checkbox label='Option 3' />
      </div>
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
  });

  it('supports required attribute', () => {
    render(<Checkbox required />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeRequired();
  });

  it('supports name attribute', () => {
    render(<Checkbox name='terms' />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('name', 'terms');
  });

  it('supports value attribute', () => {
    render(<Checkbox value='accepted' />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('value', 'accepted');
  });
});
