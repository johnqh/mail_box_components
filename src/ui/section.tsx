import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

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
        'bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700',
    },
  },
  defaultVariants: {
    variant: 'default',
    spacing: '3xl',
    background: 'none',
  },
});

interface SectionProps extends VariantProps<typeof sectionVariants> {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'default',
  spacing = '3xl',
  background = 'none',
  className,
  as: Component = 'section',
  id,
}) => {
  return React.createElement(
    Component,
    {
      id,
      className: cn(
        sectionVariants({ variant, spacing, background }),
        className
      ),
    },
    children
  );
};

export default Section;
