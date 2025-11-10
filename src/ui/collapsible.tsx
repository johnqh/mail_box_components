import React, { useState, KeyboardEvent } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

export interface CollapsibleProps {
  /** Trigger content (can be string or React node) */
  trigger: React.ReactNode;
  /** Content to show when expanded */
  children: React.ReactNode;
  /** Initially open state */
  defaultOpen?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when open state changes */
  onToggle?: (open: boolean) => void;
  /** Show chevron icon */
  showIcon?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Transition duration in ms */
  transitionDuration?: number;
  /** Visual variant */
  variant?: 'default' | 'outlined';
  /** Enable animations */
  animated?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Collapsible Component
 *
 * Expandable/collapsible section with customizable trigger and content.
 * Can be controlled or uncontrolled with icon indicators and animations.
 *
 * @example
 * ```tsx
 * <Collapsible trigger="Show More">
 *   <p>Hidden content goes here...</p>
 * </Collapsible>
 * ```
 *
 * @example
 * ```tsx
 * <Collapsible
 *   trigger={<h3>Advanced Settings</h3>}
 *   defaultOpen
 *   showIcon
 *   animated
 * >
 *   <div>Settings content...</div>
 * </Collapsible>
 * ```
 */
export const Collapsible: React.FC<CollapsibleProps> = ({
  trigger,
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  showIcon = true,
  disabled = false,
  transitionDuration = 300,
  variant = 'default',
  animated = false,
  className,
}) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);

  // Use controlled value if provided, otherwise use internal state
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;
  const isControlled = controlledIsOpen !== undefined;

  const handleToggle = () => {
    if (disabled) return;

    const newOpen = !isOpen;

    if (!isControlled) {
      setUncontrolledIsOpen(newOpen);
    }

    onToggle?.(newOpen);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const variantClasses = {
    default: '',
    outlined: 'border border-gray-300 dark:border-gray-600 rounded-lg p-4',
  };

  return (
    <div className={cn('w-full', variantClasses[variant], className)}>
      {/* Trigger */}
      <div
        role='button'
        tabIndex={disabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center justify-between w-full text-left cursor-pointer',
          'transition-colors',
          !disabled && 'hover:opacity-80',
          disabled && 'opacity-50 cursor-not-allowed',
          variant === 'default' && 'py-2'
        )}
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        <div className='flex-1 min-w-0'>{trigger}</div>
        {showIcon && (
          <ChevronDownIcon
            className={cn(
              'h-5 w-5 text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0',
              'transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        )}
      </div>

      {/* Content */}
      {isOpen && (
        <div
          className={cn(
            'overflow-hidden pt-2',
            (animated || transitionDuration) &&
              'animate-in slide-in-from-top-1 fade-in'
          )}
          style={{
            animationDuration: transitionDuration
              ? `${transitionDuration}ms`
              : undefined,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapsible;
