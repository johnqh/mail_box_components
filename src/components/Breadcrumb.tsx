import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbItem } from '../utils/navigationHelpers';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  shareConfig?: any;
  className?: string;
  showHome?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className: _className, showHome: _showHome }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center text-sm space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              {item.current ? (
                <span className="text-gray-700 dark:text-gray-300 font-medium">{item.label}</span>
              ) : (
                <Link 
                  to={item.href || '#'} 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
            {index < items.length - 1 && (
              <li>
                <span className="text-gray-400 dark:text-gray-500">/</span>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export { Breadcrumb, type BreadcrumbProps };