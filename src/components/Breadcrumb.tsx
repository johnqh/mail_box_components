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
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="text-gray-400 mx-2">/</span>}
            {item.current ? (
              <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
            ) : (
              <Link to={item.href || '#'} className="text-blue-600 hover:text-blue-800">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export { Breadcrumb, type BreadcrumbProps };