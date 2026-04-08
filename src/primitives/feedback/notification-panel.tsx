import React from 'react';
import { cn } from '../../lib/utils';
import { colors, textVariants } from '@sudobility/design';

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
        'rounded-lg border p-4 max-h-96 overflow-y-auto',
        colors.component.card.default.base,
        colors.component.card.default.dark,
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
          <h4 className={cn('font-semibold', textVariants.body.sm())}>
            {notif.title}
          </h4>
          <p className={cn(textVariants.body.sm(), 'opacity-70')}>
            {notif.message}
          </p>
          <span className={textVariants.caption.default()}>
            {notif.timestamp}
          </span>
        </div>
      ))}
    </div>
  );
};
