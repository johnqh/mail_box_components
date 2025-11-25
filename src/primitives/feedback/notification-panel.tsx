import React from 'react';
import { cn } from '../../lib/utils';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
}

export interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  className?: string;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  onMarkAsRead,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 max-h-96 overflow-y-auto',
        className
      )}
    >
      {notifications.map(notif => (
        <div
          key={notif.id}
          className={cn(
            'p-3 rounded mb-2',
            notif.read ? 'bg-transparent' : 'bg-blue-50 dark:bg-blue-900/20'
          )}
          onClick={() => onMarkAsRead?.(notif.id)}
        >
          <h4 className='font-semibold text-gray-900 dark:text-white'>
            {notif.title}
          </h4>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {notif.message}
          </p>
          <span className='text-xs text-gray-500 dark:text-gray-500'>
            {notif.timestamp}
          </span>
        </div>
      ))}
    </div>
  );
};
