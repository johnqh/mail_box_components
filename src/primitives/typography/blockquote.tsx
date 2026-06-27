import React from 'react';
import { cn } from '../../lib/utils';

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
    default: 'border-l-4 border-border bg-muted',
    bordered: 'border border-border bg-card',
    accent: 'border-l-4 border-primary bg-accent',
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
      <p className='text-foreground italic'>{children}</p>
      {cite && (
        <footer className={cn('mt-2 text-muted-foreground', citeSize[size])}>
          — <cite className='not-italic font-medium'>{cite}</cite>
        </footer>
      )}
    </blockquote>
  );
};
