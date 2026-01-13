import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const sectionVariants = cva('', {
  variants: {
    variant: {
      default: '',
      hero: 'relative overflow-hidden',
      feature: 'bg-white dark:bg-gray-800',
      cta: 'relative overflow-hidden',
      testimonial: 'bg-gray-50 dark:bg-gray-900',
      footer:
        'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 border-t',
    },
    spacing: {
      none: '',
      xs: 'py-2', // 8px
      sm: 'py-3', // 12px
      md: 'py-4', // 16px
      lg: 'py-6', // 24px
      xl: 'py-8', // 32px
      '2xl': 'py-12', // 48px
      '3xl': 'py-16', // 64px
      '4xl': 'py-20', // 80px
      '5xl': 'py-24', // 96px
    },
    background: {
      none: 'bg-transparent',
      default: 'bg-gray-50 dark:bg-gray-900',
      surface: 'bg-white dark:bg-gray-800',
      gradient:
        'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/50 dark:to-purple-900/50',
      'gradient-primary':
        'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50',
      'gradient-secondary':
        'bg-gradient-to-br from-green-50 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50',
      'gradient-tertiary':
        'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900',
      'gradient-vibrant':
        'bg-gradient-to-br from-blue-800 to-purple-800 dark:from-blue-900 dark:to-purple-900',
    },
  },
  defaultVariants: {
    variant: 'default',
    spacing: '3xl',
    background: 'none',
  },
});

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
} as const;

type MaxWidth = keyof typeof maxWidthClasses;

interface SectionProps extends VariantProps<typeof sectionVariants> {
  children: React.ReactNode;
  /** Classes applied to the outer section element */
  className?: string;
  /** Classes applied to the inner container div */
  containerClassName?: string;
  /** Max width of the inner container. Defaults to '7xl' */
  maxWidth?: MaxWidth;
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
  /** If true, children are rendered directly without the inner container */
  fullWidth?: boolean;
}

/**
 * Section component for page content areas.
 *
 * Section extends full viewport width (for backgrounds), while its inner container
 * is constrained by max-width and has horizontal padding.
 *
 * Use `fullWidth` prop when you need to manage the inner container yourself
 * (e.g., for sections with custom inner layouts).
 */
export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'default',
  spacing = '3xl',
  background = 'none',
  maxWidth = '7xl',
  className,
  containerClassName,
  as: Component = 'section',
  id,
  fullWidth = false,
}) => {
  const content = fullWidth ? (
    children
  ) : (
    <div
      className={cn(
        maxWidthClasses[maxWidth],
        'mx-auto px-4 sm:px-6 lg:px-8',
        containerClassName
      )}
    >
      {children}
    </div>
  );

  return React.createElement(
    Component,
    {
      id,
      className: cn(
        sectionVariants({ variant, spacing, background }),
        className
      ),
    },
    content
  );
};
