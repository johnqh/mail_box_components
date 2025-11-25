import React from 'react';
import { cn } from '@sudobility/components';
import { textVariants, getCardVariantColors } from '@sudobility/design';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'default'
    | 'bordered'
    | 'elevated'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'callout';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** For callout variant: apply gradient background */
  gradient?: boolean;
  /** For info/callout variants: show icon */
  icon?: React.ReactNode;
  /** For info variants: show close button */
  onClose?: () => void;
}

// Special handling for callout variant which is not in cardVariantColors
const calloutStyle =
  'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800';

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  icon,
  onClose,
  className,
  children,
  ...props
}) => {
  const isInfoVariant = ['info', 'success', 'warning', 'error'].includes(
    variant
  );
  const showIconOrClose = isInfoVariant && (icon || onClose);

  // Get variant styles from design system, with special handling for 'callout'
  const variantClasses =
    variant === 'callout'
      ? calloutStyle
      : getCardVariantColors(
          variant as Parameters<typeof getCardVariantColors>[0]
        );

  return (
    <div
      className={cn(
        'rounded-lg',
        variantClasses,
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {showIconOrClose ? (
        <div className='flex items-start gap-3'>
          {icon && <div className='flex-shrink-0 text-lg'>{icon}</div>}
          <div className='flex-1 min-w-0'>{children}</div>
          {onClose && (
            <button
              onClick={onClose}
              className='flex-shrink-0 text-current hover:opacity-70 transition-opacity'
              aria-label='Close'
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
      ) : (
        children
      )}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  description,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('space-y-1.5', className)} {...props}>
      {title && <h3 className={textVariants.heading.h4()}>{title}</h3>}
      {description && <p className={textVariants.body.sm()}>{description}</p>}
      {children}
    </div>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('flex items-center pt-4', className)} {...props}>
      {children}
    </div>
  );
};

// Backward compatibility: InfoCard wrapper
export interface InfoCardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
  variant = 'info',
  size = 'default',
  className,
}) => {
  const paddingMap = { sm: 'sm', default: 'md', lg: 'lg' } as const;
  const cardVariant = variant === 'neutral' ? 'bordered' : variant;

  return (
    <Card
      variant={cardVariant}
      padding={paddingMap[size]}
      className={className}
    >
      {title && (
        <h3
          className={cn(
            'font-semibold mb-2',
            size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg'
          )}
        >
          {title}
        </h3>
      )}
      {children}
    </Card>
  );
};

// Backward compatibility: CalloutBox wrapper
export interface CalloutBoxProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'gradient' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'default' | 'lg';
  centered?: boolean;
  className?: string;
}

export const CalloutBox: React.FC<CalloutBoxProps> = ({
  title,
  icon,
  children,
  variant = 'gradient',
  size = 'default',
  centered = false,
  className,
}) => {
  const paddingMap = { sm: 'sm', default: 'md', lg: 'lg' } as const;
  const cardVariant =
    variant === 'gradient' || variant === 'neutral' ? 'callout' : variant;

  return (
    <Card
      variant={cardVariant}
      padding={paddingMap[size]}
      className={className}
    >
      <div className={cn('space-y-4', centered && 'text-center')}>
        {icon && (
          <div
            className={cn(
              'font-bold',
              size === 'sm'
                ? 'text-2xl'
                : size === 'lg'
                  ? 'text-5xl'
                  : 'text-4xl',
              centered ? 'text-center' : 'text-left'
            )}
          >
            {icon}
          </div>
        )}
        {title && (
          <h3
            className={cn(
              'font-bold mb-4',
              size === 'sm'
                ? 'text-lg'
                : size === 'lg'
                  ? 'text-3xl'
                  : 'text-2xl'
            )}
          >
            {title}
          </h3>
        )}
        <div
          className={cn(
            'text-gray-600 dark:text-gray-400',
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
          )}
        >
          {children}
        </div>
      </div>
    </Card>
  );
};
