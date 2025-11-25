import React from 'react';
import { cn } from '../lib/utils';

export interface IconTextProps {
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>;
  /** Text content */
  children: React.ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right' | 'top';
  /** Gap between icon and text */
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  /** Icon size */
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Text alignment (for top icon position) */
  align?: 'left' | 'center' | 'right';
  /** Color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'muted';
  /** Additional className for the container */
  className?: string;
  /** Additional className for the icon */
  iconClassName?: string;
  /** Additional className for the text */
  textClassName?: string;
}

/**
 * IconText Component
 *
 * Displays an icon alongside text content with flexible positioning and styling.
 * Commonly used for buttons, labels, list items, and feature highlights.
 *
 * @example
 * ```tsx
 * import { CheckCircleIcon } from '@heroicons/react/24/outline';
 *
 * <IconText icon={CheckCircleIcon}>
 *   Feature enabled
 * </IconText>
 * ```
 *
 * @example
 * ```tsx
 * import { SparklesIcon } from '@heroicons/react/24/outline';
 *
 * <IconText
 *   icon={SparklesIcon}
 *   iconPosition="top"
 *   align="center"
 *   variant="primary"
 * >
 *   Premium Feature
 * </IconText>
 * ```
 */
export const IconText: React.FC<IconTextProps> = ({
  icon: Icon,
  children,
  iconPosition = 'left',
  gap = 'md',
  iconSize = 'md',
  align = 'left',
  variant = 'default',
  className,
  iconClassName,
  textClassName,
}) => {
  // Gap configurations
  const gapClasses = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
  };

  // Icon size configurations
  const iconSizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  };

  // Alignment classes (for top icon position)
  const alignClasses = {
    left: 'text-left',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  // Color variant configurations
  const variantClasses = {
    default: 'text-gray-700 dark:text-gray-300',
    primary: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400',
    muted: 'text-gray-500 dark:text-gray-400',
  };

  // Layout based on icon position
  const layoutClasses = {
    left: 'flex items-center',
    right: 'flex flex-row-reverse items-center',
    top: 'flex flex-col',
  };

  return (
    <div
      className={cn(
        layoutClasses[iconPosition],
        gapClasses[gap],
        iconPosition === 'top' && alignClasses[align],
        variantClasses[variant],
        className
      )}
    >
      <Icon
        className={cn(
          iconSizeClasses[iconSize],
          'flex-shrink-0',
          iconClassName
        )}
      />
      <span className={cn(textClassName)}>{children}</span>
    </div>
  );
};
