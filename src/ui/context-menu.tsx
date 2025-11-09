import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Portal } from './portal';

export interface ContextMenuItem {
  /** Item label */
  label: React.ReactNode;
  /** Icon */
  icon?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Separator (renders hr instead of button) */
  separator?: boolean;
  /** Variant */
  variant?: 'default' | 'danger';
  /** Keyboard shortcut hint */
  shortcut?: string;
}

export interface ContextMenuProps {
  /** Trigger element */
  children: React.ReactNode;
  /** Menu items */
  items: ContextMenuItem[];
  /** Additional className */
  className?: string;
}

/**
 * ContextMenu Component
 *
 * Right-click menu with customizable items.
 * Provides context-specific actions for elements.
 *
 * @example
 * ```tsx
 * <ContextMenu
 *   items={[
 *     { label: 'Copy', onClick: handleCopy, shortcut: '⌘C' },
 *     { label: 'Paste', onClick: handlePaste, shortcut: '⌘V' },
 *     { separator: true },
 *     { label: 'Delete', onClick: handleDelete, variant: 'danger' }
 *   ]}
 * >
 *   <div>Right-click me</div>
 * </ContextMenu>
 * ```
 *
 * @example
 * ```tsx
 * <ContextMenu
 *   items={[
 *     { label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
 *     { label: 'Share', icon: <ShareIcon />, onClick: handleShare },
 *   ]}
 * >
 *   <Card>Content</Card>
 * </ContextMenu>
 * ```
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  items,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ top: e.clientY, left: e.clientX });
    setIsOpen(true);
  };

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleContextMenuOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('contextmenu', handleContextMenuOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('contextmenu', handleContextMenuOutside);
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleItemClick = (item: ContextMenuItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onContextMenu={handleContextMenu}
        className="inline-block"
      >
        {children}
      </div>

      {isOpen && (
        <Portal>
          <div
            ref={menuRef}
            className={cn(
              'fixed z-50',
              'min-w-48',
              'bg-white dark:bg-gray-800',
              'border border-gray-200 dark:border-gray-700',
              'rounded-lg shadow-lg',
              'py-1',
              'animate-in fade-in zoom-in-95 duration-150',
              className
            )}
            style={{
              top: position.top + 'px',
              left: position.left + 'px',
            }}
          >
            {items.map((item, index) => {
              if (item.separator) {
                return (
                  <hr
                    key={index}
                    className="my-1 border-gray-200 dark:border-gray-700"
                  />
                );
              }

              const variantClasses = {
                default: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
                danger: 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20',
              };

              return (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={cn(
                    'w-full px-3 py-2',
                    'flex items-center gap-3',
                    'text-sm text-left',
                    'transition-colors',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    variantClasses[item.variant || 'default']
                  )}
                >
                  {item.icon && (
                    <span className="flex-shrink-0 w-4 h-4">
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1">{item.label}</span>
                  {item.shortcut && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Portal>
      )}
    </>
  );
};

export default ContextMenu;
