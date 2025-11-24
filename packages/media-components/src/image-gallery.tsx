import React, { useState } from 'react';
import { cn } from '@sudobility/components';

export interface GalleryImage {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
  thumbnail?: string;
}

export interface ImageGalleryProps {
  /** Gallery images */
  images: GalleryImage[];
  /** Grid columns */
  columns?: number;
  /** Gap between images */
  gap?: number;
  /** Enable lightbox */
  lightbox?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * ImageGallery Component
 *
 * Image gallery with grid layout and optional lightbox.
 * Supports thumbnails and captions.
 *
 * @example
 * ```tsx
 * <ImageGallery
 *   images={[
 *     { id: '1', src: '/img1.jpg', alt: 'Image 1', caption: 'Caption 1' },
 *     { id: '2', src: '/img2.jpg', alt: 'Image 2', caption: 'Caption 2' }
 *   ]}
 *   columns={3}
 *   lightbox
 * />
 * ```
 */
export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  gap = 16,
  lightbox = true,
  className,
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleImageClick = (image: GalleryImage) => {
    if (lightbox) {
      setSelectedImage(image);
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setSelectedImage(images[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(images[nextIndex]);
  };

  return (
    <>
      <div
        className={cn('grid', className)}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {images.map(image => (
          <div
            key={image.id}
            className={cn(
              'relative aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700',
              lightbox && 'cursor-pointer hover:opacity-90 transition-opacity'
            )}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.thumbnail || image.src}
              alt={image.alt || ''}
              className='w-full h-full object-cover'
            />
            {image.caption && (
              <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2'>
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && selectedImage && (
        <div
          className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4'
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className='absolute top-4 right-4 text-white hover:text-gray-300 transition-colors'
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

          <button
            onClick={e => {
              e.stopPropagation();
              handlePrevious();
            }}
            className='absolute left-4 text-white hover:text-gray-300 transition-colors'
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
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              handleNext();
            }}
            className='absolute right-4 text-white hover:text-gray-300 transition-colors'
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
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>

          <div
            className='max-w-4xl max-h-full'
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt || ''}
              className='max-w-full max-h-[80vh] object-contain'
            />
            {selectedImage.caption && (
              <p className='text-white text-center mt-4'>
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
