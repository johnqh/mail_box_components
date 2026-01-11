import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface RetinaImageProps {
  /** Image source URL */
  src: string;
  /** Alt text */
  alt: string;
  /** Scale factor for retina images (default: 2 for 2x retina) */
  scale?: number;
  /** Additional className for the image */
  className?: string;
  /** Additional className for the container */
  containerClassName?: string;
  /** Callback when image loads */
  onLoad?: () => void;
  /** Callback when image errors */
  onError?: () => void;
}

/**
 * RetinaImage Component
 *
 * Displays retina (high-DPI) images at their correct display size.
 * Automatically scales down images based on the scale factor.
 * For 2x retina images, displays at 50% of natural dimensions.
 *
 * @example
 * ```tsx
 * // Display a 2x retina screenshot at correct size
 * <RetinaImage
 *   src="/screenshots/feature.png"
 *   alt="Feature screenshot"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Display a 3x retina image
 * <RetinaImage
 *   src="/images/icon@3x.png"
 *   alt="App icon"
 *   scale={3}
 * />
 * ```
 */
export const RetinaImage: React.FC<RetinaImageProps> = ({
  src,
  alt,
  scale = 2,
  className,
  containerClassName: _containerClassName,
  onLoad,
  onError,
}) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    // Display at 1/scale of natural dimensions
    setDimensions({
      width: Math.round(img.naturalWidth / scale),
      height: Math.round(img.naturalHeight / scale),
    });
    onLoad?.();
  };

  const handleError = (_e: React.SyntheticEvent<HTMLImageElement>) => {
    onError?.();
  };

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'max-w-full h-auto',
        className
      )}
      onLoad={handleLoad}
      onError={handleError}
      width={dimensions?.width}
      height={dimensions?.height}
      style={dimensions ? undefined : { visibility: 'hidden' }}
    />
  );
};
