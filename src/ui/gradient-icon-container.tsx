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

  // Gradient color variants
  const gradientVariants = {
    'blue-purple': 'bg-gradient-to-r from-blue-600 to-purple-600',
    'green-blue': 'bg-gradient-to-r from-green-600 to-blue-600',
    'orange-red': 'bg-gradient-to-r from-orange-600 to-red-600',
    gray: 'bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900',
    custom: gradientClasses || 'bg-gradient-to-r from-blue-600 to-purple-600',
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
      <Icon className={cn('text-white', sizeConfig.icon, iconClassName)} />
    </div>
  );
};

export default GradientIconContainer;
