import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import {
  colors,
  ui,
  designTokens,
  textVariants,
  getStatusIndicatorColor,
} from '@sudobility/design';

// Stat Card Component
const statCardVariants = cva(
  `${colors.component.card.default.base} ${colors.component.card.default.dark} ${designTokens.radius.lg} shadow-md p-6 transition-all duration-200`,
  {
    variants: {
      variant: {
        default: `${ui.border.default} border ${colors.component.card.default.hover}`,
        elevated: `shadow-lg hover:shadow-xl`,
        minimal: 'bg-transparent shadow-none border-none p-4',
      },
      trend: {
        none: '',
        up: `border-l-4 ${getStatusIndicatorColor('success').replace('bg-', 'border-')}`,
        down: `border-l-4 ${getStatusIndicatorColor('error').replace('bg-', 'border-')}`,
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
    up: ui.text.success,
    down: ui.text.error,
    neutral: ui.text.muted,
    none: ui.text.muted,
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
          <p className={cn(textVariants.label.default(), 'mb-1')}>{label}</p>
          <p className={cn(textVariants.heading.h4(), 'text-2xl')}>{value}</p>
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
      card: `${colors.component.card.default.base} ${colors.component.card.default.dark} ${designTokens.radius.lg} border p-6`,
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
          {title && <h3 className={textVariants.heading.h5()}>{title}</h3>}
          {description && (
            <p className={textVariants.body.sm()}>{description}</p>
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
        <h3 className={textVariants.heading.h4()}>{title}</h3>
        <div className={cn(textVariants.body.md(), 'leading-relaxed')}>
          {description}
        </div>
      </div>
    </div>
  );
};
