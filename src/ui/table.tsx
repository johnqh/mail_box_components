import React from 'react';
import { cn } from '../lib/utils';
import { ui } from '@sudobility/design';

export interface TableColumn<T> {
  /** Column key */
  key: string;
  /** Column label */
  label: React.ReactNode;
  /** Render cell content */
  render?: (row: T, index: number) => React.ReactNode;
  /** Column width */
  width?: string;
  /** Sortable column */
  sortable?: boolean;
  /** Align content */
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  /** Table columns */
  columns: TableColumn<T>[];
  /** Table data */
  data: T[];
  /** Row key extractor */
  keyExtractor: (row: T, index: number) => string;
  /** Sort configuration */
  sort?: {
    column: string;
    direction: 'asc' | 'desc';
  };
  /** Sort handler */
  onSort?: (column: string) => void;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Striped rows */
  striped?: boolean;
  /** Hoverable rows */
  hoverable?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Show border */
  bordered?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Additional className */
  className?: string;
}

/**
 * Table Component
 *
 * Data table with sorting, selection, and customization.
 * Generic component supporting any data type.
 *
 * @example
 * ```tsx
 * <Table
 *   columns={[
 *     { key: 'name', label: 'Name', sortable: true },
 *     { key: 'email', label: 'Email' },
 *     { key: 'role', label: 'Role', align: 'center' }
 *   ]}
 *   data={users}
 *   keyExtractor={(user) => user.id}
 *   sort={sort}
 *   onSort={handleSort}
 *   onRowClick={handleRowClick}
 *   hoverable
 * />
 * ```
 */
export function Table<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  sort,
  onSort,
  onRowClick,
  striped = false,
  hoverable = false,
  compact = false,
  bordered = false,
  emptyMessage = 'No data available',
  className,
}: TableProps<T>) {
  const handleSort = (column: TableColumn<T>) => {
    if (column.sortable && onSort) {
      onSort(column.key);
    }
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn(ui.table.wrapper, className)}>
      <table className={ui.table.base}>
        {/* Header */}
        <thead className={cn(ui.table.thead, 'border-b', ui.border.default)}>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                className={cn(
                  compact ? 'px-3 py-2' : ui.table.th,
                  'text-xs font-medium uppercase tracking-wider',
                  alignClasses[column.align || 'left'],
                  column.sortable &&
                    'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700',
                  bordered && `border-r ${ui.border.default} last:border-r-0`
                )}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column)}
              >
                <div className='flex items-center gap-2'>
                  {column.label}
                  {column.sortable && (
                    <span className='flex flex-col'>
                      {sort?.column === column.key ? (
                        sort.direction === 'asc' ? (
                          <svg
                            className='w-4 h-4'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path d='M5 10l5-5 5 5H5z' />
                          </svg>
                        ) : (
                          <svg
                            className='w-4 h-4'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path d='M15 10l-5 5-5-5h10z' />
                          </svg>
                        )
                      ) : (
                        <svg
                          className='w-4 h-4 text-gray-400'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M5 10l5-5 5 5H5z' />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className={cn(ui.table.tr, ui.table.tbody)}>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className='px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400'
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={keyExtractor(row, rowIndex)}
                className={cn(
                  striped && rowIndex % 2 === 1 && ui.table.trAlt,
                  hoverable &&
                    `hover:bg-gray-100 dark:hover:bg-gray-800 ${ui.transition.default}`,
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {columns.map(column => (
                  <td
                    key={column.key}
                    className={cn(
                      compact ? 'px-3 py-2' : ui.table.td,
                      alignClasses[column.align || 'left'],
                      bordered &&
                        `border-r ${ui.border.default} last:border-r-0`
                    )}
                  >
                    {column.render
                      ? column.render(row, rowIndex)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
