import React from 'react';
import { Button, Card, CardContent } from '@sudobility/components';
import { textVariants } from '@sudobility/design';
import { cn } from './lib/cn';

/**
 * Current subscription status display configuration
 */
export interface SubscriptionStatusConfig {
  /** Whether user has an active subscription */
  isActive: boolean;
  /** Content to display when subscription is active */
  activeContent?: {
    /** Status title (e.g., "Active Subscription") */
    title: string;
    /** Status fields to display */
    fields?: Array<{
      label: string;
      value: string;
    }>;
  };
  /** Content to display when no active subscription */
  inactiveContent?: {
    /** Status title (e.g., "No Active Subscription") */
    title: string;
    /** Description message */
    message: string;
  };
}

/**
 * Action button configuration
 */
export interface ActionButtonConfig {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Whether button is in loading state */
  loading?: boolean;
}

export interface SubscriptionLayoutProps {
  /** Section title */
  title: string;
  /** Subscription tiles to render */
  children: React.ReactNode;
  /** Error message to display */
  error?: string | null;

  /** Current subscription status configuration */
  currentStatus?: SubscriptionStatusConfig;

  /** Primary action button (e.g., "Subscribe Now") */
  primaryAction: ActionButtonConfig;

  /** Secondary action button (e.g., "Restore Purchase") */
  secondaryAction?: ActionButtonConfig;

  /** Minimum tile width in pixels (default: 240) */
  minTileWidth?: number;

  /** Additional CSS classes */
  className?: string;

  /** Custom header content */
  headerContent?: React.ReactNode;

  /** Content to render above the product tiles (e.g., billing period selector) */
  aboveProducts?: React.ReactNode;

  /** Custom footer content (rendered above action buttons) */
  footerContent?: React.ReactNode;

  /** Label for "Current Status" section - for localization */
  currentStatusLabel?: string;
}

/**
 * SubscriptionLayout - Container component for subscription selection UI
 *
 * Provides a consistent layout with:
 * - Optional current status display
 * - Title heading
 * - Responsive grid of subscription tiles (auto-wrapping)
 * - Error message display
 * - Primary and optional secondary action buttons
 *
 * All labels are passed by the consumer for full localization control.
 *
 * @example
 * ```tsx
 * <SubscriptionLayout
 *   title={t('selectPlan')}
 *   currentStatus={{
 *     isActive: hasSubscription,
 *     activeContent: {
 *       title: t('status.active'),
 *       fields: [
 *         { label: t('plan'), value: planName },
 *         { label: t('expires'), value: expirationDate },
 *       ],
 *     },
 *   }}
 *   primaryAction={{
 *     label: t('buttons.subscribe'),
 *     onClick: handleSubscribe,
 *   }}
 *   secondaryAction={{
 *     label: t('buttons.restore'),
 *     onClick: handleRestore,
 *   }}
 *   error={error}
 * >
 *   {plans.map(plan => <SubscriptionTile key={plan.id} {...plan} />)}
 * </SubscriptionLayout>
 * ```
 */
export const SubscriptionLayout: React.FC<SubscriptionLayoutProps> = ({
  title,
  children,
  error,
  currentStatus,
  primaryAction,
  secondaryAction,
  minTileWidth = 240,
  className,
  headerContent,
  aboveProducts,
  footerContent,
  currentStatusLabel = 'Current Status',
}) => {
  // Use CSS Grid auto-fit with minmax for responsive behavior
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minTileWidth}px), 1fr))`,
    gap: '1.5rem',
  };

  return (
    <Card className={className}>
      <CardContent className='pt-6'>
        {/* Custom Header Content */}
        {headerContent}

        {/* Current Status Section */}
        {currentStatus && (
          <>
            <h2 className={cn(textVariants.heading.h3(), 'mb-4')}>
              {currentStatusLabel}
            </h2>

            {currentStatus.isActive ? (
              <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6'>
                <div className='flex items-center mb-2'>
                  <div className='w-3 h-3 bg-green-500 rounded-full mr-3' />
                  <span className='font-semibold text-green-800 dark:text-green-300'>
                    {currentStatus.activeContent?.title ||
                      'Active Subscription'}
                  </span>
                </div>
                {currentStatus.activeContent?.fields &&
                  currentStatus.activeContent.fields.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                      {currentStatus.activeContent.fields.map(
                        (field, index) => (
                          <div key={index}>
                            <p className='text-sm text-green-600 dark:text-green-400'>
                              {field.label}
                            </p>
                            <p className='font-semibold text-green-800 dark:text-green-300'>
                              {field.value}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            ) : (
              <div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6'>
                <div className='flex items-center mb-2'>
                  <div className='w-3 h-3 bg-yellow-500 rounded-full mr-3' />
                  <span className='font-semibold text-yellow-800 dark:text-yellow-300'>
                    {currentStatus.inactiveContent?.title ||
                      'No Active Subscription'}
                  </span>
                </div>
                {currentStatus.inactiveContent?.message && (
                  <p className='text-yellow-700 dark:text-yellow-400'>
                    {currentStatus.inactiveContent.message}
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {/* Section Title */}
        <h2 className={cn(textVariants.heading.h3(), 'mb-4')}>{title}</h2>

        {/* Above Products Content (e.g., billing period selector) */}
        {aboveProducts}

        {/* Subscription Tiles Grid */}
        <div style={gridStyle}>{children}</div>

        {/* Custom Footer Content */}
        {footerContent}

        {/* Error Message */}
        {error && (
          <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-6'>
            <p className='text-red-600 dark:text-red-400'>{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 mt-6'>
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled || secondaryAction.loading}
              variant='outline'
              className='sm:flex-shrink-0'
            >
              {secondaryAction.label}
            </Button>
          )}

          <Button
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled || primaryAction.loading}
            className='flex-1'
          >
            {primaryAction.label}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionLayout;
