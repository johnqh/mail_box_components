import { cn } from '../lib/utils';

/**
 * BlueprintViewer Component
 *
 * Construction component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <BlueprintViewer className="custom-class" />
 * ```
 */
export interface BlueprintViewerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const BlueprintViewer = ({
  className,
  children,
  disabled,
}: BlueprintViewerProps) => {
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
      aria-label='BlueprintViewer'
    >
      {children || 'BlueprintViewer Component'}
    </div>
  );
};

export default BlueprintViewer;
