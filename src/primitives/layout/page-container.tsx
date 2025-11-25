import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
// Removed ui import - using hardcoded styles for compatibility

const pageContainerVariants = cva('min-h-screen flex flex-col', {
  variants: {
    background: {
      default: 'bg-gray-50 dark:bg-gray-900',
      surface: 'bg-white dark:bg-gray-800',
      transparent: 'bg-transparent',
      gradient:
        'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20',
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

interface PageContainerProps
  extends VariantProps<typeof pageContainerVariants> {
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
