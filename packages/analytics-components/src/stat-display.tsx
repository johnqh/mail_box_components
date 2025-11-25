import React from 'react';
import { cn } from '@sudobility/components';
import { textVariants } from '@sudobility/design';

export interface StatDisplayProps {
  /** The main value/number to display */
  value: string | number;
  /** Label/description for the stat */
  label: string;
  /** Color variant */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'white';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Icon to display above/beside the value */
  icon?: React.ComponentType<{ className?: string }>;
  /** Icon position */
  iconPosition?: 'top' | 'left';
  /** Additional className for the container */
  className?: string;
  /** Value className override */
  valueClassName?: string;
  /** Label className override */
  labelClassName?: string;
}

/**
 * StatDisplay Component
 *
 * Displays a statistic or metric with a value and label.
 * Commonly used in dashboards, hero sections, and analytics displays.
 *
 * @example
 * ```tsx
 * <StatDisplay value="5K" label="Gas Overhead" variant="white" />
 * <StatDisplay value="42" label="Active Users" variant="primary" size="lg" />
 * ```
 *
 * @example
 * ```tsx
 * import { ChartBarIcon } from '@heroicons/react/24/outline';
 *
 * <StatDisplay
 *   value="1,234"
 *   label="Total Points"
 *   icon={ChartBarIcon}
 *   iconPosition="top"
 *   variant="success"
 * />
 * ```
 */
export const StatDisplay: React.FC<StatDisplayProps> = ({
  value,
  label,
  variant = 'neutral',
  size = 'md',
  align = 'center',
  icon: Icon,
  iconPosition = 'top',
  className,
  valueClassName,
  labelClassName,
}) => {
  // Color variant configurations
  const variantClasses = {
    primary: {
      value: 'text-blue-600 dark:text-blue-400',
      label: 'text-blue-600/70 dark:text-blue-400/70',
      icon: 'text-blue-600 dark:text-blue-400',
    },
    success: {
      value: 'text-green-600 dark:text-green-400',
      label: 'text-green-600/70 dark:text-green-400/70',
      icon: 'text-green-600 dark:text-green-400',
    },
    warning: {
      value: 'text-yellow-600 dark:text-yellow-400',
      label: 'text-yellow-600/70 dark:text-yellow-400/70',
      icon: 'text-yellow-600 dark:text-yellow-400',
    },
    danger: {
      value: 'text-red-600 dark:text-red-400',
      label: 'text-red-600/70 dark:text-red-400/70',
      icon: 'text-red-600 dark:text-red-400',
    },
    neutral: {
      value: 'text-gray-900 dark:text-gray-100',
      label: 'text-gray-600 dark:text-gray-400',
      icon: 'text-gray-600 dark:text-gray-400',
    },
    white: {
      value: 'text-white',
      label: 'text-white/70',
      icon: 'text-white',
    },
  };

  // Size configurations
  const sizeClasses = {
    sm: {
      value: textVariants.heading.h5(),
      label: textVariants.caption.default(),
      icon: 'h-4 w-4',
    },
    md: {
      value: textVariants.heading.h4(),
      label: textVariants.body.sm(),
      icon: 'h-5 w-5',
    },
    lg: {
      value: textVariants.heading.h3(),
      label: textVariants.body.md(),
      icon: 'h-6 w-6',
    },
    xl: {
      value: textVariants.heading.h2(),
      label: textVariants.body.lg(),
      icon: 'h-8 w-8',
    },
  };

  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const variantConfig = variantClasses[variant];
  const sizeConfig = sizeClasses[size];

  return (
    <div className={cn(alignClasses[align], className)}>
      {Icon && iconPosition === 'top' && (
        <Icon
          className={cn(
            sizeConfig.icon,
            variantConfig.icon,
            'mb-2',
            align === 'center' && 'mx-auto'
          )}
        />
      )}
      <div
        className={cn(
          iconPosition === 'left' && Icon && 'flex items-center gap-3',
          align === 'center' && iconPosition === 'left' && 'justify-center'
        )}
      >
        {Icon && iconPosition === 'left' && (
          <Icon className={cn(sizeConfig.icon, variantConfig.icon)} />
        )}
        <div>
          <div
            className={cn(
              'font-bold',
              sizeConfig.value,
              variantConfig.value,
              valueClassName
            )}
          >
            {value}
          </div>
          <div
            className={cn(
              sizeConfig.label,
              variantConfig.label,
              labelClassName
            )}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};
