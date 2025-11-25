import React from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';
import { textVariants } from '@sudobility/design';

export interface ExternalLinkProps {
  /** Link URL */
  href: string;
  /** Link text content */
  children: React.ReactNode;
  /** Show external icon */
  showIcon?: boolean;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'default' | 'primary' | 'muted';
  /** Additional className */
  className?: string;
  /** Click handler (called before navigation) */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * ExternalLink Component
 *
 * Secure external link with optional icon indicator.
 * Automatically includes rel="noopener noreferrer" for security.
 *
 * @example
 * ```tsx
 * <ExternalLink href="https://example.com">
 *   Visit Example
 * </ExternalLink>
 * ```
 *
 * @example
 * ```tsx
 * <ExternalLink
 *   href="https://docs.example.com"
 *   variant="primary"
 *   iconPosition="left"
 * >
 *   Read Documentation
 * </ExternalLink>
 * ```
 */
export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  showIcon = true,
  iconPosition = 'right',
  size = 'md',
  variant = 'default',
  className,
  onClick,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      text: textVariants.body.sm(),
      icon: 'h-3 w-3',
      gap: 'gap-1',
    },
    md: {
      text: textVariants.body.md(),
      icon: 'h-4 w-4',
      gap: 'gap-1.5',
    },
    lg: {
      text: textVariants.body.lg(),
      icon: 'h-5 w-5',
      gap: 'gap-2',
    },
  };

  // Color variant configurations
  const variantClasses = {
    default:
      'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
    primary:
      'text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 font-semibold',
    muted:
      'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200',
  };

  const sizeConfig = sizeClasses[size];

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      onClick={onClick}
      className={cn(
        'inline-flex items-center',
        sizeConfig.gap,
        sizeConfig.text,
        variantClasses[variant],
        'underline decoration-1 underline-offset-2',
        'hover:decoration-2',
        'transition-all duration-200',
        className
      )}
    >
      {showIcon && iconPosition === 'left' && (
        <ArrowTopRightOnSquareIcon
          className={cn(sizeConfig.icon, 'flex-shrink-0')}
        />
      )}
      <span>{children}</span>
      {showIcon && iconPosition === 'right' && (
        <ArrowTopRightOnSquareIcon
          className={cn(sizeConfig.icon, 'flex-shrink-0')}
        />
      )}
    </a>
  );
};
