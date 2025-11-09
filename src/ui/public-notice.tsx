import { cn } from '../lib/utils';

/**
 * PublicNotice Component
 *
 * Civic component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <PublicNotice className="custom-class" />
 * ```
 */
export interface PublicNoticeProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const PublicNotice = ({
  className,
  children,
  disabled,
}: PublicNoticeProps) => {
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
      aria-label='PublicNotice'
    >
      {children || 'PublicNotice Component'}
    </div>
  );
};

export default PublicNotice;
