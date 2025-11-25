import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@sudobility/components';

export interface OtpInputProps {
  /** Number of input boxes */
  length?: number;
  /** OTP value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Complete handler (called when all digits filled) */
  onComplete?: (value: string) => void;
  /** Input type (text or password) */
  type?: 'text' | 'password';
  /** Disabled state */
  disabled?: boolean;
  /** Auto focus first input */
  autoFocus?: boolean;
  /** Placeholder character */
  placeholder?: string;
  /** Additional className */
  className?: string;
}

/**
 * OtpInput Component
 *
 * One-time password input with individual digit boxes.
 * Supports auto-focus, paste, and keyboard navigation.
 *
 * @example
 * ```tsx
 * <OtpInput
 *   length={6}
 *   value={otp}
 *   onChange={setOtp}
 *   onComplete={(code) => verifyCode(code)}
 *   autoFocus
 * />
 * ```
 *
 * @example
 * ```tsx
 * <OtpInput
 *   length={4}
 *   value={pin}
 *   onChange={setPin}
 *   type="password"
 * />
 * ```
 */
export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  type = 'text',
  disabled = false,
  autoFocus = false,
  placeholder = '•',
  className,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Auto focus first input
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  // Call onComplete when all digits filled
  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  // Get digit at index
  const getDigit = (index: number): string => {
    return value[index] || '';
  };

  // Handle input change
  const handleChange = (index: number, digit: string) => {
    // Only allow single digit/character
    const newDigit = digit.slice(-1);

    // Build new value
    const newValue =
      value.substring(0, index) + newDigit + value.substring(index + 1);

    onChange(newValue.slice(0, length));

    // Auto focus next input
    if (newDigit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle keydown
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();

      if (getDigit(index)) {
        // Clear current digit
        const newValue = value.substring(0, index) + value.substring(index + 1);
        onChange(newValue);
      } else if (index > 0) {
        // Focus previous input and clear it
        const newValue = value.substring(0, index - 1) + value.substring(index);
        onChange(newValue);
        inputRefs.current[index - 1]?.focus();
      }
    }

    // Arrow left
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    // Arrow right
    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }

    // Home
    if (e.key === 'Home') {
      e.preventDefault();
      inputRefs.current[0]?.focus();
    }

    // End
    if (e.key === 'End') {
      e.preventDefault();
      inputRefs.current[length - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData('text/plain');
    const digits = pastedData.replace(/\s/g, '').slice(0, length);

    onChange(digits);

    // Focus last filled input or next empty
    const nextIndex = Math.min(digits.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  // Handle focus
  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    // Select input content on focus
    inputRefs.current[index]?.select();
  };

  // Handle blur
  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <div className={cn('flex gap-2', className)}>
      {Array.from({ length }, (_, index) => {
        const digit = getDigit(index);
        const isFocused = focusedIndex === index;

        return (
          <input
            key={index}
            ref={el => {
              inputRefs.current[index] = el;
            }}
            type={type}
            inputMode='numeric'
            maxLength={1}
            value={digit}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={placeholder}
            className={cn(
              'w-12 h-12 text-center text-lg font-semibold',
              'bg-white dark:bg-gray-900',
              'border-2 border-gray-300 dark:border-gray-700',
              'rounded-md',
              'focus:outline-none focus:border-blue-500 dark:focus:border-blue-400',
              'transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              isFocused && 'ring-2 ring-blue-500 dark:ring-blue-400',
              digit && 'border-gray-400 dark:border-gray-600'
            )}
          />
        );
      })}
    </div>
  );
};
