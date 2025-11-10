import React, { useState, KeyboardEvent } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

export interface AccordionItem {
  /** Unique identifier */
  id: string;
  /** Title/trigger content */
  title: React.ReactNode;
  /** Content to show when expanded */
  content: React.ReactNode;
  /** Disabled state for this item */
  disabled?: boolean;
}

export interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Allow multiple items open at once */
  allowMultiple?: boolean;
  /** Default open item ID (single) */
  defaultOpenId?: string;
  /** Default open item IDs (multiple) */
  defaultOpenIds?: string[];
  /** Controlled open IDs */
  openIds?: string[];
  /** Callback when open state changes */
  onOpenChange?: (openIds: string[]) => void;
  /** Variant style */
  variant?: 'default' | 'bordered' | 'separated';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

/**
 * Accordion Component
 *
 * Manages multiple collapsible sections with single or multi-expand support.
 * Provides consistent styling and state management for FAQ lists and similar UIs.
 *
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     { id: '1', title: 'What is 0xMail?', content: 'Description...' },
 *     { id: '2', title: 'How does it work?', content: 'Explanation...' },
 *   ]}
 * />
 * ```
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenId,
  defaultOpenIds = [],
  openIds: controlledOpenIds,
  onOpenChange,
  variant = 'default',
  size = 'md',
  className,
}) => {
  const initialOpenIds = defaultOpenId ? [defaultOpenId] : defaultOpenIds;
  const [internalOpenIds, setInternalOpenIds] =
    useState<string[]>(initialOpenIds);

  // Use controlled value if provided, otherwise use internal state
  const openIds =
    controlledOpenIds !== undefined ? controlledOpenIds : internalOpenIds;
  const isControlled = controlledOpenIds !== undefined;

  // Size configurations
  const sizeClasses = {
    sm: {
      title: 'text-sm py-2',
      content: 'text-sm py-2',
      icon: 'h-4 w-4',
    },
    md: {
      title: 'text-base py-3',
      content: 'text-base py-3',
      icon: 'h-5 w-5',
    },
    lg: {
      title: 'text-lg py-4',
      content: 'text-lg py-4',
      icon: 'h-6 w-6',
    },
  };

  const sizeConfig = sizeClasses[size];

  // Variant configurations
  const getItemClasses = (index: number) => {
    const baseClasses = 'transition-colors';

    switch (variant) {
      case 'bordered':
        return cn(
          baseClasses,
          'border border-gray-200 dark:border-gray-700 rounded-lg mb-2 px-4'
        );
      case 'separated':
        return cn(
          baseClasses,
          'border-b border-gray-200 dark:border-gray-700 pb-2',
          index < items.length - 1 && 'mb-2'
        );
      case 'default':
      default:
        return cn(
          baseClasses,
          'border-b border-gray-200 dark:border-gray-700',
          index === items.length - 1 && 'border-b-0'
        );
    }
  };

  const handleToggle = (itemId: string) => {
    let newOpenIds: string[];

    if (allowMultiple) {
      // Toggle the item in the array
      newOpenIds = openIds.includes(itemId)
        ? openIds.filter(id => id !== itemId)
        : [...openIds, itemId];
    } else {
      // Only allow one item open at a time
      newOpenIds = openIds.includes(itemId) ? [] : [itemId];
    }

    if (!isControlled) {
      setInternalOpenIds(newOpenIds);
    }

    onOpenChange?.(newOpenIds);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    itemId: string
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(itemId);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className={getItemClasses(index)}>
            {/* Title/Trigger */}
            <button
              type='button'
              onClick={() => handleToggle(item.id)}
              onKeyDown={e => handleKeyDown(e, item.id)}
              disabled={item.disabled}
              className={cn(
                'flex items-center justify-between w-full text-left',
                'font-medium text-gray-900 dark:text-gray-100',
                'transition-colors',
                !item.disabled &&
                  'hover:text-blue-600 dark:hover:text-blue-400',
                item.disabled && 'opacity-50 cursor-not-allowed',
                sizeConfig.title
              )}
              aria-expanded={isOpen}
            >
              <span className='flex-1'>{item.title}</span>
              <ChevronDownIcon
                className={cn(
                  sizeConfig.icon,
                  'text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0',
                  'transition-transform',
                  isOpen && 'rotate-180'
                )}
                aria-hidden='true'
              />
            </button>

            {/* Content */}
            {isOpen && (
              <div
                className={cn(
                  'text-gray-600 dark:text-gray-400',
                  'overflow-hidden transition-all',
                  'animate-in slide-in-from-top-1 fade-in duration-200',
                  sizeConfig.content
                )}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
