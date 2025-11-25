import React from 'react';
import { cn } from '@sudobility/components';

export interface KanbanCard {
  id: string;
  title: string;
  content?: React.ReactNode;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
}

export interface KanbanProps {
  /** Columns data */
  columns: KanbanColumn[];
  /** Card click handler */
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  /** Column header click handler */
  onColumnClick?: (column: KanbanColumn) => void;
  /** Additional className */
  className?: string;
}

/**
 * Kanban Component
 *
 * Kanban board with columns and cards.
 * Displays tasks/items organized in vertical columns.
 *
 * @example
 * ```tsx
 * <Kanban
 *   columns={[
 *     { id: 'todo', title: 'To Do', cards: [...] },
 *     { id: 'progress', title: 'In Progress', cards: [...] },
 *     { id: 'done', title: 'Done', cards: [...] }
 *   ]}
 *   onCardClick={(card, col) => openCard(card)}
 * />
 * ```
 */
export const Kanban: React.FC<KanbanProps> = ({
  columns,
  onCardClick,
  onColumnClick,
  className,
}) => {
  return (
    <div className={cn('flex gap-4 overflow-x-auto pb-4', className)}>
      {columns.map(column => (
        <div
          key={column.id}
          className='flex-shrink-0 w-80 bg-gray-100 dark:bg-gray-800 rounded-lg p-4'
        >
          {/* Column header */}
          <div
            className={cn(
              'flex items-center justify-between mb-4 cursor-pointer',
              onColumnClick && 'hover:opacity-80 transition-opacity'
            )}
            onClick={() => onColumnClick?.(column)}
          >
            <h3 className='font-semibold text-gray-900 dark:text-white flex items-center gap-2'>
              {column.color && (
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: column.color }}
                />
              )}
              {column.title}
            </h3>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              {column.cards.length}
            </span>
          </div>

          {/* Cards */}
          <div className='space-y-3'>
            {column.cards.map(card => (
              <div
                key={card.id}
                className={cn(
                  'bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm',
                  'border border-gray-200 dark:border-gray-700',
                  onCardClick &&
                    'cursor-pointer hover:shadow-md transition-shadow'
                )}
                onClick={() => onCardClick?.(card, column.id)}
              >
                <h4 className='font-medium text-gray-900 dark:text-white text-sm mb-1'>
                  {card.title}
                </h4>
                {card.content && (
                  <div className='text-sm text-gray-600 dark:text-gray-400'>
                    {card.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
