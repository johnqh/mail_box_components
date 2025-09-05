import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo';
import { Breadcrumb, type BreadcrumbItem, type ShareConfig } from './breadcrumb';
import { Button } from './button';

interface NavigationLink {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbConfig {
  items: BreadcrumbItem[];
  shareConfig?: ShareConfig;
}

interface PageHeaderProps {
  variant?: 'landing' | 'standard' | 'sticky';
  showAuth?: boolean;
  navigation?: NavigationLink[];
  breadcrumb?: BreadcrumbConfig;
  className?: string;
  showLogo?: boolean;
  ctaButton?: {
    label: string;
    href: string;
    variant?: 'gradient';
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  variant = 'standard',
  showAuth = true,
  navigation = [],
  breadcrumb,
  className = '',
  showLogo = true,
  ctaButton
}) => {
  const { isAuthenticated, authStatus } = useAuth();

  const baseClasses = variant === 'sticky' 
    ? 'sticky top-0 z-50 bg-white shadow-sm'
    : 'bg-white shadow-sm';

  const getButtonVariant = () => {
    if (ctaButton?.variant) return ctaButton.variant;
    return 'gradient';
  };

  return (
    <header className={`${baseClasses} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {showLogo && (
            <div className={variant === 'landing' ? 'transform hover:scale-105 transition-transform duration-200' : ''}>
              <Link to="/">
                <Logo size="md" />
              </Link>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            {/* Navigation Links */}
            {navigation.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md font-medium transition-colors ${
                  variant === 'landing' ? 'transition-all duration-200 hover:bg-gray-100/50' : ''
                } ${link.active ? 'text-gray-900 bg-gray-100' : ''}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Authentication Buttons */}
            {showAuth && (ctaButton ? (
              <Button asChild variant={getButtonVariant()} size="default">
                <Link to={ctaButton.href}>
                  {ctaButton.label}
                </Link>
              </Button>
            ) : (
              <>
                {isAuthenticated ? (
                  <Button asChild variant="gradient" size="default">
                    <Link to="/mail">
                      Go to Emails
                    </Link>
                  </Button>
                ) : authStatus === 'verified' ? (
                  <Button asChild variant="gradient" size="default">
                    <Link to="/mail">
                      Emails
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="gradient" size="default">
                    <Link to="/connect">
                      Connect Wallet
                    </Link>
                  </Button>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
      
      {/* Breadcrumb Navigation */}
      {breadcrumb && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumb 
              items={breadcrumb.items}
              shareConfig={breadcrumb.shareConfig}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default PageHeader;