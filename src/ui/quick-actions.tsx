import React from 'react';
import { cn } from '../lib/utils';

export interface QuickAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
}

export interface QuickActionsProps {
  /** Actions to display */
  actions: QuickAction[];
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical' | 'grid';
  /** Grid columns (when orientation is grid) */
  columns?: number;
  /** Additional className */
  className?: string;
}

/**
 * QuickActions Component
 *
 * Quick action buttons for dashboard.
 * Supports multiple layouts and variants.
 *
 * @example
 * ```tsx
 * <QuickActions
 *   actions={[
 *     { id: '1', label: 'New Project', icon: <PlusIcon />, onClick: () => {}, variant: 'primary' },
 *     { id: '2', label: 'Upload File', icon: <UploadIcon />, onClick: () => {} },
 *     { id: '3', label: 'Export Data', icon: <DownloadIcon />, onClick: () => {} }
 *   ]}
 *   orientation="grid"
 *   columns={3}
 * />
 * ```
 */
export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  orientation = 'horizontal',
  columns = 3,
  className,
}) => {
  const variantStyles = {
    default: 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700',
    primary: 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500',
    success: 'bg-green-500 hover:bg-green-600 text-white border-green-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white border-red-500',
  };

  const layoutClasses = {
    horizontal: 'flex flex-wrap gap-2',
    vertical: 'flex flex-col gap-2',
    grid: `grid gap-2`,
  };

  return (
    <div
      className={cn(
        layoutClasses[orientation],
        orientation === 'grid' && `grid-cols-${columns}`,
        className
      )}
      style={orientation === 'grid' ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined}
    >
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={action.onClick}
          disabled={action.disabled}
          className={cn(
            'flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-colors font-medium',
            variantStyles[action.variant || 'default'],
            action.disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {action.icon && <span className="w-5 h-5">{action.icon}</span>}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
