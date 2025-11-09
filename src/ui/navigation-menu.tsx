import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface NavigationMenuItem {
  /** Item label */
  label: React.ReactNode;
  /** Item href */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Sub-menu items */
  children?: NavigationMenuItem[];
  /** Icon */
  icon?: React.ReactNode;
  /** Active state */
  active?: boolean;
}

export interface NavigationMenuProps {
  /** Menu items */
  items: NavigationMenuItem[];
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Additional className */
  className?: string;
}

/**
 * NavigationMenu Component
 *
 * Hierarchical navigation menu with sub-menus.
 * Supports horizontal and vertical orientations.
 *
 * @example
 * ```tsx
 * <NavigationMenu
 *   items={[
 *     { label: 'Home', href: '/' },
 *     {
 *       label: 'Products',
 *       children: [
 *         { label: 'Category 1', href: '/products/cat1' },
 *         { label: 'Category 2', href: '/products/cat2' }
 *       ]
 *     },
 *     { label: 'About', href: '/about' }
 *   ]}
 * />
 * ```
 */
export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  orientation = 'horizontal',
  className,
}) => {
  const [openMenus, setOpenMenus] = useState<Set<number>>(new Set());

  const toggleMenu = (index: number) => {
    setOpenMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const renderItem = (item: NavigationMenuItem, index: number) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus.has(index);

    const ItemContent = (
      <>
        {item.icon && (
          <span className="flex-shrink-0 w-4 h-4">{item.icon}</span>
        )}
        <span className="flex-1">{item.label}</span>
        {hasChildren && (
          <svg
            className={cn(
              'w-4 h-4 transition-transform',
              orientation === 'horizontal' && !isOpen && '-rotate-90',
              isOpen && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </>
    );

    const baseClasses = cn(
      'flex items-center gap-2 px-4 py-2 text-sm font-medium',
      'transition-colors',
      item.active
        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
    );

    return (
      <div key={index}>
        {hasChildren ? (
          <button
            onClick={() => toggleMenu(index)}
            className={cn(baseClasses, 'w-full')}
          >
            {ItemContent}
          </button>
        ) : item.href ? (
          <a href={item.href} className={baseClasses} onClick={item.onClick}>
            {ItemContent}
          </a>
        ) : (
          <button onClick={item.onClick} className={cn(baseClasses, 'w-full')}>
            {ItemContent}
          </button>
        )}

        {/* Sub-menu */}
        {hasChildren && isOpen && (
          <div
            className={cn(
              'bg-gray-50 dark:bg-gray-800/50',
              orientation === 'horizontal' ? 'pl-4' : 'border-l-2 border-gray-200 dark:border-gray-700 ml-4'
            )}
          >
            {item.children!.map((child, childIndex) => (
              <div key={childIndex}>
                {child.href ? (
                  <a
                    href={child.href}
                    onClick={child.onClick}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 text-sm',
                      'transition-colors',
                      child.active
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                  >
                    {child.icon && (
                      <span className="flex-shrink-0 w-4 h-4">{child.icon}</span>
                    )}
                    {child.label}
                  </a>
                ) : (
                  <button
                    onClick={child.onClick}
                    className={cn(
                      'w-full flex items-center gap-2 px-4 py-2 text-sm',
                      'transition-colors',
                      child.active
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                  >
                    {child.icon && (
                      <span className="flex-shrink-0 w-4 h-4">{child.icon}</span>
                    )}
                    {child.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={cn(
        'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg',
        orientation === 'horizontal' ? 'flex flex-wrap' : 'flex flex-col',
        className
      )}
    >
      {items.map((item, index) => renderItem(item, index))}
    </nav>
  );
};

export default NavigationMenu;
