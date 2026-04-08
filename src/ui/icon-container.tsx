import React from 'react';
import { cn } from '../lib/utils';
import { GRADIENTS } from '@sudobility/design';

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
  primary: `${GRADIENTS.buttons.primary} text-white shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900`,
  secondary: `${GRADIENTS.buttons.primaryPurple} text-white shadow-lg hover:shadow-purple-200 dark:hover:shadow-purple-900`,
  success:
    'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-600 dark:text-green-300 shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900',
  warning:
    'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 text-yellow-600 dark:text-yellow-300 shadow-lg hover:shadow-yellow-200 dark:hover:shadow-yellow-900',
  error:
    'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 text-red-600 dark:text-red-300 shadow-lg hover:shadow-red-200 dark:hover:shadow-red-900',
  neutral:
    'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-600 dark:text-gray-300 shadow-lg hover:shadow-gray-200 dark:hover:shadow-gray-900',
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
