import React from 'react';
import { cn } from '../lib/utils';
import { colors } from '@sudobility/design';

export interface CodeDisplayProps {
  /** Code or text to display */
  children: React.ReactNode;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'neutral';
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Display as inline or block */
  inline?: boolean;
  /** Text alignment (for block display) */
  align?: 'left' | 'center' | 'right';
  /** Additional className for the container */
  className?: string;
  /** Whether to enable text wrapping */
  wrap?: boolean;
}

/**
 * CodeDisplay Component
 *
 * Displays code, wallet addresses, or monospace text in a styled container.
 * Commonly used for displaying blockchain addresses, code snippets, or
 * technical identifiers.
 *
 * @example
 * ```tsx
 * <CodeDisplay variant="primary" size="lg" align="center">
 *   wallet@example.com
 * </CodeDisplay>
 * ```
 *
 * @example
 * ```tsx
 * <CodeDisplay variant="success" inline>
 *   0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
 * </CodeDisplay>
 * ```
 */
export const CodeDisplay: React.FC<CodeDisplayProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  inline = false,
  align = 'left',
  className,
  wrap = false,
}) => {
  // Color variant configurations (design system alert colors where available)
  const variantClasses = {
    primary: `${colors.component.alert.info.base} ${colors.component.alert.info.dark}`,
    secondary:
      'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30',
    success: `${colors.component.alert.success.base} ${colors.component.alert.success.dark}`,
    warning: `${colors.component.alert.warning.base} ${colors.component.alert.warning.dark}`,
    neutral: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100',
  };

  // Size configurations
  const sizeClasses = {
    xs: {
      text: 'text-xs',
      padding: inline ? 'px-1.5 py-0.5' : 'px-2 py-1',
    },
    sm: {
      text: 'text-sm',
      padding: inline ? 'px-2 py-0.5' : 'px-3 py-1.5',
    },
    md: {
      text: 'text-base',
      padding: inline ? 'px-2.5 py-1' : 'px-4 py-2',
    },
    lg: {
      text: 'text-lg',
      padding: inline ? 'px-3 py-1' : 'px-4 py-2',
    },
  };

  // Text alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const sizeConfig = sizeClasses[size];
  const Element = inline ? 'code' : 'div';

  return (
    <Element
      className={cn(
        'font-mono rounded-lg',
        variantClasses[variant],
        sizeConfig.text,
        sizeConfig.padding,
        !inline && alignClasses[align],
        inline ? 'inline-block' : 'block',
        !wrap && 'overflow-x-auto whitespace-nowrap',
        wrap && 'break-all',
        className
      )}
    >
      {children}
    </Element>
  );
};
