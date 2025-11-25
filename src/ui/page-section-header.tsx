import React from 'react';
import { cn } from '../lib/utils';
import { textVariants } from '@sudobility/design';

export interface PageSectionHeaderProps {
  /** Section title */
  title: string;
  /** Optional subtitle/description */
  description?: string;
  /** Item count to display */
  count?: number;
  /** Count label (e.g., "items", "templates") */
  countLabel?: string;
  /** Action button(s) */
  action?: React.ReactNode;
  /** Show loading indicator */
  loading?: boolean;
  /** Loading text */
  loadingText?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className for container */
  className?: string;
}

/**
 * PageSectionHeader Component
 *
 * A flexible header for page sections with title, description, count, and actions.
 * Commonly used at the top of content sections to provide context and actions.
 *
 * @example
 * ```tsx
 * <PageSectionHeader
 *   title="Templates"
 *   count={templates.length}
 *   action={<Button onClick={handleAdd}>Add Template</Button>}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <PageSectionHeader
 *   title="Email Filters"
 *   description="Manage your email filtering rules"
 *   count={12}
 *   countLabel="filters"
 *   loading={isRefreshing}
 * />
 * ```
 */
export const PageSectionHeader: React.FC<PageSectionHeaderProps> = ({
  title,
  description,
  count,
  countLabel,
  action,
  loading = false,
  loadingText = 'Loading...',
  size = 'md',
  className,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      title: textVariants.heading.h4(),
      description: textVariants.body.sm(),
      count: textVariants.caption.default(),
    },
    md: {
      title: textVariants.heading.h3(),
      description: textVariants.body.md(),
      count: textVariants.body.sm(),
    },
    lg: {
      title: textVariants.heading.h2(),
      description: textVariants.body.lg(),
      count: textVariants.body.md(),
    },
  };

  const sizeConfig = sizeClasses[size];

  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-3 flex-wrap'>
          <h2
            className={cn(sizeConfig.title, 'text-gray-900 dark:text-gray-100')}
          >
            {title}
          </h2>
          {count !== undefined && (
            <span
              className={cn(
                sizeConfig.count,
                'text-gray-500 dark:text-gray-400'
              )}
            >
              ({count}
              {countLabel && ` ${countLabel}`})
            </span>
          )}
          {loading && (
            <span
              className={cn(
                sizeConfig.count,
                'text-gray-500 dark:text-gray-400 flex items-center gap-2'
              )}
            >
              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600' />
              {loadingText}
            </span>
          )}
        </div>
        {description && (
          <p
            className={cn(
              sizeConfig.description,
              'mt-1 text-gray-600 dark:text-gray-400'
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className='flex-shrink-0'>{action}</div>}
    </div>
  );
};
