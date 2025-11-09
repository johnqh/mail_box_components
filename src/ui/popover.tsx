import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Portal } from './portal';

export interface PopoverProps {
  /** Trigger element */
  trigger: React.ReactNode;
  /** Popover content */
  children: React.ReactNode;
  /** Placement relative to trigger */
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end';
  /** Open state (controlled) */
  isOpen?: boolean;
  /** Open state change handler (controlled) */
  onOpenChange?: (open: boolean) => void;
  /** Trigger action */
  trigger_action?: 'click' | 'hover';
  /** Show arrow */
  showArrow?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Popover Component
 *
 * Floating content container anchored to a trigger element.
 * Useful for contextual information, menus, and form helpers.
 *
 * @example
 * ```tsx
 * <Popover trigger={<Button>Open</Button>}>
 *   <div className="p-4">Popover content</div>
 * </Popover>
 * ```
 *
 * @example
 * ```tsx
 * <Popover
 *   trigger={<Button>Hover me</Button>}
 *   placement="top"
 *   trigger_action="hover"
 *   showArrow
 * >
 *   <p>Tooltip-like content</p>
 * </Popover>
 * ```
 */
export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  placement = 'bottom',
  isOpen: controlledIsOpen,
  onOpenChange,
  trigger_action = 'click',
  showArrow = true,
  className,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(open);
    }
    onOpenChange?.(open);
  };

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Calculate position
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const updatePosition = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const gap = 8; // spacing between trigger and popover

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = triggerRect.top - gap;
          left = triggerRect.left + triggerRect.width / 2;
          break;
        case 'top-start':
          top = triggerRect.top - gap;
          left = triggerRect.left;
          break;
        case 'top-end':
          top = triggerRect.top - gap;
          left = triggerRect.right;
          break;
        case 'bottom':
          top = triggerRect.bottom + gap;
          left = triggerRect.left + triggerRect.width / 2;
          break;
        case 'bottom-start':
          top = triggerRect.bottom + gap;
          left = triggerRect.left;
          break;
        case 'bottom-end':
          top = triggerRect.bottom + gap;
          left = triggerRect.right;
          break;
        case 'left':
          top = triggerRect.top + triggerRect.height / 2;
          left = triggerRect.left - gap;
          break;
        case 'right':
          top = triggerRect.top + triggerRect.height / 2;
          left = triggerRect.right + gap;
          break;
      }

      setPosition({ top, left });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, placement]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        contentRef.current &&
        !contentRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleTriggerClick = () => {
    if (trigger_action === 'click') {
      setIsOpen(!isOpen);
    }
  };

  const handleTriggerMouseEnter = () => {
    if (trigger_action === 'hover') {
      setIsOpen(true);
    }
  };

  const handleTriggerMouseLeave = () => {
    if (trigger_action === 'hover') {
      setIsOpen(false);
    }
  };

  // Transform origin based on placement
  const transformOrigin = {
    top: 'origin-bottom',
    'top-start': 'origin-bottom-left',
    'top-end': 'origin-bottom-right',
    bottom: 'origin-top',
    'bottom-start': 'origin-top-left',
    'bottom-end': 'origin-top-right',
    left: 'origin-right',
    right: 'origin-left',
  };

  // Transform translate based on placement
  const transformTranslate = {
    top: '-translate-x-1/2 -translate-y-full',
    'top-start': '-translate-y-full',
    'top-end': '-translate-x-full -translate-y-full',
    bottom: '-translate-x-1/2',
    'bottom-start': '',
    'bottom-end': '-translate-x-full',
    left: '-translate-x-full -translate-y-1/2',
    right: '-translate-y-1/2',
  };

  return (
    <>
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
        className='inline-block'
      >
        {trigger}
      </div>

      {isOpen && (
        <Portal>
          <div
            ref={contentRef}
            className={cn(
              'fixed z-50',
              'bg-white dark:bg-gray-800',
              'border border-gray-200 dark:border-gray-700',
              'rounded-lg shadow-lg',
              'transition-all duration-200',
              'animate-in fade-in zoom-in-95',
              transformOrigin[placement],
              transformTranslate[placement],
              className
            )}
            style={{
              top: position.top + 'px',
              left: position.left + 'px',
            }}
            onMouseEnter={
              trigger_action === 'hover' ? () => setIsOpen(true) : undefined
            }
            onMouseLeave={
              trigger_action === 'hover' ? () => setIsOpen(false) : undefined
            }
          >
            {children}
            {showArrow && (
              <div
                className={cn(
                  'absolute w-2 h-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transform rotate-45',
                  placement.startsWith('top') &&
                    'bottom-[-5px] border-t-0 border-l-0',
                  placement.startsWith('bottom') &&
                    'top-[-5px] border-b-0 border-r-0',
                  placement === 'left' && 'right-[-5px] border-l-0 border-b-0',
                  placement === 'right' && 'left-[-5px] border-r-0 border-t-0',
                  (placement === 'top' || placement === 'bottom') &&
                    'left-1/2 -translate-x-1/2',
                  (placement === 'left' || placement === 'right') &&
                    'top-1/2 -translate-y-1/2'
                )}
              />
            )}
          </div>
        </Portal>
      )}
    </>
  );
};

export default Popover;
