import React from 'react';
import { cn } from '../../lib/utils';
import { colors, getStatusIndicatorColor } from '@sudobility/design';

export interface ActionBannerProps {
  /** Banner title */
  title: string;
  /** Banner description/message */
  description?: string;
  /** Variant determines the color scheme */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Icon to display (React node, typically from @heroicons/react) */
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

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/** Derives variant styles from the design system alert colors */
const getVariantStyles = (variant: AlertVariant) => {
  const alert = colors.component.alert[variant];
  return {
    container: cn(alert.base, alert.dark),
    icon: alert.icon,
    button: cn(getStatusIndicatorColor(variant), 'hover:opacity-90 text-white'),
    secondaryButton: cn(alert.icon, 'hover:opacity-80'),
  };
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
  const styles = getVariantStyles(variant);

  return (
    <div
      className={cn('p-4 border rounded-lg', styles.container, className)}
      role='alert'
    >
      <div className='flex items-start gap-3'>
        {icon && <div className={cn('flex-shrink-0', styles.icon)}>{icon}</div>}
        <div className='flex-1 min-w-0'>
          <h4 className='text-sm font-semibold mb-1'>{title}</h4>
          {description && (
            <p className='text-sm mb-3 opacity-90'>{description}</p>
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
