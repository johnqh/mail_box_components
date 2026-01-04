import React from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

/** Tracking event data for link interactions */
export interface LinkTrackingData {
  /** Action performed */
  action: 'click';
  /** Optional custom label for tracking */
  trackingLabel?: string;
  /** Optional component context */
  componentName?: string;
}

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
  /** Optional callback for tracking link clicks */
  onTrack?: (data: LinkTrackingData) => void;
  /** Custom label for tracking (defaults to link text) */
  trackingLabel?: string;
  /** Component name for tracking context */
  componentName?: string;
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
  onTrack,
  trackingLabel,
  componentName,
  onClick,
  ...props
}) => {
  // Auto-detect external links
  const isExternal =
    external || href.startsWith('http://') || href.startsWith('https://');

  // Variant configurations
  const variantClasses = {
    default:
      'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
    primary:
      'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium',
    secondary:
      'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
    muted:
      'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
    underline:
      'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline',
  };

  // External link attributes
  const externalAttrs = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  // Handle click with optional tracking
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onTrack) {
      onTrack({
        action: 'click',
        trackingLabel,
        componentName,
      });
    }
    onClick?.(event);
  };

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
          <ArrowTopRightOnSquareIcon className='inline-block h-4 w-4 ml-1' />
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
      onClick={handleClick}
      {...externalAttrs}
      {...props}
    >
      {children}
      {showExternalIcon && isExternal && (
        <ArrowTopRightOnSquareIcon className='inline-block h-4 w-4 ml-1 flex-shrink-0' />
      )}
    </a>
  );
};
