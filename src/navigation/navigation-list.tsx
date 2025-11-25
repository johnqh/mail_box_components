import React from 'react';
import { cn } from '../lib/utils';
import { textVariants } from '@sudobility/design';

export interface NavigationItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label: string;
  /** Optional description/subtitle */
  description?: string;
  /** Icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Path or identifier for selection */
  path: string;
  /** Optional badge count */
  badge?: number;
  /** Whether the item is disabled */
  disabled?: boolean;
}

export interface NavigationListProps {
  /** Array of navigation items */
  items: NavigationItem[];
  /** Currently selected item path */
  selectedPath?: string;
  /** Callback when an item is selected */
  onSelect: (path: string) => void;
  /** Variant of the navigation list */
  variant?: 'default' | 'compact' | 'sidebar';
  /** Additional className for the container */
  className?: string;
}

/**
 * NavigationList Component
 *
 * Displays a list of navigation items with icons, labels, and descriptions.
 * Commonly used in settings pages and documentation for master-detail layouts.
 *
 * @example
 * ```tsx
 * const items = [
 *   {
 *     id: 'general',
 *     label: 'General',
 *     description: 'Basic account settings',
 *     icon: Cog6ToothIcon,
 *     path: '/settings/general'
 *   },
 *   // ...
 * ];
 *
 * <NavigationList
 *   items={items}
 *   selectedPath={currentPath}
 *   onSelect={handleSelect}
 * />
 * ```
 */
export const NavigationList: React.FC<NavigationListProps> = ({
  items,
  selectedPath,
  onSelect,
  variant = 'default',
  className,
}) => {
  const containerClass = variant === 'compact' ? 'space-y-1' : 'space-y-0';

  return (
    <div className={cn(containerClass, className)}>
      {items.map(item => {
        const Icon = item.icon;
        const isSelected = selectedPath === item.path;
        const isDisabled = item.disabled;

        const baseClass = cn(
          'flex items-start cursor-pointer transition-colors',
          variant === 'compact'
            ? 'p-3 rounded-lg'
            : 'p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0',
          isDisabled && 'opacity-50 cursor-not-allowed'
        );

        const stateClass = isSelected
          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300';

        return (
          <div
            key={item.id}
            onClick={() => !isDisabled && onSelect(item.path)}
            className={cn(baseClass, !isDisabled && stateClass)}
            role='button'
            tabIndex={isDisabled ? -1 : 0}
            aria-current={isSelected ? 'page' : undefined}
            aria-disabled={isDisabled}
            onKeyDown={e => {
              if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onSelect(item.path);
              }
            }}
          >
            <Icon className='h-5 w-5 mt-0.5 mr-3 flex-shrink-0' />
            <div className='flex-1 min-w-0'>
              <div className={cn('font-medium', textVariants.body.md())}>
                {item.label}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className='ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full'>
                    {item.badge}
                  </span>
                )}
              </div>
              {item.description && (
                <div
                  className={cn(
                    'text-xs text-gray-500 dark:text-gray-400 mt-0.5'
                  )}
                >
                  {item.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
