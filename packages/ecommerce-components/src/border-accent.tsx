import React from 'react';
import { cn } from '@sudobility/components';

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
  // Color variants
  const colorClasses = {
    blue: 'border-blue-500 dark:border-blue-400',
    green: 'border-green-500 dark:border-green-400',
    purple: 'border-purple-500 dark:border-purple-400',
    indigo: 'border-indigo-500 dark:border-indigo-400',
    emerald: 'border-emerald-500 dark:border-emerald-400',
    orange: 'border-orange-500 dark:border-orange-400',
    red: 'border-red-500 dark:border-red-400',
    gray: 'border-gray-400 dark:border-gray-500',
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

export default BorderAccent;
