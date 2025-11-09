import React, { useState, useCallback } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

export interface SearchInputProps {
  /** Current search query */
  value?: string;
  /** Callback when query changes */
  onChange?: (query: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Auto-focus on mount */
  autoFocus?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show search icon */
  showIcon?: boolean;
  /** Show clear button when has value */
  showClear?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Additional className */
  className?: string;
  /** Additional input props */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * SearchInput Component
 *
 * Search input field with icon, clear button, and loading state.
 * Controlled or uncontrolled component with debouncing support.
 *
 * @example
 * ```tsx
 * <SearchInput
 *   placeholder="Search emails..."
 *   onChange={query => setSearchQuery(query)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <SearchInput
 *   value={query}
 *   onChange={setQuery}
 *   loading={isSearching}
 *   size="lg"
 * />
 * ```
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value: controlledValue,
  onChange,
  placeholder = 'Search...',
  autoFocus = false,
  disabled = false,
  size = 'md',
  showIcon = true,
  showClear = true,
  loading = false,
  className,
  inputProps,
}) => {
  const [internalValue, setInternalValue] = useState('');

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isControlled = controlledValue !== undefined;

  // Size configurations
  const sizeClasses = {
    sm: {
      input: 'py-1.5 text-sm',
      icon: 'h-4 w-4',
      padding: showIcon ? 'pl-8 pr-8' : 'px-3',
      iconLeft: 'left-0 pl-2.5',
      iconRight: 'right-0 pr-2.5',
    },
    md: {
      input: 'py-2 text-base',
      icon: 'h-5 w-5',
      padding: showIcon ? 'pl-10 pr-10' : 'px-3',
      iconLeft: 'left-0 pl-3',
      iconRight: 'right-0 pr-3',
    },
    lg: {
      input: 'py-3 text-lg',
      icon: 'h-6 w-6',
      padding: showIcon ? 'pl-12 pr-12' : 'px-4',
      iconLeft: 'left-0 pl-3.5',
      iconRight: 'right-0 pr-3.5',
    },
  };

  const sizeConfig = sizeClasses[size];

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    },
    [onChange, isControlled]
  );

  const handleClear = useCallback(() => {
    if (!isControlled) {
      setInternalValue('');
    }
    onChange?.('');
  }, [onChange, isControlled]);

  return (
    <div className={cn('relative w-full', className)}>
      {/* Search Icon */}
      {showIcon && (
        <div
          className={cn(
            'absolute inset-y-0 flex items-center pointer-events-none',
            sizeConfig.iconLeft
          )}
        >
          <MagnifyingGlassIcon
            className={cn(
              sizeConfig.icon,
              'text-gray-400 dark:text-gray-500'
            )}
          />
        </div>
      )}

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled || loading}
        className={cn(
          'block w-full rounded-lg border',
          'bg-white dark:bg-gray-800',
          'text-gray-900 dark:text-gray-100',
          'placeholder-gray-400 dark:placeholder-gray-500',
          'border-gray-300 dark:border-gray-600',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'transition-colors duration-200',
          sizeConfig.input,
          sizeConfig.padding,
          disabled && 'opacity-50 cursor-not-allowed',
          loading && 'opacity-60'
        )}
        {...inputProps}
      />

      {/* Clear Button or Loading Spinner */}
      {(showClear && value && !loading) && (
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className={cn(
            'absolute inset-y-0 flex items-center',
            'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
            'transition-colors',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            sizeConfig.iconRight
          )}
          aria-label="Clear search"
        >
          <XMarkIcon className={sizeConfig.icon} />
        </button>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div
          className={cn(
            'absolute inset-y-0 flex items-center',
            sizeConfig.iconRight
          )}
        >
          <svg
            className={cn(
              sizeConfig.icon,
              'animate-spin text-gray-400'
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
