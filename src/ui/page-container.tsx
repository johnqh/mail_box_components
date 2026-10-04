import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { ui } from '@sudobility/design';
import { themedCva } from '../lib/theme';

const pageContainerVariants = themedCva(() =>
  cva('min-h-screen flex flex-col', {
    variants: {
      background: {
        default: ui.background.subtle,
        surface: ui.background.surface,
        transparent: 'bg-transparent',
        // The theme's background fading into its muted surface; the design
        // system's `GRADIENTS.backgrounds.main` is a fixed blue-purple wash.
        gradient: 'bg-gradient-to-br from-background via-background to-muted',
      },
      overflow: {
        visible: 'overflow-visible',
        hidden: 'overflow-hidden',
        scroll: 'overflow-auto',
      },
    },
    defaultVariants: {
      background: 'default',
      overflow: 'visible',
    },
  })
);

interface PageContainerProps extends VariantProps<
  typeof pageContainerVariants
> {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  background = 'default',
  overflow = 'visible',
  className,
}) => {
  return (
    <div
      className={cn(pageContainerVariants({ background, overflow }), className)}
    >
      {children}
    </div>
  );
};
