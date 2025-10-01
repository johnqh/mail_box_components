import React from 'react';

export interface SectionHeaderProps {
  /** The header text/title */
  title: string;
  /** Optional callback for the "+" button */
  onAdd?: () => void;
  /** Optional tooltip/title for the add button */
  addButtonTooltip?: string;
  /** Optional loading indicator */
  loading?: boolean;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * SectionHeader Component
 *
 * A reusable header component for sections with consistent styling.
 * Displays a title and an optional "+" action button.
 *
 * @example
 * ```tsx
 * <SectionHeader title="Emails" />
 * <SectionHeader title="Email Accounts" onAdd={handleAdd} addButtonTooltip="Add account" />
 * ```
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onAdd,
  addButtonTooltip,
  loading,
  className = '',
}) => {
  return (
    <div
      className={`p-4 border-b border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
          {title}
        </h2>
        <div className='flex items-center space-x-2'>
          {loading && (
            <div className='w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
          )}
          {onAdd && (
            <button
              onClick={onAdd}
              className='p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
              title={addButtonTooltip}
              aria-label={addButtonTooltip || 'Add'}
            >
              <svg
                className='w-5 h-5 text-gray-600 dark:text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4v16m8-8H4'
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
