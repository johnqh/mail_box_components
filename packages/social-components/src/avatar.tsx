import React, { useState } from 'react';
import { cn } from '@sudobility/components';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback text (initials) to display when no image */
  fallback?: string;
  /** Name to generate initials from */
  name?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Additional className */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Avatar Component
 *
 * Avatar component for displaying user images or initials.
 * Supports status indicators and fallback to initials when image fails to load.
 *
 * @example
 * ```tsx
 * // User image
 * <Avatar src="/avatar.jpg" alt="John Doe" fallback="JD" />
 *
 * // Generate initials from name
 * <Avatar name="John Doe" />
 *
 * // With status indicator
 * <Avatar src="/avatar.jpg" status="online" />
 * ```
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  name,
  size = 'md',
  status,
  className,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  // Size configurations
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const statusSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  // Status indicator configurations
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  // Generate initials from name
  const generateInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[parts.length - 1].charAt(0).toUpperCase()
    );
  };

  // Determine what to display
  const displayFallback = fallback || (name ? generateInitials(name) : '');
  const showImage = src && !imageError;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className='relative inline-block flex-shrink-0'>
      <div
        className={cn(
          'flex items-center justify-center overflow-hidden rounded-full',
          sizeClasses[size],
          !showImage &&
            'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200',
          onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
          className
        )}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className='w-full h-full object-cover'
            onError={handleImageError}
          />
        ) : (
          <span className='font-semibold'>{displayFallback}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-800',
            statusClasses[status],
            statusSizeClasses[size]
          )}
          aria-label={status}
        />
      )}
    </div>
  );
};
