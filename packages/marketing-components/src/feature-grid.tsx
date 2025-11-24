import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@sudobility/components';
import { AnimatedSection } from './animated-section';

const gridVariants = cva('grid gap-8', {
  variants: {
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    },
    spacing: {
      sm: 'gap-4',
      md: 'gap-8',
      lg: 'gap-12',
    },
  },
  defaultVariants: {
    columns: 3,
    spacing: 'md',
  },
});

const cardVariants = cva('group transition-all duration-300', {
  variants: {
    variant: {
      default: 'text-center',
      left: 'text-left',
      hoverable: 'text-center hover:transform hover:scale-105 cursor-pointer',
      card: 'bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl text-center',
      minimal: 'text-center space-y-4',
    },
    animation: {
      none: '',
      hover: 'hover:transform hover:scale-105',
      float: 'hover:-translate-y-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    animation: 'hover',
  },
});

const iconVariants = cva(
  'flex items-center justify-center rounded-2xl mb-6 transition-all duration-300',
  {
    variants: {
      size: {
        sm: 'w-16 h-16',
        md: 'w-20 h-20',
        lg: 'w-24 h-24',
      },
      style: {
        gradient:
          'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800/40 dark:group-hover:to-blue-700/40',
        solid:
          'bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40',
        outline:
          'border-2 border-blue-200 dark:border-blue-800 group-hover:border-blue-300 dark:group-hover:border-blue-700',
        colorful: 'group-hover:scale-110',
      },
      position: {
        center: 'mx-auto',
        left: '',
        right: 'ml-auto',
      },
    },
    defaultVariants: {
      size: 'md',
      style: 'gradient',
      position: 'center',
    },
  }
);

export interface Feature {
  id?: string;
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  link?: {
    href: string;
    text?: string;
  };
  badge?: {
    text: string;
    variant?: 'success' | 'info' | 'warning' | 'default';
  };
  gradient?: {
    from: string;
    to: string;
  };
  // Extended properties for backward compatibility
  learnMoreUrl?: string;
  benefits?: string[];
}

interface FeatureGridProps extends VariantProps<typeof gridVariants> {
  className?: string;
  features: Feature[];

  // Card styling
  cardVariant?: 'default' | 'left' | 'hoverable' | 'card' | 'minimal';
  cardAnimation?: 'none' | 'hover' | 'float';

  // Icon styling
  iconSize?: 'sm' | 'md' | 'lg';
  iconStyle?: 'gradient' | 'solid' | 'outline' | 'colorful';
  iconPosition?: 'center' | 'left' | 'right';

  // Content styling
  titleClass?: string;
  descriptionClass?: string;

  // Animation
  animate?: boolean;
  animationDelay?: number;
  staggerDelay?: number;

  // Interaction
  onFeatureClick?: (feature: Feature) => void;

  // Localization
  defaultLinkText?: string;
}

const badgeVariants = {
  success:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  warning:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  className,
  features,
  columns = 3,
  spacing = 'md',

  cardVariant = 'default',
  cardAnimation = 'hover',

  iconSize = 'md',
  iconStyle = 'gradient',
  iconPosition = 'center',

  titleClass,
  descriptionClass,

  animate = true,
  animationDelay = 0,
  staggerDelay = 100,

  onFeatureClick,
  defaultLinkText = 'Learn more',
}) => {
  const getIconBackground = (feature: Feature, index: number) => {
    if (iconStyle === 'colorful' && feature.gradient) {
      return {
        background: `linear-gradient(135deg, ${feature.gradient.from}, ${feature.gradient.to})`,
      };
    }

    if (iconStyle === 'colorful') {
      const colors = [
        { from: '#3B82F6', to: '#1D4ED8' }, // blue
        { from: '#10B981', to: '#059669' }, // emerald
        { from: '#8B5CF6', to: '#7C3AED' }, // violet
        { from: '#F59E0B', to: '#D97706' }, // amber
        { from: '#EF4444', to: '#DC2626' }, // red
        { from: '#06B6D4', to: '#0891B2' }, // cyan
      ];
      const colorSet = colors[index % colors.length];
      return {
        background: `linear-gradient(135deg, ${colorSet.from}, ${colorSet.to})`,
      };
    }

    return undefined;
  };

  const renderFeature = (feature: Feature, index: number) => {
    const featureContent = (
      <div
        className={cn(
          cardVariants({ variant: cardVariant, animation: cardAnimation })
        )}
        onClick={() => onFeatureClick?.(feature)}
        role={onFeatureClick ? 'button' : undefined}
        tabIndex={onFeatureClick ? 0 : undefined}
      >
        {/* Badge */}
        {feature.badge && (
          <div className='mb-4'>
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                badgeVariants[feature.badge.variant || 'default']
              )}
            >
              {feature.badge.text}
            </span>
          </div>
        )}

        {/* Icon */}
        <div
          className={cn(
            iconVariants({
              size: iconSize,
              style: iconStyle,
              position: iconPosition,
            })
          )}
          style={getIconBackground(feature, index)}
        >
          <div
            className={cn(
              'flex items-center justify-center',
              iconStyle === 'colorful'
                ? 'text-white'
                : 'text-blue-600 dark:text-blue-400'
            )}
          >
            {feature.icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className={cn(
            'text-xl font-bold text-gray-900 dark:text-white mb-4',
            titleClass
          )}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <div
          className={cn(
            'text-gray-600 dark:text-gray-300 leading-relaxed',
            descriptionClass
          )}
        >
          {feature.description}
        </div>

        {/* Link */}
        {feature.link && (
          <div className='mt-6'>
            <a
              href={feature.link.href}
              className='inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200'
            >
              {feature.link.text || defaultLinkText}
              <svg
                className='w-4 h-4 ml-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    );

    return animate ? (
      <AnimatedSection
        key={feature.id || index}
        animation='fade-in-up'
        delay={animationDelay + index * staggerDelay}
      >
        {featureContent}
      </AnimatedSection>
    ) : (
      <div key={feature.id || index}>{featureContent}</div>
    );
  };

  return (
    <div className={cn(gridVariants({ columns, spacing }), className)}>
      {features.map(renderFeature)}
    </div>
  );
};

// Helper component for creating features with consistent formatting
export const createFeature = (
  icon: React.ReactNode,
  title: string,
  description: string | React.ReactNode,
  options?: Partial<Feature>
): Feature => ({
  icon,
  title,
  description,
  ...options,
});

// Predefined feature sets for common use cases - for backward compatibility
// Note: These should be moved to consuming application with proper localization
export const createSecurityFeatures = (labels?: {
  passwordlessTitle?: string;
  passwordlessDescription?: string;
  encryptionTitle?: string;
  encryptionDescription?: string;
}): Feature[] => [
  createFeature(
    <svg
      className='w-8 h-8'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
      />
    </svg>,
    labels?.passwordlessTitle || 'Passwordless Security',
    labels?.passwordlessDescription ||
      'Authenticate using your Web3 wallet - no passwords to remember or lose.'
  ),
  createFeature(
    <svg
      className='w-8 h-8'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.40A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
      />
    </svg>,
    labels?.encryptionTitle || 'End-to-End Encryption',
    labels?.encryptionDescription ||
      'Your emails are encrypted and only you can read them.'
  ),
];

export default FeatureGrid;
