/**
 * DataTable Component
 *
 * A reusable table component for displaying lists of data with flexible columns and actions.
 * Supports light/dark themes, empty states, and customizable cell rendering.
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={items}
 *   columns={['Name', 'Email', 'Status']}
 *   hasActions
 *   renderCell={(item, columnIndex) => {
 *     if (columnIndex === 0) return item.name;
 *     if (columnIndex === 1) return item.email;
 *     if (columnIndex === 2) return <StatusBadge status={item.status} />;
 *   }}
 *   renderAction={(item) => (
 *     <Button onClick={() => handleDelete(item.id)}>Delete</Button>
 *   )}
 *   emptyMessage="No items found"
 * />
 * ```
 */

import React from 'react';
import { textVariants } from '@sudobility/design';

export interface DataTableProps<T = any> {
  /** Array of data objects to display */
  data: T[];

  /** Array of column titles */
  columns: string[];

  /** Whether to show an action column (last column, no title) */
  hasActions?: boolean;

  /**
   * Callback to render cell content
   * @param item - The data object for the row
   * @param columnIndex - The index of the column (0-based)
   * @returns String, React component, or null/undefined for empty cell
   */
  renderCell: (item: T, columnIndex: number) => React.ReactNode | string | null | undefined;

  /**
   * Callback to render action button(s) for each row
   * @param item - The data object for the row
   * @returns React component or null/undefined for empty cell
   */
  renderAction?: (item: T) => React.ReactNode | null | undefined;

  /** Message to display when data array is empty */
  emptyMessage?: string;

  /**
   * Function to generate unique key for each row
   * @param item - The data object for the row
   * @param index - The row index
   * @returns Unique string key for the row
   */
  getRowKey?: (item: T, index: number) => string;

  /** Optional className for the table wrapper */
  className?: string;
}

/**
 * DataTable - A flexible, reusable table component
 *
 * Features:
 * - Flexible column configuration
 * - Custom cell rendering via callback
 * - Optional action column
 * - Empty state handling
 * - Light/dark theme support
 * - Responsive with horizontal scroll
 */
export const DataTable = <T,>({
  data,
  columns,
  hasActions = false,
  renderCell,
  renderAction,
  emptyMessage = 'No data available',
  getRowKey = (_item, index) => String(index),
  className = '',
}: DataTableProps<T>) => {
  // Show empty state if no data
  if (!data || data.length === 0) {
    return (
      <div className={`text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}>
        <p className={`${textVariants.body.sm()} text-gray-500 dark:text-gray-400`}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {columns.map((columnTitle, index) => (
                <th
                  key={index}
                  className={`${textVariants.label.default()} text-left py-3 px-4 whitespace-nowrap`}
                >
                  {columnTitle}
                </th>
              ))}
              {hasActions && (
                <th className={`${textVariants.label.default()} text-right py-3 px-4 sticky right-0 bg-white dark:bg-gray-900 whitespace-nowrap`}>
                  {/* Empty header for actions column */}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr
                key={getRowKey(item, rowIndex)}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                {columns.map((_, columnIndex) => {
                  const cellContent = renderCell(item, columnIndex);
                  return (
                    <td key={columnIndex} className="py-3 px-4">
                      {typeof cellContent === 'string' ? (
                        <span className={textVariants.body.sm()}>{cellContent}</span>
                      ) : (
                        cellContent
                      )}
                    </td>
                  );
                })}
                {hasActions && (
                  <td className="py-3 px-4 text-right sticky right-0 bg-white dark:bg-gray-900">
                    {renderAction?.(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
