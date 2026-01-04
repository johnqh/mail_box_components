import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export interface PasswordStrength {
  /** Strength score (0-4) */
  score: 0 | 1 | 2 | 3 | 4;
  /** Strength label */
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  /** Color for strength indicator */
  color: string;
}

/** Tracking event data for password input interactions */
export interface PasswordInputTrackingData {
  /** Action performed */
  action: 'input' | 'visibility_toggle';
  /** Optional custom label for tracking */
  trackingLabel?: string;
  /** Optional component context */
  componentName?: string;
}

export interface PasswordInputProps {
  /** Input value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Show strength indicator */
  showStrength?: boolean;
  /** Show requirements checklist */
  showRequirements?: boolean;
  /** Minimum length requirement */
  minLength?: number;
  /** Require uppercase */
  requireUppercase?: boolean;
  /** Require lowercase */
  requireLowercase?: boolean;
  /** Require numbers */
  requireNumbers?: boolean;
  /** Require special characters */
  requireSpecial?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
  /** Optional callback for tracking password input interactions */
  onTrack?: (data: PasswordInputTrackingData) => void;
  /** Custom label for tracking */
  trackingLabel?: string;
  /** Component name for tracking context */
  componentName?: string;
}

/**
 * PasswordInput Component
 *
 * Password input with show/hide toggle and strength indicator.
 * Displays requirements checklist and validates password strength.
 *
 * @example
 * ```tsx
 * <PasswordInput
 *   value={password}
 *   onChange={setPassword}
 *   showStrength
 *   showRequirements
 *   minLength={8}
 *   requireUppercase
 *   requireNumbers
 *   requireSpecial
 * />
 * ```
 *
 * @example
 * ```tsx
 * <PasswordInput
 *   value={newPassword}
 *   onChange={setNewPassword}
 *   placeholder="Enter new password"
 *   showStrength
 * />
 * ```
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter password',
  showStrength = false,
  showRequirements = false,
  minLength = 8,
  requireUppercase = true,
  requireLowercase = true,
  requireNumbers = true,
  requireSpecial = true,
  disabled = false,
  className,
  onTrack,
  trackingLabel,
  componentName,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Calculate password strength
  const calculateStrength = (): PasswordStrength => {
    if (!value) {
      return { score: 0, label: 'Very Weak', color: 'bg-gray-300' };
    }

    let score = 0;

    // Length check
    if (value.length >= minLength) score++;
    if (value.length >= 12) score++;

    // Character variety
    if (requireUppercase && /[A-Z]/.test(value)) score++;
    if (requireLowercase && /[a-z]/.test(value)) score++;
    if (requireNumbers && /[0-9]/.test(value)) score++;
    if (requireSpecial && /[^A-Za-z0-9]/.test(value)) score++;

    // Normalize to 0-4 scale
    const normalizedScore = Math.min(4, Math.floor((score / 6) * 4)) as
      | 0
      | 1
      | 2
      | 3
      | 4;

    const strengthMap: Record<0 | 1 | 2 | 3 | 4, PasswordStrength> = {
      0: { score: 0, label: 'Very Weak', color: 'bg-red-500' },
      1: { score: 1, label: 'Weak', color: 'bg-orange-500' },
      2: { score: 2, label: 'Fair', color: 'bg-yellow-500' },
      3: { score: 3, label: 'Good', color: 'bg-blue-500' },
      4: { score: 4, label: 'Strong', color: 'bg-green-500' },
    };

    return strengthMap[normalizedScore];
  };

  // Check individual requirements
  const requirements = [
    {
      label: `At least ${minLength} characters`,
      met: value.length >= minLength,
    },
    {
      label: 'Uppercase letter',
      met: /[A-Z]/.test(value),
      enabled: requireUppercase,
    },
    {
      label: 'Lowercase letter',
      met: /[a-z]/.test(value),
      enabled: requireLowercase,
    },
    {
      label: 'Number',
      met: /[0-9]/.test(value),
      enabled: requireNumbers,
    },
    {
      label: 'Special character',
      met: /[^A-Za-z0-9]/.test(value),
      enabled: requireSpecial,
    },
  ].filter(req => req.enabled !== false);

  const strength = calculateStrength();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (onTrack) {
      onTrack({
        action: 'input',
        trackingLabel,
        componentName,
      });
    }

    onChange(newValue);
  };

  const handleVisibilityToggle = () => {
    if (onTrack) {
      onTrack({
        action: 'visibility_toggle',
        trackingLabel,
        componentName,
      });
    }

    setShowPassword(!showPassword);
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Input container */}
      <div className='relative'>
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full px-3 py-2 pr-10 text-sm',
            'bg-white dark:bg-gray-900',
            'border border-gray-300 dark:border-gray-700',
            'rounded-md',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        />

        {/* Show/Hide toggle */}
        <button
          type='button'
          onClick={handleVisibilityToggle}
          disabled={disabled}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2',
            'p-1.5 text-gray-600 dark:text-gray-400',
            'hover:text-gray-900 dark:hover:text-white',
            'transition-colors',
            'disabled:cursor-not-allowed'
          )}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
              />
            </svg>
          ) : (
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
          )}
        </button>
      </div>

      {/* Strength indicator */}
      {showStrength && value && (
        <div className='mt-2'>
          <div className='flex items-center justify-between mb-1'>
            <span className='text-xs text-gray-600 dark:text-gray-400'>
              Password strength:
            </span>
            <span className='text-xs font-medium text-gray-900 dark:text-white'>
              {strength.label}
            </span>
          </div>
          <div className='flex gap-1'>
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors',
                  level <= strength.score
                    ? strength.color
                    : 'bg-gray-200 dark:bg-gray-700'
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Requirements checklist */}
      {showRequirements && value && (
        <div className='mt-3 space-y-1.5'>
          {requirements.map((req, index) => (
            <div key={index} className='flex items-center gap-2'>
              <div
                className={cn(
                  'w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0',
                  req.met
                    ? 'bg-green-500 dark:bg-green-600'
                    : 'bg-gray-300 dark:bg-gray-700'
                )}
              >
                {req.met && (
                  <svg
                    className='w-3 h-3 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={3}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                )}
              </div>
              <span
                className={cn(
                  'text-xs',
                  req.met
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400'
                )}
              >
                {req.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
