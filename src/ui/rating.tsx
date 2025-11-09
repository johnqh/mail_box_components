import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface RatingProps {
  /** Rating value */
  value: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Maximum rating */
  max?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Read-only mode */
  readonly?: boolean;
  /** Allow half ratings */
  allowHalf?: boolean;
  /** Custom icon */
  icon?: 'star' | 'heart' | 'thumbs';
  /** Color variant */
  color?: 'yellow' | 'red' | 'blue' | 'green';
  /** Show count label */
  showLabel?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Rating Component
 *
 * Star rating with customizable icons and precision.
 * Supports full and half ratings.
 *
 * @example
 * ```tsx
 * <Rating value={4.5} onChange={setRating} allowHalf />
 * ```
 *
 * @example
 * ```tsx
 * <Rating
 *   value={rating}
 *   onChange={handleRatingChange}
 *   max={5}
 *   size="lg"
 *   icon="heart"
 *   color="red"
 *   showLabel
 * />
 * ```
 */
export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 5,
  size = 'md',
  readonly = false,
  allowHalf = false,
  icon = 'star',
  color = 'yellow',
  showLabel = false,
  className,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (index: number, isHalf: boolean) => {
    if (readonly || !onChange) return;
    const newValue = index + (isHalf && allowHalf ? 0.5 : 1);
    onChange(newValue);
  };

  const handleMouseEnter = (index: number, isHalf: boolean) => {
    if (readonly) return;
    const newValue = index + (isHalf && allowHalf ? 0.5 : 1);
    setHoverValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  // Size configurations
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  // Color configurations
  const colorClasses = {
    yellow: 'text-yellow-400',
    red: 'text-red-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
  };

  const icons = {
    star: (filled: boolean) => (
      <svg
        className='w-full h-full'
        fill={filled ? 'currentColor' : 'none'}
        stroke='currentColor'
        strokeWidth={filled ? 0 : 2}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
        />
      </svg>
    ),
    heart: (filled: boolean) => (
      <svg
        className='w-full h-full'
        fill={filled ? 'currentColor' : 'none'}
        stroke='currentColor'
        strokeWidth={filled ? 0 : 2}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        />
      </svg>
    ),
    thumbs: (filled: boolean) => (
      <svg
        className='w-full h-full'
        fill={filled ? 'currentColor' : 'none'}
        stroke='currentColor'
        strokeWidth={filled ? 0 : 2}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
        />
      </svg>
    ),
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  const renderIcon = (index: number) => {
    const isFilled = index < Math.floor(displayValue);
    const isHalf = index === Math.floor(displayValue) && displayValue % 1 !== 0;

    return (
      <div
        className={cn(
          'relative',
          !readonly && 'cursor-pointer transition-transform hover:scale-110',
          sizeClasses[size]
        )}
      >
        {/* Full/empty icon */}
        <div
          className={cn(
            isFilled ? colorClasses[color] : 'text-gray-300 dark:text-gray-600'
          )}
        >
          {icons[icon](isFilled)}
        </div>

        {/* Half icon overlay */}
        {isHalf && allowHalf && (
          <div
            className={cn(
              'absolute inset-0 overflow-hidden',
              colorClasses[color]
            )}
            style={{ width: '50%' }}
          >
            {icons[icon](true)}
          </div>
        )}

        {/* Click areas for half ratings */}
        {!readonly && onChange && (
          <div className='absolute inset-0 flex'>
            {allowHalf && (
              <>
                <div
                  className='w-1/2 h-full'
                  onClick={() => handleClick(index, true)}
                  onMouseEnter={() => handleMouseEnter(index, true)}
                  onMouseLeave={handleMouseLeave}
                />
                <div
                  className='w-1/2 h-full'
                  onClick={() => handleClick(index, false)}
                  onMouseEnter={() => handleMouseEnter(index, false)}
                  onMouseLeave={handleMouseLeave}
                />
              </>
            )}
            {!allowHalf && (
              <div
                className='w-full h-full'
                onClick={() => handleClick(index, false)}
                onMouseEnter={() => handleMouseEnter(index, false)}
                onMouseLeave={handleMouseLeave}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <div className='flex items-center gap-1'>
        {Array.from({ length: max }, (_, i) => (
          <React.Fragment key={i}>{renderIcon(i)}</React.Fragment>
        ))}
      </div>
      {showLabel && (
        <span className='text-sm text-gray-600 dark:text-gray-400'>
          {value.toFixed(allowHalf ? 1 : 0)} / {max}
        </span>
      )}
    </div>
  );
};

export default Rating;
