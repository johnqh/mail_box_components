import React, { useState, useRef, KeyboardEvent } from 'react';
import { cn } from '@sudobility/components';

export interface TagInputProps {
  /** Tag values */
  value: string[];
  /** Change handler */
  onChange: (tags: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Max number of tags */
  maxTags?: number;
  /** Tag validation function */
  validate?: (tag: string) => boolean;
  /** Tag validation function (alias for validate) */
  validator?: (tag: string) => boolean;
  /** Separator characters (default: Enter, Comma) */
  separators?: string[];
  /** Allow duplicates */
  allowDuplicates?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Tag variant style */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** Custom tag renderer */
  renderTag?: (
    tag: string,
    index: number,
    remove: () => void
  ) => React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * TagInput Component
 *
 * Multi-value input that creates removable tags/chips.
 * Useful for emails, keywords, categories, etc.
 *
 * @example
 * ```tsx
 * <TagInput
 *   value={emails}
 *   onChange={setEmails}
 *   placeholder="Enter email addresses..."
 *   validate={(email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
 * />
 * ```
 */
export const TagInput: React.FC<TagInputProps> = ({
  value,
  onChange,
  placeholder = 'Type and press Enter...',
  maxTags,
  validate,
  validator,
  separators = [],
  allowDuplicates = false,
  disabled = false,
  error = false,
  errorMessage,
  variant = 'primary',
  renderTag,
  className,
}) => {
  const validationFn = validate || validator;
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    success:
      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    warning:
      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  };

  // Add tag
  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();

    if (!trimmedTag) {
      return;
    }

    // Check max tags
    if (maxTags && value.length >= maxTags) {
      return;
    }

    // Check duplicates
    if (!allowDuplicates && value.includes(trimmedTag)) {
      return;
    }

    // Validate
    if (validationFn && !validationFn(trimmedTag)) {
      return;
    }

    onChange([...value, trimmedTag]);
    setInputValue('');
  };

  // Remove tag
  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle keydown
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Enter - always works
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    }

    // Comma - works by default
    if (e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    }

    // Custom separators
    if (separators.length > 0 && separators.includes(e.key) && e.key !== ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    }

    // Backspace - remove last tag if input is empty
    if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }

    // Escape - clear input
    if (e.key === 'Escape') {
      setInputValue('');
    }
  };

  const isMaxReached = maxTags !== undefined && value.length >= maxTags;

  return (
    <div className={cn('w-full', className)}>
      {/* Tag container */}
      <div
        className={cn(
          'min-h-[42px] px-3 py-2 flex flex-wrap gap-2 items-center',
          'bg-white dark:bg-gray-900',
          'border border-gray-300 dark:border-gray-700',
          'rounded-md',
          'focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400',
          'transition-all',
          disabled &&
            'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800',
          error && 'border-red-500 dark:border-red-400'
        )}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {/* Tags */}
        {value.map((tag, index) =>
          renderTag ? (
            <React.Fragment key={index}>
              {renderTag(tag, index, () => removeTag(index))}
            </React.Fragment>
          ) : (
            <span
              key={index}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1',
                variantClasses[variant],
                'text-sm font-medium',
                'rounded-md',
                'transition-colors'
              )}
            >
              <span className='truncate max-w-[200px]'>{tag}</span>
              <button
                type='button'
                onClick={e => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                disabled={disabled}
                className={cn(
                  'flex-shrink-0 hover:text-blue-900 dark:hover:text-blue-100',
                  'transition-colors',
                  'disabled:cursor-not-allowed'
                )}
                aria-label={`Remove ${tag}`}
              >
                <svg
                  className='w-3.5 h-3.5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </span>
          )
        )}

        {/* Input */}
        <input
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={
            value.length === 0
              ? placeholder
              : isMaxReached
                ? `Max ${maxTags} tags`
                : ''
          }
          disabled={disabled}
          className={cn(
            'flex-1 min-w-[120px] outline-none bg-transparent',
            'text-sm text-gray-900 dark:text-white',
            'placeholder:text-gray-500 dark:placeholder:text-gray-400',
            'disabled:cursor-not-allowed'
          )}
        />
      </div>

      {/* Error message */}
      {errorMessage && (
        <p className='mt-1.5 text-xs text-red-600 dark:text-red-400'>
          {errorMessage}
        </p>
      )}

      {/* Helper text */}
      {maxTags && (
        <p className='mt-1.5 text-xs text-gray-600 dark:text-gray-400'>
          {value.length} / {maxTags} tags
        </p>
      )}
    </div>
  );
};
