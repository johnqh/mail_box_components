import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { cn } from '../lib/utils';

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Change handler */
  onChange: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'primary' | 'success' | 'warning' | 'error';
  /** Additional className for the container */
  className?: string;
  /** ID for the input element */
  id?: string;
  /** Name for the input element */
  name?: string;
}

/**
 * Checkbox Component
 *
 * Custom styled checkbox with proper accessibility and visual feedback.
 * Replaces native checkbox with consistent design system styling.
 *
 * @example
 * ```tsx
 * <Checkbox
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 *   label="Enable notifications"
 * />
 * ```
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  variant = 'primary',
  className,
  id,
  name,
}) => {
  const sizeClasses = {
    sm: {
      box: 'w-4 h-4',
      check: 'w-3 h-3',
      text: 'text-sm',
    },
    md: {
      box: 'w-5 h-5',
      check: 'w-4 h-4',
      text: 'text-base',
    },
    lg: {
      box: 'w-6 h-6',
      check: 'w-5 h-5',
      text: 'text-lg',
    },
  };

  const variantClasses = {
    primary: checked
      ? 'bg-blue-600 border-blue-600'
      : 'border-gray-300 dark:border-gray-600',
    success: checked
      ? 'bg-green-600 border-green-600'
      : 'border-gray-300 dark:border-gray-600',
    warning: checked
      ? 'bg-yellow-600 border-yellow-600'
      : 'border-gray-300 dark:border-gray-600',
    error: checked
      ? 'bg-red-600 border-red-600'
      : 'border-gray-300 dark:border-gray-600',
  };

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      onChange(!checked);
    }
  };

  const config = sizeClasses[size];

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
        id={id}
        name={name}
        className="sr-only"
      />
      <div
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'rounded border-2 flex items-center justify-center transition-colors',
          config.box,
          variantClasses[variant],
          !disabled && 'hover:border-opacity-75'
        )}
      >
        {checked && <CheckIcon className={cn('text-white', config.check)} />}
      </div>
      {label && (
        <span className={cn('text-gray-900 dark:text-white', config.text)}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
