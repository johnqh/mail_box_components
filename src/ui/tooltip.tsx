import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

export interface TooltipProps {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** Children that trigger the tooltip */
  children: React.ReactNode;
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Additional className for tooltip */
  className?: string;
  /** Disable the tooltip */
  disabled?: boolean;
}

/**
 * Tooltip Component
 *
 * Simple tooltip that appears on hover with configurable position and delay.
 * Lightweight alternative to more complex tooltip libraries.
 *
 * @example
 * ```tsx
 * <Tooltip content="Click to copy">
 *   <button>Copy</button>
 * </Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * <Tooltip content="User profile" position="right" delay={500}>
 *   <UserIcon className="h-5 w-5" />
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  className,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // Position classes
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 -translate-y-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 translate-y-2',
    left: 'right-full top-1/2 -translate-x-2 -translate-y-1/2',
    right: 'left-full top-1/2 translate-x-2 -translate-y-1/2',
  };

  // Arrow position classes
  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900 dark:border-t-gray-700',
    bottom:
      'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900 dark:border-b-gray-700',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900 dark:border-l-gray-700',
    right:
      'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900 dark:border-r-gray-700',
  };

  return (
    <div
      className='relative inline-block'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && !disabled && (
        <div
          className={cn(
            'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg whitespace-nowrap pointer-events-none',
            positionClasses[position],
            className
          )}
          role='tooltip'
        >
          {content}
          <div
            className={cn('absolute w-0 h-0 border-4', arrowClasses[position])}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
