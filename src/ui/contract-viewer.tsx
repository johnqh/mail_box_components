import { cn } from '../lib/utils';

/**
 * ContractViewer Component
 * 
 * Legal & compliance component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <ContractViewer className="custom-class" />
 * ```
 */
export interface ContractViewerProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const ContractViewer = ({ className, children, disabled }: ContractViewerProps) => {
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
      aria-label="ContractViewer"
    >
      {children || 'ContractViewer Component'}
    </div>
  );
};

export default ContractViewer;
