import React from 'react';
import { cn } from '@sudobility/components';

export interface AlertBannerProps {
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  message,
  variant = 'info',
  dismissible = false,
  onDismiss,
  className,
}) => {
  const variants = {
    info: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700',
    success:
      'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700',
    warning:
      'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
    error:
      'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700',
  };

  return (
    <div
      className={cn(
        'p-4 border rounded-lg flex items-center justify-between',
        variants[variant],
        className
      )}
    >
      <span>{message}</span>
      {dismissible && (
        <button onClick={onDismiss} className='ml-4 font-bold'>
          ×
        </button>
      )}
    </div>
  );
};

export default AlertBanner;
