import React, { useRef, KeyboardEvent } from 'react';
import { cn } from '../lib/utils';

export interface RadioOption {
  /** Option value */
  value: string;
  /** Option label */
  label: string;
  /** Option description */
  description?: string;
  /** Disabled state for this option */
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Group name (for radio buttons) */
  name?: string;
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Array of options */
  options: RadioOption[];
  /** Group label */
  label?: string;
  /** Layout orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Disabled state for entire group */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Required field */
  required?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom option renderer */
  renderOption?: (option: RadioOption) => React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * RadioGroup Component
 *
 * Group of radio buttons with consistent styling and layout.
 * Supports vertical and horizontal orientations with descriptions.
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   name="plan"
 *   value={selectedPlan}
 *   onChange={setSelectedPlan}
 *   options={[
 *     { value: 'free', label: 'Free Plan', description: 'Basic features' },
 *     { value: 'pro', label: 'Pro Plan', description: 'Advanced features' },
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   name="theme"
 *   value={theme}
 *   onChange={setTheme}
 *   options={[
 *     { value: 'light', label: 'Light' },
 *     { value: 'dark', label: 'Dark' },
 *     { value: 'auto', label: 'Auto' },
 *   ]}
 *   orientation="horizontal"
 * />
 * ```
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name = 'radio-group',
  value,
  onChange,
  options,
  label,
  orientation = 'vertical',
  disabled = false,
  error = false,
  errorMessage,
  required = false,
  size = 'md',
  renderOption,
  className,
}) => {
  const groupRef = useRef<HTMLDivElement>(null);

  // Size configurations
  const sizeClasses = {
    sm: {
      radio: 'w-4 h-4',
      label: 'text-sm',
      description: 'text-xs',
    },
    md: {
      radio: 'w-5 h-5',
      label: 'text-base',
      description: 'text-sm',
    },
    lg: {
      radio: 'w-6 h-6',
      label: 'text-lg',
      description: 'text-base',
    },
  };

  const sizeConfig = sizeClasses[size];

  const handleChange = (optionValue: string, isDisabled: boolean) => {
    if (!disabled && !isDisabled) {
      onChange(optionValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const enabledOptions = options.filter(opt => !opt.disabled && !disabled);
    const currentEnabledIndex = enabledOptions.findIndex(
      opt => opt.value === options[index].value
    );

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentEnabledIndex + 1) % enabledOptions.length;
      onChange(enabledOptions[nextIndex].value);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex =
        (currentEnabledIndex - 1 + enabledOptions.length) %
        enabledOptions.length;
      onChange(enabledOptions[prevIndex].value);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className='mb-2'>
          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            {label}
            {required && <span className='text-red-600 ml-1'>*</span>}
          </span>
        </div>
      )}
      <div
        ref={groupRef}
        className={cn(
          orientation === 'horizontal'
            ? 'flex flex-row gap-4'
            : 'flex flex-col space-y-2'
        )}
        role='radiogroup'
      >
        {options.map((option, index) => {
          const isDisabled = disabled || option.disabled;
          const isChecked = value === option.value;

          return (
            <label
              key={option.value}
              className={cn(
                'flex items-start cursor-pointer',
                isDisabled && 'opacity-50 cursor-not-allowed',
                error && 'border-red-600 dark:border-red-500'
              )}
            >
              <input
                type='radio'
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={() => handleChange(option.value, !!option.disabled)}
                onKeyDown={e => handleKeyDown(e, index)}
                disabled={isDisabled}
                className={cn(
                  'mt-0.5 mr-2',
                  sizeConfig.radio,
                  'text-blue-600 bg-white dark:bg-gray-900',
                  'border-gray-300 dark:border-gray-600',
                  'focus:ring-blue-500 focus:ring-2',
                  'transition-colors',
                  error && 'border-red-600 dark:border-red-500',
                  isDisabled && 'cursor-not-allowed'
                )}
              />
              <div className='flex-1 min-w-0'>
                {renderOption ? (
                  renderOption(option)
                ) : (
                  <>
                    <span
                      className={cn(
                        'font-medium text-gray-700 dark:text-gray-300',
                        sizeConfig.label
                      )}
                    >
                      {option.label}
                    </span>
                    {option.description && (
                      <p
                        className={cn(
                          'text-gray-500 dark:text-gray-400 mt-0.5',
                          sizeConfig.description
                        )}
                      >
                        {option.description}
                      </p>
                    )}
                  </>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {errorMessage && (
        <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;
