import React from 'react';
import { cn } from '../../lib/utils';

export interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  variant?: 'default' | 'primary' | 'danger';
  className?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  maxCount = 99,
  variant = 'danger',
  className,
}) => {
  const display = count > maxCount ? `${maxCount}+` : count;
  const variants = {
    default: 'bg-gray-500',
    primary: 'bg-blue-500',
    danger: 'bg-red-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white rounded-full',
        variants[variant],
        className
      )}
    >
      {display}
    </span>
  );
};
