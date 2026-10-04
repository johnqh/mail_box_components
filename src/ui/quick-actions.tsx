import React from 'react';
import { cn } from '../lib/utils';
import { ui } from '@sudobility/design';

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
  // Each action is a button, in the theme's colours with its own foreground.
  const variantStyles = {
    default:
      'bg-background hover:bg-accent text-foreground hover:text-accent-foreground border-input',
    primary:
      'bg-primary hover:bg-primary/90 text-primary-foreground border-transparent',
    success:
      'bg-success hover:bg-success/90 text-success-foreground border-transparent',
    warning:
      'bg-warning hover:bg-warning/90 text-warning-foreground border-warning',
    danger:
      'bg-destructive hover:bg-destructive/90 text-destructive-foreground border-transparent',
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
