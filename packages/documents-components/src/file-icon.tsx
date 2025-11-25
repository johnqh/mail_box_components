import React from 'react';
import {
  DocumentIcon,
  PhotoIcon,
  FilmIcon,
  MusicalNoteIcon,
  DocumentTextIcon,
  TableCellsIcon,
  CodeBracketIcon,
  ArchiveBoxIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@sudobility/components';

export interface FileIconProps {
  /** MIME type or file extension */
  type: string;
  /** Icon size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Show colored icon */
  colored?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * FileIcon Component
 *
 * Displays an appropriate icon based on file type or content type.
 * Automatically determines the icon from MIME type or file extension.
 *
 * @example
 * ```tsx
 * <FileIcon type="image/png" />
 * <FileIcon type="application/pdf" colored />
 * <FileIcon type=".xlsx" size="lg" />
 * ```
 *
 * @example
 * ```tsx
 * <FileIcon type="video/mp4" colored size="md" />
 * <FileIcon type="application/zip" />
 * ```
 */
export const FileIcon: React.FC<FileIconProps> = ({
  type,
  size = 'md',
  colored = true,
  className,
}) => {
  // Size configurations
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  };

  // Determine icon and color based on type
  const getIconConfig = (fileType: string) => {
    const lowerType = fileType.toLowerCase();

    // Images
    if (
      lowerType.startsWith('image/') ||
      ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'].some(ext =>
        lowerType.endsWith(ext)
      )
    ) {
      return {
        Icon: PhotoIcon,
        color: 'text-blue-600 dark:text-blue-400',
      };
    }

    // Videos
    if (
      lowerType.startsWith('video/') ||
      ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'].some(ext =>
        lowerType.endsWith(ext)
      )
    ) {
      return {
        Icon: FilmIcon,
        color: 'text-purple-600 dark:text-purple-400',
      };
    }

    // Audio
    if (
      lowerType.startsWith('audio/') ||
      ['.mp3', '.wav', '.ogg', '.m4a', '.flac'].some(ext =>
        lowerType.endsWith(ext)
      )
    ) {
      return {
        Icon: MusicalNoteIcon,
        color: 'text-pink-600 dark:text-pink-400',
      };
    }

    // PDF
    if (lowerType.includes('pdf') || lowerType.endsWith('.pdf')) {
      return {
        Icon: DocumentArrowDownIcon,
        color: 'text-red-600 dark:text-red-400',
      };
    }

    // Word documents
    if (
      lowerType.includes('word') ||
      lowerType.includes('document') ||
      ['.doc', '.docx', '.odt'].some(ext => lowerType.endsWith(ext))
    ) {
      return {
        Icon: DocumentTextIcon,
        color: 'text-blue-700 dark:text-blue-300',
      };
    }

    // Excel/Spreadsheets
    if (
      lowerType.includes('excel') ||
      lowerType.includes('spreadsheet') ||
      ['.xls', '.xlsx', '.ods', '.csv'].some(ext => lowerType.endsWith(ext))
    ) {
      return {
        Icon: TableCellsIcon,
        color: 'text-green-600 dark:text-green-400',
      };
    }

    // Code files
    if (
      [
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.py',
        '.java',
        '.cpp',
        '.c',
        '.h',
        '.css',
        '.scss',
        '.html',
        '.json',
        '.xml',
        '.yaml',
        '.yml',
        '.sh',
        '.sql',
      ].some(ext => lowerType.endsWith(ext))
    ) {
      return {
        Icon: CodeBracketIcon,
        color: 'text-gray-700 dark:text-gray-300',
      };
    }

    // Archives
    if (
      lowerType.includes('zip') ||
      lowerType.includes('compressed') ||
      lowerType.includes('archive') ||
      ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2'].some(ext =>
        lowerType.endsWith(ext)
      )
    ) {
      return {
        Icon: ArchiveBoxIcon,
        color: 'text-yellow-600 dark:text-yellow-400',
      };
    }

    // Default
    return {
      Icon: DocumentIcon,
      color: 'text-gray-600 dark:text-gray-400',
    };
  };

  const { Icon, color } = getIconConfig(type);

  return (
    <Icon
      className={cn(
        sizeClasses[size],
        colored ? color : 'text-gray-600 dark:text-gray-400',
        className
      )}
    />
  );
};
