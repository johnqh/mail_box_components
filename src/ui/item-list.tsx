import React from 'react';
import { cn } from '../lib/utils';
import { colors, textVariants, ui } from '@sudobility/design';

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
      'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg';

    const variantColors = {
      primary: colors.component.button.primary,
      secondary: colors.component.button.secondary,
      ghost: colors.component.button.ghost,
    };

    const color = variantColors[variant ?? 'secondary'];
    return cn(
      base,
      color.base,
      color.dark,
      color.disabled,
      ui.transition.default
    );
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
          <h2 className={cn(textVariants.heading.h4(), 'truncate')}>{title}</h2>
          {subtitle && (
            <p className={cn(textVariants.body.sm(), 'mt-0.5')}>{subtitle}</p>
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
          <div
            className={cn(
              'w-6 h-6 border-2 border-t-transparent rounded-full animate-spin',
              'border-blue-600 dark:border-blue-400'
            )}
          />
        </div>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          {emptyIcon && (
            <div className={cn('mb-4', textVariants.caption.default())}>
              {emptyIcon}
            </div>
          )}
          <p className={textVariants.body.sm()}>{emptyMessage}</p>
          {emptyAction && (
            <button
              onClick={emptyAction.onClick}
              className={cn(
                textVariants.label.default(),
                'mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
                ui.transition.default
              )}
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
