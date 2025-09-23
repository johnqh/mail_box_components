import React from 'react';
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

interface FormFieldGroupProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  children: React.ReactNode;
  layout?: 'vertical' | 'horizontal';
  className?: string;
  labelClassName?: string;
  contentClassName?: string;
}

export const FormFieldGroup: React.FC<FormFieldGroupProps> = ({
  label,
  required = false,
  error,
  helpText,
  children,
  layout = 'vertical',
  className = '',
  labelClassName = '',
  contentClassName = '',
}) => {
  const isHorizontal = layout === 'horizontal';

  return (
    <div
      className={`${isHorizontal ? 'grid grid-cols-1 md:grid-cols-3 gap-4 items-start' : 'space-y-2'} ${className}`}
    >
      {/* Label */}
      <div className={isHorizontal ? 'md:col-span-1' : ''}>
        <label
          className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClassName}`}
        >
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
        {helpText && !error && (
          <div className='mt-1 flex items-start'>
            <InformationCircleIcon className='h-4 w-4 text-gray-400 mr-1 mt-0.5 flex-shrink-0' />
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {helpText}
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`${isHorizontal ? 'md:col-span-2' : ''} ${contentClassName}`}
      >
        <div className={error ? 'relative' : ''}>{children}</div>

        {/* Error Message */}
        {error && (
          <div className='mt-1 flex items-start'>
            <ExclamationCircleIcon className='h-4 w-4 text-red-500 mr-1 mt-0.5 flex-shrink-0' />
            <p className='text-xs text-red-600 dark:text-red-400'>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Specialized form field components
interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  type = 'text',
  layout = 'vertical',
  className = '',
}) => {
  return (
    <FormFieldGroup
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      layout={layout}
      className={className}
    >
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          dark:bg-gray-800 dark:border-gray-600 dark:text-white
          transition-colors duration-200
          ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          }
        `}
      />
    </FormFieldGroup>
  );
};

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  rows?: number;
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  rows = 4,
  layout = 'vertical',
  className = '',
}) => {
  return (
    <FormFieldGroup
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      layout={layout}
      className={className}
    >
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          dark:bg-gray-800 dark:border-gray-600 dark:text-white
          transition-colors duration-200 resize-vertical
          ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          }
        `}
      />
    </FormFieldGroup>
  );
};

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  required?: boolean;
  error?: string;
  helpText?: string;
  placeholder?: string;
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  helpText,
  placeholder = 'Select an option',
  layout = 'vertical',
  className = '',
}) => {
  return (
    <FormFieldGroup
      label={label}
      required={required}
      error={error}
      helpText={helpText}
      layout={layout}
      className={className}
    >
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          dark:bg-gray-800 dark:border-gray-600 dark:text-white
          transition-colors duration-200
          ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          }
        `}
      >
        {placeholder && (
          <option value='' disabled>
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </FormFieldGroup>
  );
};

export default FormFieldGroup;
