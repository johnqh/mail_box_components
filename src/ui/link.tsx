import React from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link URL */
  href: string;
  /** Link content */
  children: React.ReactNode;
  /** Variant style */
  variant?: 'default' | 'primary' | 'secondary' | 'muted' | 'underline';
  /** External link (adds target and rel attributes) */
  external?: boolean;
  /** Show external icon */
  showExternalIcon?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Link Component
 *
 * Versatile link component with variants and automatic external link handling.
 * Adds security attributes for external links automatically.
 *
 * @example
 * ```tsx
 * <Link href="/dashboard">Go to Dashboard</Link>
 * <Link href="https://example.com" external>External Site</Link>
 * ```
 *
 * @example
 * ```tsx
 * <Link
 *   href="https://docs.example.com"
 *   variant="primary"
 *   external
 *   showExternalIcon
 * >
 *   Documentation
 * </Link>
 * ```
 */
export const Link: React.FC<LinkProps> = ({
  href,
  children,
  variant = 'default',
  external = false,
  showExternalIcon = false,
  disabled = false,
  className,
  ...props
}) => {
  // Auto-detect external links
  const isExternal = external || href.startsWith('http://') || href.startsWith('https://');

  // Variant configurations
  const variantClasses = {
    default: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
    primary: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium',
    secondary: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
    muted: 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
    underline: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline',
  };

  // External link attributes
  const externalAttrs = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  if (disabled) {
    return (
      <span
        className={cn(
          'cursor-not-allowed opacity-50',
          variantClasses[variant],
          className
        )}
      >
        {children}
        {showExternalIcon && isExternal && (
          <ArrowTopRightOnSquareIcon className="inline-block h-4 w-4 ml-1" />
        )}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center transition-colors',
        variantClasses[variant],
        className
      )}
      {...externalAttrs}
      {...props}
    >
      {children}
      {showExternalIcon && isExternal && (
        <ArrowTopRightOnSquareIcon className="inline-block h-4 w-4 ml-1 flex-shrink-0" />
      )}
    </a>
  );
};

export default Link;
