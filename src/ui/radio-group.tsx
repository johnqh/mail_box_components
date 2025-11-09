import React from 'react';
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
  /** Group name (required for radio buttons) */
  name: string;
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Array of options */
  options: RadioOption[];
  /** Layout orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Disabled state for entire group */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
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
  name,
  value,
  onChange,
  options,
  orientation = 'vertical',
  disabled = false,
  size = 'md',
  className,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      radio: 'w-3.5 h-3.5',
      label: 'text-sm',
      description: 'text-xs',
      gap: 'space-x-2',
    },
    md: {
      radio: 'w-4 h-4',
      label: 'text-base',
      description: 'text-sm',
      gap: 'space-x-3',
    },
    lg: {
      radio: 'w-5 h-5',
      label: 'text-lg',
      description: 'text-base',
      gap: 'space-x-4',
    },
  };

  const sizeConfig = sizeClasses[size];

  const handleChange = (optionValue: string) => {
    if (!disabled) {
      onChange(optionValue);
    }
  };

  return (
    <div
      className={cn(
        'space-y-2',
        orientation === 'horizontal' && 'flex flex-wrap gap-4',
        className
      )}
      role='radiogroup'
    >
      {options.map(option => {
        const isDisabled = disabled || option.disabled;
        const isChecked = value === option.value;

        return (
          <label
            key={option.value}
            className={cn(
              'flex items-start cursor-pointer',
              sizeConfig.gap,
              isDisabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input
              type='radio'
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              disabled={isDisabled}
              className={cn(
                'mt-0.5',
                sizeConfig.radio,
                'text-blue-600 bg-white dark:bg-gray-900',
                'border-gray-300 dark:border-gray-600',
                'focus:ring-blue-500 focus:ring-2',
                'transition-colors',
                isDisabled && 'cursor-not-allowed'
              )}
            />
            <div className='flex-1 min-w-0'>
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
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default RadioGroup;
