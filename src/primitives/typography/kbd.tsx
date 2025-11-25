import React from 'react';
import { cn } from '../../lib/utils';

export interface KbdProps {
  /** Keyboard key(s) to display */
  children: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

/**
 * Kbd Component
 *
 * Displays keyboard shortcuts with semantic HTML and consistent styling.
 * Used to represent user input from keyboard.
 *
 * @example
 * ```tsx
 * <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>
 * ```
 *
 * @example
 * ```tsx
 * <Text>Press <Kbd size="sm">Enter</Kbd> to submit</Text>
 * ```
 */
export const Kbd: React.FC<KbdProps> = ({
  children,
  size = 'md',
  className,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-2.5 py-1.5',
  };

  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center',
        'font-mono font-semibold',
        'bg-gray-100 dark:bg-gray-800',
        'text-gray-900 dark:text-gray-100',
        'border border-gray-300 dark:border-gray-600',
        'rounded shadow-sm',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </kbd>
  );
};
