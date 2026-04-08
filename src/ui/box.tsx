import React from 'react';
import { cn } from '../lib/utils';
import { ui, designTokens } from '@sudobility/design';

export interface BoxProps {
  /** Box content */
  children: React.ReactNode;
  /** HTML element to render */
  as?:
    | 'div'
    | 'section'
    | 'article'
    | 'aside'
    | 'main'
    | 'header'
    | 'footer'
    | 'nav';
  /** Padding */
  p?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Padding X-axis */
  px?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Padding Y-axis */
  py?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Margin */
  m?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'auto';
  /** Margin X-axis */
  mx?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'auto';
  /** Margin Y-axis */
  my?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'auto';
  /** Background color */
  bg?:
    | 'transparent'
    | 'white'
    | 'gray'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger';
  /** Border */
  border?: boolean;
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Shadow */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Width */
  w?: 'auto' | 'full' | 'screen' | 'min' | 'max';
  /** Height */
  h?: 'auto' | 'full' | 'screen' | 'min' | 'max';
  /** Additional className */
  className?: string;
}

/**
 * Box Component
 *
 * Fundamental layout primitive with spacing, sizing, and styling props.
 * Acts as a building block for creating layouts and containers.
 *
 * @example
 * ```tsx
 * <Box p="md" bg="white" rounded="lg" shadow="md">
 *   <h2>Card Content</h2>
 * </Box>
 * ```
 *
 * @example
 * ```tsx
 * <Box as="section" py="xl" px="md">
 *   <Text>Section content</Text>
 * </Box>
 * ```
 */
export const Box: React.FC<BoxProps> = ({
  children,
  as: Component = 'div',
  p,
  px,
  py,
  m,
  mx,
  my,
  bg,
  border = false,
  rounded,
  shadow,
  w,
  h,
  className,
}) => {
  // Spacing configurations
  const spacingClasses = {
    none: '0',
    xs: '1',
    sm: '2',
    md: '4',
    lg: '6',
    xl: '8',
    '2xl': '12',
    auto: 'auto',
  };

  // Background configurations - aligned with design system ui.background and colors.component
  const bgClasses = bg
    ? {
        transparent: 'bg-transparent',
        white: ui.background.surface,
        gray: ui.background.muted,
        primary: 'bg-blue-50 dark:bg-blue-900/20',
        success: 'bg-green-50 dark:bg-green-900/20',
        warning: 'bg-yellow-50 dark:bg-yellow-900/20',
        danger: 'bg-red-50 dark:bg-red-900/20',
      }[bg]
    : '';

  // Border radius configurations - using design system tokens
  const roundedClasses = rounded
    ? {
        none: designTokens.radius.none,
        sm: designTokens.radius.sm,
        md: designTokens.radius.md,
        lg: designTokens.radius.lg,
        xl: designTokens.radius.xl,
        full: designTokens.radius.full,
      }[rounded]
    : '';

  // Shadow configurations - using design system tokens
  const shadowClasses = shadow
    ? {
        none: designTokens.shadow.none,
        sm: designTokens.shadow.sm,
        md: designTokens.shadow.md,
        lg: designTokens.shadow.lg,
        xl: designTokens.shadow.xl,
      }[shadow]
    : '';

  // Width configurations
  const wClasses = w
    ? {
        auto: 'w-auto',
        full: 'w-full',
        screen: 'w-screen',
        min: 'w-min',
        max: 'w-max',
      }[w]
    : '';

  // Height configurations
  const hClasses = h
    ? {
        auto: 'h-auto',
        full: 'h-full',
        screen: 'h-screen',
        min: 'h-min',
        max: 'h-max',
      }[h]
    : '';

  // Build padding classes
  const paddingClasses: string[] = [];
  if (p) paddingClasses.push('p-' + spacingClasses[p]);
  if (px) paddingClasses.push('px-' + spacingClasses[px]);
  if (py) paddingClasses.push('py-' + spacingClasses[py]);

  // Build margin classes
  const marginClasses: string[] = [];
  if (m) marginClasses.push('m-' + spacingClasses[m]);
  if (mx) marginClasses.push('mx-' + spacingClasses[mx]);
  if (my) marginClasses.push('my-' + spacingClasses[my]);

  return (
    <Component
      className={cn(
        ...paddingClasses,
        ...marginClasses,
        bgClasses,
        border && `border ${ui.border.default}`,
        roundedClasses,
        shadowClasses,
        wClasses,
        hClasses,
        className
      )}
    >
      {children}
    </Component>
  );
};
