import React from 'react';
import { cn } from '../../lib/utils';
import { getStatusIndicatorColor } from '@sudobility/design';

export interface ToastNotificationProps {
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  className?: string;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  variant = 'info',
  onClose,
  className,
}) => {
  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 p-4 rounded-lg text-white shadow-lg flex items-center gap-3',
        getStatusIndicatorColor(variant),
        className
      )}
    >
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className='ml-4'>
          ×
        </button>
      )}
    </div>
  );
};
