import React from 'react';
import { cn } from '../../lib/utils';

export interface TextProps {
  /** Text content */
  children: React.ReactNode;
  /** HTML element to render */
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'small';
  /** Size variant */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  /** Weight variant */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  /** Color variant */
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Text transform */
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  /** Truncate text */
  truncate?: boolean;
  /** Line clamp (number of lines) */
  lineClamp?: number;
  /** Additional className */
  className?: string;
}

/**
 * Text Component
 *
 * Versatile text component with semantic HTML elements and consistent styling.
 * Supports various sizes, weights, colors, and formatting options.
 *
 * @example
 * ```tsx
 * <Text size="lg" weight="semibold">
 *   Large semibold text
 * </Text>
 * ```
 *
 * @example
 * ```tsx
 * <Text as="label" color="muted" size="sm">
 *   Form label
 * </Text>
 * ```
 */
export const Text: React.FC<TextProps> = ({
  children,
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'default',
  align,
  transform = 'none',
  truncate = false,
  lineClamp,
  className,
}) => {
  // Size configurations
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };

  // Weight configurations
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  // Color configurations
  const colorClasses = {
    default: 'text-gray-900 dark:text-gray-100',
    muted: 'text-gray-600 dark:text-gray-400',
    primary: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400',
  };

  // Alignment configurations
  const alignClasses = align
    ? {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      }[align]
    : '';

  // Transform configurations
  const transformClasses = {
    none: '',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
  };

  // Line clamp style
  const lineClampStyle = lineClamp
    ? {
        display: '-webkit-box',
        WebkitLineClamp: lineClamp,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
      }
    : undefined;

  return (
    <Component
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        alignClasses,
        transformClasses[transform],
        truncate && 'truncate',
        lineClamp && 'overflow-hidden',
        className
      )}
      style={lineClampStyle}
    >
      {children}
    </Component>
  );
};

export default Text;
