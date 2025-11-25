import React from 'react';
import { cn } from '../lib/utils';
import { getSectionBadgeColors } from '@sudobility/design';

interface SectionBadgeProps {
  icon: React.ReactNode;
  text: string;
  variant?: 'default' | 'premium' | 'primary' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: {
    container: 'px-6 py-3',
    icon: 'h-5 w-5 mr-2',
    text: 'font-semibold',
  },
  md: {
    container: 'px-6 py-3',
    icon: 'h-5 w-5 mr-2',
    text: 'font-semibold',
  },
  lg: {
    container: 'px-6 py-3',
    icon: 'h-5 w-5 mr-2',
    text: 'font-semibold',
  },
};

export const SectionBadge: React.FC<SectionBadgeProps> = ({
  icon,
  text,
  variant = 'default',
  size = 'md',
  className,
}) => {
  const { container, icon: iconColor } = getSectionBadgeColors(variant);
  const sizeStyle = sizeStyles[size];

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full mb-6',
        container,
        sizeStyle.container,
        className
      )}
    >
      <div className={cn('animate-float-icon', iconColor, sizeStyle.icon)}>
        {icon}
      </div>
      <span className={sizeStyle.text}>{text}</span>
    </div>
  );
};
