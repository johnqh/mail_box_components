import React from 'react';
import { cn } from '../../lib/utils';

export interface BorderAccentProps {
  /** Content to display */
  children: React.ReactNode;
  /** Color variant for the border */
  variant?:
    | 'blue'
    | 'green'
    | 'purple'
    | 'indigo'
    | 'emerald'
    | 'orange'
    | 'red'
    | 'gray';
  /** Border position */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** Border width */
  width?: 'thin' | 'medium' | 'thick';
  /** Padding size */
  padding?: 'sm' | 'md' | 'lg';
  /** Additional className for the container */
  className?: string;
}

/**
 * BorderAccent Component
 *
 * A content container with a colored accent border on one side.
 * Commonly used for highlighting sections, quotes, or important information.
 *
 * @example
 * ```tsx
 * <BorderAccent variant="blue" position="left">
 *   <h4>Time Freedom</h4>
 *   <p>Delegate your email management to trusted team members</p>
 * </BorderAccent>
 * ```
 *
 * @example
 * ```tsx
 * // As a blockquote
 * <BorderAccent variant="purple" position="left" padding="lg">
 *   <blockquote className="italic">
 *     "This feature changed how we manage team communications"
 *   </blockquote>
 * </BorderAccent>
 * ```
 */
export const BorderAccent: React.FC<BorderAccentProps> = ({
  children,
  variant = 'blue',
  position = 'left',
  width = 'thick',
  padding = 'md',
  className,
}) => {
  // Color variants mapped to semantic theme tokens (theme-aware)
  const colorClasses = {
    blue: 'border-primary',
    green: 'border-success',
    purple: 'border-accent',
    indigo: 'border-primary',
    emerald: 'border-success',
    orange: 'border-warning',
    red: 'border-destructive',
    gray: 'border-border',
  };

  // Border position classes
  const positionClasses = {
    left: 'border-l',
    right: 'border-r',
    top: 'border-t',
    bottom: 'border-b',
  };

  // Border width classes
  const widthClasses = {
    thin: '2',
    medium: '3',
    thick: '4',
  };

  // Padding classes based on position
  const paddingClasses = {
    left: {
      sm: 'pl-3',
      md: 'pl-4',
      lg: 'pl-6',
    },
    right: {
      sm: 'pr-3',
      md: 'pr-4',
      lg: 'pr-6',
    },
    top: {
      sm: 'pt-3',
      md: 'pt-4',
      lg: 'pt-6',
    },
    bottom: {
      sm: 'pb-3',
      md: 'pb-4',
      lg: 'pb-6',
    },
  };

  const borderClass = `${positionClasses[position]}-${widthClasses[width]}`;

  return (
    <div
      className={cn(
        borderClass,
        colorClasses[variant],
        paddingClasses[position][padding],
        className
      )}
    >
      {children}
    </div>
  );
};
