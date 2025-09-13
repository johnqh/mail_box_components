import React, { useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import { variants } from "@johnqh/design_system";

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right',
  className = ''
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

  const alignmentClasses = align === 'left' ? variants.overlays.dropdown.menuRight() : variants.overlays.dropdown.menuLeft();

  return (
    <div className={`${variants.overlays.dropdown.container()} ${className}`} ref={ref}>
      <div className={variants.overlays.dropdown.trigger()} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div className={`${variants.overlays.dropdown.menu()} ${alignmentClasses} ${variants.overlays.dropdown.menuBottom()}`}>
          <div className={variants.overlays.dropdown.itemContainer()}>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={
                  item.disabled 
                    ? variants.overlays.dropdown.itemDisabled()
                    : variants.overlays.dropdown.item()
                }
              >
                {item.icon && <item.icon className={variants.overlays.dropdown.itemIcon()} />}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};