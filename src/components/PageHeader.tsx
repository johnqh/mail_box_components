import React from 'react';

interface PageHeaderProps {
  title?: string;
  description?: string;
  variant?: string;
  navigation?: Array<{ label: string; href: string; }>;
  ctaButton?: { label: string; href: string; };
  breadcrumb?: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
      {description && (
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
};

export { PageHeader, type PageHeaderProps };