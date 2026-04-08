import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { ui, GRADIENTS } from '@sudobility/design';

const pageContainerVariants = cva('min-h-screen flex flex-col', {
  variants: {
    background: {
      default: ui.background.subtle,
      surface: ui.background.surface,
      transparent: 'bg-transparent',
      gradient: GRADIENTS.backgrounds.main,
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
});

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
