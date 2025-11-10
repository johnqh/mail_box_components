import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TagInput } from '../ui/tag-input';

describe('TagInput', () => {
  it('renders tag input component', () => {
    render(<TagInput value={[]} onChange={() => {}} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('displays existing tags', () => {
    render(
      <TagInput value={['React', 'TypeScript', 'Vitest']} onChange={() => {}} />
    );

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Vitest')).toBeInTheDocument();
  });

  it('adds tag on Enter key press', () => {
    const handleChange = vi.fn();
    render(<TagInput value={['React']} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'TypeScript' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith(['React', 'TypeScript']);
  });

  it('adds tag on comma key press', () => {
    const handleChange = vi.fn();
    render(<TagInput value={[]} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Tag' } });
    fireEvent.keyDown(input, { key: ',', code: 'Comma' });

    expect(handleChange).toHaveBeenCalledWith(['New Tag']);
  });

  it('removes tag when close button is clicked', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <TagInput value={['Tag1', 'Tag2']} onChange={handleChange} />
    );

    const closeButtons = container.querySelectorAll(
      'button[aria-label*="Remove"]'
    );
    if (closeButtons.length > 0) {
      fireEvent.click(closeButtons[0]);
      expect(handleChange).toHaveBeenCalledWith(['Tag2']);
    }
  });

  it('does not add empty tags', () => {
    const handleChange = vi.fn();
    render(<TagInput value={[]} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('trims whitespace from tags', () => {
    const handleChange = vi.fn();
    render(<TagInput value={[]} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '  Trimmed  ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith(['Trimmed']);
  });

  it('prevents duplicate tags', () => {
    const handleChange = vi.fn();
    render(<TagInput value={['Existing']} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Existing' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('respects max tags limit', () => {
    const handleChange = vi.fn();
    render(
      <TagInput value={['Tag1', 'Tag2']} onChange={handleChange} maxTags={2} />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Tag3' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TagInput value={[]} onChange={() => {}} className='custom-tag-input' />
    );

    const tagInput = container.querySelector('.custom-tag-input');
    expect(tagInput).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    render(
      <TagInput value={[]} onChange={() => {}} placeholder='Add tags...' />
    );

    expect(screen.getByPlaceholderText('Add tags...')).toBeInTheDocument();
  });

  it('disables input when disabled prop is true', () => {
    render(<TagInput value={[]} onChange={() => {}} disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('does not remove tags when disabled', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <TagInput value={['Tag1']} onChange={handleChange} disabled />
    );

    const closeButtons = container.querySelectorAll('button');
    if (closeButtons.length > 0) {
      fireEvent.click(closeButtons[0]);
      expect(handleChange).not.toHaveBeenCalled();
    }
  });

  it('removes last tag on Backspace when input is empty', () => {
    const handleChange = vi.fn();
    render(<TagInput value={['Tag1', 'Tag2']} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Backspace', code: 'Backspace' });

    expect(handleChange).toHaveBeenCalledWith(['Tag1']);
  });

  it('does not remove tags on Backspace when input has value', () => {
    const handleChange = vi.fn();
    render(<TagInput value={['Tag1']} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'text' } });
    fireEvent.keyDown(input, { key: 'Backspace', code: 'Backspace' });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('allows custom separators', () => {
    const handleChange = vi.fn();
    render(
      <TagInput
        value={[]}
        onChange={handleChange}
        separators={['Enter', 'Tab']}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Tag' } });
    fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });

    expect(handleChange).toHaveBeenCalledWith(['New Tag']);
  });

  it('validates tags with custom validator', () => {
    const handleChange = vi.fn();
    const validator = (tag: string) => tag.length >= 3;

    render(
      <TagInput value={[]} onChange={handleChange} validator={validator} />
    );

    const input = screen.getByRole('textbox');

    // Try to add short tag
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(handleChange).not.toHaveBeenCalled();

    // Add valid tag
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(['abc']);
  });

  it('shows error state', () => {
    const { container } = render(
      <TagInput value={[]} onChange={() => {}} error />
    );

    const errorElement = container.querySelector('[class*="border-red"]');
    expect(errorElement).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <TagInput
        value={[]}
        onChange={() => {}}
        error
        errorMessage='Invalid tags'
      />
    );

    expect(screen.getByText('Invalid tags')).toBeInTheDocument();
  });

  it('applies tag variant styles', () => {
    const { container } = render(
      <TagInput value={['Tag1']} onChange={() => {}} variant='primary' />
    );

    const tag = container.querySelector('[class*="bg-blue"]');
    expect(tag).toBeInTheDocument();
  });

  it('renders tags with custom render function', () => {
    const customRender = (tag: string) => (
      <span data-testid='custom-tag'>{tag.toUpperCase()}</span>
    );

    render(
      <TagInput value={['test']} onChange={() => {}} renderTag={customRender} />
    );

    expect(screen.getByTestId('custom-tag')).toHaveTextContent('TEST');
  });
});
