import React from 'react';
import { cn } from '../lib/utils';

interface IconContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'neutral';
  shape?: 'square' | 'rounded' | 'circle';
  animation?: 'none' | 'float' | 'pulse' | 'bounce';
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
  xl: 'w-24 h-24',
};

const iconSizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
  xl: 'h-12 w-12',
};

const variantClasses = {
  primary:
    'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 shadow-lg hover:shadow-blue-200',
  secondary:
    'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 shadow-lg hover:shadow-purple-200',
  success:
    'bg-gradient-to-br from-green-100 to-green-200 text-green-600 shadow-lg hover:shadow-green-200',
  warning:
    'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600 shadow-lg hover:shadow-yellow-200',
  error:
    'bg-gradient-to-br from-red-100 to-red-200 text-red-600 shadow-lg hover:shadow-red-200',
  neutral:
    'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 shadow-lg hover:shadow-gray-200',
};

const shapeClasses = {
  square: 'rounded-none',
  rounded: 'rounded-2xl',
  circle: 'rounded-full',
};

const animationClasses = {
  none: '',
  float: 'animate-float',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce-slow',
};

export const IconContainer: React.FC<IconContainerProps> = ({
  children,
  size = 'lg',
  variant = 'primary',
  shape = 'rounded',
  animation = 'float',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-105',
        sizeClasses[size],
        variantClasses[variant],
        shapeClasses[shape],
        animationClasses[animation],
        className
      )}
    >
      <div className={cn(iconSizeClasses[size])}>{children}</div>
    </div>
  );
};
