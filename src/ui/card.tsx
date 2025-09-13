import React from 'react';
import { cn } from '../lib/utils';
import { textVariants } from '@johnqh/design_system';


interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles = {
  default: 'bg-white dark:bg-gray-800',
  bordered: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  elevated: 'bg-white dark:bg-gray-800 shadow-md'
};

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8'
};

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-lg',
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
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
      {title && (
        <h3 className={textVariants.heading.h4()}>
          {title}
        </h3>
      )}
      {description && (
        <p className={textVariants.body.sm()}>
          {description}
        </p>
      )}
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

export default Card;