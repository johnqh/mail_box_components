import React from 'react';

export interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
  link?: {
    href: string;
    label: string;
    external?: boolean;
  };
  badge?: {
    label: string;
    color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'gray';
  };
}

export interface FeatureCardProps extends FeatureItem {
  variant?: 'default' | 'gradient' | 'outlined' | 'minimal';
  size?: 'sm' | 'default' | 'lg';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  link,
  badge,
  variant = 'default',
  size = 'default',
}) => {
  const getCardStyles = () => {
    const baseStyles = 'relative overflow-hidden transition-all duration-300';
    
    const variantStyles = {
      default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600',
      gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-800',
      outlined: 'border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50',
      minimal: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg',
    };

    const sizeStyles = {
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8',
    };

    return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`;
  };

  const getBadgeStyles = (color: string = 'blue') => {
    const colorStyles = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
      red: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
    };
    return colorStyles[color as keyof typeof colorStyles] || colorStyles.blue;
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    default: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  const titleSizes = {
    sm: 'text-lg',
    default: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={getCardStyles()}>
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBadgeStyles(badge.color)}`}>
            {badge.label}
          </span>
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div className="mb-4">
          <div className={`text-blue-600 dark:text-blue-400 ${iconSizes[size]}`}>
            {icon}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="space-y-3">
        <h3 className={`font-bold text-gray-900 dark:text-white ${titleSizes[size]}`}>
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>

        {/* Link */}
        {link && (
          <div className="pt-2">
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
              >
                {link.label}
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <a
                href={link.href}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
              >
                {link.label}
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export interface FeatureGridProps {
  features: FeatureItem[];
  columns?: 1 | 2 | 3 | 4;
  cardVariant?: 'default' | 'gradient' | 'outlined' | 'minimal';
  cardSize?: 'sm' | 'default' | 'lg';
  className?: string;
  title?: string;
  description?: string;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  cardVariant = 'default',
  cardSize = 'default',
  className = '',
  title,
  description,
}) => {
  const getGridStyles = () => {
    const columnStyles = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    return `grid ${columnStyles[columns]} gap-6`;
  };

  return (
    <section className={`py-16 ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Grid */}
      <div className={getGridStyles()}>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            variant={cardVariant}
            size={cardSize}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;