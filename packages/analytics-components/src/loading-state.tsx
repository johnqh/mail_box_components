import React from 'react';
import { cn, Spinner } from '@sudobility/components';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'default' | 'large';
  fullScreen?: boolean;
  variant?: 'default' | 'white' | 'success' | 'warning' | 'error';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'default',
  fullScreen = false,
  variant = 'default',
  className,
}) => {
  const sizeConfig = {
    small: { spinner: 'small' as const, text: 'text-sm' },
    default: { spinner: 'default' as const, text: 'text-base' },
    large: { spinner: 'large' as const, text: 'text-lg' },
  };

  const config = sizeConfig[size];

  const containerClass = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80'
    : 'flex flex-col items-center justify-center p-8';

  const content = (
    <div className={cn(containerClass, className)}>
      <Spinner size={config.spinner} variant={variant} className='mb-4' />
      {message && (
        <p
          className={cn(
            config.text,
            'text-gray-600 dark:text-gray-400 text-center max-w-sm'
          )}
        >
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className='fixed inset-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'>
        <div className='flex items-center justify-center min-h-full p-4'>
          <Spinner size={config.spinner} variant={variant} className='mb-4' />
          {message && (
            <p className='text-center text-gray-600 dark:text-gray-400 max-w-sm'>
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  return content;
};
