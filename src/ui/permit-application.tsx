import { cn } from '../lib/utils';

/**
 * PermitApplication Component
 *
 * Government component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <PermitApplication className="custom-class" />
 * ```
 */
export interface PermitApplicationProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const PermitApplication = ({
  className,
  children,
  disabled,
}: PermitApplicationProps) => {
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
      aria-label='PermitApplication'
    >
      {children || 'PermitApplication Component'}
    </div>
  );
};

export default PermitApplication;
