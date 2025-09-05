import React from 'react';
import { cn } from "../../lib/utils";

interface StatusIndicatorProps {
  status: 'success' | 'error' | 'warning' | 'info' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}

const statusClasses = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
  neutral: 'bg-gray-500'
};

const sizeClasses = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4'
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'sm',
  pulse = false,
  className
}) => {
  return (
    <div className={cn(
      'rounded-full flex-shrink-0',
      statusClasses[status],
      sizeClasses[size],
      pulse && 'animate-pulse',
      className
    )} />
  );
};

export default StatusIndicator;