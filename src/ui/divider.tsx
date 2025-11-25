import React from 'react';
import { cn } from '../lib/utils';
import { textVariants } from '@sudobility/design';

export interface DividerProps {
  /** Optional text label */
  label?: string;
  /** Label position */
  labelPosition?: 'left' | 'center' | 'right';
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Spacing around the divider */
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Line thickness */
  thickness?: 'thin' | 'medium' | 'thick';
  /** Color variant */
  variant?: 'light' | 'medium' | 'dark';
  /** Additional className for the container */
  className?: string;
  /** Additional className for the line */
  lineClassName?: string;
}

/**
 * Divider Component
 *
 * A visual separator for content sections with optional label support.
 * Can be used horizontally or vertically to divide content areas.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider label="OR" labelPosition="center" />
 * <Divider spacing="lg" variant="medium" />
 * ```
 *
 * @example
 * ```tsx
 * // Vertical divider
 * <div className="flex gap-4">
 *   <div>Content 1</div>
 *   <Divider orientation="vertical" />
 *   <div>Content 2</div>
 * </div>
 * ```
 */
export const Divider: React.FC<DividerProps> = ({
  label,
  labelPosition = 'center',
  orientation = 'horizontal',
  spacing = 'md',
  thickness = 'thin',
  variant = 'light',
  className,
  lineClassName,
}) => {
  // Spacing configurations
  const spacingClasses = {
    horizontal: {
      none: 'my-0',
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-6',
      xl: 'my-8',
    },
    vertical: {
      none: 'mx-0',
      sm: 'mx-2',
      md: 'mx-4',
      lg: 'mx-6',
      xl: 'mx-8',
    },
  };

  // Thickness configurations
  const thicknessClasses = {
    horizontal: {
      thin: 'border-t',
      medium: 'border-t-2',
      thick: 'border-t-4',
    },
    vertical: {
      thin: 'border-l',
      medium: 'border-l-2',
      thick: 'border-l-4',
    },
  };

  // Color variant configurations
  const variantClasses = {
    light: 'border-gray-200 dark:border-gray-700',
    medium: 'border-gray-300 dark:border-gray-600',
    dark: 'border-gray-400 dark:border-gray-500',
  };

  // Vertical divider
  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'self-stretch',
          thicknessClasses.vertical[thickness],
          variantClasses[variant],
          spacingClasses.vertical[spacing],
          className
        )}
        role='separator'
        aria-orientation='vertical'
      />
    );
  }

  // Horizontal divider without label
  if (!label) {
    return (
      <hr
        className={cn(
          thicknessClasses.horizontal[thickness],
          variantClasses[variant],
          spacingClasses.horizontal[spacing],
          lineClassName,
          className
        )}
        role='separator'
        aria-orientation='horizontal'
      />
    );
  }

  // Horizontal divider with label
  const labelPositionClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div
      className={cn(
        'flex items-center',
        spacingClasses.horizontal[spacing],
        labelPositionClasses[labelPosition],
        className
      )}
      role='separator'
      aria-orientation='horizontal'
    >
      {labelPosition !== 'left' && (
        <div
          className={cn(
            'flex-1',
            thicknessClasses.horizontal[thickness],
            variantClasses[variant],
            lineClassName
          )}
        />
      )}
      <span
        className={cn(
          textVariants.body.sm(),
          'px-3 text-gray-500 dark:text-gray-400 whitespace-nowrap'
        )}
      >
        {label}
      </span>
      {labelPosition !== 'right' && (
        <div
          className={cn(
            'flex-1',
            thicknessClasses.horizontal[thickness],
            variantClasses[variant],
            lineClassName
          )}
        />
      )}
    </div>
  );
};
