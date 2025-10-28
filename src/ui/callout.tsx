/**
 * Callout Component
 *
 * A simple gradient highlight box for important messages, benefits, or key points.
 * Perfect for drawing attention to specific content with visual emphasis.
 *
 * @example
 * ```tsx
 * import { Callout } from '@/components/ui';
 *
 * <Callout variant="primary">
 *   🔐 Cryptographic security meets user convenience
 * </Callout>
 *
 * <Callout variant="success" icon="✨">
 *   Your changes have been saved successfully
 * </Callout>
 * ```
 */

import React from 'react';
import { cn } from '../lib/utils';

export type CalloutVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'purple';

export interface CalloutProps {
  /**
   * Visual variant with different gradient colors
   */
  variant?: CalloutVariant;

  /**
   * Optional icon or emoji to display before text
   */
  icon?: React.ReactNode;

  /**
   * Content to display (can be text or React nodes)
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

const variantStyles: Record<
  CalloutVariant,
  {
    background: string;
    text: string;
    border?: string;
  }
> = {
  primary: {
    background:
      'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
    text: 'text-blue-700 dark:text-blue-300',
  },
  secondary: {
    background:
      'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50',
    text: 'text-gray-700 dark:text-gray-300',
  },
  success: {
    background:
      'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    text: 'text-green-700 dark:text-green-300',
  },
  warning: {
    background:
      'bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20',
    text: 'text-orange-700 dark:text-orange-300',
  },
  info: {
    background:
      'bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20',
    text: 'text-cyan-700 dark:text-cyan-300',
  },
  purple: {
    background:
      'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    text: 'text-purple-700 dark:text-purple-300',
  },
};

export const Callout: React.FC<CalloutProps> = ({
  variant = 'primary',
  icon,
  children,
  className,
}) => {
  const styles = variantStyles[variant];

  // Check if children is a string to apply proper styling
  const isTextContent = typeof children === 'string';

  return (
    <div className={cn('rounded-xl p-6', styles.background, className)}>
      {isTextContent ? (
        <p className={cn('text-lg font-semibold', styles.text)}>
          {icon && <span className='mr-2'>{icon}</span>}
          {children}
        </p>
      ) : (
        <div className={cn('text-lg font-semibold', styles.text)}>
          {icon && <span className='mr-2 inline-block'>{icon}</span>}
          {children}
        </div>
      )}
    </div>
  );
};

export default Callout;
