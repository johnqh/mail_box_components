import { cn } from '../lib/utils';

/**
 * UinstagramUwidget Component
 * 
 * Social media integration component with full dark mode support.
 * 
 * @component
 * @example
 * ```tsx
 * <UinstagramUwidget className="custom-class" />
 * ```
 */
export interface InstagramWidgetProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const UinstagramUwidget = ({ className, children, disabled }: InstagramWidgetProps) => {
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
      aria-label="UinstagramUwidget"
    >
      {children || 'UinstagramUwidget Component'}
    </div>
  );
};

export default UinstagramUwidget;
