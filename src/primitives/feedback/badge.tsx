import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { cn } from '../../lib/utils';

export interface BadgeProps {
  /** Badge content */
  children?: React.ReactNode;
  /** Color variant */
  variant?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'purple';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Icon to display */
  icon?: React.ReactNode;
  /** Show dot indicator */
  dot?: boolean;
  /** Render as pill (rounded-full) */
  pill?: boolean;
  /** Render as outline style */
  outline?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Dismissible badge with close button */
  dismissible?: boolean;
  /** Dismiss handler */
  onDismiss?: () => void;
  /** Count to display */
  count?: number;
  /** Max count before showing "+" */
  maxCount?: number;
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
 * <Badge variant="success" icon={<CheckIcon />}>
 *   Verified
 * </Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  icon,
  dot = false,
  pill = false,
  outline = false,
  onClick,
  dismissible = false,
  onDismiss,
  count,
  maxCount,
  className,
}) => {
  // Color variant configurations for filled style
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    success:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    purple:
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  };

  // Color variant configurations for outline style
  const outlineClasses = {
    default:
      'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
    primary:
      'border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400',
    success:
      'border border-green-600 text-green-600 dark:border-green-400 dark:text-green-400',
    warning:
      'border border-yellow-600 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400',
    danger:
      'border border-red-600 text-red-600 dark:border-red-400 dark:text-red-400',
    info: 'border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400',
    purple:
      'border border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400',
  };

  // Size configurations
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const iconSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  // Dot color configurations
  const dotColorClasses = {
    default: 'bg-gray-600 dark:bg-gray-400',
    primary: 'bg-blue-600 dark:bg-blue-400',
    success: 'bg-green-600 dark:bg-green-400',
    warning: 'bg-yellow-600 dark:bg-yellow-400',
    danger: 'bg-red-600 dark:bg-red-400',
    info: 'bg-blue-600 dark:bg-blue-400',
    purple: 'bg-purple-600 dark:bg-purple-400',
  };

  // Format count display
  const displayCount =
    count !== undefined
      ? maxCount !== undefined && count > maxCount
        ? `${maxCount}+`
        : count.toString()
      : null;

  const content = (
    <>
      {dot && (
        <span
          className={cn(
            'h-2 w-2 rounded-full mr-1.5',
            dotColorClasses[variant]
          )}
        />
      )}
      {icon && (
        <span className={cn(iconSizeClasses[size], 'mr-1')}>{icon}</span>
      )}
      {children}
      {displayCount && <span className='ml-1'>{displayCount}</span>}
      {dismissible && onDismiss && (
        <button
          onClick={e => {
            e.stopPropagation();
            onDismiss();
          }}
          className='ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5'
          aria-label='Dismiss'
        >
          <XMarkIcon className={cn(iconSizeClasses[size])} />
        </button>
      )}
    </>
  );

  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center font-medium',
        outline ? outlineClasses[variant] : variantClasses[variant],
        sizeClasses[size],
        pill ? 'rounded-full' : 'rounded',
        onClick && 'cursor-pointer hover:opacity-80',
        className
      )}
    >
      {content}
    </Component>
  );
};
