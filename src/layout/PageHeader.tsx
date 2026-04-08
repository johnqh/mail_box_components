import React from 'react';
import { textVariants } from '@sudobility/design';

interface PageHeaderProps {
  title?: string;
  description?: string;
  variant?: string;
  navigation?: Array<{ label: string; href: string }>;
  ctaButton?: { label: string; href: string };
  breadcrumb?: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className='mb-8'>
      <h1 className={textVariants.heading.h1()}>{title}</h1>
      {description && (
        <p className={`mt-2 ${textVariants.body.sm()}`}>{description}</p>
      )}
    </div>
  );
};

export { PageHeader, type PageHeaderProps };
