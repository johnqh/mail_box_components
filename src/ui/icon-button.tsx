import React from 'react';
import { cn } from '../lib/utils';

export interface IconButtonProps {
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>;
  /** Button label for accessibility (required for screen readers) */
  'aria-label': string;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Button shape */
  shape?: 'circle' | 'square' | 'rounded';
  /** Color variant */
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  /** Disabled state */
  disabled?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Additional className */
  className?: string;
  /** Tooltip content (optional) */
  title?: string;
}

/**
 * IconButton Component
 *
 * Icon-only button with various sizes, shapes, and variants.
 * Includes proper accessibility attributes for screen readers.
 *
 * @example
 * ```tsx
 * import { TrashIcon } from '@heroicons/react/24/outline';
 *
 * <IconButton
 *   icon={TrashIcon}
 *   aria-label="Delete item"
 *   onClick={handleDelete}
 * />
 * ```
 *
 * @example
 * ```tsx
 * import { CogIcon } from '@heroicons/react/24/outline';
 *
 * <IconButton
 *   icon={CogIcon}
 *   aria-label="Settings"
 *   variant="ghost"
 *   size="lg"
 *   shape="circle"
 * />
 * ```
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  'aria-label': ariaLabel,
  onClick,
  size = 'md',
  shape = 'rounded',
  variant = 'default',
  disabled = false,
  type = 'button',
  className,
  title,
}) => {
  // Size configurations
  const sizeClasses = {
    xs: {
      button: 'p-1',
      icon: 'h-3 w-3',
    },
    sm: {
      button: 'p-1.5',
      icon: 'h-4 w-4',
    },
    md: {
      button: 'p-2',
      icon: 'h-5 w-5',
    },
    lg: {
      button: 'p-3',
      icon: 'h-6 w-6',
    },
    xl: {
      button: 'p-4',
      icon: 'h-8 w-8',
    },
  };

  // Shape configurations
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg',
  };

  // Variant configurations
  const variantClasses = {
    default:
      'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary:
      'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600',
    danger:
      'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
    ghost:
      'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    outline:
      'bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
  };

  const sizeConfig = sizeClasses[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title || ariaLabel}
      className={cn(
        'inline-flex items-center justify-center',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-current',
        sizeConfig.button,
        shapeClasses[shape],
        variantClasses[variant],
        className
      )}
    >
      <Icon className={sizeConfig.icon} />
    </button>
  );
};

export default IconButton;
