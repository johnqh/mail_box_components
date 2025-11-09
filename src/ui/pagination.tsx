import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';
import { textVariants } from '@sudobility/design';

export interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Page change handler */
  onPageChange: (page: number) => void;
  /** Number of page buttons to show (must be odd) */
  siblingCount?: number;
  /** Show first/last buttons */
  showFirstLast?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

/**
 * Pagination Component
 *
 * Flexible pagination controls with page numbers and navigation buttons.
 * Automatically handles ellipsis for large page counts.
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={3}
 *   totalPages={10}
 *   onPageChange={setPage}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onPageChange={handlePageChange}
 *   siblingCount={2}
 *   showFirstLast
 *   size="lg"
 * />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = false,
  size = 'md',
  className,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      button: 'h-8 w-8 text-xs',
      icon: 'h-3 w-3',
      text: textVariants.body.sm(),
    },
    md: {
      button: 'h-10 w-10 text-sm',
      icon: 'h-4 w-4',
      text: textVariants.body.md(),
    },
    lg: {
      button: 'h-12 w-12 text-base',
      icon: 'h-5 w-5',
      text: textVariants.body.lg(),
    },
  };

  const sizeConfig = sizeClasses[size];

  // Generate page numbers to display
  const generatePageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 1);

    // Add left ellipsis if needed
    if (leftSiblingIndex > 2) {
      pages.push('ellipsis');
    }

    // Add pages around current page
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }

    // Add right ellipsis if needed
    if (rightSiblingIndex < totalPages - 1) {
      pages.push('ellipsis');
    }

    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    onPageChange(1);
  };

  const handleLast = () => {
    onPageChange(totalPages);
  };

  const buttonBaseClasses = cn(
    'inline-flex items-center justify-center',
    'rounded-md border border-gray-300 dark:border-gray-600',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-blue-500',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  );

  const pageButtonClasses = (isActive: boolean) =>
    cn(
      buttonBaseClasses,
      sizeConfig.button,
      sizeConfig.text,
      isActive
        ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500'
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
    );

  const navButtonClasses = cn(
    buttonBaseClasses,
    sizeConfig.button,
    'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    'hover:bg-gray-50 dark:hover:bg-gray-700'
  );

  return (
    <nav className={cn('flex items-center gap-1', className)} aria-label="Pagination">
      {/* First button */}
      {showFirstLast && (
        <button
          onClick={handleFirst}
          disabled={currentPage === 1}
          className={navButtonClasses}
          aria-label="Go to first page"
        >
          <span className={sizeConfig.text}>First</span>
        </button>
      )}

      {/* Previous button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={navButtonClasses}
        aria-label="Go to previous page"
      >
        <ChevronLeftIcon className={sizeConfig.icon} />
      </button>

      {/* Page numbers */}
      {pages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className={cn(
                'inline-flex items-center justify-center',
                sizeConfig.button,
                'text-gray-400 dark:text-gray-500'
              )}
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={pageButtonClasses(page === currentPage)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={navButtonClasses}
        aria-label="Go to next page"
      >
        <ChevronRightIcon className={sizeConfig.icon} />
      </button>

      {/* Last button */}
      {showFirstLast && (
        <button
          onClick={handleLast}
          disabled={currentPage === totalPages}
          className={navButtonClasses}
          aria-label="Go to last page"
        >
          <span className={sizeConfig.text}>Last</span>
        </button>
      )}
    </nav>
  );
};

export default Pagination;
