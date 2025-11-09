import React from 'react';
import { cn } from '../lib/utils';

export interface BreadcrumbNavItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbNavItem[];
  separator?: React.ReactNode;
  className?: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  items,
  separator = '/',
  className,
}) => {
  return (
    <nav className={cn('flex items-center gap-2 text-sm', className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className='text-gray-400 dark:text-gray-600'>
              {separator}
            </span>
          )}
          {index === items.length - 1 ? (
            <span className='text-gray-900 dark:text-white font-medium'>
              {item.label}
            </span>
          ) : (
            <button
              onClick={item.onClick}
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNav;
