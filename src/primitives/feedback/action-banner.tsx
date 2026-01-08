import React from 'react';
import { cn } from '../../lib/utils';

export interface ActionBannerProps {
  /** Banner title */
  title: string;
  /** Banner description/message */
  description?: string;
  /** Variant determines the color scheme */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Icon to display (React node, typically from lucide-react) */
  icon?: React.ReactNode;
  /** Action button configuration */
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  /** Secondary action (optional) */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  /** Whether the banner can be dismissed */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Additional className */
  className?: string;
}

const variantStyles = {
  info: {
    container:
      'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-200',
    description: 'text-blue-700 dark:text-blue-300',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondaryButton:
      'text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200',
  },
  success: {
    container:
      'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-800 dark:text-green-200',
    description: 'text-green-700 dark:text-green-300',
    button: 'bg-green-600 hover:bg-green-700 text-white',
    secondaryButton:
      'text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200',
  },
  warning: {
    container:
      'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    icon: 'text-amber-600 dark:text-amber-400',
    title: 'text-amber-800 dark:text-amber-200',
    description: 'text-amber-700 dark:text-amber-300',
    button: 'bg-amber-600 hover:bg-amber-700 text-white',
    secondaryButton:
      'text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200',
  },
  error: {
    container:
      'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-800 dark:text-red-200',
    description: 'text-red-700 dark:text-red-300',
    button: 'bg-red-600 hover:bg-red-700 text-white',
    secondaryButton:
      'text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200',
  },
};

/**
 * ActionBanner Component
 *
 * A banner with icon, title, description, and optional action buttons.
 * Useful for alerts that require user action (upgrade, fix, acknowledge).
 *
 * @example
 * ```tsx
 * <ActionBanner
 *   variant="warning"
 *   icon={<AlertCircle className="w-5 h-5" />}
 *   title="Rate Limit Reached"
 *   description="You've reached your API rate limit for this billing period."
 *   action={{
 *     label: "Upgrade Plan",
 *     onClick: () => navigate('/upgrade'),
 *     icon: <ArrowUpRight className="w-4 h-4" />
 *   }}
 * />
 * ```
 */
export const ActionBanner: React.FC<ActionBannerProps> = ({
  title,
  description,
  variant = 'info',
  icon,
  action,
  secondaryAction,
  dismissible = false,
  onDismiss,
  className,
}) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn('p-4 border rounded-lg', styles.container, className)}
      role='alert'
    >
      <div className='flex items-start gap-3'>
        {icon && <div className={cn('flex-shrink-0', styles.icon)}>{icon}</div>}
        <div className='flex-1 min-w-0'>
          <h4 className={cn('text-sm font-semibold mb-1', styles.title)}>
            {title}
          </h4>
          {description && (
            <p className={cn('text-sm mb-3', styles.description)}>
              {description}
            </p>
          )}
          {(action || secondaryAction) && (
            <div className='flex items-center gap-2 flex-wrap'>
              {action && (
                <button
                  onClick={action.onClick}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                    styles.button
                  )}
                >
                  {action.label}
                  {action.icon}
                </button>
              )}
              {secondaryAction && (
                <button
                  onClick={secondaryAction.onClick}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                    styles.secondaryButton
                  )}
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={cn(
              'flex-shrink-0 p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors',
              styles.icon
            )}
            aria-label='Dismiss'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
