import { cn } from '../lib/utils';

/**
 * UsustainabilityUscore Component
 * 
 * Environmental/sustainability component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <UsustainabilityUscore className="custom-class" />
 * ```
 */
export interface SustainabilityScoreProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const UsustainabilityUscore = ({ className, children, disabled }: SustainabilityScoreProps) => {
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
      role="region"
      aria-label="UsustainabilityUscore"
    >
      {children || 'UsustainabilityUscore Component'}
    </div>
  );
};

export default UsustainabilityUscore;
