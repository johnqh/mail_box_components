import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import { Dialog } from './dialog';

export interface CommandItem {
  /** Item ID */
  id: string;
  /** Item label */
  label: string;
  /** Item icon */
  icon?: React.ReactNode;
  /** Action handler */
  onSelect: () => void;
  /** Group/category */
  group?: string;
  /** Keyboard shortcut display */
  shortcut?: string;
  /** Keywords for search */
  keywords?: string[];
}

export interface CommandProps {
  /** Whether command palette is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Available command items */
  items: CommandItem[];
  /** Placeholder text */
  placeholder?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Additional className */
  className?: string;
}

/**
 * Command Component
 *
 * Command palette for quick actions and navigation.
 * Keyboard-first interface with search and grouping.
 *
 * @example
 * ```tsx
 * <Command
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   items={[
 *     { id: 'new', label: 'New File', icon: <PlusIcon />, onSelect: handleNew, shortcut: '⌘N' },
 *     { id: 'open', label: 'Open File', icon: <FolderIcon />, onSelect: handleOpen, shortcut: '⌘O' }
 *   ]}
 *   placeholder="Type a command or search..."
 * />
 * ```
 */
export const Command: React.FC<CommandProps> = ({
  isOpen,
  onClose,
  items,
  placeholder = 'Type a command or search...',
  emptyMessage = 'No results found.',
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter items based on search query
  const filteredItems = items.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.label.toLowerCase().includes(query) ||
      item.keywords?.some(keyword => keyword.toLowerCase().includes(query)) ||
      item.group?.toLowerCase().includes(query)
    );
  });

  // Group items
  const groupedItems = filteredItems.reduce(
    (groups, item) => {
      const group = item.group || 'Commands';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(item);
      return groups;
    },
    {} as Record<string, CommandItem[]>
  );

  // Reset state when closing
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredItems.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].onSelect();
          onClose();
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  const handleSelect = (item: CommandItem) => {
    item.onSelect();
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      size='lg'
      showCloseButton={false}
      className={cn('overflow-hidden p-0', className)}
    >
      {/* Search Input */}
      <div className='border-b border-gray-200 dark:border-gray-700 p-4'>
        <div className='flex items-center gap-3'>
          <svg
            className='w-5 h-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          <input
            ref={inputRef}
            type='text'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className='flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500'
          />
        </div>
      </div>

      {/* Results */}
      <div className='max-h-96 overflow-y-auto p-2'>
        {Object.keys(groupedItems).length === 0 ? (
          <div className='px-4 py-8 text-sm text-gray-500 dark:text-gray-400 text-center'>
            {emptyMessage}
          </div>
        ) : (
          Object.entries(groupedItems).map(([groupName, groupItems]) => (
            <div key={groupName} className='mb-4 last:mb-0'>
              {/* Group Header */}
              <div className='px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                {groupName}
              </div>

              {/* Group Items */}
              <div className='space-y-1'>
                {groupItems.map(item => {
                  const globalIndex = filteredItems.indexOf(item);
                  const isSelected = globalIndex === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-md',
                        'text-sm text-left transition-colors',
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white'
                      )}
                    >
                      {item.icon && (
                        <span className='flex-shrink-0 w-4 h-4'>
                          {item.icon}
                        </span>
                      )}
                      <span className='flex-1 truncate'>{item.label}</span>
                      {item.shortcut && (
                        <span className='flex-shrink-0 text-xs text-gray-500 dark:text-gray-400 font-mono'>
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className='border-t border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
        <div className='flex items-center gap-4'>
          <span className='flex items-center gap-1'>
            <kbd className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
              ↑
            </kbd>
            <kbd className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
              ↓
            </kbd>
            to navigate
          </span>
          <span className='flex items-center gap-1'>
            <kbd className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
              ↵
            </kbd>
            to select
          </span>
        </div>
        <span className='flex items-center gap-1'>
          <kbd className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
            esc
          </kbd>
          to close
        </span>
      </div>
    </Dialog>
  );
};

export default Command;
