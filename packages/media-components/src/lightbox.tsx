import React, { useState, useEffect, useCallback } from 'react';
import { cn, Portal } from '@sudobility/components';

export interface LightboxImage {
  /** Image source URL */
  src: string;
  /** Alt text */
  alt?: string;
  /** Caption */
  caption?: string;
  /** Thumbnail URL (optional) */
  thumbnail?: string;
}

export interface LightboxProps {
  /** Images array */
  images: LightboxImage[];
  /** Current image index */
  index: number;
  /** Open state */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Index change handler */
  onIndexChange?: (index: number) => void;
  /** Show thumbnails */
  showThumbnails?: boolean;
  /** Show download button */
  showDownload?: boolean;
  /** Show zoom controls */
  showZoom?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Lightbox Component
 *
 * Modal image viewer with navigation, zoom, and controls.
 * Supports keyboard navigation and multiple images.
 *
 * @example
 * ```tsx
 * <Lightbox
 *   images={photos}
 *   index={currentIndex}
 *   isOpen={isLightboxOpen}
 *   onClose={() => setIsLightboxOpen(false)}
 *   onIndexChange={setCurrentIndex}
 *   showThumbnails
 *   showDownload
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Lightbox
 *   images={galleryImages}
 *   index={selectedImage}
 *   isOpen={showLightbox}
 *   onClose={closeLightbox}
 *   showZoom
 * />
 * ```
 */
export const Lightbox: React.FC<LightboxProps> = ({
  images,
  index,
  isOpen,
  onClose,
  onIndexChange,
  showThumbnails = false,
  showDownload = false,
  showZoom = true,
  className,
}) => {
  const [zoom, setZoom] = useState(1);

  const currentImage = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  // Navigate to previous image
  const handlePrev = useCallback(() => {
    if (hasPrev) {
      const newIndex = index - 1;
      onIndexChange?.(newIndex);
      setZoom(1);
    }
  }, [hasPrev, index, onIndexChange]);

  // Navigate to next image
  const handleNext = useCallback(() => {
    if (hasNext) {
      const newIndex = index + 1;
      onIndexChange?.(newIndex);
      setZoom(1);
    }
  }, [hasNext, index, onIndexChange]);

  // Zoom in
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 3));
  };

  // Zoom out
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 0.5));
  };

  // Reset zoom
  const handleZoomReset = () => {
    setZoom(1);
  };

  // Download image
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage.src;
    link.download = currentImage.alt || 'image';
    link.click();
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
        case '_':
          handleZoomOut();
          break;
        case '0':
          handleZoomReset();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, index, images.length, onClose, handlePrev, handleNext]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1);
  }, [index]);

  if (!isOpen || !currentImage) return null;

  return (
    <Portal>
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          'bg-black/95',
          className
        )}
      >
        {/* Backdrop */}
        <div
          className='absolute inset-0'
          onClick={onClose}
          aria-label='Close lightbox'
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors'
          aria-label='Close'
        >
          <svg
            className='w-8 h-8'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* Navigation - Previous */}
        {hasPrev && (
          <button
            onClick={handlePrev}
            className='absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 rounded-full transition-all'
            aria-label='Previous image'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
        )}

        {/* Navigation - Next */}
        {hasNext && (
          <button
            onClick={handleNext}
            className='absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 rounded-full transition-all'
            aria-label='Next image'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        )}

        {/* Controls */}
        <div className='absolute top-4 left-4 z-10 flex gap-2'>
          {/* Counter */}
          <div className='px-3 py-1.5 bg-black/50 text-white text-sm rounded-md'>
            {index + 1} / {images.length}
          </div>

          {/* Zoom controls */}
          {showZoom && (
            <div className='flex gap-1 bg-black/50 rounded-md p-1'>
              <button
                onClick={handleZoomOut}
                className='p-1.5 text-white hover:text-gray-300 transition-colors'
                aria-label='Zoom out'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7'
                  />
                </svg>
              </button>
              <button
                onClick={handleZoomReset}
                className='px-2 text-white text-sm hover:text-gray-300 transition-colors'
                aria-label='Reset zoom'
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                className='p-1.5 text-white hover:text-gray-300 transition-colors'
                aria-label='Zoom in'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Download button */}
          {showDownload && (
            <button
              onClick={handleDownload}
              className='p-1.5 bg-black/50 text-white hover:text-gray-300 rounded-md transition-colors'
              aria-label='Download image'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                />
              </svg>
            </button>
          )}
        </div>

        {/* Main image */}
        <div className='relative z-0 flex items-center justify-center max-w-7xl max-h-screen p-20'>
          <img
            src={currentImage.src}
            alt={currentImage.alt || ''}
            className='max-w-full max-h-full object-contain transition-transform'
            style={{
              transform: `scale(${zoom})`,
            }}
          />
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <div className='absolute bottom-20 left-0 right-0 z-10 text-center'>
            <p className='px-4 py-2 bg-black/50 text-white text-sm inline-block rounded-md max-w-2xl'>
              {currentImage.caption}
            </p>
          </div>
        )}

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className='absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2 px-4 overflow-x-auto'>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  onIndexChange?.(i);
                  setZoom(1);
                }}
                className={cn(
                  'flex-shrink-0 w-16 h-16 rounded-md overflow-hidden',
                  'border-2 transition-all',
                  i === index
                    ? 'border-white scale-110'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-400'
                )}
              >
                <img
                  src={img.thumbnail || img.src}
                  alt={img.alt || ''}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </Portal>
  );
};

export default Lightbox;
