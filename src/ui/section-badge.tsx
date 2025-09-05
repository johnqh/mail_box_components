import React from 'react';
import { cn } from '../lib/utils';

interface SectionBadgeProps {
  icon: React.ReactNode;
  text: string;
  variant?: 'default' | 'premium' | 'primary' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  default: {
    container: 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200 text-blue-600 backdrop-blur-sm',
    icon: 'text-blue-600'
  },
  premium: {
    container: 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200 text-blue-600 backdrop-blur-sm',
    icon: 'text-blue-600'
  },
  primary: {
    container: 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200 text-blue-600 backdrop-blur-sm',
    icon: 'text-blue-600'
  },
  light: {
    container: 'bg-white/20 border border-white/30 text-white backdrop-blur-sm',
    icon: 'text-white'
  }
};

const sizeStyles = {
  sm: {
    container: 'px-6 py-3',
    icon: 'h-5 w-5 mr-2',
    text: 'font-semibold'
  },
  md: {
    container: 'px-6 py-3',
    icon: 'h-5 w-5 mr-2',
    text: 'font-semibold'
  },
  lg: {
    container: 'px-6 py-3',
    icon: 'h-5 w-5 mr-2',
    text: 'font-semibold'
  }
};

export const SectionBadge: React.FC<SectionBadgeProps> = ({
  icon,
  text,
  variant = 'default',
  size = 'md',
  className
}) => {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <div className={cn(
      'inline-flex items-center rounded-full mb-6',
      variantStyle.container,
      sizeStyle.container,
      className
    )}>
      <div className={cn(
        'animate-float-icon',
        variantStyle.icon,
        sizeStyle.icon
      )}>
        {icon}
      </div>
      <span className={sizeStyle.text}>
        {text}
      </span>
    </div>
  );
};


export default SectionBadge;