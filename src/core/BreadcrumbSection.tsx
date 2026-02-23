import React from 'react';
import { RouterBreadcrumb } from './Breadcrumb';
import { type BreadcrumbItem } from '../utils/navigationHelpers';
import { useLayout } from '../layout/Layout/LayoutContext';

interface BreadcrumbSectionProps {
  items: BreadcrumbItem[];
  shareConfig?: {
    title: string;
    description: string;
    hashtags: string[];
    onBeforeShare?: (baseUrl: string) => Promise<string>;
  };
}

export const BreadcrumbSection: React.FC<BreadcrumbSectionProps> = ({
  items,
  shareConfig,
}) => {
  const { containerClass } = useLayout();

  return (
    <div className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative z-50'>
      <div className={`${containerClass} py-3 relative`}>
        <RouterBreadcrumb items={items} shareConfig={shareConfig} />
      </div>
    </div>
  );
};
