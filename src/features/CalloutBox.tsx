import React from 'react';
import { cn } from '../lib/utils';

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
  const variantStyles = {
    gradient:
      'bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800',
    info: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800',
    success:
      'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800',
    warning:
      'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800',
    error:
      'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800',
    neutral:
      'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border border-gray-200 dark:border-gray-800',
  };

  const sizeStyles = {
    sm: 'p-4 rounded-lg',
    default: 'p-6 rounded-xl',
    lg: 'p-8 rounded-2xl',
  };

  const titleVariantStyles = {
    gradient:
      'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600',
    info: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600',
    success:
      'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600',
    warning:
      'text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600',
    error:
      'text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600',
    neutral: 'text-gray-900 dark:text-white',
  };

  const iconSizeStyles = {
    sm: 'text-2xl',
    default: 'text-4xl',
    lg: 'text-5xl',
  };

  const titleSizeStyles = {
    sm: 'text-lg',
    default: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div
      data-testid='callout-box'
      className={cn(variantStyles[variant], sizeStyles[size], className)}
    >
      <div
        data-testid='callout-box-content'
        className={cn('space-y-4', centered && 'text-center')}
      >
        {/* Icon */}
        {icon && (
          <div
            className={cn(
              iconSizeStyles[size],
              'font-bold',
              centered ? 'text-center' : 'text-left'
            )}
          >
            {icon}
          </div>
        )}

        {/* Title */}
        {title && (
          <h3
            className={cn(
              'font-bold mb-4',
              titleSizeStyles[size],
              titleVariantStyles[variant]
            )}
          >
            {title}
          </h3>
        )}

        {/* Content */}
        <div
          className={cn(
            'text-gray-600 dark:text-gray-400',
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CalloutBox;
