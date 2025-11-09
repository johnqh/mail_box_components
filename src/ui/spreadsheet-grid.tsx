import { cn } from '../lib/utils';

/**
 * UspreadsheetUgrid Component
 * 
 * A reusable UspreadsheetUgrid component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 * 
 * @component
 * @example
 * ```tsx
 * <UspreadsheetUgrid className="custom-class" />
 * ```
 * 
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 * 
 * @see {@link https://docs.example.com/components/spreadsheet-grid}
 */

export interface UspreadsheetUgridProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when component is interacted with */
  onClick?: () => void;
}

export const UspreadsheetUgrid = ({ 
  className, 
  children,
  disabled = false,
  onClick 
}: UspreadsheetUgridProps) => {
  return (
    <div 
      className={cn(
        'p-4 rounded-lg border transition-colors',
        'bg-white dark:bg-gray-900',
        'border-gray-200 dark:border-gray-700',
        'text-gray-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        className
      )}
      onClick={disabled ? undefined : onClick}
      role="region"
      aria-label="UspreadsheetUgrid"
    >
      {children || 'UspreadsheetUgrid Component'}
    </div>
  );
};

export default UspreadsheetUgrid;
