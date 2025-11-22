import React, { useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { variants } from '@sudobility/design';

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  disabled?: boolean;
  separator?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
  variant?: 'default' | 'bordered';
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right',
  className = '',
  variant = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  useClickOutside(ref as React.RefObject<HTMLElement>, () => setIsOpen(false));

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick();
      setIsOpen(false);
    }
  };

  const alignmentClasses =
    align === 'left'
      ? variants.overlays.dropdown.menuRight()
      : variants.overlays.dropdown.menuLeft();

  const triggerClasses =
    variant === 'bordered'
      ? variants.overlays.dropdown.triggerBordered()
      : variants.overlays.dropdown.trigger();

  return (
    <div
      className={`${variants.overlays.dropdown.container()} ${className}`}
      ref={ref}
    >
      <div className={triggerClasses} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`${variants.overlays.dropdown.menu()} ${alignmentClasses} ${variants.overlays.dropdown.menuBottom()}`}
        >
          <div className={variants.overlays.dropdown.itemContainer()}>
            {items.map(item =>
              item.separator ? (
                <div
                  key={item.id}
                  className='my-1 h-px bg-gray-200 dark:bg-gray-700'
                  role='separator'
                />
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={`${
                    item.disabled
                      ? variants.overlays.dropdown.itemDisabled()
                      : variants.overlays.dropdown.item()
                  } flex items-center gap-2`}
                >
                  {item.icon && (
                    <item.icon
                      className={variants.overlays.dropdown.itemIcon()}
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
