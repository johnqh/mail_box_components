import React from 'react';
import { cn } from '../lib/utils';

export interface BreadcrumbItem {
  /** Item label */
  label: React.ReactNode;
  /** Item href (optional for links) */
  href?: string;
  /** Click handler (for non-link items) */
  onClick?: () => void;
  /** Whether item is current page */
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator between items */
  separator?: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

/**
 * Breadcrumb Component
 *
 * Navigation breadcrumb trail showing current page hierarchy.
 * Supports links, click handlers, and custom separators.
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Item', isCurrent: true }
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={breadcrumbs}
 *   separator={<ChevronRightIcon />}
 *   size="sm"
 * />
 * ```
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  size = 'md',
  className,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', sizeClasses[size], className)}>
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.isCurrent || isLast;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href ? (
                <a
                  href={item.href}
                  className={cn(
                    'transition-colors',
                    isCurrent
                      ? 'text-gray-900 dark:text-white font-medium cursor-default'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  )}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ) : item.onClick ? (
                <button
                  onClick={item.onClick}
                  className={cn(
                    'transition-colors',
                    isCurrent
                      ? 'text-gray-900 dark:text-white font-medium cursor-default'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  )}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ) : (
                <span
                  className={cn(
                    isCurrent
                      ? 'text-gray-900 dark:text-white font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span
                  className="text-gray-400 dark:text-gray-600 select-none"
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
