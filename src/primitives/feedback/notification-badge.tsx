import React from 'react';
import { cn } from '../../lib/utils';
import { colors } from '@sudobility/design';

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

  const badgeColorMap = {
    default: colors.component.badge.default,
    primary: colors.component.badge.primary,
    danger: colors.component.badge.error,
  } as const;

  const badgeColors = badgeColorMap[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full',
        badgeColors.base,
        badgeColors.dark,
        className
      )}
    >
      {display}
    </span>
  );
};
