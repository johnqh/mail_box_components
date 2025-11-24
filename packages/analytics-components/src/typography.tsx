import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@sudobility/components';
import { textVariants } from '@sudobility/design';

// Page Title Component
const pageTitleVariants = cva('', {
  variants: {
    variant: {
      hero: textVariants.heading.display.hero(),
      display: textVariants.heading.display.lg(),
      h1: textVariants.heading.h1(),
      h2: textVariants.heading.h2(),
      h3: textVariants.heading.h3(),
    },
    responsive: {
      true: '', // Responsive sizing handled in variant
      false: '',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    color: {
      default: 'text-gray-900 dark:text-white',
      muted: 'text-gray-600 dark:text-gray-400',
      vibrant: 'text-white',
      brand:
        'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
    },
  },
  defaultVariants: {
    variant: 'h1',
    responsive: true,
    align: 'left',
    color: 'default',
  },
});

interface PageTitleProps extends VariantProps<typeof pageTitleVariants> {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const PageTitle: React.FC<PageTitleProps> = ({
  children,
  variant = 'h1',
  responsive = true,
  align = 'left',
  color = 'default',
  className,
  as,
}) => {
  // Auto-determine HTML element based on variant
  const Component =
    as ||
    (variant === 'hero'
      ? 'h1'
      : variant === 'display'
        ? 'h1'
        : variant === 'h1'
          ? 'h1'
          : variant === 'h2'
            ? 'h2'
            : 'h3');

  return (
    <Component
      className={cn(
        pageTitleVariants({ variant, responsive, align, color }),
        className
      )}
    >
      {children}
    </Component>
  );
};

// Section Title Component
const sectionTitleVariants = cva('', {
  variants: {
    variant: {
      h2: textVariants.heading.h2(),
      h3: textVariants.heading.h3(),
      h4: textVariants.heading.h4(),
      h5: textVariants.heading.h5(),
      h6: textVariants.heading.h6(),
    },
    spacing: {
      none: '',
      sm: 'mb-2',
      md: 'mb-4',
      lg: 'mb-6',
      xl: 'mb-8',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    variant: 'h2',
    spacing: 'md',
    align: 'left',
  },
});

interface SectionTitleProps extends VariantProps<typeof sectionTitleVariants> {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  variant = 'h2',
  spacing = 'md',
  align = 'left',
  className,
  as,
}) => {
  const Component = (as || variant) as keyof React.JSX.IntrinsicElements;

  return React.createElement(
    Component,
    {
      className: cn(
        sectionTitleVariants({ variant, spacing, align }),
        className
      ),
    },
    children
  );
};

// Body Text Component
const bodyTextVariants = cva('', {
  variants: {
    variant: {
      body: textVariants.body.md(),
      lead: textVariants.body.lg(),
      large: textVariants.body.lg(),
      small: textVariants.body.sm(),
      caption: textVariants.body.xs(),
    },
    color: {
      default: 'text-gray-700 dark:text-gray-300',
      muted: 'text-gray-500 dark:text-gray-500',
      primary: 'text-gray-900 dark:text-white',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'default',
    align: 'left',
  },
});

interface BodyTextProps extends VariantProps<typeof bodyTextVariants> {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export const BodyText: React.FC<BodyTextProps> = ({
  children,
  variant = 'body',
  color = 'default',
  align = 'left',
  className,
  as: Component = 'p',
}) => {
  return React.createElement(
    Component,
    { className: cn(bodyTextVariants({ variant, color, align }), className) },
    children
  );
};

// Text Link Component
const textLinkVariants = cva(textVariants.link.default(), {
  variants: {
    variant: {
      default: textVariants.link.default(),
      subtle: textVariants.link.subtle(),
      muted: textVariants.link.muted(),
      button:
        'inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors',
    },
    external: {
      true: 'inline-flex items-center gap-1',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    external: false,
  },
});

interface TextLinkProps extends VariantProps<typeof textLinkVariants> {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}

export const TextLink: React.FC<TextLinkProps> = ({
  children,
  href,
  variant = 'default',
  external = false,
  className,
  target,
  rel,
}) => {
  return (
    <a
      href={href}
      target={target || (external ? '_blank' : undefined)}
      rel={rel || (external ? 'noopener noreferrer' : undefined)}
      className={cn(textLinkVariants({ variant, external }), className)}
    >
      {children}
      {external && (
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
          />
        </svg>
      )}
    </a>
  );
};
