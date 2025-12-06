import React from 'react';
import { cn } from '../../../lib/utils';

export interface PanelHeaderProps {
  /** Title text */
  title?: string;
  /** Whether panel is collapsed */
  isCollapsed: boolean;
  /** Toggle collapse callback */
  onToggleCollapse: () => void;
  /** Close panel callback */
  onClose?: () => void;
  /** Mouse down handler for dragging */
  onMouseDown?: (e: React.MouseEvent) => void;
  /** Whether currently dragging */
  isDragging?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Chevron icon component
 */
const ChevronIcon: React.FC<{
  direction: 'up' | 'down';
  className?: string;
}> = ({ direction, className }) => (
  <svg
    className={cn('w-4 h-4', className)}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d={direction === 'up' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
    />
  </svg>
);

/**
 * Close icon component
 */
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn('w-4 h-4', className)}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M6 18L18 6M6 6l12 12'
    />
  </svg>
);

/**
 * PanelHeader - Header for the performance panel with collapse/close controls
 */
export const PanelHeader: React.FC<PanelHeaderProps> = ({
  title = 'Performance Monitor',
  isCollapsed,
  onToggleCollapse,
  onClose,
  onMouseDown,
  isDragging,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-gray-900 text-white rounded-t-lg px-3 py-2',
        'flex items-center justify-between',
        'shadow-lg border border-gray-700',
        'select-none',
        onMouseDown && 'cursor-grab',
        isDragging && 'cursor-grabbing',
        className
      )}
      onMouseDown={onMouseDown}
    >
      <span className='font-semibold text-sm flex items-center gap-2'>
        <span>🚀</span>
        {title}
      </span>
      <div className='flex gap-1'>
        <button
          onClick={onToggleCollapse}
          className='hover:bg-gray-700 rounded p-1 transition-colors'
          aria-label={isCollapsed ? 'Expand' : 'Collapse'}
          type='button'
        >
          <ChevronIcon direction={isCollapsed ? 'up' : 'down'} />
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className='hover:bg-gray-700 rounded p-1 transition-colors'
            aria-label='Close'
            type='button'
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};
