import React from 'react';
import { cn } from '@sudobility/components';
import { textVariants } from '@sudobility/design';

export interface MenuItemProps {
  /** Menu item label */
  children: React.ReactNode;
  /** Icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Danger/destructive action */
  danger?: boolean;
  /** Show as selected/active */
  selected?: boolean;
  /** Additional description text */
  description?: string;
  /** Keyboard shortcut hint */
  shortcut?: string;
  /** Additional className */
  className?: string;
}

/**
 * MenuItem Component
 *
 * Reusable menu item for dropdowns, context menus, and navigation menus.
 * Supports icons, descriptions, shortcuts, and states.
 *
 * @example
 * ```tsx
 * import { CogIcon, TrashIcon } from '@heroicons/react/24/outline';
 *
 * <MenuItem icon={CogIcon} onClick={openSettings}>
 *   Settings
 * </MenuItem>
 * <MenuItem icon={TrashIcon} onClick={deleteItem} danger>
 *   Delete
 * </MenuItem>
 * ```
 *
 * @example
 * ```tsx
 * <MenuItem
 *   icon={UserIcon}
 *   description="Manage your profile"
 *   shortcut="⌘P"
 *   selected
 * >
 *   Profile
 * </MenuItem>
 * ```
 */
export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  icon: Icon,
  onClick,
  disabled = false,
  danger = false,
  selected = false,
  description,
  shortcut,
  className,
}) => {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role='menuitem'
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex items-center gap-3 px-3 py-2',
        'transition-colors duration-150',
        'cursor-pointer select-none',
        !disabled &&
          !danger &&
          !selected &&
          'hover:bg-gray-100 dark:hover:bg-gray-700',
        !disabled &&
          !danger &&
          selected &&
          'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        !disabled &&
          danger &&
          'hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-disabled={disabled}
    >
      {/* Icon */}
      {Icon && (
        <Icon
          className={cn(
            'h-5 w-5 flex-shrink-0',
            danger
              ? 'text-red-600 dark:text-red-400'
              : selected
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400'
          )}
        />
      )}

      {/* Content */}
      <div className='flex-1 min-w-0'>
        <div
          className={cn(
            textVariants.body.md(),
            danger && 'text-red-600 dark:text-red-400',
            selected && 'text-blue-700 dark:text-blue-300 font-medium',
            !danger && !selected && 'text-gray-900 dark:text-gray-100'
          )}
        >
          {children}
        </div>
        {description && (
          <div
            className={cn(
              textVariants.caption.default(),
              'text-gray-600 dark:text-gray-400 mt-0.5'
            )}
          >
            {description}
          </div>
        )}
      </div>

      {/* Shortcut */}
      {shortcut && (
        <span
          className={cn(
            textVariants.caption.default(),
            'text-gray-500 dark:text-gray-400 flex-shrink-0'
          )}
        >
          {shortcut}
        </span>
      )}
    </div>
  );
};

export default MenuItem;
