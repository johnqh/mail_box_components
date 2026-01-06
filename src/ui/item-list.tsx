import React from 'react';
import { cn } from '../lib/utils';

export interface ItemListAction {
  /** Unique identifier for the action */
  id: string;
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Optional icon to show before label */
  icon?: React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Disabled state */
  disabled?: boolean;
}

export interface ItemListProps<T> {
  /** Header title */
  title: string;
  /** Optional subtitle/description under the title */
  subtitle?: string;
  /** Array of items to display */
  items: T[];
  /** Render function for each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Function to extract unique key for each item */
  keyExtractor: (item: T, index: number) => string;
  /** Optional CTA buttons for the header */
  actions?: ItemListAction[];
  /** Message to show when list is empty */
  emptyMessage?: string;
  /** Optional icon/illustration for empty state */
  emptyIcon?: React.ReactNode;
  /** Optional action for empty state */
  emptyAction?: {
    label: string;
    onClick: () => void;
  };
  /** Show loading state */
  loading?: boolean;
  /** Additional className for the container */
  className?: string;
  /** Additional className for the header */
  headerClassName?: string;
  /** Additional className for the list container */
  listClassName?: string;
  /** Spacing between items */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether to show dividers between items */
  showDividers?: boolean;
}

/**
 * ItemList Component
 *
 * A flexible list component with header, optional CTA buttons, and empty state.
 * Not a table - designed for rendering custom list items without columns.
 *
 * @example
 * ```tsx
 * <ItemList
 *   title="Projects"
 *   items={projects}
 *   renderItem={(project) => (
 *     <div className="p-4">
 *       <h3>{project.name}</h3>
 *       <p>{project.description}</p>
 *     </div>
 *   )}
 *   keyExtractor={(project) => project.id}
 *   actions={[
 *     { id: 'new', label: 'New Project', onClick: handleNew, variant: 'primary' }
 *   ]}
 *   emptyMessage="No projects yet"
 * />
 * ```
 */
export function ItemList<T>({
  title,
  subtitle,
  items,
  renderItem,
  keyExtractor,
  actions,
  emptyMessage = 'No items',
  emptyIcon,
  emptyAction,
  loading = false,
  className,
  headerClassName,
  listClassName,
  spacing = 'none',
  showDividers = false,
}: ItemListProps<T>) {
  const spacingClasses = {
    none: '',
    sm: 'space-y-1',
    md: 'space-y-2',
    lg: 'space-y-4',
  };

  const getButtonClasses = (
    variant: ItemListAction['variant'] = 'secondary'
  ) => {
    const base =
      'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    switch (variant) {
      case 'primary':
        return cn(
          base,
          'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
        );
      case 'ghost':
        return cn(
          base,
          'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
        );
      case 'secondary':
      default:
        return cn(
          base,
          'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        );
    }
  };

  return (
    <div className={cn('', className)}>
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between gap-4 pb-4',
          headerClassName
        )}
      >
        <div className='min-w-0 flex-1'>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100 truncate'>
            {title}
          </h2>
          {subtitle && (
            <p className='mt-0.5 text-sm text-gray-500 dark:text-gray-400'>
              {subtitle}
            </p>
          )}
        </div>

        {actions && actions.length > 0 && (
          <div className='flex items-center gap-2 flex-shrink-0'>
            {actions.map(action => (
              <button
                key={action.id}
                onClick={action.onClick}
                disabled={action.disabled}
                className={getButtonClasses(action.variant)}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className='flex items-center justify-center py-12'>
          <div className='w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin' />
        </div>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          {emptyIcon && (
            <div className='mb-4 text-gray-400 dark:text-gray-500'>
              {emptyIcon}
            </div>
          )}
          <p className='text-gray-500 dark:text-gray-400'>{emptyMessage}</p>
          {emptyAction && (
            <button
              onClick={emptyAction.onClick}
              className='mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
            >
              {emptyAction.label}
            </button>
          )}
        </div>
      )}

      {/* List */}
      {!loading && items.length > 0 && (
        <div
          className={cn(
            spacingClasses[spacing],
            showDividers && 'divide-y divide-gray-200 dark:divide-gray-700',
            listClassName
          )}
        >
          {items.map((item, index) => (
            <div key={keyExtractor(item, index)}>{renderItem(item, index)}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList;
