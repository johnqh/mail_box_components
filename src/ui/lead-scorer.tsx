import { cn } from '../lib/utils';

/**
 * UleadUscorer Component
 * 
 * CRM component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <UleadUscorer className="custom-class" />
 * ```
 */
export interface LeadScorerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const UleadUscorer = ({ className, children, disabled }: LeadScorerProps) => {
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
      aria-label="UleadUscorer"
    >
      {children || 'UleadUscorer Component'}
    </div>
  );
};

export default UleadUscorer;
