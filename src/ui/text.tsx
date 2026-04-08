import React from 'react';
import { textVariants, designTokens } from '@sudobility/design';
import { cn } from '../lib/utils';

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
  // Map size prop to design system body variant.
  // Sizes that have direct body variants use them; larger sizes (2xl+) use
  // heading variants to get the correct text-size class.
  const bodyVariantMap: Record<string, () => string> = {
    xs: textVariants.body.xs,
    sm: textVariants.body.sm,
    base: textVariants.body.md,
    lg: textVariants.body.lg,
    xl: textVariants.body.xl,
    '2xl': textVariants.heading.h3, // text-2xl
    '3xl': textVariants.heading.h2, // text-3xl
    '4xl': textVariants.heading.h1, // text-4xl
  };

  // Get base classes from the design system (includes font-family, size,
  // weight, leading, tracking, and default color)
  const baseClasses = bodyVariantMap[size]();

  // Weight overrides from design tokens
  const weightClasses: Record<string, string> = {
    light: designTokens.typography.weight.light,
    normal: designTokens.typography.weight.normal,
    medium: designTokens.typography.weight.medium,
    semibold: designTokens.typography.weight.semibold,
    bold: designTokens.typography.weight.bold,
  };

  // Color overrides — 'default' is already provided by the body variant,
  // so we only apply an explicit class for the other variants
  const colorOverrides: Record<string, string> = {
    default: '',
    muted: 'text-gray-600 dark:text-gray-400',
    primary: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400',
  };

  // Alignment from design tokens
  const alignClasses = align ? designTokens.typography.align[align] : '';

  // Transform from design tokens
  const transformClasses =
    transform !== 'none' ? designTokens.typography.transform[transform] : '';

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
        baseClasses,
        weightClasses[weight],
        colorOverrides[color],
        alignClasses,
        transformClasses,
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
