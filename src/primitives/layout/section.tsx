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

/**
 * The reading width a Section caps its content at: `max-w-5xl` is 64rem / 1024px.
 *
 * Deliberately independent of the page's layout mode. The band follows the page;
 * the text inside it should not, or body copy runs to an unreadable line length
 * on a wide display.
 */
const SECTION_CONTENT_WIDTH = 'max-w-5xl';

/**
 * Break the band out of a parent that caps its width.
 *
 * `50% - 50vw` is zero when the parent already spans the viewport, so this is a
 * no-op on uncapped pages and only does work where a page constrains its content.
 *
 * Note this measures against the viewport, which includes the scrollbar. Pages
 * whose root does not clip horizontal overflow can gain a scrollbar's worth of
 * horizontal scroll; pass `bleed={false}` there, and for any Section nested
 * inside a panel it should not escape.
 */
const SECTION_BLEED = 'ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]';

interface SectionProps extends VariantProps<typeof sectionVariants> {
  children: React.ReactNode;
  /** Classes applied to the outer section element */
  className?: string;
  /** Classes applied to the inner container div */
  containerClassName?: string;
  /**
   * Max width of the inner container. Defaults to the surrounding
   * `LayoutProvider`'s mode, so a page's sections line up with its topbar and
   * footer without every one of them being told the width. Pass this only to
   * deviate from that deliberately.
   */
  maxWidth?: MaxWidth;
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
  /** If true, children are rendered directly without the inner container */
  fullWidth?: boolean;
  /**
   * Let the band span the viewport even when the page caps its content
   * (default: true).
   *
   * Set to false for a Section rendered inside a panel or column, where
   * escaping the parent is exactly wrong.
   */
  bleed?: boolean;
}

/**
 * Section component for page content areas.
 *
 * Section extends full viewport width (for backgrounds), while its inner container
 * is constrained by max-width and has horizontal padding.
 *
 * That inner width comes from the surrounding `LayoutProvider` unless a
 * `maxWidth` is passed, so switching a page to `mode="full"` moves the topbar,
 * the footer and the content together. Setting the width on the sections
 * instead is the trap: the content goes edge to edge while the topbar stays at
 * its own width, and the two visibly disagree.
 *
 * Outside a provider `useLayout()` reports `standard`, which is the same
 * `max-w-7xl` this component always defaulted to.
 *
 * Use `fullWidth` when you need to manage the inner container yourself
 * (e.g., for sections with custom inner layouts).
 */
export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'default',
  spacing = '3xl',
  background = 'none',
  maxWidth,
  className,
  containerClassName,
  as: Component = 'section',
  id,
  fullWidth = false,
  bleed = true,
}) => {
  // Explicit prop wins, else the reading width. The page's layout mode governs
  // the band, not the text: a 'full' page still reads at SECTION_CONTENT_WIDTH.
  const widthClass = maxWidth
    ? maxWidthClasses[maxWidth]
    : SECTION_CONTENT_WIDTH;

  const content = fullWidth ? (
    children
  ) : (
    <div
      className={cn(
        widthClass,
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
        bleed && SECTION_BLEED,
        className
      ),
    },
    content
  );
};
