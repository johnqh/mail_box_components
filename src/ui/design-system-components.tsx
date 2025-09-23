import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
// Removed ui import - using hardcoded styles for compatibility

// Info Panel Component
const infoPanelVariants = cva(`rounded-lg border p-4 flex items-start gap-3`, {
  variants: {
    variant: {
      info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-200',
      success:
        'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-200',
      warning:
        'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800/50 dark:text-amber-200',
      error:
        'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-200',
      neutral: `bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`,
    },
    size: {
      sm: 'p-3 text-sm',
      md: 'p-4',
      lg: 'p-6 text-lg',
    },
  },
  defaultVariants: {
    variant: 'info',
    size: 'md',
  },
});

interface InfoPanelProps extends VariantProps<typeof infoPanelVariants> {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
  title,
  icon,
  children,
  variant = 'info',
  size = 'md',
  className,
  onClose,
}) => {
  const defaultIcons = {
    info: '🛈',
    success: '✓',
    warning: '⚠',
    error: '✗',
    neutral: '💡',
  };

  return (
    <div className={cn(infoPanelVariants({ variant, size }), className)}>
      <div className='flex-shrink-0 text-lg'>
        {icon || defaultIcons[variant || 'info']}
      </div>
      <div className='flex-1 min-w-0'>
        {title && <h4 className='font-semibold mb-2'>{title}</h4>}
        <div>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className='flex-shrink-0 text-current hover:opacity-70 transition-opacity'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      )}
    </div>
  );
};

// Stat Card Component
const statCardVariants = cva(
  `bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-200`,
  {
    variants: {
      variant: {
        default: `border-gray-200 dark:border-gray-700 border hover:shadow-lg`,
        elevated: `shadow-lg hover:shadow-xl`,
        minimal: 'bg-transparent shadow-none border-none p-4',
      },
      trend: {
        none: '',
        up: 'border-l-4 border-green-500',
        down: 'border-l-4 border-red-500',
        neutral: 'border-l-4 border-gray-400',
      },
    },
    defaultVariants: {
      variant: 'default',
      trend: 'none',
    },
  }
);

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral' | 'none';
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  trend = 'none',
  icon,
  variant = 'default',
  className,
}) => {
  const trendColors = {
    up: 'text-green-600 dark:text-green-400',
    down: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400',
    none: 'text-gray-600 dark:text-gray-400',
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→',
    none: '',
  };

  return (
    <div className={cn(statCardVariants({ variant, trend }), className)}>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-1'>
            {label}
          </p>
          <p className='text-2xl font-bold text-gray-900 dark:text-white'>
            {value}
          </p>
          {change && (
            <p
              className={cn(
                'text-sm font-medium flex items-center gap-1 mt-1',
                trendColors[trend || 'none']
              )}
            >
              <span>{trendIcons[trend || 'none']}</span>
              {change}
            </p>
          )}
        </div>
        {icon && <div className='text-3xl opacity-80'>{icon}</div>}
      </div>
    </div>
  );
};

// Form Section Component
const formSectionVariants = cva('space-y-6', {
  variants: {
    variant: {
      default: '',
      card: `bg-white dark:bg-gray-800 rounded-lg border-gray-200 dark:border-gray-700 border p-6`,
      minimal: 'space-y-4',
    },
    spacing: {
      tight: 'space-y-3',
      normal: 'space-y-4',
      relaxed: 'space-y-6',
      loose: 'space-y-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    spacing: 'normal',
  },
});

interface FormSectionProps extends VariantProps<typeof formSectionVariants> {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  variant = 'default',
  spacing = 'normal',
  className,
}) => {
  return (
    <div className={cn(formSectionVariants({ variant, spacing }), className)}>
      {(title || description) && (
        <div className='space-y-1'>
          {title && (
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
              {title}
            </h3>
          )}
          {description && (
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

// Feature Block Component (enhanced version)
const featureBlockVariants = cva(
  'flex flex-col items-center text-center space-y-4',
  {
    variants: {
      layout: {
        vertical: 'flex-col items-center text-center',
        horizontal: 'flex-row items-start text-left space-y-0 space-x-4',
        minimal: 'flex-col space-y-2',
      },
      spacing: {
        tight: 'space-y-2',
        normal: 'space-y-4',
        relaxed: 'space-y-6',
      },
      interactive: {
        true: 'transition-all duration-200 hover:transform hover:scale-105 cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      layout: 'vertical',
      spacing: 'normal',
      interactive: false,
    },
  }
);

interface FeatureBlockProps extends VariantProps<typeof featureBlockVariants> {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const FeatureBlock: React.FC<FeatureBlockProps> = ({
  icon,
  title,
  description,
  layout = 'vertical',
  spacing = 'normal',
  interactive = false,
  className,
  onClick,
}) => {
  return (
    <div
      className={cn(
        featureBlockVariants({ layout, spacing, interactive }),
        className
      )}
      onClick={onClick}
    >
      <div className='text-4xl mb-4 flex-shrink-0'>{icon}</div>
      <div className='space-y-2'>
        <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
          {title}
        </h3>
        <div className='text-gray-600 dark:text-gray-300 leading-relaxed'>
          {description}
        </div>
      </div>
    </div>
  );
};
