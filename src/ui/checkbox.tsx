import React, { useState } from 'react';
import { CheckIcon, MinusIcon } from '@heroicons/react/24/solid';
import { cn } from '../lib/utils';
import { colors, textVariants } from '@sudobility/design';

/** Tracking event data for checkbox interactions */
export interface CheckboxTrackingData {
  /** Action performed */
  action: 'toggle';
  /** Optional custom label for tracking */
  trackingLabel?: string;
  /** Optional component context */
  componentName?: string;
}

export interface CheckboxProps {
  /** Whether the checkbox is checked (controlled mode) */
  checked?: boolean;
  /** Default checked state (uncontrolled mode) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Description text below label */
  description?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'primary' | 'success' | 'warning' | 'error';
  /** Color variant (alias for variant) */
  color?: 'blue' | 'green' | 'yellow' | 'red';
  /** Additional className for the container */
  className?: string;
  /** ID for the input element */
  id?: string;
  /** Name for the input element */
  name?: string;
  /** Value for the input element */
  value?: string;
  /** Whether the checkbox is required */
  required?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Custom icon to display when checked */
  icon?: React.ReactNode;
  /** Optional callback for tracking checkbox toggle */
  onTrack?: (data: CheckboxTrackingData) => void;
  /** Custom label for tracking */
  trackingLabel?: string;
  /** Component name for tracking context */
  componentName?: string;
}

/**
 * Checkbox Component
 *
 * Custom styled checkbox with proper accessibility and visual feedback.
 * Supports both controlled and uncontrolled modes.
 *
 * @example
 * ```tsx
 * // Controlled
 * <Checkbox
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 *   label="Enable notifications"
 * />
 *
 * // Uncontrolled
 * <Checkbox
 *   defaultChecked={true}
 *   label="Remember me"
 * />
 * ```
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  variant = 'primary',
  color,
  className,
  id,
  name,
  value,
  required = false,
  indeterminate = false,
  error = false,
  errorMessage,
  icon,
  onTrack,
  trackingLabel,
  componentName,
}) => {
  // Support both controlled and uncontrolled modes
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolledChecked;

  const sizeClasses = {
    sm: {
      box: 'w-4 h-4',
      check: 'w-3 h-3',
      text: 'text-sm',
      desc: 'text-xs',
    },
    md: {
      box: 'w-5 h-5',
      check: 'w-4 h-4',
      text: 'text-base',
      desc: 'text-sm',
    },
    lg: {
      box: 'w-6 h-6',
      check: 'w-5 h-5',
      text: 'text-lg',
      desc: 'text-base',
    },
  };

  // Map color prop to variant
  const colorMap: Record<string, string> = {
    blue: 'primary',
    green: 'success',
    yellow: 'warning',
    red: 'error',
  };

  const effectiveVariant = color
    ? (colorMap[color] as typeof variant)
    : variant;

  // Unchecked border colors from design system input defaults
  const uncheckedBorder = `${colors.component.input.default.base} ${colors.component.input.default.dark}`;

  // Checked state colors from design system button colors
  const checkedColors = {
    primary: `${colors.component.button.primary.base} ${colors.component.button.primary.dark} border-blue-600`,
    success: `${colors.component.button.success.base} ${colors.component.button.success.dark} border-green-600`,
    warning: 'bg-yellow-600 border-yellow-600',
    error: `${colors.component.button.destructive.base} ${colors.component.button.destructive.dark} border-red-600`,
  };

  const getVariantClasses = () => {
    if (error) {
      return checked
        ? `${checkedColors.error}`
        : 'border-red-600 dark:border-red-500';
    }

    return checked ? checkedColors[effectiveVariant] : uncheckedBorder;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newChecked = e.target.checked;

    if (!isControlled) {
      setUncontrolledChecked(newChecked);
    }

    // Call tracking callback if provided
    if (onTrack) {
      onTrack({
        action: 'toggle',
        trackingLabel,
        componentName,
      });
    }

    onChange?.(newChecked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      const newChecked = !checked;

      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }

      // Call tracking callback if provided
      if (onTrack) {
        onTrack({
          action: 'toggle',
          trackingLabel,
          componentName,
        });
      }

      onChange?.(newChecked);
    }
  };

  const config = sizeClasses[size];

  return (
    <div className={cn('inline-flex flex-col', className)}>
      <label
        className={cn(
          'inline-flex items-start gap-2 cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div className='relative flex items-center'>
          <input
            type='checkbox'
            checked={checked}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            id={id}
            name={name}
            value={value}
            required={required}
            className='sr-only peer'
          />
          <div
            data-indeterminate={indeterminate ? 'true' : undefined}
            className={cn(
              'rounded border-2 flex items-center justify-center transition-colors',
              config.box,
              getVariantClasses(),
              !disabled && 'hover:border-opacity-75'
            )}
          >
            {indeterminate ? (
              <MinusIcon className={cn('text-white', config.check)} />
            ) : checked ? (
              icon ? (
                icon
              ) : (
                <CheckIcon className={cn('text-white', config.check)} />
              )
            ) : null}
          </div>
        </div>
        {(label || description) && (
          <div className='flex flex-col'>
            {label && (
              <span className={cn(textVariants.label.default(), config.text)}>
                {label}
              </span>
            )}
            {description && (
              <span className={cn(textVariants.body.sm(), config.desc)}>
                {description}
              </span>
            )}
          </div>
        )}
      </label>
      {errorMessage && (
        <span className={cn('mt-1', textVariants.label.error())}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};
