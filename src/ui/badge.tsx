import React from 'react';
import { cn } from '../lib/utils';

export interface BadgeProps {
  /** Badge content */
  children: React.ReactNode;
  /** Color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Shape variant */
  shape?: 'rounded' | 'pill' | 'square';
  /** Icon to display */
  icon?: React.ComponentType<{ className?: string }>;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Show dot indicator */
  dot?: boolean;
  /** Dot position (when dot is true) */
  dotPosition?: 'left' | 'right';
  /** Additional className */
  className?: string;
}

/**
 * Badge Component
 *
 * Small status or label component for displaying metadata, status, or categories.
 * Commonly used for tags, statuses, counts, and labels.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="primary" size="sm">New</Badge>
 * <Badge variant="warning" dot>Pending</Badge>
 * ```
 *
 * @example
 * ```tsx
 * import { CheckCircleIcon } from '@heroicons/react/24/solid';
 *
 * <Badge variant="success" icon={CheckCircleIcon}>
 *   Verified
 * </Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  shape = 'rounded',
  icon: Icon,
  iconPosition = 'left',
  dot = false,
  dotPosition = 'left',
  className,
}) => {
  // Color variant configurations
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  };

  // Size configurations
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const iconSizeClasses = {
    xs: 'h-2.5 w-2.5',
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  // Shape configurations
  const shapeClasses = {
    rounded: 'rounded',
    pill: 'rounded-full',
    square: 'rounded-none',
  };

  // Dot color configurations
  const dotColorClasses = {
    default: 'bg-gray-600 dark:bg-gray-400',
    primary: 'bg-blue-600 dark:bg-blue-400',
    success: 'bg-green-600 dark:bg-green-400',
    warning: 'bg-yellow-600 dark:bg-yellow-400',
    danger: 'bg-red-600 dark:bg-red-400',
    info: 'bg-cyan-600 dark:bg-cyan-400',
    purple: 'bg-purple-600 dark:bg-purple-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        variantClasses[variant],
        sizeClasses[size],
        shapeClasses[shape],
        className
      )}
    >
      {dot && dotPosition === 'left' && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full mr-1.5', dotColorClasses[variant])}
        />
      )}
      {Icon && iconPosition === 'left' && (
        <Icon className={cn(iconSizeClasses[size], 'mr-1')} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className={cn(iconSizeClasses[size], 'ml-1')} />
      )}
      {dot && dotPosition === 'right' && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full ml-1.5', dotColorClasses[variant])}
        />
      )}
    </span>
  );
};

export default Badge;
