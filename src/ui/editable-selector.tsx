import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { variants as v } from '@sudobility/design';

export interface EditableSelectorOption {
  /** Option value */
  value: string;
  /** Option label (defaults to value if not provided) */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface EditableSelectorProps {
  /** Available options for the dropdown */
  options: EditableSelectorOption[];
  /** Current value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className for the container */
  className?: string;
  /** Additional className for the input */
  inputClassName?: string;
  /** Whether to filter options based on input value */
  filterOptions?: boolean;
  /** Empty state message when no options match */
  emptyMessage?: string;
}

/**
 * EditableSelector Component
 *
 * An editable input field with a dropdown button for selecting from suggestions.
 * Unlike Combobox, this allows direct typing and accepts custom values not in the list.
 *
 * @example
 * ```tsx
 * <EditableSelector
 *   options={[
 *     { value: 'gpt-4', label: 'GPT-4' },
 *     { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
 *   ]}
 *   value={model}
 *   onChange={setModel}
 *   placeholder="Enter or select model..."
 * />
 * ```
 */
export const EditableSelector: React.FC<EditableSelectorProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Enter or select...',
  disabled = false,
  className,
  inputClassName,
  filterOptions = true,
  emptyMessage = 'No matching options',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on input value
  const filteredOptions = filterOptions
    ? options.filter(option =>
        (option.label || option.value)
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    : options;

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Reset highlighted index when filtered options change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [value, filteredOptions.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (
          filteredOptions[highlightedIndex] &&
          !filteredOptions[highlightedIndex].disabled
        ) {
          onChange(filteredOptions[highlightedIndex].value);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (optionValue: string, optionDisabled?: boolean) => {
    if (optionDisabled) return;
    onChange(optionValue);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      inputRef.current?.focus();
    }
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => options.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            v.input.default(),
            'pr-10',
            disabled && 'opacity-50 cursor-not-allowed',
            inputClassName
          )}
        />
        <button
          type="button"
          onClick={toggleDropdown}
          disabled={disabled}
          className={cn(
            'absolute right-0 top-0 h-full px-3',
            'flex items-center justify-center',
            'text-gray-500 dark:text-gray-400',
            'hover:text-gray-700 dark:hover:text-gray-200',
            'transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            isOpen && 'text-gray-700 dark:text-gray-200'
          )}
          aria-label="Toggle dropdown"
        >
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && options.length > 0 && (
        <div
          className={cn(
            'absolute z-50 w-full mt-1',
            'bg-white dark:bg-gray-900',
            'border border-gray-300 dark:border-gray-700',
            'rounded-md shadow-lg',
            'max-h-60 overflow-y-auto'
          )}
        >
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              {emptyMessage}
            </div>
          ) : (
            filteredOptions.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value, option.disabled)}
                disabled={option.disabled}
                className={cn(
                  'w-full px-3 py-2 text-sm text-left',
                  'transition-colors',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  option.value === value
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : index === highlightedIndex
                      ? 'bg-gray-100 dark:bg-gray-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800',
                  'text-gray-900 dark:text-gray-100'
                )}
              >
                {option.label || option.value}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
