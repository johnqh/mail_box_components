import React from 'react';
import { cn } from '../lib/utils';
import { colors, ui } from '@sudobility/design';

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
    default: cn(
      colors.component.button.outline.base,
      colors.component.button.outline.dark
    ),
    primary: cn(
      colors.component.button.primary.base,
      colors.component.button.primary.dark
    ),
    success: cn(
      colors.component.button.success.base,
      colors.component.button.success.dark
    ),
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500',
    danger: cn(
      colors.component.button.destructive.base,
      colors.component.button.destructive.dark
    ),
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
      style={
        orientation === 'grid'
          ? { gridTemplateColumns: `repeat(${columns}, 1fr)` }
          : undefined
      }
    >
      {actions.map(action => (
        <button
          key={action.id}
          onClick={action.onClick}
          disabled={action.disabled}
          className={cn(
            'flex items-center justify-center gap-2 px-4 py-3 rounded-lg border font-medium',
            ui.transition.default,
            variantStyles[action.variant || 'default'],
            action.disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {action.icon && <span className='w-5 h-5'>{action.icon}</span>}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
};
