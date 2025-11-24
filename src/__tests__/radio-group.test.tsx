import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from '../forms/inputs/radio-group';

describe('RadioGroup', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  it('renders radio group with options', () => {
    render(<RadioGroup options={options} value='' onChange={() => {}} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('renders all radio buttons', () => {
    render(<RadioGroup options={options} value='' onChange={() => {}} />);

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
  });

  it('checks the selected option', () => {
    render(<RadioGroup options={options} value='2' onChange={() => {}} />);

    const radios = screen.getAllByRole('radio');
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
    expect(radios[2]).not.toBeChecked();
  });

  it('calls onChange when option is clicked', () => {
    const handleChange = vi.fn();
    render(<RadioGroup options={options} value='1' onChange={handleChange} />);

    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);

    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup
        options={options}
        value='1'
        onChange={handleChange}
        disabled
      />
    );

    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies disabled state to all options', () => {
    render(
      <RadioGroup options={options} value='' onChange={() => {}} disabled />
    );

    const radios = screen.getAllByRole('radio');
    radios.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });

  it('renders with group label', () => {
    render(
      <RadioGroup
        options={options}
        value=''
        onChange={() => {}}
        label='Select an option'
      />
    );

    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RadioGroup
        options={options}
        value=''
        onChange={() => {}}
        className='custom-radio-group'
      />
    );

    const radioGroup = container.querySelector('.custom-radio-group');
    expect(radioGroup).toBeInTheDocument();
  });

  it('renders options with descriptions', () => {
    const optionsWithDescriptions = [
      { label: 'Small', value: 's', description: 'For small items' },
      { label: 'Large', value: 'l', description: 'For large items' },
    ];

    render(
      <RadioGroup
        options={optionsWithDescriptions}
        value=''
        onChange={() => {}}
      />
    );

    expect(screen.getByText('For small items')).toBeInTheDocument();
    expect(screen.getByText('For large items')).toBeInTheDocument();
  });

  it('renders in horizontal orientation', () => {
    const { container } = render(
      <RadioGroup
        options={options}
        value=''
        onChange={() => {}}
        orientation='horizontal'
      />
    );

    const radioGroup = container.querySelector('[class*="flex-row"]');
    expect(radioGroup).toBeInTheDocument();
  });

  it('renders in vertical orientation by default', () => {
    const { container } = render(
      <RadioGroup options={options} value='' onChange={() => {}} />
    );

    const radioGroup = container.querySelector('[class*="flex-col"]');
    expect(radioGroup).toBeInTheDocument();
  });

  it('applies error state', () => {
    const { container } = render(
      <RadioGroup options={options} value='' onChange={() => {}} error />
    );

    const errorElement = container.querySelector('[class*="border-red"]');
    expect(errorElement).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <RadioGroup
        options={options}
        value=''
        onChange={() => {}}
        error
        errorMessage='Please select an option'
      />
    );

    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    const handleChange = vi.fn();
    render(<RadioGroup options={options} value='1' onChange={handleChange} />);

    const radios = screen.getAllByRole('radio');
    fireEvent.keyDown(radios[0], { key: 'ArrowDown' });

    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with required indicator', () => {
    render(
      <RadioGroup
        options={options}
        value=''
        onChange={() => {}}
        required
        label='Required Field'
      />
    );

    const required = screen.getByText('*');
    expect(required).toBeInTheDocument();
  });

  it('applies small size', () => {
    const { container } = render(
      <RadioGroup options={options} value='' onChange={() => {}} size='sm' />
    );

    const radios = container.querySelectorAll('[class*="w-4"], [class*="h-4"]');
    expect(radios.length).toBeGreaterThan(0);
  });

  it('applies large size', () => {
    const { container } = render(
      <RadioGroup options={options} value='' onChange={() => {}} size='lg' />
    );

    const radios = container.querySelectorAll('[class*="w-6"], [class*="h-6"]');
    expect(radios.length).toBeGreaterThan(0);
  });

  it('renders with custom option renderer', () => {
    const customRender = (option: { label: string; value: string }) => (
      <div data-testid='custom-option'>{option.label.toUpperCase()}</div>
    );

    render(
      <RadioGroup
        options={options}
        value=''
        onChange={() => {}}
        renderOption={customRender}
      />
    );

    const customOptions = screen.getAllByTestId('custom-option');
    expect(customOptions).toHaveLength(3);
    expect(customOptions[0]).toHaveTextContent('OPTION 1');
  });

  it('handles disabled individual options', () => {
    const optionsWithDisabled = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2', disabled: true },
      { label: 'Option 3', value: '3' },
    ];

    render(
      <RadioGroup options={optionsWithDisabled} value='' onChange={() => {}} />
    );

    const radios = screen.getAllByRole('radio');
    expect(radios[0]).not.toBeDisabled();
    expect(radios[1]).toBeDisabled();
    expect(radios[2]).not.toBeDisabled();
  });

  it('supports name attribute for form submission', () => {
    render(
      <RadioGroup
        options={options}
        value='1'
        onChange={() => {}}
        name='radio-group-1'
      />
    );

    const radios = screen.getAllByRole('radio');
    radios.forEach(radio => {
      expect(radio).toHaveAttribute('name', 'radio-group-1');
    });
  });
});
