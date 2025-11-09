import { cn } from '../lib/utils';

/**
 * UdealUpipeline Component
 * 
 * CRM component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <UdealUpipeline className="custom-class" />
 * ```
 */
export interface DealPipelineProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const UdealUpipeline = ({ className, children, disabled }: DealPipelineProps) => {
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
      aria-label="UdealUpipeline"
    >
      {children || 'UdealUpipeline Component'}
    </div>
  );
};

export default UdealUpipeline;
