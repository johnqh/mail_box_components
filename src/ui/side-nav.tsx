import React from 'react';
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
      {items.map((item) => (
        <button
          key={item.id}
          onClick={item.onClick}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
            item.active
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
        >
          {item.icon && <span className="w-5 h-5">{item.icon}</span>}
          <span className="flex-1 text-left font-medium">{item.label}</span>
          {item.badge && (
            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};

export default SideNav;
