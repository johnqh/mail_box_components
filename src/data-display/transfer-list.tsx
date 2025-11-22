import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface TransferListItem {
  /** Item ID */
  id: string;
  /** Item label */
  label: string;
  /** Optional description */
  description?: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface TransferListProps {
  /** Available items */
  source: TransferListItem[];
  /** Selected items */
  target: TransferListItem[];
  /** Change handler */
  onChange: (source: TransferListItem[], target: TransferListItem[]) => void;
  /** Source list title */
  sourceTitle?: string;
  /** Target list title */
  targetTitle?: string;
  /** Enable search */
  searchable?: boolean;
  /** Source search placeholder */
  sourceSearchPlaceholder?: string;
  /** Target search placeholder */
  targetSearchPlaceholder?: string;
  /** List height */
  height?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * TransferList Component
 *
 * Dual-list component for moving items between available and selected.
 * Supports search, bulk operations, and individual item transfer.
 *
 * @example
 * ```tsx
 * <TransferList
 *   source={availableUsers}
 *   target={selectedUsers}
 *   onChange={(source, target) => {
 *     setAvailableUsers(source);
 *     setSelectedUsers(target);
 *   }}
 *   sourceTitle="Available Users"
 *   targetTitle="Selected Users"
 *   searchable
 * />
 * ```
 *
 * @example
 * ```tsx
 * <TransferList
 *   source={allPermissions}
 *   target={rolePermissions}
 *   onChange={handlePermissionChange}
 *   height={400}
 * />
 * ```
 */
export const TransferList: React.FC<TransferListProps> = ({
  source,
  target,
  onChange,
  sourceTitle = 'Available',
  targetTitle = 'Selected',
  searchable = true,
  sourceSearchPlaceholder = 'Search available...',
  targetSearchPlaceholder = 'Search selected...',
  height = 300,
  disabled = false,
  className,
}) => {
  const [sourceSearch, setSourceSearch] = useState('');
  const [targetSearch, setTargetSearch] = useState('');
  const [sourceSelected, setSourceSelected] = useState<Set<string>>(new Set());
  const [targetSelected, setTargetSelected] = useState<Set<string>>(new Set());

  // Filter items based on search
  const filteredSource = searchable
    ? source.filter(item =>
        item.label.toLowerCase().includes(sourceSearch.toLowerCase())
      )
    : source;

  const filteredTarget = searchable
    ? target.filter(item =>
        item.label.toLowerCase().includes(targetSearch.toLowerCase())
      )
    : target;

  // Toggle item selection
  const toggleSourceSelection = (id: string) => {
    const newSet = new Set(sourceSelected);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSourceSelected(newSet);
  };

  const toggleTargetSelection = (id: string) => {
    const newSet = new Set(targetSelected);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setTargetSelected(newSet);
  };

  // Move selected items to target
  const moveToTarget = () => {
    const itemsToMove = source.filter(item => sourceSelected.has(item.id));
    const newSource = source.filter(item => !sourceSelected.has(item.id));
    const newTarget = [...target, ...itemsToMove];
    onChange(newSource, newTarget);
    setSourceSelected(new Set());
  };

  // Move selected items to source
  const moveToSource = () => {
    const itemsToMove = target.filter(item => targetSelected.has(item.id));
    const newTarget = target.filter(item => !targetSelected.has(item.id));
    const newSource = [...source, ...itemsToMove];
    onChange(newSource, newTarget);
    setTargetSelected(new Set());
  };

  // Move all items to target
  const moveAllToTarget = () => {
    const newTarget = [...target, ...source];
    onChange([], newTarget);
    setSourceSelected(new Set());
  };

  // Move all items to source
  const moveAllToSource = () => {
    const newSource = [...source, ...target];
    onChange(newSource, []);
    setTargetSelected(new Set());
  };

  // Render list panel
  const renderList = (
    items: TransferListItem[],
    title: string,
    selected: Set<string>,
    onToggle: (id: string) => void,
    searchValue: string,
    onSearchChange: (value: string) => void,
    searchPlaceholder: string
  ) => (
    <div className='flex flex-col flex-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900'>
      {/* Header */}
      <div className='px-3 py-2 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'>
        <h3 className='text-sm font-semibold text-gray-900 dark:text-white'>
          {title}
        </h3>
        <p className='text-xs text-gray-600 dark:text-gray-400'>
          {items.length} item{items.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Search */}
      {searchable && (
        <div className='p-2 border-b border-gray-200 dark:border-gray-700'>
          <input
            type='text'
            value={searchValue}
            onChange={e => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className='w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
          />
        </div>
      )}

      {/* List */}
      <div
        className='overflow-y-auto p-2 space-y-1'
        style={{ height: searchable ? height - 120 : height - 60 }}
      >
        {items.length === 0 ? (
          <div className='flex items-center justify-center h-full text-sm text-gray-500 dark:text-gray-400'>
            No items
          </div>
        ) : (
          items.map(item => {
            const isSelected = selected.has(item.id);

            return (
              <button
                key={item.id}
                onClick={() => !item.disabled && onToggle(item.id)}
                disabled={item.disabled || disabled}
                className={cn(
                  'w-full px-3 py-2 text-left rounded-md transition-colors',
                  'hover:bg-gray-100 dark:hover:bg-gray-800',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  isSelected &&
                    'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                )}
              >
                <div className='flex items-start gap-2'>
                  {/* Checkbox */}
                  <div
                    className={cn(
                      'w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0 mt-0.5',
                      isSelected
                        ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                    )}
                  >
                    {isSelected && (
                      <svg
                        className='w-3 h-3 text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={3}
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                      {item.label}
                    </p>
                    {item.description && (
                      <p className='text-xs text-gray-600 dark:text-gray-400 truncate'>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className={cn('flex gap-4', className)}>
      {/* Source list */}
      {renderList(
        filteredSource,
        sourceTitle,
        sourceSelected,
        toggleSourceSelection,
        sourceSearch,
        setSourceSearch,
        sourceSearchPlaceholder
      )}

      {/* Transfer buttons */}
      <div className='flex flex-col justify-center gap-2'>
        <button
          onClick={moveAllToTarget}
          disabled={disabled || source.length === 0}
          className={cn(
            'px-3 py-2 text-sm bg-white dark:bg-gray-900',
            'border border-gray-300 dark:border-gray-700',
            'rounded-md',
            'hover:bg-gray-50 dark:hover:bg-gray-800',
            'transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          title='Move all to selected'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 5l7 7-7 7M5 5l7 7-7 7'
            />
          </svg>
        </button>

        <button
          onClick={moveToTarget}
          disabled={disabled || sourceSelected.size === 0}
          className={cn(
            'px-3 py-2 text-sm bg-white dark:bg-gray-900',
            'border border-gray-300 dark:border-gray-700',
            'rounded-md',
            'hover:bg-gray-50 dark:hover:bg-gray-800',
            'transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          title='Move selected to target'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>

        <button
          onClick={moveToSource}
          disabled={disabled || targetSelected.size === 0}
          className={cn(
            'px-3 py-2 text-sm bg-white dark:bg-gray-900',
            'border border-gray-300 dark:border-gray-700',
            'rounded-md',
            'hover:bg-gray-50 dark:hover:bg-gray-800',
            'transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          title='Move selected to source'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        <button
          onClick={moveAllToSource}
          disabled={disabled || target.length === 0}
          className={cn(
            'px-3 py-2 text-sm bg-white dark:bg-gray-900',
            'border border-gray-300 dark:border-gray-700',
            'rounded-md',
            'hover:bg-gray-50 dark:hover:bg-gray-800',
            'transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          title='Move all to available'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 19l-7-7 7-7M19 19l-7-7 7-7'
            />
          </svg>
        </button>
      </div>

      {/* Target list */}
      {renderList(
        filteredTarget,
        targetTitle,
        targetSelected,
        toggleTargetSelection,
        targetSearch,
        setTargetSearch,
        targetSearchPlaceholder
      )}
    </div>
  );
};

export default TransferList;
