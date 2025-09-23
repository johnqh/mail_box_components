import React from 'react';
import { cn } from '../lib/utils';

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
  const variantStyles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300',
    success:
      'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-900 dark:text-green-300',
    warning:
      'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-300',
    error:
      'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-300',
    neutral:
      'bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-300',
  };

  const sizeStyles = {
    sm: 'p-4 text-sm',
    default: 'p-6',
    lg: 'p-8 text-lg',
  };

  const titleVariantStyles = {
    info: 'text-blue-900 dark:text-blue-300',
    success: 'text-green-900 dark:text-green-300',
    warning: 'text-yellow-900 dark:text-yellow-300',
    error: 'text-red-900 dark:text-red-300',
    neutral: 'text-gray-900 dark:text-gray-300',
  };

  return (
    <div
      data-testid='info-card'
      className={cn(
        'rounded-lg',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {title && (
        <h3
          className={cn(
            'font-semibold mb-2',
            titleVariantStyles[variant],
            size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg'
          )}
        >
          {title}
        </h3>
      )}
      <div
        className={cn(
          variant === 'info' && 'text-blue-800 dark:text-blue-400',
          variant === 'success' && 'text-green-800 dark:text-green-400',
          variant === 'warning' && 'text-yellow-800 dark:text-yellow-400',
          variant === 'error' && 'text-red-800 dark:text-red-400',
          variant === 'neutral' && 'text-gray-800 dark:text-gray-400'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
