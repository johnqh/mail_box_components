import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

export interface CollapsibleProps {
  /** Trigger content (can be string or React node) */
  trigger: React.ReactNode;
  /** Content to show when expanded */
  children: React.ReactNode;
  /** Initially open state */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Show chevron icon */
  showIcon?: boolean;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Disabled state */
  disabled?: boolean;
  /** Additional trigger className */
  triggerClassName?: string;
  /** Additional content className */
  contentClassName?: string;
  /** Additional className */
  className?: string;
}

/**
 * Collapsible Component
 *
 * Expandable/collapsible section with customizable trigger and content.
 * Can be controlled or uncontrolled with icon indicators.
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
 * >
 *   <div>Settings content...</div>
 * </Collapsible>
 * ```
 */
export const Collapsible: React.FC<CollapsibleProps> = ({
  trigger,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  showIcon = true,
  iconPosition = 'right',
  disabled = false,
  triggerClassName,
  contentClassName,
  className,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  // Use controlled value if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const isControlled = controlledOpen !== undefined;

  const handleToggle = () => {
    if (disabled) return;

    const newOpen = !isOpen;

    if (!isControlled) {
      setInternalOpen(newOpen);
    }

    onOpenChange?.(newOpen);
  };

  const Icon = isOpen ? ChevronUpIcon : ChevronDownIcon;

  return (
    <div className={cn('w-full', className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          'flex items-center justify-between w-full text-left',
          'transition-colors',
          !disabled && 'hover:opacity-80',
          disabled && 'opacity-50 cursor-not-allowed',
          triggerClassName
        )}
        aria-expanded={isOpen}
      >
        {iconPosition === 'left' && showIcon && (
          <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">{trigger}</div>
        {iconPosition === 'right' && showIcon && (
          <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0" />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className={cn('mt-2', contentClassName)}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapsible;
