import { cn } from './lib/utils';

/**
 * CropMonitor Component
 *
 * Agriculture component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <CropMonitor className="custom-class" />
 * ```
 */
export interface CropMonitorProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const CropMonitor = ({
  className,
  children,
  disabled,
}: CropMonitorProps) => {
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
      aria-label='CropMonitor'
    >
      {children || 'CropMonitor Component'}
    </div>
  );
};

export default CropMonitor;
