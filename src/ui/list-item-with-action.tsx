import React from 'react';
import { Button } from './button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';
import { colors, ui } from '@sudobility/design';

export interface ListItemWithActionProps {
  /** Main content/text to display */
  children: React.ReactNode;
  /** Action to perform (typically remove/delete) */
  onAction: () => void;
  /** Action button text */
  actionText?: string;
  /** Action button icon (defaults to TrashIcon) */
  actionIcon?: React.ComponentType<{ className?: string }>;
  /** Whether the action is destructive (uses red color) */
  destructive?: boolean;
  /** Whether the action is in progress */
  isProcessing?: boolean;
  /** Variant of the list item */
  variant?: 'default' | 'compact' | 'elevated';
  /** Additional className for the container */
  className?: string;
}

/**
 * ListItemWithAction Component
 *
 * Displays a list item with an action button (typically remove/delete).
 * Commonly used for managing lists of forwarding addresses, filters, blocked senders, etc.
 *
 * @example
 * ```tsx
 * <ListItemWithAction
 *   onAction={() => handleRemove(item.id)}
 *   actionText="Remove"
 *   destructive
 *   isProcessing={isDeleting}
 * >
 *   user@example.com
 * </ListItemWithAction>
 * ```
 */
export const ListItemWithAction: React.FC<ListItemWithActionProps> = ({
  children,
  onAction,
  actionText = 'Remove',
  actionIcon: ActionIcon = TrashIcon,
  destructive = true,
  isProcessing = false,
  variant = 'default',
  className,
}) => {
  const baseClass = cn(
    'flex items-center justify-between p-4 rounded-lg',
    ui.transition.default
  );

  const variantClasses = {
    default: ui.background.muted,
    compact: cn(ui.background.muted, 'py-2 px-3'),
    elevated: cn(
      'border',
      colors.component.card.elevated.base,
      colors.component.card.elevated.dark,
      colors.component.card.elevated.hover
    ),
  };

  return (
    <div className={cn(baseClass, variantClasses[variant], className)}>
      <div className='flex-1 text-sm text-gray-900 dark:text-white'>
        {children}
      </div>
      <Button
        variant={destructive ? 'ghost' : 'outline'}
        size='sm'
        onClick={onAction}
        disabled={isProcessing}
        className={cn(
          'ml-4',
          destructive &&
            'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20'
        )}
      >
        <ActionIcon className='h-4 w-4 mr-1' />
        {actionText}
      </Button>
    </div>
  );
};
