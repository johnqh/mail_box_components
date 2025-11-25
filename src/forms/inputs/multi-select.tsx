import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface MultiSelectOption {
  /** Option value */
  value: string;
  /** Option label */
  label: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface MultiSelectProps {
  /** Available options */
  options: MultiSelectOption[];
  /** Selected values */
  value: string[];
  /** Change handler */
  onChange: (values: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Enable search */
  searchable?: boolean;
  /** Max selected items to show */
  maxDisplay?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * MultiSelect Component
 *
 * Multi-select dropdown with search and tags.
 * Shows selected items as removable tags.
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   options={categories}
 *   value={selectedCategories}
 *   onChange={setSelectedCategories}
 *   placeholder="Select categories"
 *   searchable
 * />
 * ```
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   options={tags}
 *   value={selected}
 *   onChange={handleChange}
 *   maxDisplay={3}
 * />
 * ```
 */
export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select items...',
  searchPlaceholder = 'Search...',
  searchable = true,
  maxDisplay = 3,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter options based on search
  const filteredOptions = searchable
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Get selected option labels
  const selectedOptions = options.filter(opt => value.includes(opt.value));

  // Handle option toggle
  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  // Remove selected item
  const removeItem = (optionValue: string) => {
    onChange(value.filter(v => v !== optionValue));
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayedCount = selectedOptions.length;
  const hiddenCount =
    displayedCount > maxDisplay ? displayedCount - maxDisplay : 0;

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Trigger */}
      <button
        type='button'
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full min-h-[42px] px-3 py-2 text-sm text-left',
          'bg-white dark:bg-gray-900',
          'border border-gray-300 dark:border-gray-700',
          'rounded-md',
          'hover:bg-gray-50 dark:hover:bg-gray-800',
          'transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          isOpen && 'ring-2 ring-blue-500 dark:ring-blue-400'
        )}
      >
        <div className='flex flex-wrap gap-1.5'>
          {selectedOptions.length === 0 ? (
            <span className='text-gray-500 dark:text-gray-400'>
              {placeholder}
            </span>
          ) : (
            <>
              {selectedOptions.slice(0, maxDisplay).map(opt => (
                <span
                  key={opt.value}
                  className='inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium'
                >
                  {opt.label}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      removeItem(opt.value);
                    }}
                    className='hover:text-blue-900 dark:hover:text-blue-100'
                  >
                    <svg
                      className='w-3 h-3'
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
              ))}
              {hiddenCount > 0 && (
                <span className='inline-flex items-center px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium'>
                  +{hiddenCount} more
                </span>
              )}
            </>
          )}
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className='absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg'>
          {/* Search */}
          {searchable && (
            <div className='p-2 border-b border-gray-200 dark:border-gray-700'>
              <input
                type='text'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className='w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
                onClick={e => e.stopPropagation()}
              />
            </div>
          )}

          {/* Options */}
          <div className='max-h-60 overflow-y-auto py-1'>
            {filteredOptions.length === 0 ? (
              <div className='px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center'>
                No options found
              </div>
            ) : (
              filteredOptions.map(option => {
                const isSelected = value.includes(option.value);

                return (
                  <button
                    key={option.value}
                    onClick={() =>
                      !option.disabled && toggleOption(option.value)
                    }
                    disabled={option.disabled}
                    className={cn(
                      'w-full px-3 py-2 text-sm text-left flex items-center gap-2',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'transition-colors',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                  >
                    {/* Checkbox */}
                    <div
                      className={cn(
                        'w-4 h-4 border-2 rounded flex items-center justify-center',
                        isSelected
                          ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500'
                          : 'border-gray-300 dark:border-gray-600'
                      )}
                    >
                      {isSelected && (
                        <svg
                          className='w-3 h-3 text-white'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={3}
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                      )}
                    </div>

                    {/* Label */}
                    <span className='flex-1 text-gray-900 dark:text-white'>
                      {option.label}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          {value.length > 0 && (
            <div className='p-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center'>
              <span className='text-xs text-gray-600 dark:text-gray-400'>
                {value.length} selected
              </span>
              <button
                onClick={e => {
                  e.stopPropagation();
                  onChange([]);
                }}
                className='text-xs text-blue-600 dark:text-blue-400 hover:underline'
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
