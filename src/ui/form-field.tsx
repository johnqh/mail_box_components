import React from 'react';
import { Label } from './label';
import { Input } from './input';
import { textVariants } from '@sudobility/design';
import { cn } from '../lib/utils';

export interface FormFieldProps {
  /** Unique identifier for the input element */
  id: string;
  /** Label text displayed above the input */
  label: string;
  /** Input field type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /** Current value of the input */
  value: string;
  /** Change handler for the input */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error message (replaces helper text when present) */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Maximum length of input */
  maxLength?: number;
  /** Auto-focus on mount */
  autoFocus?: boolean;
  /** Custom class name for the container */
  className?: string;
  /** Custom class name for the input */
  inputClassName?: string;
}

/**
 * FormField Component
 *
 * Reusable form field component with label, input, and helper/error text.
 * Provides consistent styling and structure for form inputs across the application.
 *
 * @example
 * ```tsx
 * <FormField
 *   id="email"
 *   label="Email Address"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   helperText="We'll never share your email"
 *   required
 * />
 * ```
 */
export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  helperText,
  error,
  required = false,
  disabled = false,
  maxLength,
  autoFocus = false,
  className,
  inputClassName,
}) => {
  const hasError = !!error;
  const helperId = helperText || error ? `${id}-helper` : undefined;

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </Label>
      <Input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        autoFocus={autoFocus}
        required={required}
        aria-invalid={hasError}
        aria-describedby={helperId}
        className={inputClassName}
      />
      {(helperText || error) && (
        <p
          id={helperId}
          className={cn(
            textVariants.body.sm(),
            hasError
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-500 dark:text-gray-400'
          )}
          role={hasError ? 'alert' : undefined}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default FormField;
