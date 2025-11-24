import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Label } from '@sudobility/components';

interface EmailInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export const EmailInputField: React.FC<EmailInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = '',
}) => {
  return (
    <div className={className}>
      <Label
        htmlFor={label.toLowerCase()}
        className='text-sm font-medium text-gray-700 dark:text-gray-300'
      >
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>
      <input
        id={label.toLowerCase()}
        type='email'
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          mt-1 block w-full px-3 py-2 border rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          dark:bg-gray-800 dark:border-gray-600 dark:text-white
          ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          }
        `}
      />
      {error && (
        <p className='mt-1 text-sm text-red-600 dark:text-red-400'>{error}</p>
      )}
    </div>
  );
};

interface CollapsibleEmailFieldProps extends EmailInputFieldProps {
  isVisible: boolean;
  onToggle: () => void;
  showLabel?: string;
  hideLabel?: string;
}

export const CollapsibleEmailField: React.FC<CollapsibleEmailFieldProps> = ({
  isVisible,
  onToggle,
  showLabel,
  hideLabel,
  ...fieldProps
}) => {
  const toggleLabel = isVisible ? hideLabel : showLabel;

  return (
    <div>
      <button
        type='button'
        onClick={onToggle}
        className='flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-2'
      >
        {isVisible ? (
          <ChevronUpIcon className='h-4 w-4 mr-1' />
        ) : (
          <ChevronDownIcon className='h-4 w-4 mr-1' />
        )}
        {toggleLabel}
      </button>

      {isVisible && <EmailInputField {...fieldProps} />}
    </div>
  );
};

interface EmailInputGroupProps {
  to: string;
  onToChange: (value: string) => void;
  cc?: string;
  onCcChange?: (value: string) => void;
  bcc?: string;
  onBccChange?: (value: string) => void;
  showCc?: boolean;
  showBcc?: boolean;
  onToggleCc?: () => void;
  onToggleBcc?: () => void;
  errors?: {
    to?: string;
    cc?: string;
    bcc?: string;
  };
  className?: string;
  labels?: {
    to?: string;
    cc?: string;
    bcc?: string;
    addCc?: string;
    removeCc?: string;
    addBcc?: string;
    removeBcc?: string;
  };
  placeholders?: {
    to?: string;
    cc?: string;
    bcc?: string;
  };
}

export const EmailInputGroup: React.FC<EmailInputGroupProps> = ({
  to,
  onToChange,
  cc = '',
  onCcChange,
  bcc = '',
  onBccChange,
  showCc = false,
  showBcc = false,
  onToggleCc,
  onToggleBcc,
  errors = {},
  className = '',
  labels = {},
  placeholders = {},
}) => {
  const defaultLabels = {
    to: 'To',
    cc: 'CC',
    bcc: 'BCC',
    addCc: 'Add CC',
    removeCc: 'Remove CC',
    addBcc: 'Add BCC',
    removeBcc: 'Remove BCC',
  };

  const defaultPlaceholders = {
    to: 'recipient@example.com',
    cc: 'cc@example.com',
    bcc: 'bcc@example.com',
  };

  const finalLabels = { ...defaultLabels, ...labels };
  const finalPlaceholders = { ...defaultPlaceholders, ...placeholders };
  return (
    <div className={`space-y-4 ${className}`}>
      {/* To Field - Always visible */}
      <EmailInputField
        label={finalLabels.to}
        value={to}
        onChange={onToChange}
        placeholder={finalPlaceholders.to}
        required
        error={errors.to}
      />

      {/* CC Field - Collapsible */}
      {onToggleCc && onCcChange && (
        <CollapsibleEmailField
          label={finalLabels.cc}
          value={cc}
          onChange={onCcChange}
          placeholder={finalPlaceholders.cc}
          error={errors.cc}
          isVisible={showCc}
          onToggle={onToggleCc}
          showLabel={finalLabels.addCc}
          hideLabel={finalLabels.removeCc}
        />
      )}

      {/* BCC Field - Collapsible */}
      {onToggleBcc && onBccChange && (
        <CollapsibleEmailField
          label={finalLabels.bcc}
          value={bcc}
          onChange={onBccChange}
          placeholder={finalPlaceholders.bcc}
          error={errors.bcc}
          isVisible={showBcc}
          onToggle={onToggleBcc}
          showLabel={finalLabels.addBcc}
          hideLabel={finalLabels.removeBcc}
        />
      )}
    </div>
  );
};

export default EmailInputGroup;
