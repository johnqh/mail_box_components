import React from 'react';
import { cn } from '../lib/utils';

export interface AvatarProps {
  /** Avatar type */
  type?: 'initials' | 'image' | 'icon' | 'number' | 'text';
  /** Content to display (initials, number, text, etc.) */
  content?: string | number;
  /** Image source URL (for type='image') */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Icon component (for type='icon') */
  icon?: React.ComponentType<{ className?: string }>;
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Shape variant */
  shape?: 'circle' | 'square' | 'rounded';
  /** Color variant */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'gray' | 'gradient';
  /** Show status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy' | null;
  /** Status indicator position */
  statusPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  /** Additional className */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Avatar Component
 *
 * Versatile avatar component for displaying user images, initials, icons, or numbers.
 * Commonly used for user profiles, step indicators, and badges.
 *
 * @example
 * ```tsx
 * // User initials
 * <Avatar type="initials" content="JD" variant="primary" />
 *
 * // User image
 * <Avatar type="image" src="/avatar.jpg" alt="John Doe" />
 *
 * // Step number
 * <Avatar type="number" content={1} variant="primary" size="md" />
 *
 * // Icon avatar
 * <Avatar type="icon" icon={UserIcon} variant="gray" />
 *
 * // With status indicator
 * <Avatar type="image" src="/avatar.jpg" status="online" />
 * ```
 */
export const Avatar: React.FC<AvatarProps> = ({
  type = 'initials',
  content,
  src,
  alt,
  icon: Icon,
  size = 'md',
  shape = 'circle',
  variant = 'primary',
  status = null,
  statusPosition = 'bottom-right',
  className,
  onClick,
}) => {
  // Size configurations
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-20 h-20 text-xl',
  };

  const iconSizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
    '2xl': 'h-10 w-10',
  };

  // Shape configurations
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg',
  };

  // Color variant configurations
  const variantClasses = {
    primary: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    danger: 'bg-red-500 text-white',
    purple: 'bg-purple-500 text-white',
    gray: 'bg-gray-500 text-white',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
  };

  // Status indicator configurations
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const statusPositionClasses = {
    'top-right': 'top-0 right-0',
    'bottom-right': 'bottom-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-left': 'bottom-0 left-0',
  };

  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5',
  };

  // Render content based on type
  const renderContent = () => {
    if (type === 'image' && src) {
      return (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="w-full h-full object-cover"
        />
      );
    }

    if (type === 'icon' && Icon) {
      return <Icon className={iconSizeClasses[size]} />;
    }

    if (type === 'number' || type === 'text' || type === 'initials') {
      return <span className="font-bold">{content}</span>;
    }

    return null;
  };

  return (
    <div className="relative inline-block flex-shrink-0">
      <div
        className={cn(
          'flex items-center justify-center overflow-hidden',
          sizeClasses[size],
          shapeClasses[shape],
          type !== 'image' && variantClasses[variant],
          onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
          className
        )}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {renderContent()}
      </div>
      {status && (
        <span
          className={cn(
            'absolute rounded-full border-2 border-white dark:border-gray-800',
            statusClasses[status],
            statusPositionClasses[statusPosition],
            statusSizeClasses[size]
          )}
          aria-label={status}
        />
      )}
    </div>
  );
};

export default Avatar;
