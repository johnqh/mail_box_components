import React from 'react';
import { cn } from '../../lib/utils';
import { STATUS_BG, STATUS_ON_BG } from '../../lib/theme';

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
        'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-3',
        STATUS_BG[variant],
        STATUS_ON_BG[variant],
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
