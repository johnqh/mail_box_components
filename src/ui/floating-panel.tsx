import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface FloatingPanelProps {
  /** Panel content */
  children: React.ReactNode;
  /** Panel title */
  title?: string;
  /** Initial position */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Collapsible */
  collapsible?: boolean;
  /** Initially collapsed */
  defaultCollapsed?: boolean;
  /** Close button */
  closeable?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Additional className */
  className?: string;
}

/**
 * FloatingPanel Component
 *
 * Floating panel that stays fixed on screen.
 * Useful for chat widgets, help panels, or notifications.
 *
 * @example
 * ```tsx
 * <FloatingPanel
 *   title="Help & Support"
 *   position="bottom-right"
 *   collapsible
 * >
 *   <ChatWidget />
 * </FloatingPanel>
 * ```
 */
export const FloatingPanel: React.FC<FloatingPanelProps> = ({
  children,
  title,
  position = 'bottom-right',
  collapsible = true,
  defaultCollapsed = false,
  closeable = false,
  onClose,
  className,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  return (
    <div
      className={cn(
        'fixed z-50 w-80',
        'bg-white dark:bg-gray-900',
        'border border-gray-300 dark:border-gray-700',
        'rounded-lg shadow-2xl',
        positionClasses[position],
        className
      )}
    >
      {/* Header */}
      {(title || collapsible || closeable) && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {title && (
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}

          <div className="flex items-center gap-2">
            {collapsible && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                aria-label={isCollapsed ? 'Expand' : 'Collapse'}
              >
                <svg
                  className={cn(
                    'w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform',
                    isCollapsed && 'rotate-180'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}

            {closeable && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-4 h-4 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      {!isCollapsed && <div className="p-4">{children}</div>}
    </div>
  );
};

export default FloatingPanel;
