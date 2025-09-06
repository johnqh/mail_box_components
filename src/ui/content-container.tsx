import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { designTokens } from '../design-system/tokens';

const contentContainerVariants = cva(
  "mx-auto px-4 sm:px-6",
  {
    variants: {
      size: {
        sm: "max-w-2xl",
        md: "max-w-4xl", 
        lg: "max-w-6xl",
        xl: "max-w-7xl lg:px-8",
        full: "max-w-full",
        prose: "max-w-prose"
      },
      spacing: {
        none: "",
        xs: designTokens.spacing.xs, // py-2
        sm: designTokens.spacing.sm, // py-3 
        md: designTokens.spacing.md, // py-4
        lg: designTokens.spacing.lg, // py-6
        xl: designTokens.spacing.xl, // py-8
        "2xl": designTokens.spacing["2xl"], // py-12
        "3xl": designTokens.spacing["3xl"] // py-16
      },
      align: {
        left: "text-left",
        center: "text-center", 
        right: "text-right"
      }
    },
    defaultVariants: {
      size: "xl",
      spacing: "md",
      align: "left"
    }
  }
);

interface ContentContainerProps extends VariantProps<typeof contentContainerVariants> {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  size = "xl",
  spacing = "md", 
  align = "left",
  className,
  as: Component = "div"
}) => {
  return React.createElement(
    Component,
    { className: cn(contentContainerVariants({ size, spacing, align }), className) },
    children
  );
};

export default ContentContainer;