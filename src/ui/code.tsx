import React from 'react';
import { cn } from '../lib/utils';
import { colors, textVariants } from '@sudobility/design';

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
    sm: textVariants.code.small(),
    md: textVariants.code.inline(),
    lg: 'text-base px-2 py-1',
  };

  // Variant configurations (default uses design system code styling, colored variants use alert colors)
  const variantClasses = {
    default: '',
    primary: `${colors.component.alert.info.base} ${colors.component.alert.info.dark}`,
    success: `${colors.component.alert.success.base} ${colors.component.alert.success.dark}`,
    warning: `${colors.component.alert.warning.base} ${colors.component.alert.warning.dark}`,
    danger: `${colors.component.alert.error.base} ${colors.component.alert.error.dark}`,
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
