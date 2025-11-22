import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '../lib/utils';

export interface TooltipProps {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** Children that trigger the tooltip */
  children: React.ReactNode;
  /** Tooltip placement */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing tooltip (ms) */
  delayShow?: number;
  /** Delay before hiding tooltip (ms) */
  delayHide?: number;
  /** Additional className for tooltip */
  className?: string;
  /** Disable the tooltip */
  disabled?: boolean;
  /** Show arrow */
  showArrow?: boolean;
  /** Variant style */
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  /** Trigger type */
  trigger?: 'hover' | 'click';
  /** Controlled mode - tooltip open state */
  isOpen?: boolean;
  /** Callback when visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * Tooltip Component
 *
 * Simple tooltip that appears on hover/click with configurable position and delay.
 * Supports both controlled and uncontrolled modes.
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
 * <Tooltip content="User profile" placement="right" delayShow={500}>
 *   <UserIcon className="h-5 w-5" />
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delayShow = 0,
  delayHide = 0,
  className,
  disabled = false,
  showArrow = true,
  variant = 'default',
  trigger = 'hover',
  isOpen: controlledIsOpen,
  onVisibilityChange,
}) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Support both controlled and uncontrolled modes
  const isControlled = controlledIsOpen !== undefined;
  const isVisible = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  // Define functions before they're used in effects
  const showTooltip = useCallback(() => {
    if (disabled || isControlled) return;

    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = undefined;
    }

    if (delayShow > 0) {
      showTimeoutRef.current = setTimeout(() => {
        setUncontrolledIsOpen(true);
        onVisibilityChange?.(true);
      }, delayShow);
    } else {
      setUncontrolledIsOpen(true);
      onVisibilityChange?.(true);
    }
  }, [disabled, isControlled, delayShow, onVisibilityChange]);

  const hideTooltip = useCallback(() => {
    if (isControlled) return;

    // Clear any pending show timeout
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = undefined;
    }

    if (delayHide > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        setUncontrolledIsOpen(false);
        onVisibilityChange?.(false);
      }, delayHide);
    } else {
      setUncontrolledIsOpen(false);
      onVisibilityChange?.(false);
    }
  }, [isControlled, delayHide, onVisibilityChange]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Click outside handler for click trigger
  useEffect(() => {
    if (trigger !== 'click' || !isVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        hideTooltip();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [trigger, isVisible, hideTooltip]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleFocus = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleBlur = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click' && !isControlled) {
      if (isVisible) {
        setUncontrolledIsOpen(false);
        onVisibilityChange?.(false);
      } else {
        setUncontrolledIsOpen(true);
        onVisibilityChange?.(true);
      }
    }
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
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom:
      'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right:
      'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
  };

  // Variant styles
  const variantClasses = {
    default: 'bg-gray-900 dark:bg-gray-700 text-white',
    info: 'bg-blue-600 dark:bg-blue-500 text-white',
    success: 'bg-green-600 dark:bg-green-500 text-white',
    warning: 'bg-yellow-600 dark:bg-yellow-500 text-white',
    error: 'bg-red-600 dark:bg-red-500 text-white',
  };

  // Arrow variant styles
  const arrowVariantClasses = {
    default: {
      top: 'border-t-gray-900 dark:border-t-gray-700',
      bottom: 'border-b-gray-900 dark:border-b-gray-700',
      left: 'border-l-gray-900 dark:border-l-gray-700',
      right: 'border-r-gray-900 dark:border-r-gray-700',
    },
    info: {
      top: 'border-t-blue-600 dark:border-t-blue-500',
      bottom: 'border-b-blue-600 dark:border-b-blue-500',
      left: 'border-l-blue-600 dark:border-l-blue-500',
      right: 'border-r-blue-600 dark:border-r-blue-500',
    },
    success: {
      top: 'border-t-green-600 dark:border-t-green-500',
      bottom: 'border-b-green-600 dark:border-b-green-500',
      left: 'border-l-green-600 dark:border-l-green-500',
      right: 'border-r-green-600 dark:border-r-green-500',
    },
    warning: {
      top: 'border-t-yellow-600 dark:border-t-yellow-500',
      bottom: 'border-b-yellow-600 dark:border-b-yellow-500',
      left: 'border-l-yellow-600 dark:border-l-yellow-500',
      right: 'border-r-yellow-600 dark:border-r-yellow-500',
    },
    error: {
      top: 'border-t-red-600 dark:border-t-red-500',
      bottom: 'border-b-red-600 dark:border-b-red-500',
      left: 'border-l-red-600 dark:border-l-red-500',
      right: 'border-r-red-600 dark:border-r-red-500',
    },
  };

  return (
    <div
      ref={triggerRef}
      className='relative inline-block'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      {children}
      {isVisible && !disabled && (
        <div
          ref={tooltipRef}
          className={cn(
            'absolute z-50 px-2 py-1 text-xs font-medium rounded shadow-lg whitespace-nowrap pointer-events-none',
            positionClasses[placement],
            variantClasses[variant],
            className
          )}
          role='tooltip'
        >
          {content}
          {showArrow && (
            <div
              className={cn(
                'absolute w-0 h-0 border-4 arrow',
                arrowClasses[placement],
                arrowVariantClasses[variant][placement]
              )}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
