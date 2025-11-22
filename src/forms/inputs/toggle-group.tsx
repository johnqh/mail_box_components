import React from 'react';
import { cn } from '../../lib/utils';

export interface ToggleGroupOption {
  /** Option value */
  value: string;
  /** Option label */
  label: React.ReactNode;
  /** Option icon */
  icon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export interface ToggleGroupProps {
  /** Available options */
  options: ToggleGroupOption[];
  /** Selected value (single select) */
  value?: string;
  /** Selected values (multi select) */
  values?: string[];
  /** Change handler (single select) */
  onChange?: (value: string) => void;
  /** Change handler (multi select) */
  onValuesChange?: (values: string[]) => void;
  /** Allow multiple selections */
  multiple?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Variant style */
  variant?: 'default' | 'outline';
  /** Additional className */
  className?: string;
}

/**
 * ToggleGroup Component
 *
 * Group of toggle buttons for single or multiple selections.
 * Similar to iOS segmented control.
 *
 * @example
 * ```tsx
 * <ToggleGroup
 *   options={[
 *     { value: 'grid', label: 'Grid', icon: <GridIcon /> },
 *     { value: 'list', label: 'List', icon: <ListIcon /> }
 *   ]}
 *   value={viewMode}
 *   onChange={setViewMode}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ToggleGroup
 *   options={filters}
 *   values={selectedFilters}
 *   onValuesChange={setSelectedFilters}
 *   multiple
 *   size="sm"
 * />
 * ```
 */
export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options,
  value,
  values = [],
  onChange,
  onValuesChange,
  multiple = false,
  size = 'md',
  variant = 'default',
  className,
}) => {
  const handleClick = (optionValue: string, disabled?: boolean) => {
    if (disabled) return;

    if (multiple) {
      const newValues = values.includes(optionValue)
        ? values.filter(v => v !== optionValue)
        : [...values, optionValue];
      onValuesChange?.(newValues);
    } else {
      onChange?.(optionValue);
    }
  };

  const isSelected = (optionValue: string) => {
    return multiple ? values.includes(optionValue) : value === optionValue;
  };

  // Size configurations
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2',
  };

  // Variant configurations
  const variantClasses = {
    default: {
      base: 'bg-gray-100 dark:bg-gray-800',
      button: 'hover:bg-gray-200 dark:hover:bg-gray-700',
      selected: 'bg-white dark:bg-gray-900 shadow-sm',
    },
    outline: {
      base: 'border border-gray-200 dark:border-gray-700',
      button: 'hover:bg-gray-50 dark:hover:bg-gray-800',
      selected:
        'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600',
    },
  };

  return (
    <div
      className={cn(
        'inline-flex rounded-lg p-1 gap-1',
        variantClasses[variant].base,
        className
      )}
      role='group'
    >
      {options.map(option => {
        const selected = isSelected(option.value);

        return (
          <button
            key={option.value}
            onClick={() => handleClick(option.value, option.disabled)}
            disabled={option.disabled}
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'rounded-md font-medium',
              'transition-all duration-150',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              sizeClasses[size],
              selected
                ? variantClasses[variant].selected
                : variantClasses[variant].button,
              selected
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400'
            )}
            aria-pressed={selected}
          >
            {option.icon && (
              <span className='flex-shrink-0 w-4 h-4'>{option.icon}</span>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default ToggleGroup;
