import React from 'react';
import { cn } from '../../lib/utils';

export interface LoadingDotsProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'white';
  /** Custom color */
  color?: string;
  /** Additional className */
  className?: string;
}

/**
 * LoadingDots Component
 *
 * Animated loading indicator with bouncing dots.
 * Simple and lightweight alternative to spinners.
 *
 * @example
 * ```tsx
 * <LoadingDots size="md" variant="primary" />
 * ```
 *
 * @example
 * ```tsx
 * <LoadingDots size="lg" color="#10b981" />
 * ```
 */
export const LoadingDots: React.FC<LoadingDotsProps> = ({
  size = 'md',
  variant = 'primary',
  color,
  className,
}) => {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const variantClasses = {
    primary: 'bg-blue-600 dark:bg-blue-500',
    secondary: 'bg-gray-600 dark:bg-gray-400',
    white: 'bg-white',
  };

  const dotClass = cn(
    'rounded-full',
    sizeClasses[size],
    color ? '' : variantClasses[variant]
  );

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div
        className={dotClass}
        style={{
          backgroundColor: color,
          animation: 'loading-dot-bounce 1.4s infinite ease-in-out both',
          animationDelay: '-0.32s',
        }}
      />
      <div
        className={dotClass}
        style={{
          backgroundColor: color,
          animation: 'loading-dot-bounce 1.4s infinite ease-in-out both',
          animationDelay: '-0.16s',
        }}
      />
      <div
        className={dotClass}
        style={{
          backgroundColor: color,
          animation: 'loading-dot-bounce 1.4s infinite ease-in-out both',
        }}
      />

      <style>{`
        @keyframes loading-dot-bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
