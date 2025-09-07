import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { type BreadcrumbItem } from '../utils/navigationHelpers';

interface BreadcrumbSectionProps {
  items: BreadcrumbItem[];
  shareConfig?: {
    title: string;
    description: string;
    hashtags: string[];
  };
}

const BreadcrumbSection: React.FC<BreadcrumbSectionProps> = ({
  items,
  shareConfig
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 relative">
        <Breadcrumb 
          items={items}
          shareConfig={shareConfig}
        />
      </div>
    </div>
  );
};

export default BreadcrumbSection;