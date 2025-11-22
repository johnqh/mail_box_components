import React, { useRef, useState } from 'react';
import {
  DocumentIcon,
  XMarkIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';
import { cn } from '../../lib/utils';

export interface FileInputProps {
  /** Callback when files are selected */
  onChange: (files: File[]) => void;
  /** Accept file types (e.g., "image/*", ".pdf,.doc") */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Show drag-and-drop area */
  showDropZone?: boolean;
  /** Show file list */
  showFileList?: boolean;
  /** Current files (for controlled component) */
  files?: File[];
  /** Callback to remove a file */
  onRemove?: (index: number) => void;
  /** Additional className */
  className?: string;
  /** Button text */
  buttonText?: string;
  /** Drop zone text */
  dropZoneText?: string;
}

/**
 * FileInput Component
 *
 * File input with drag-and-drop support, file preview, and validation.
 * Supports single or multiple files with size and type restrictions.
 *
 * @example
 * ```tsx
 * <FileInput
 *   onChange={handleFiles}
 *   accept="image/*"
 *   multiple
 *   showDropZone
 * />
 * ```
 *
 * @example
 * ```tsx
 * <FileInput
 *   files={attachments}
 *   onChange={setAttachments}
 *   onRemove={removeAttachment}
 *   accept=".pdf,.doc,.docx"
 *   maxSize={10 * 1024 * 1024}
 *   showFileList
 * />
 * ```
 */
export const FileInput: React.FC<FileInputProps> = ({
  onChange,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled = false,
  showDropZone = false,
  showFileList = true,
  files = [],
  onRemove,
  className,
  buttonText = 'Choose Files',
  dropZoneText = 'Drop files here or click to browse',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = (newFiles: File[]): File[] => {
    setError(null);

    // Check max files
    if (maxFiles && files.length + newFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return [];
    }

    // Filter by size
    const validFiles = newFiles.filter(file => {
      if (maxSize && file.size > maxSize) {
        setError(
          `File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`
        );
        return false;
      }
      return true;
    });

    return validFiles;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = validateFiles(selectedFiles);

    if (validFiles.length > 0) {
      onChange(validFiles);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(droppedFiles);

    if (validFiles.length > 0) {
      onChange(validFiles);
    }
  };

  const handleRemove = (index: number) => {
    if (onRemove) {
      onRemove(index);
    }
  };

  // Drop zone UI
  if (showDropZone) {
    return (
      <div className={cn('w-full', className)}>
        <input
          ref={fileInputRef}
          type='file'
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className='hidden'
        />

        <div
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            'relative border-2 border-dashed rounded-lg p-8',
            'transition-colors duration-200',
            'cursor-pointer',
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <div className='flex flex-col items-center justify-center space-y-3'>
            <CloudArrowUpIcon className='h-12 w-12 text-gray-400 dark:text-gray-500' />
            <p className='text-sm text-gray-600 dark:text-gray-400 text-center'>
              {dropZoneText}
            </p>
            {maxSize && (
              <p className='text-xs text-gray-500 dark:text-gray-500'>
                Max file size: {formatFileSize(maxSize)}
              </p>
            )}
          </div>
        </div>

        {error && (
          <p className='mt-2 text-sm text-red-600 dark:text-red-400'>{error}</p>
        )}

        {showFileList && files.length > 0 && (
          <FileList files={files} onRemove={handleRemove} />
        )}
      </div>
    );
  }

  // Button UI
  return (
    <div className={cn('w-full', className)}>
      <input
        ref={fileInputRef}
        type='file'
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className='hidden'
      />

      <button
        type='button'
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          'inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600',
          'rounded-lg shadow-sm text-sm font-medium',
          'text-gray-700 dark:text-gray-300',
          'bg-white dark:bg-gray-800',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          'transition-colors',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <DocumentIcon className='h-5 w-5 mr-2' />
        {buttonText}
      </button>

      {error && (
        <p className='mt-2 text-sm text-red-600 dark:text-red-400'>{error}</p>
      )}

      {showFileList && files.length > 0 && (
        <FileList files={files} onRemove={handleRemove} />
      )}
    </div>
  );
};

/**
 * FileList Component - Internal
 */
const FileList: React.FC<{
  files: File[];
  onRemove: (index: number) => void;
}> = ({ files, onRemove }) => {
  return (
    <div className='mt-3 space-y-2'>
      {files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className='flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'
        >
          <div className='flex items-center space-x-2 flex-1 min-w-0'>
            <DocumentIcon className='h-5 w-5 text-gray-400 flex-shrink-0' />
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>
                {file.name}
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>
          <button
            type='button'
            onClick={() => onRemove(index)}
            className='flex-shrink-0 p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors'
            aria-label='Remove file'
          >
            <XMarkIcon className='h-5 w-5' />
          </button>
        </div>
      ))}
    </div>
  );
};

/**
 * Format file size to human-readable string
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export default FileInput;
