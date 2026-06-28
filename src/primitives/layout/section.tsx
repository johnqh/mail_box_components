import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
const sectionVariants = cva('', {
  variants: {
    variant: {
      default: '',
      hero: 'relative overflow-hidden',
      feature: 'bg-card',
      cta: 'relative overflow-hidden',
      testimonial: 'bg-muted',
      footer: 'bg-card border-border border-t',
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
      default: 'bg-muted',
      surface: 'bg-card',
      gradient: 'bg-gradient-to-br from-muted to-background',
      'gradient-primary': 'bg-gradient-to-br from-primary/10 to-accent',
      'gradient-secondary': 'bg-gradient-to-br from-success/10 to-primary/10',
      'gradient-tertiary': 'bg-gradient-to-r from-success/10 to-muted',
      'gradient-vibrant': 'bg-gradient-to-br from-primary to-accent',
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
