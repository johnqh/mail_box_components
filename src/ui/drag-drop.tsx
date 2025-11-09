import React, { useState, DragEvent } from 'react';
import { cn } from '../lib/utils';

export interface DragDropProps {
  /** Children content */
  children?: React.ReactNode;
  /** Drop handler */
  onDrop: (data: any) => void;
  /** Drag over handler */
  onDragOver?: (e: DragEvent) => void;
  /** Accepted data types */
  accept?: string[];
  /** Show drop indicator */
  showIndicator?: boolean;
  /** Custom indicator content */
  indicator?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * DragDrop Component
 *
 * Drag and drop container with visual feedback.
 * Supports file drops and custom data transfer.
 *
 * @example
 * ```tsx
 * <DragDrop
 *   onDrop={(files) => handleFileUpload(files)}
 *   accept={['image/*', 'application/pdf']}
 *   showIndicator
 * >
 *   <div>Drop files here or click to browse</div>
 * </DragDrop>
 * ```
 *
 * @example
 * ```tsx
 * <DragDrop
 *   onDrop={(data) => handleDrop(data)}
 *   indicator={<div>Drop here!</div>}
 * >
 *   {content}
 * </DragDrop>
 * ```
 */
export const DragDrop: React.FC<DragDropProps> = ({
  children,
  onDrop,
  onDragOver,
  accept,
  showIndicator = true,
  indicator,
  disabled = false,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [_dragCounter, setDragCounter] = useState(0);

  // Handle drag enter
  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    setDragCounter((prev) => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  // Handle drag leave
  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    setDragCounter((prev) => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragging(false);
      }
      return newCounter;
    });
  };

  // Handle drag over
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    if (onDragOver) {
      onDragOver(e);
    }
  };

  // Handle drop
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    setIsDragging(false);
    setDragCounter(0);

    // Get dropped files
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);

      // Filter by accepted types
      let filteredFiles = files;
      if (accept && accept.length > 0) {
        filteredFiles = files.filter((file) => {
          return accept.some((type) => {
            if (type.endsWith('/*')) {
              const category = type.split('/')[0];
              return file.type.startsWith(category);
            }
            return file.type === type;
          });
        });
      }

      onDrop(filteredFiles);
      return;
    }

    // Get custom data
    const data = e.dataTransfer.getData('text/plain');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        onDrop(parsedData);
      } catch {
        onDrop(data);
      }
    }
  };

  // Default indicator
  const defaultIndicator = (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/30 border-2 border-dashed border-blue-500 dark:border-blue-400 rounded-lg z-10">
      <svg
        className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <p className="text-blue-700 dark:text-blue-300 font-medium">
        Drop here
      </p>
    </div>
  );

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn(
        'relative',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}

      {/* Drop indicator */}
      {showIndicator && isDragging && !disabled && (
        indicator || defaultIndicator
      )}
    </div>
  );
};

export default DragDrop;
