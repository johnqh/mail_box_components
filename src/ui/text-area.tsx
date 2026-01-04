import React from 'react';
import { cn } from '../lib/utils';

/** Tracking event data for textarea interactions */
export interface TextAreaTrackingData {
  /** Action performed */
  action: 'focus' | 'blur' | 'change';
  /** Optional custom label for tracking */
  trackingLabel?: string;
  /** Optional component context */
  componentName?: string;
}

export interface TextAreaProps {
  /** Current value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Number of visible rows */
  rows?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Show character count */
  showCount?: boolean;
  /** Maximum character count */
  maxLength?: number;
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
  /** Additional textarea props */
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  /** Optional callback for tracking textarea interactions */
  onTrack?: (data: TextAreaTrackingData) => void;
  /** Custom label for tracking */
  trackingLabel?: string;
  /** Component name for tracking context */
  componentName?: string;
}

/**
 * TextArea Component
 *
 * Multi-line text input with character counting, resize options,
 * and consistent styling across the application.
 *
 * @example
 * ```tsx
 * <TextArea
 *   value={message}
 *   onChange={setMessage}
 *   placeholder="Write your message..."
 *   rows={5}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <TextArea
 *   value={bio}
 *   onChange={setBio}
 *   showCount
 *   maxLength={500}
 *   placeholder="Tell us about yourself..."
 * />
 * ```
 */
export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  readOnly = false,
  showCount = false,
  maxLength,
  resize = 'vertical',
  size = 'md',
  className,
  textareaProps,
  onTrack,
  trackingLabel,
  componentName,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };

  // Resize configurations
  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // Enforce maxLength if provided
    if (maxLength && newValue.length > maxLength) {
      return;
    }

    if (onTrack) {
      onTrack({
        action: 'change',
        trackingLabel,
        componentName,
      });
    }

    onChange(newValue);
  };

  const handleBlur = () => {
    if (onTrack) {
      onTrack({
        action: 'blur',
        trackingLabel,
        componentName,
      });
    }
  };

  const characterCount = value.length;
  const showCountInfo = showCount || maxLength !== undefined;

  return (
    <div className={cn('w-full', className)}>
      <textarea
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        className={cn(
          'w-full rounded-lg border',
          'bg-white dark:bg-gray-800',
          'text-gray-900 dark:text-gray-100',
          'placeholder-gray-400 dark:placeholder-gray-500',
          'border-gray-300 dark:border-gray-600',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'transition-colors duration-200',
          sizeClasses[size],
          resizeClasses[resize],
          disabled && 'opacity-50 cursor-not-allowed',
          readOnly && 'bg-gray-50 dark:bg-gray-900 cursor-default'
        )}
        {...textareaProps}
      />

      {/* Character count */}
      {showCountInfo && (
        <div className='flex justify-end mt-1'>
          <span
            className={cn(
              'text-xs',
              maxLength && characterCount > maxLength * 0.9
                ? 'text-yellow-600 dark:text-yellow-400'
                : 'text-gray-500 dark:text-gray-400',
              maxLength &&
                characterCount >= maxLength &&
                'text-red-600 dark:text-red-400'
            )}
          >
            {characterCount}
            {maxLength && ` / ${maxLength}`}
          </span>
        </div>
      )}
    </div>
  );
};
