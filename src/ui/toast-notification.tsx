import React from 'react';
import { cn } from '../lib/utils';

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
  const variants = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className={cn('fixed bottom-4 right-4 p-4 rounded-lg text-white shadow-lg flex items-center gap-3', variants[variant], className)}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4">×</button>
      )}
    </div>
  );
};

export default ToastNotification;
