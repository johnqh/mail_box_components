import React from 'react';
import { cn } from '../../lib/utils';

export interface CodeProps {
  /** Code content */
  children: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /** Additional className */
  className?: string;
}

/**
 * Code Component
 *
 * Displays inline code snippets with monospace font and consistent styling.
 * Different from CodeDisplay which is for multi-line code blocks.
 *
 * @example
 * ```tsx
 * <Text>Use the <Code>useState</Code> hook</Text>
 * ```
 *
 * @example
 * ```tsx
 * <Code variant="primary" size="lg">
 *   npm install
 * </Code>
 * ```
 */
export const Code: React.FC<CodeProps> = ({
  children,
  size = 'md',
  variant = 'default',
  className,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: 'text-xs px-1 py-0.5',
    md: 'text-sm px-1.5 py-0.5',
    lg: 'text-base px-2 py-1',
  };

  // Variant configurations
  const variantClasses = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100',
    primary: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    success:
      'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    warning:
      'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    danger: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  };

  return (
    <code
      className={cn(
        'inline-block font-mono font-medium rounded',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </code>
  );
};

export default Code;
