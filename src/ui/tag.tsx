import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { cn } from '../lib/utils';

export interface TagProps {
  /** Tag label */
  children: React.ReactNode;
  /** Color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show close button */
  onRemove?: () => void;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Tag Component
 *
 * Small label or badge with optional remove button.
 * Commonly used for filters, selections, categories, and tags.
 *
 * @example
 * ```tsx
 * <Tag variant="primary">JavaScript</Tag>
 * <Tag variant="success" onRemove={() => removeTag('id')}>
 *   Selected Item
 * </Tag>
 * ```
 *
 * @example
 * ```tsx
 * <Tag variant="warning" size="sm" onClick={() => filterBy('tag')}>
 *   Filter
 * </Tag>
 * ```
 */
export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'md',
  onRemove,
  onClick,
  disabled = false,
  className,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      tag: 'px-2 py-0.5 text-xs gap-1',
      icon: 'h-3 w-3',
    },
    md: {
      tag: 'px-2.5 py-1 text-sm gap-1.5',
      icon: 'h-3.5 w-3.5',
    },
    lg: {
      tag: 'px-3 py-1.5 text-base gap-2',
      icon: 'h-4 w-4',
    },
  };

  // Color variant configurations
  const variantClasses = {
    default:
      'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
    primary:
      'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50',
    success:
      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50',
    warning:
      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/50',
    danger:
      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50',
    info: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-900/50',
    purple:
      'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50',
  };

  const sizeConfig = sizeClasses[size];
  const isInteractive = onClick || onRemove;

  const handleClick = () => {
    if (disabled) return;
    if (onClick) {
      onClick();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled || !onRemove) return;
    onRemove();
  };

  return (
    <span
      onClick={handleClick}
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        'transition-colors duration-200',
        sizeConfig.tag,
        variantClasses[variant],
        isInteractive && !disabled && 'cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={handleRemove}
          disabled={disabled}
          className={cn(
            'inline-flex items-center justify-center rounded-full',
            'hover:bg-black/10 dark:hover:bg-white/10',
            'transition-colors',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
          aria-label="Remove"
        >
          <XMarkIcon className={sizeConfig.icon} />
        </button>
      )}
    </span>
  );
};

export default Tag;
