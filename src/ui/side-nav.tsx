import React from 'react';
import { colors } from '@sudobility/design';
import { cn } from '../lib/utils';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  badge?: string | number;
}

export interface SideNavProps {
  items: NavItem[];
  className?: string;
}

export const SideNav: React.FC<SideNavProps> = ({ items, className }) => {
  return (
    <nav className={cn('flex flex-col gap-1', className)}>
      {items.map(item => (
        <button
          key={item.id}
          onClick={item.onClick}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
            item.active
              ? cn(
                  colors.component.button.primary.base,
                  colors.component.button.primary.dark
                )
              : cn(
                  colors.component.button.ghost.base,
                  colors.component.button.ghost.dark
                )
          )}
        >
          {item.icon && <span className='w-5 h-5'>{item.icon}</span>}
          <span className='flex-1 text-left font-medium'>{item.label}</span>
          {item.badge && (
            <span
              className={cn(
                'px-2 py-0.5 rounded text-xs',
                colors.component.badge.default.base,
                colors.component.badge.default.dark
              )}
            >
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};
