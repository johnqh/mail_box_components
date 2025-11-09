import React from 'react';
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

export interface HelperTextProps {
  /** Helper text content */
  children: React.ReactNode;
  /** Variant (affects color and icon) */
  variant?: 'default' | 'error' | 'success' | 'warning';
  /** Show icon */
  showIcon?: boolean;
  /** Size */
  size?: 'sm' | 'base';
  /** Additional className */
  className?: string;
}

/**
 * HelperText Component
 *
 * Text component for form field descriptions, error messages, and hints.
 * Supports different variants with optional icons.
 *
 * @example
 * ```tsx
 * <HelperText>
 *   Enter your email address
 * </HelperText>
 * ```
 *
 * @example
 * ```tsx
 * <HelperText variant="error" showIcon>
 *   This field is required
 * </HelperText>
 * ```
 */
export const HelperText: React.FC<HelperTextProps> = ({
  children,
  variant = 'default',
  showIcon = false,
  size = 'sm',
  className,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
  };

  const iconSize = {
    sm: 'h-4 w-4',
    base: 'h-5 w-5',
  };

  // Variant configurations
  const variantConfig = {
    default: {
      text: 'text-gray-600 dark:text-gray-400',
      icon: InformationCircleIcon,
    },
    error: {
      text: 'text-red-600 dark:text-red-400',
      icon: ExclamationCircleIcon,
    },
    success: {
      text: 'text-green-600 dark:text-green-400',
      icon: CheckCircleIcon,
    },
    warning: {
      text: 'text-yellow-600 dark:text-yellow-400',
      icon: ExclamationCircleIcon,
    },
  };

  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={cn('flex items-start gap-1.5', className)}>
      {showIcon && (
        <Icon
          className={cn(iconSize[size], config.text, 'flex-shrink-0 mt-0.5')}
        />
      )}
      <p className={cn(sizeClasses[size], config.text)}>{children}</p>
    </div>
  );
};

export default HelperText;
