import React, { useState, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

export interface MediaUploaderProps {
  /** Accepted file types */
  accept?: string[];
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Multiple file upload */
  multiple?: boolean;
  /** Upload handler */
  onUpload?: (files: File[]) => void;
  /** File remove handler */
  onRemove?: (fileId: string) => void;
  /** Additional className */
  className?: string;
}

/**
 * MediaUploader Component
 *
 * Drag-and-drop media uploader with previews.
 * Supports images, videos, and audio files.
 *
 * @example
 * ```tsx
 * <MediaUploader
 *   accept={['image/*', 'video/*']}
 *   maxSize={10 * 1024 * 1024} // 10MB
 *   maxFiles={5}
 *   multiple
 *   onUpload={(files) => console.log('Uploading:', files)}
 * />
 * ```
 */
export const MediaUploader: React.FC<MediaUploaderProps> = ({
  accept = ['image/*', 'video/*', 'audio/*'],
  maxSize = 50 * 1024 * 1024, // 50MB default
  maxFiles = 10,
  multiple = true,
  onUpload,
  onRemove,
  className,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      // Check file type
      const isValidType = accept.some(type => {
        if (type.endsWith('/*')) {
          const category = type.split('/')[0];
          return file.type.startsWith(category);
        }
        return file.type === type;
      });

      // Check file size
      const isValidSize = file.size <= maxSize;

      return isValidType && isValidSize;
    });

    // Check max files limit
    const remainingSlots = maxFiles - uploadedFiles.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    const newFiles: UploadedFile[] = filesToAdd.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : undefined,
      status: 'pending',
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    if (onUpload) {
      onUpload(filesToAdd);
    }
  };

  const handleRemove = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    if (onRemove) {
      onRemove(fileId);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={e => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
        )}
      >
        <svg
          className='w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
          />
        </svg>
        <p className='text-gray-700 dark:text-gray-300 mb-2'>
          Drag and drop files here, or click to browse
        </p>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          Max {maxFiles} files, {formatFileSize(maxSize)} each
        </p>

        <input
          ref={fileInputRef}
          type='file'
          multiple={multiple}
          accept={accept.join(',')}
          onChange={handleFileSelect}
          className='hidden'
        />
      </div>

      {/* Uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {uploadedFiles.map(uploadedFile => (
            <div
              key={uploadedFile.id}
              className='relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800'
            >
              {uploadedFile.preview ? (
                <img
                  src={uploadedFile.preview}
                  alt={uploadedFile.file.name}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center'>
                  <svg
                    className='w-12 h-12 text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z' />
                  </svg>
                </div>
              )}

              <button
                onClick={() => handleRemove(uploadedFile.id)}
                className='absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors'
              >
                <svg
                  className='w-4 h-4'
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

              <div className='absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2'>
                <p className='truncate'>{uploadedFile.file.name}</p>
                <p className='text-gray-300'>
                  {formatFileSize(uploadedFile.file.size)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
