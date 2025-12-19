import { useState } from 'react';
import type { AvatarProps } from '../../types';
import { cn } from '../../lib/cn';

/**
 * Get initials from display name or email
 */
function getInitials(name: string | null, email: string | null): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return '?';
}

/**
 * Avatar component with photo URL and initials fallback
 */
export function Avatar({ user, size = 32, className, onClick }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const hasValidPhoto = user.photoURL && !imageError;
  const initials = getInitials(user.displayName, user.email);

  const baseStyles = cn(
    'rounded-full flex items-center justify-center overflow-hidden',
    onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
    className
  );

  if (hasValidPhoto) {
    return (
      <button
        type='button'
        onClick={onClick}
        className={baseStyles}
        style={{ width: size, height: size }}
      >
        <img
          src={user.photoURL!}
          alt={user.displayName || 'User avatar'}
          className='w-full h-full object-cover'
          onError={() => setImageError(true)}
        />
      </button>
    );
  }

  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(baseStyles, 'bg-blue-600 text-white font-medium')}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </button>
  );
}
