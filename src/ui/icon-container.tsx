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
  primary: `${GRADIENTS.buttons.primary} text-white shadow-lg`,
  secondary: `${GRADIENTS.buttons.primaryPurple} text-white shadow-lg`,
  success:
    'bg-gradient-to-br from-success/20 to-success/30 text-success shadow-lg',
  warning:
    'bg-gradient-to-br from-warning/20 to-warning/30 text-warning shadow-lg',
  error:
    'bg-gradient-to-br from-destructive/20 to-destructive/30 text-destructive shadow-lg',
  neutral:
    'bg-gradient-to-br from-muted to-muted text-muted-foreground shadow-lg',
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
