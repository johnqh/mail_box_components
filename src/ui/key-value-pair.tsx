import React from 'react';
import { cn } from '../lib/utils';
import { textVariants } from '@sudobility/design';

export interface KeyValuePairProps {
  /** Label/key text */
  label: string;
  /** Value content */
  value: React.ReactNode;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Alignment for horizontal layout */
  align?: 'start' | 'center' | 'between';
  /** Label width (for horizontal layout) */
  labelWidth?: 'auto' | 'sm' | 'md' | 'lg';
  /** Text size */
  size?: 'sm' | 'md' | 'lg';
  /** Show separator */
  separator?: boolean;
  /** Label color variant */
  labelVariant?: 'default' | 'muted' | 'strong';
  /** Value color variant */
  valueVariant?: 'default' | 'muted' | 'strong' | 'primary';
  /** Additional className for container */
  className?: string;
  /** Additional className for label */
  labelClassName?: string;
  /** Additional className for value */
  valueClassName?: string;
}

/**
 * KeyValuePair Component
 *
 * Displays a label-value pair with flexible layout and styling options.
 * Commonly used in forms, details pages, and data displays.
 *
 * @example
 * ```tsx
 * <KeyValuePair label="Email" value="user@example.com" />
 * <KeyValuePair
 *   label="Status"
 *   value={<Badge variant="success">Active</Badge>}
 *   orientation="horizontal"
 *   align="between"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <KeyValuePair
 *   label="Wallet Address"
 *   value="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
 *   separator
 *   valueVariant="primary"
 * />
 * ```
 */
export const KeyValuePair: React.FC<KeyValuePairProps> = ({
  label,
  value,
  orientation = 'vertical',
  align = 'start',
  labelWidth = 'auto',
  size = 'md',
  separator = false,
  labelVariant = 'muted',
  valueVariant = 'default',
  className,
  labelClassName,
  valueClassName,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      label: textVariants.body.sm(),
      value: textVariants.body.sm(),
      gap: 'gap-1',
    },
    md: {
      label: textVariants.body.md(),
      value: textVariants.body.md(),
      gap: 'gap-2',
    },
    lg: {
      label: textVariants.body.lg(),
      value: textVariants.body.lg(),
      gap: 'gap-3',
    },
  };

  // Label width configurations (for horizontal layout)
  const labelWidthClasses = {
    auto: '',
    sm: 'w-24',
    md: 'w-32',
    lg: 'w-40',
  };

  // Alignment configurations (for horizontal layout)
  const alignClasses = {
    start: 'justify-start',
    center: 'justify-center',
    between: 'justify-between',
  };

  // Label color variant configurations
  const labelVariantClasses = {
    default: 'text-gray-700 dark:text-gray-300',
    muted: 'text-gray-600 dark:text-gray-400',
    strong: 'text-gray-900 dark:text-gray-100 font-semibold',
  };

  // Value color variant configurations
  const valueVariantClasses = {
    default: 'text-gray-900 dark:text-gray-100',
    muted: 'text-gray-600 dark:text-gray-400',
    strong: 'text-gray-900 dark:text-gray-100 font-semibold',
    primary: 'text-blue-600 dark:text-blue-400',
  };

  const sizeConfig = sizeClasses[size];

  return (
    <div
      className={cn(
        orientation === 'horizontal' ? 'flex items-center' : 'flex flex-col',
        orientation === 'horizontal' && alignClasses[align],
        sizeConfig.gap,
        separator &&
          'pb-3 mb-3 border-b border-gray-200 dark:border-gray-700',
        className
      )}
    >
      <dt
        className={cn(
          sizeConfig.label,
          labelVariantClasses[labelVariant],
          orientation === 'horizontal' && labelWidthClasses[labelWidth],
          orientation === 'horizontal' && 'flex-shrink-0',
          labelClassName
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          sizeConfig.value,
          valueVariantClasses[valueVariant],
          orientation === 'horizontal' && 'flex-1',
          valueClassName
        )}
      >
        {value}
      </dd>
    </div>
  );
};

export default KeyValuePair;
