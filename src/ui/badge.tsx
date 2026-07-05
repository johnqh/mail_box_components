import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { colors } from '@sudobility/design';
import { cn } from '../lib/utils';

/** Props for the Badge component. */
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
  // Color variant configurations for filled style (from design system)
  const badgeColors = colors.component.badge;
  const variantClasses = {
    default: `${badgeColors.default.base} ${badgeColors.default.dark}`,
    primary: `${badgeColors.primary.base} ${badgeColors.primary.dark}`,
    success: `${badgeColors.success.base} ${badgeColors.success.dark}`,
    warning: `${badgeColors.warning.base} ${badgeColors.warning.dark}`,
    danger: `${badgeColors.error.base} ${badgeColors.error.dark}`,
    info: `${badgeColors.primary.base} ${badgeColors.primary.dark}`,
    purple: `${badgeColors.solana.base} ${badgeColors.solana.dark}`,
  };

  // Color variant configurations for outline style
  const outlineClasses = {
    default: 'border border-border text-foreground',
    primary: 'border border-primary text-primary',
    success: 'border border-success text-success',
    warning: 'border border-warning text-warning',
    danger: 'border border-destructive text-destructive',
    info: 'border border-info text-info',
    purple: 'border border-primary text-primary',
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
    default: 'bg-muted-foreground',
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-destructive',
    info: 'bg-info',
    purple: 'bg-primary',
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
          className='ml-1 hover:bg-foreground/10 rounded-full p-0.5'
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
