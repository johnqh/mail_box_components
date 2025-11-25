import { cn } from '@sudobility/components';

/**
 * CarbonFootprint Component
 *
 * Environmental/sustainability component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <CarbonFootprint className="custom-class" />
 * ```
 */
interface CarbonFootprintProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const CarbonFootprint = ({
  className,
  children,
  disabled,
}: CarbonFootprintProps) => {
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
      aria-label='CarbonFootprint'
    >
      {children || 'CarbonFootprint Component'}
    </div>
  );
};
