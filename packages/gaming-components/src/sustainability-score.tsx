import { cn } from '@sudobility/components';

/**
 * SustainabilityScore Component
 *
 * Environmental/sustainability component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <SustainabilityScore className="custom-class" />
 * ```
 */
interface SustainabilityScoreProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const SustainabilityScore = ({
  className,
  children,
  disabled,
}: SustainabilityScoreProps) => {
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
      aria-label='SustainabilityScore'
    >
      {children || 'SustainabilityScore Component'}
    </div>
  );
};
