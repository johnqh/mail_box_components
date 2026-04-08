import React from 'react';
import { textVariants, designTokens } from '@sudobility/design';
import { cn } from '../lib/utils';

export interface HeadingProps {
  /** Heading content */
  children: React.ReactNode;
  /** Heading level */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Size (independent of level for semantic flexibility) */
  size?: '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'base';
  /** Weight variant */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  /** Color variant */
  color?: 'default' | 'muted' | 'primary';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Additional className */
  className?: string;
}

/**
 * Heading Component
 *
 * Semantic heading component with flexible sizing and styling.
 * Level determines HTML element, size controls visual appearance.
 *
 * @example
 * ```tsx
 * <Heading level={1} size="4xl">
 *   Page Title
 * </Heading>
 * ```
 *
 * @example
 * ```tsx
 * <Heading level={2} size="xl" color="primary">
 *   Section Title
 * </Heading>
 * ```
 */
export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  size,
  weight = 'bold',
  color = 'default',
  align,
  className,
}) => {
  // Map sizes to heading variant levels (size -> equivalent heading level)
  const sizeToLevel = {
    '4xl': 'h1',
    '3xl': 'h2',
    '2xl': 'h3',
    xl: 'h4',
    lg: 'h5',
    base: 'h6',
  } as const;

  // Default sizes based on level if not explicitly provided
  const defaultSizes = {
    1: '4xl',
    2: '3xl',
    3: '2xl',
    4: 'xl',
    5: 'lg',
    6: 'base',
  } as const;

  const actualSize = size || defaultSizes[level];

  // Get base heading classes from design system (includes size, font-family,
  // default weight, leading, tracking, and default color)
  const headingLevel = sizeToLevel[actualSize];
  const baseClasses = textVariants.heading[headingLevel]();

  // Weight overrides from design tokens (only override when not using the
  // default bold weight already baked into the heading variant)
  const weightClasses: Record<string, string> = {
    normal: designTokens.typography.weight.normal,
    medium: designTokens.typography.weight.medium,
    semibold: designTokens.typography.weight.semibold,
    bold: designTokens.typography.weight.bold,
    extrabold: designTokens.typography.weight.extrabold,
  };

  // Color overrides — 'default' is already provided by the heading variant,
  // so we only need explicit classes for muted and primary
  const colorOverrides: Record<string, string> = {
    default: '',
    muted: 'text-gray-700 dark:text-gray-300',
    primary: 'text-blue-600 dark:text-blue-400',
  };

  // Alignment from design tokens
  const alignClasses = align ? designTokens.typography.align[align] : '';

  const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return React.createElement(
    Component,
    {
      className: cn(
        baseClasses,
        weightClasses[weight],
        colorOverrides[color],
        alignClasses,
        className
      ),
    },
    children
  );
};
