import { cn } from '../lib/utils';

/**
 * UtimelineUgantt Component
 * 
 * A reusable UtimelineUgantt component with full dark mode support.
 * Optimized for accessibility and AI-assisted development.
 * 
 * @component
 * @example
 * ```tsx
 * <UtimelineUgantt className="custom-class" />
 * ```
 * 
 * @remarks
 * This component supports:
 * - Light and dark themes automatically
 * - Responsive design
 * - Accessibility features
 * - TypeScript type safety
 * 
 * @see {@link https://docs.example.com/components/timeline-gantt}
 */

export interface UtimelineUganttProps {
  /** Additional CSS classes */
  className?: string;
  /** Component children */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Callback when component is interacted with */
  onClick?: () => void;
}

export const UtimelineUgantt = ({ 
  className, 
  children,
  disabled = false,
  onClick 
}: UtimelineUganttProps) => {
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
      aria-label="UtimelineUgantt"
    >
      {children || 'UtimelineUgantt Component'}
    </div>
  );
};

export default UtimelineUgantt;
