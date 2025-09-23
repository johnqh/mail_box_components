import React from 'react';

export interface StandardPageLayoutProps {
  children: React.ReactNode;
  noIndex?: boolean;
  backgroundClassName?: string;
  contentClassName?: string;
  breadcrumb?: any;
}

/**
 * A simple page layout wrapper component that applies background and content classes
 * to create consistent page structure across applications.
 */
export const StandardPageLayout: React.FC<StandardPageLayoutProps> = ({
  children,
  backgroundClassName = '',
  contentClassName = '',
}) => {
  return (
    <div className={backgroundClassName}>
      <div className={contentClassName}>{children}</div>
    </div>
  );
};

export default StandardPageLayout;
