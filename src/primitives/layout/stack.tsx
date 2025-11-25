import React from 'react';
import { cn } from '../../lib/utils';

export interface StackProps {
  /** Stack content */
  children: React.ReactNode;
  /** Stack direction */
  direction?: 'vertical' | 'horizontal';
  /** Spacing between items */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Align items */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Justify content */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Wrap items */
  wrap?: boolean;
  /** Full width/height */
  full?: boolean;
  /** Divider between items */
  divider?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Stack Component
 *
 * Flexbox-based layout component for arranging children vertically or horizontally
 * with consistent spacing. Supports alignment, wrapping, and dividers.
 *
 * @example
 * ```tsx
 * <Stack spacing="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 *
 * @example
 * ```tsx
 * <Stack
 *   direction="horizontal"
 *   spacing="lg"
 *   align="center"
 *   justify="between"
 * >
 *   <Button>Cancel</Button>
 *   <Button>Save</Button>
 * </Stack>
 * ```
 */
export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'vertical',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  full = false,
  divider = false,
  className,
}) => {
  const isVertical = direction === 'vertical';

  // Spacing configurations
  const spacingClasses = {
    vertical: {
      none: '',
      xs: 'space-y-1',
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6',
      xl: 'space-y-8',
      '2xl': 'space-y-12',
    },
    horizontal: {
      none: '',
      xs: 'space-x-1',
      sm: 'space-x-2',
      md: 'space-x-4',
      lg: 'space-x-6',
      xl: 'space-x-8',
      '2xl': 'space-x-12',
    },
  };

  // Gap classes for divider support
  const gapClasses = {
    vertical: {
      none: '',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
    horizontal: {
      none: '',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
  };

  // Align items configurations
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  // Justify content configurations
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  return (
    <div
      className={cn(
        'flex',
        isVertical ? 'flex-col' : 'flex-row',
        divider
          ? gapClasses[direction][spacing]
          : spacingClasses[direction][spacing],
        alignClasses[align],
        justifyClasses[justify],
        wrap && 'flex-wrap',
        full && (isVertical ? 'h-full' : 'w-full'),
        className
      )}
    >
      {divider
        ? React.Children.map(children, (child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < React.Children.count(children) - 1 && (
                <div
                  className={cn(
                    'bg-gray-200 dark:bg-gray-700',
                    isVertical ? 'h-px w-full' : 'w-px h-full'
                  )}
                />
              )}
            </React.Fragment>
          ))
        : children}
    </div>
  );
};

/**
 * VStack - Vertical Stack (alias for Stack with direction="vertical")
 */
export const VStack: React.FC<Omit<StackProps, 'direction'>> = props => (
  <Stack direction='vertical' {...props} />
);

/**
 * HStack - Horizontal Stack (alias for Stack with direction="horizontal")
 */
export const HStack: React.FC<Omit<StackProps, 'direction'>> = props => (
  <Stack direction='horizontal' {...props} />
);
