import React from 'react';
import { cn } from '@sudobility/components';
import { getStatusIndicatorColor } from '@sudobility/design';

interface StatusIndicatorProps {
  status: 'success' | 'error' | 'warning' | 'info' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'sm',
  pulse = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-full flex-shrink-0',
        getStatusIndicatorColor(status),
        sizeClasses[size],
        pulse && 'animate-pulse',
        className
      )}
    />
  );
};

export default StatusIndicator;
