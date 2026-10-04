import React from 'react';
import { cn } from '../lib/utils';

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
  /*
    The design system's section-badge colours are a fixed blue-to-purple
    whatever the theme; the brand variants take the theme's primary instead.
    'light' is meant for a coloured or photographic backdrop and keeps its
    white wash.
  */
  const { container, icon: iconColor } =
    variant === 'light'
      ? {
          container:
            'bg-white/20 border border-white/30 text-white backdrop-blur-sm',
          icon: 'text-white',
        }
      : {
          container:
            'bg-primary/10 border border-primary/30 text-primary backdrop-blur-sm',
          icon: 'text-primary',
        };
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
