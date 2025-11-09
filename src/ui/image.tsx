import React, { useState, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

export interface ImageProps {
  /** Image source URL */
  src: string;
  /** Alt text */
  alt: string;
  /** Fallback image URL */
  fallback?: string;
  /** Width */
  width?: string | number;
  /** Height */
  height?: string | number;
  /** Object fit */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Lazy loading */
  loading?: 'lazy' | 'eager';
  /** Show loading state */
  showLoader?: boolean;
  /** Rounded corners */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Border */
  border?: boolean;
  /** Additional className */
  className?: string;
  /** Callback when image loads */
  onLoad?: () => void;
  /** Callback when image errors */
  onError?: () => void;
}

/**
 * Image Component
 *
 * Image with lazy loading, error handling, and fallback support.
 * Shows loader and fallback states automatically.
 *
 * @example
 * ```tsx
 * <Image
 *   src="/avatar.jpg"
 *   alt="User avatar"
 *   width={100}
 *   height={100}
 *   rounded="full"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Image
 *   src={imageUrl}
 *   alt="Product image"
 *   fallback="/placeholder.png"
 *   loading="lazy"
 *   showLoader
 * />
 * ```
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallback,
  width,
  height,
  objectFit = 'cover',
  loading = 'lazy',
  showLoader = true,
  rounded = 'none',
  border = false,
  className,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Reset state when src changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setCurrentSrc(src);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);

    // Try fallback if available
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setHasError(false);
      setIsLoading(true);
    }

    onError?.();
  };

  // Rounded classes
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  // Object fit classes
  const objectFitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  const containerStyles: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={cn(
        'relative inline-block overflow-hidden bg-gray-100 dark:bg-gray-800',
        roundedClasses[rounded],
        border && 'border border-gray-200 dark:border-gray-700',
        className
      )}
      style={containerStyles}
    >
      {/* Loading state */}
      {showLoader && isLoading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='animate-pulse'>
            <PhotoIcon className='h-8 w-8 text-gray-400' />
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <PhotoIcon className='h-8 w-8 text-gray-400' />
        </div>
      )}

      {/* Actual image */}
      {!hasError && (
        <img
          src={currentSrc}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full',
            objectFitClasses[objectFit],
            isLoading && showLoader && 'opacity-0'
          )}
        />
      )}
    </div>
  );
};

export default Image;
