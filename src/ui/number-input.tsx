import React from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

export interface NumberInputProps {
  /** Current value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Show stepper buttons */
  showSteppers?: boolean;
  /** Stepper button position */
  stepperPosition?: 'right' | 'sides';
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
  /** Additional input props */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * NumberInput Component
 *
 * Number input field with optional stepper buttons for increment/decrement.
 * Supports min/max bounds, step values, and different layouts.
 *
 * @example
 * ```tsx
 * <NumberInput
 *   value={quantity}
 *   onChange={setQuantity}
 *   min={1}
 *   max={100}
 *   showSteppers
 * />
 * ```
 *
 * @example
 * ```tsx
 * <NumberInput
 *   value={price}
 *   onChange={setPrice}
 *   step={0.01}
 *   min={0}
 *   showSteppers
 *   stepperPosition="sides"
 * />
 * ```
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  showSteppers = false,
  stepperPosition = 'right',
  placeholder,
  size = 'md',
  className,
  inputProps,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      input: 'py-1.5 px-3 text-sm',
      button: 'w-6 h-6',
      icon: 'h-3 w-3',
    },
    md: {
      input: 'py-2 px-3 text-base',
      button: 'w-8 h-8',
      icon: 'h-4 w-4',
    },
    lg: {
      input: 'py-3 px-4 text-lg',
      button: 'w-10 h-10',
      icon: 'h-5 w-5',
    },
  };

  const sizeConfig = sizeClasses[size];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      const clampedValue = clampValue(newValue);
      onChange(clampedValue);
    } else if (e.target.value === '') {
      onChange(min ?? 0);
    }
  };

  const clampValue = (val: number): number => {
    let clamped = val;
    if (min !== undefined && clamped < min) clamped = min;
    if (max !== undefined && clamped > max) clamped = max;
    return clamped;
  };

  const increment = () => {
    const newValue = clampValue(value + step);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = clampValue(value - step);
    onChange(newValue);
  };

  const canIncrement = max === undefined || value < max;
  const canDecrement = min === undefined || value > min;

  const StepperButton = ({
    onClick,
    icon,
    disabled: buttonDisabled,
    ariaLabel,
  }: {
    onClick: () => void;
    icon: React.ReactNode;
    disabled: boolean;
    ariaLabel: string;
  }) => (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled || buttonDisabled}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center justify-center',
        'border border-gray-300 dark:border-gray-600',
        'bg-white dark:bg-gray-800',
        'text-gray-700 dark:text-gray-300',
        'hover:bg-gray-50 dark:hover:bg-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        'transition-colors',
        sizeConfig.button,
        (disabled || buttonDisabled) && 'opacity-50 cursor-not-allowed'
      )}
    >
      {icon}
    </button>
  );

  // Sides layout: - [input] +
  if (showSteppers && stepperPosition === 'sides') {
    return (
      <div className={cn('inline-flex items-stretch', className)}>
        <StepperButton
          onClick={decrement}
          disabled={!canDecrement}
          icon={<MinusIcon className={sizeConfig.icon} />}
          ariaLabel='Decrement'
        />
        <input
          type='number'
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'border-x-0 text-center',
            'border-gray-300 dark:border-gray-600',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10',
            'transition-colors',
            sizeConfig.input,
            disabled && 'opacity-50 cursor-not-allowed',
            // Hide number input spinners
            '[appearance:textfield]',
            '[&::-webkit-outer-spin-button]:appearance-none',
            '[&::-webkit-inner-spin-button]:appearance-none'
          )}
          {...inputProps}
        />
        <StepperButton
          onClick={increment}
          disabled={!canIncrement}
          icon={<PlusIcon className={sizeConfig.icon} />}
          ariaLabel='Increment'
        />
      </div>
    );
  }

  // Right layout: [input] [+/-]
  if (showSteppers && stepperPosition === 'right') {
    return (
      <div className={cn('inline-flex items-stretch gap-2', className)}>
        <input
          type='number'
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'rounded-lg border',
            'border-gray-300 dark:border-gray-600',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100',
            'placeholder-gray-400 dark:placeholder-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-colors',
            sizeConfig.input,
            disabled && 'opacity-50 cursor-not-allowed',
            // Hide number input spinners
            '[appearance:textfield]',
            '[&::-webkit-outer-spin-button]:appearance-none',
            '[&::-webkit-inner-spin-button]:appearance-none'
          )}
          {...inputProps}
        />
        <div className='inline-flex flex-col gap-0.5'>
          <button
            type='button'
            onClick={increment}
            disabled={disabled || !canIncrement}
            aria-label='Increment'
            className={cn(
              'inline-flex items-center justify-center',
              'rounded border border-gray-300 dark:border-gray-600',
              'bg-white dark:bg-gray-800',
              'text-gray-700 dark:text-gray-300',
              'hover:bg-gray-50 dark:hover:bg-gray-700',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              'transition-colors',
              'flex-1',
              sizeConfig.button.replace(/h-\d+/, 'h-auto'),
              (disabled || !canIncrement) && 'opacity-50 cursor-not-allowed'
            )}
          >
            <PlusIcon className={cn(sizeConfig.icon, 'w-3 h-3')} />
          </button>
          <button
            type='button'
            onClick={decrement}
            disabled={disabled || !canDecrement}
            aria-label='Decrement'
            className={cn(
              'inline-flex items-center justify-center',
              'rounded border border-gray-300 dark:border-gray-600',
              'bg-white dark:bg-gray-800',
              'text-gray-700 dark:text-gray-300',
              'hover:bg-gray-50 dark:hover:bg-gray-700',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              'transition-colors',
              'flex-1',
              sizeConfig.button.replace(/h-\d+/, 'h-auto'),
              (disabled || !canDecrement) && 'opacity-50 cursor-not-allowed'
            )}
          >
            <MinusIcon className={cn(sizeConfig.icon, 'w-3 h-3')} />
          </button>
        </div>
      </div>
    );
  }

  // No steppers: just the input
  return (
    <input
      type='number'
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      placeholder={placeholder}
      className={cn(
        'rounded-lg border',
        'border-gray-300 dark:border-gray-600',
        'bg-white dark:bg-gray-800',
        'text-gray-900 dark:text-gray-100',
        'placeholder-gray-400 dark:placeholder-gray-500',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'transition-colors',
        sizeConfig.input,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...inputProps}
    />
  );
};

export default NumberInput;
