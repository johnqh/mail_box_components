import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface BreadcrumbItem {
  /** Item label */
  label: React.ReactNode;
  /** Item href (optional for links) */
  href?: string;
  /** Click handler (for non-link items) */
  onClick?: () => void;
  /** Icon to display before label */
  icon?: React.ReactNode;
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
  /** Maximum items to display before collapsing */
  maxItems?: number;
  /** Custom item renderer */
  renderItem?: (
    item: BreadcrumbItem,
    index: number,
    isLast: boolean
  ) => React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Breadcrumb Component
 *
 * Navigation breadcrumb trail showing current page hierarchy.
 * Supports links, click handlers, custom separators, and collapsing.
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
 *   maxItems={4}
 * />
 * ```
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  size = 'md',
  maxItems,
  renderItem,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Size configurations
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Determine which items to display
  const getDisplayItems = (): (BreadcrumbItem | { type: 'ellipsis' })[] => {
    if (!maxItems || items.length <= maxItems || isExpanded) {
      return items;
    }

    // Show first item, ellipsis, and last (maxItems - 2) items
    const firstItems = items.slice(0, 1);
    const lastItems = items.slice(-(maxItems - 2));
    return [...firstItems, { type: 'ellipsis' as const }, ...lastItems];
  };

  const displayItems = getDisplayItems();

  const renderBreadcrumbItem = (
    item: BreadcrumbItem,
    index: number,
    isLast: boolean
  ) => {
    if (renderItem) {
      return renderItem(item, index, isLast);
    }

    const isCurrent = item.isCurrent || isLast;

    // Last item should NEVER be a link, even if href is provided
    if (isLast) {
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5',
            'text-gray-900 dark:text-white font-medium'
          )}
          aria-current='page'
        >
          {item.icon && <span className='flex-shrink-0'>{item.icon}</span>}
          {item.label}
        </span>
      );
    }

    // Render based on href or onClick
    if (item.href) {
      return (
        <a
          href={item.href}
          className={cn(
            'inline-flex items-center gap-1.5',
            'transition-colors',
            'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          )}
          aria-current={isCurrent ? 'page' : undefined}
        >
          {item.icon && <span className='flex-shrink-0'>{item.icon}</span>}
          {item.label}
        </a>
      );
    }

    if (item.onClick) {
      return (
        <button
          onClick={item.onClick}
          className={cn(
            'inline-flex items-center gap-1.5',
            'transition-colors',
            'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          )}
          aria-current={isCurrent ? 'page' : undefined}
        >
          {item.icon && <span className='flex-shrink-0'>{item.icon}</span>}
          {item.label}
        </button>
      );
    }

    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5',
          isCurrent
            ? 'text-gray-900 dark:text-white font-medium'
            : 'text-gray-600 dark:text-gray-400'
        )}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {item.icon && <span className='flex-shrink-0'>{item.icon}</span>}
        {item.label}
      </span>
    );
  };

  return (
    <nav
      aria-label='Breadcrumb'
      className={cn('flex items-center', sizeClasses[size], className)}
    >
      <ol className='flex items-center gap-2'>
        {displayItems.map((item, index) => {
          // Handle ellipsis
          if ('type' in item && item.type === 'ellipsis') {
            return (
              <li key='ellipsis' className='flex items-center gap-2'>
                <button
                  onClick={() => setIsExpanded(true)}
                  className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-1'
                  aria-label='Show all breadcrumb items'
                >
                  ...
                </button>
                <span
                  className='text-gray-400 dark:text-gray-600 select-none'
                  aria-hidden='true'
                >
                  {separator}
                </span>
              </li>
            );
          }

          const isLast = index === displayItems.length - 1;
          const breadcrumbItem = item as BreadcrumbItem;

          return (
            <li key={index} className='flex items-center gap-2'>
              {renderBreadcrumbItem(breadcrumbItem, index, isLast)}

              {!isLast && (
                <span
                  className='text-gray-400 dark:text-gray-600 select-none'
                  aria-hidden='true'
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
