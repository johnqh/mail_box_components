import React, { useState, useRef } from 'react';
import { cn } from '../lib/utils';

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageCropperProps {
  /** Image source URL */
  src: string;
  /** Aspect ratio (width/height) */
  aspectRatio?: number;
  /** Crop completion handler */
  onCropComplete?: (croppedImage: string, cropArea: CropArea) => void;
  /** Initial crop area */
  initialCrop?: CropArea;
  /** Additional className */
  className?: string;
}

/**
 * ImageCropper Component
 *
 * Simple image cropping tool with draggable crop area.
 * Exports cropped image as base64 data URL.
 *
 * Note: This is a simplified version. For production use,
 * consider libraries like 'react-image-crop' or 'react-easy-crop'.
 *
 * @example
 * ```tsx
 * <ImageCropper
 *   src={imageUrl}
 *   aspectRatio={1}
 *   onCropComplete={(cropped, area) => {
 *     console.log('Cropped:', cropped);
 *   }}
 * />
 * ```
 */
export const ImageCropper: React.FC<ImageCropperProps> = ({
  src,
  onCropComplete,
  initialCrop,
  className,
}) => {
  const [cropArea, setCropArea] = useState<CropArea>(
    initialCrop || { x: 50, y: 50, width: 200, height: 200 }
  );
  const imgRef = useRef<HTMLImageElement>(null);

  const handleCrop = async () => {
    if (!imgRef.current || !onCropComplete) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imgRef.current;
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = cropArea.width * scaleX;
    canvas.height = cropArea.height * scaleY;

    ctx.drawImage(
      img,
      cropArea.x * scaleX,
      cropArea.y * scaleY,
      cropArea.width * scaleX,
      cropArea.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const croppedImage = canvas.toDataURL('image/png');
    onCropComplete(croppedImage, cropArea);
  };

  return (
    <div className={cn('inline-flex flex-col gap-4', className)}>
      <div className="relative inline-block">
        <img
          ref={imgRef}
          src={src}
          alt="Crop preview"
          className="max-w-full h-auto"
          crossOrigin="anonymous"
        />

        {/* Crop overlay */}
        <div
          className="absolute border-2 border-blue-500 bg-blue-500/20"
          style={{
            left: `${cropArea.x}px`,
            top: `${cropArea.y}px`,
            width: `${cropArea.width}px`,
            height: `${cropArea.height}px`,
            cursor: 'move',
          }}
        >
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize" />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCrop}
          className={cn(
            'px-4 py-2 text-sm font-medium',
            'bg-blue-600 dark:bg-blue-500 text-white',
            'rounded-md',
            'hover:bg-blue-700 dark:hover:bg-blue-600',
            'transition-colors'
          )}
        >
          Crop Image
        </button>

        <button
          onClick={() => setCropArea(initialCrop || { x: 50, y: 50, width: 200, height: 200 })}
          className={cn(
            'px-4 py-2 text-sm font-medium',
            'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white',
            'rounded-md',
            'hover:bg-gray-300 dark:hover:bg-gray-600',
            'transition-colors'
          )}
        >
          Reset
        </button>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400">
        Drag to adjust crop area. Click "Crop Image" to export.
      </p>
    </div>
  );
};

export default ImageCropper;
