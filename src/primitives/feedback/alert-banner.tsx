import React from 'react';
import { cn } from '../../lib/utils';
import { colors } from '@sudobility/design';

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
  const alertColors = colors.component.alert[variant];

  return (
    <div
      className={cn(
        'p-4 border rounded-lg flex items-center justify-between',
        alertColors.base,
        alertColors.dark,
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
