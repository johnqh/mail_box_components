import React from 'react';
import { cn } from '../lib/utils';

export interface GradientIconContainerProps {
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Shape variant */
  shape?: 'square' | 'rounded' | 'circle';
  /** Gradient color variant */
  variant?: 'blue-purple' | 'green-blue' | 'orange-red' | 'gray' | 'custom';
  /** Custom gradient classes (when variant is 'custom') */
  gradientClasses?: string;
  /** Additional className for the container */
  className?: string;
  /** Custom icon className */
  iconClassName?: string;
}

/**
 * GradientIconContainer Component
 *
 * A reusable container for displaying icons with gradient backgrounds.
 * Commonly used in feature showcases, benefit sections, and landing pages.
 *
 * @example
 * ```tsx
 * import { ShieldCheckIcon } from '@heroicons/react/24/outline';
 *
 * <GradientIconContainer
 *   icon={ShieldCheckIcon}
 *   size="lg"
 *   variant="blue-purple"
 *   shape="rounded"
 * />
 * ```
 */
export const GradientIconContainer: React.FC<GradientIconContainerProps> = ({
  icon: Icon,
  size = 'md',
  shape = 'rounded',
  variant = 'blue-purple',
  gradientClasses,
  className,
  iconClassName,
}) => {
  // Size configurations (container and icon)
  const sizeClasses = {
    sm: {
      container: 'w-10 h-10',
      icon: 'h-5 w-5',
    },
    md: {
      container: 'w-12 h-12',
      icon: 'h-6 w-6',
    },
    lg: {
      container: 'w-16 h-16',
      icon: 'h-8 w-8',
    },
    xl: {
      container: 'w-20 h-20',
      icon: 'h-10 w-10',
    },
  };

  // Shape configurations
  const shapeClasses = {
    square: 'rounded-lg',
    rounded: 'rounded-xl',
    circle: 'rounded-full',
  };

  /*
    Gradients from the theme's own colours. The variant names are kept for
    compatibility: 'blue-purple' is the theme's primary, blue or not. Each
    pairs with the foreground that reads on its starting colour.
  */
  const primaryGradient = 'bg-gradient-to-r from-primary to-primary/70';
  const gradientVariants = {
    'blue-purple': primaryGradient,
    'green-blue': 'bg-gradient-to-r from-success to-primary',
    'orange-red': 'bg-gradient-to-r from-warning to-destructive',
    gray: 'bg-gradient-to-r from-muted-foreground/70 to-muted-foreground',
    custom: gradientClasses || primaryGradient,
  };
  const iconColors = {
    'blue-purple': 'text-primary-foreground',
    'green-blue': 'text-success-foreground',
    'orange-red': 'text-warning-foreground',
    gray: 'text-background',
    // A caller's own gradient: its colours are unknown, so white as before.
    custom: gradientClasses ? 'text-white' : 'text-primary-foreground',
  };

  const sizeConfig = sizeClasses[size];

  return (
    <div
      className={cn(
        'flex items-center justify-center flex-shrink-0',
        sizeConfig.container,
        shapeClasses[shape],
        gradientVariants[variant],
        className
      )}
    >
      <Icon
        className={cn(iconColors[variant], sizeConfig.icon, iconClassName)}
      />
    </div>
  );
};
