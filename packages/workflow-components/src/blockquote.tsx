import React from 'react';
import { cn } from '@sudobility/components';

export interface BlockquoteProps {
  /** Quote content */
  children: React.ReactNode;
  /** Citation/author */
  cite?: string;
  /** Variant style */
  variant?: 'default' | 'bordered' | 'accent';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

/**
 * Blockquote Component
 *
 * Displays quoted text with optional citation and various styling options.
 * Uses semantic HTML for proper document structure.
 *
 * @example
 * ```tsx
 * <Blockquote cite="John Doe">
 *   This is a great quote about something important.
 * </Blockquote>
 * ```
 *
 * @example
 * ```tsx
 * <Blockquote variant="accent" size="lg">
 *   Innovation distinguishes between a leader and a follower.
 * </Blockquote>
 * ```
 */
export const Blockquote: React.FC<BlockquoteProps> = ({
  children,
  cite,
  variant = 'default',
  size = 'md',
  className,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: 'text-sm p-3',
    md: 'text-base p-4',
    lg: 'text-lg p-6',
  };

  const citeSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Variant configurations
  const variantClasses = {
    default:
      'border-l-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50',
    bordered:
      'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800',
    accent:
      'border-l-4 border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20',
  };

  return (
    <blockquote
      className={cn(
        'rounded-r-lg',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <p className='text-gray-800 dark:text-gray-200 italic'>{children}</p>
      {cite && (
        <footer
          className={cn(
            'mt-2 text-gray-600 dark:text-gray-400',
            citeSize[size]
          )}
        >
          — <cite className='not-italic font-medium'>{cite}</cite>
        </footer>
      )}
    </blockquote>
  );
};

export default Blockquote;
