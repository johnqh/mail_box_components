import { cn } from './lib/utils';

/**
 * CourseCatalog Component
 *
 * Education component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <CourseCatalog className="custom-class" />
 * ```
 */
export interface CourseCatalogProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const CourseCatalog = ({
  className,
  children,
  disabled,
}: CourseCatalogProps) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-colors',
        'bg-white dark:bg-gray-900',
        'border-gray-200 dark:border-gray-700',
        'text-gray-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      role='region'
      aria-label='CourseCatalog'
    >
      {children || 'CourseCatalog Component'}
    </div>
  );
};

export default CourseCatalog;
