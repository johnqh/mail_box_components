import React from 'react';
import { textVariants } from '@sudobility/design';
import { cn } from './lib/cn';
import type {
  BadgeConfig,
  CtaButtonConfig,
  DiscountBadgeConfig,
  PremiumCalloutConfig,
  SubscriptionTileTrackingData,
} from './types';

export interface SubscriptionTileProps {
  /** Unique identifier for the subscription */
  id: string;
  /** Plan title */
  title: string;
  /** Formatted price string (e.g., "$9.99") */
  price: string;
  /** Period label (e.g., "/month", "/year") - passed by consumer for localization */
  periodLabel?: string;
  /** List of features/benefits */
  features: string[];
  /** Whether this tile is currently selected */
  isSelected: boolean;
  /** Selection callback */
  onSelect: () => void;

  /** Optional top badge (e.g., "Most Popular", "Free Trial") */
  topBadge?: BadgeConfig;
  /** Optional discount badge (e.g., "Save 40%") */
  discountBadge?: DiscountBadgeConfig;
  /** Optional premium callout section */
  premiumCallout?: PremiumCalloutConfig;
  /** Optional bottom note (e.g., new expiration date) */
  bottomNote?: string;
  /** Optional intro price note */
  introPriceNote?: string;

  /** Whether this is the best value option (affects styling) */
  isBestValue?: boolean;
  /** CTA button configuration - when provided, renders a button instead of radio indicator */
  ctaButton?: CtaButtonConfig;
  /** Additional CSS classes */
  className?: string;
  /** Custom content to render in the content area */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;

  /** Accessibility label */
  ariaLabel?: string;

  /** Optional tracking callback */
  onTrack?: (data: SubscriptionTileTrackingData) => void;
  /** Optional tracking label */
  trackingLabel?: string;
  /** Optional component name for tracking */
  componentName?: string;
}

const BADGE_COLORS: Record<BadgeConfig['color'], string> = {
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-400 !text-yellow-900',
  red: 'bg-red-500',
};

/**
 * SubscriptionTile - A reusable subscription plan display component
 *
 * Displays a subscription plan with pricing, features, badges, and selection state.
 * All text is passed by the consumer for full localization control.
 *
 * @example
 * ```tsx
 * <SubscriptionTile
 *   id="yearly"
 *   title={t('plans.yearly.title')}
 *   price="$99.99"
 *   periodLabel={t('periods.year')}
 *   features={[t('feature1'), t('feature2')]}
 *   isSelected={selected === 'yearly'}
 *   onSelect={() => setSelected('yearly')}
 *   topBadge={{ text: t('badges.bestValue'), color: 'purple' }}
 * />
 * ```
 */
export const SubscriptionTile: React.FC<SubscriptionTileProps> = ({
  id: _id,
  title,
  price,
  periodLabel,
  features,
  isSelected,
  onSelect,
  topBadge,
  discountBadge,
  premiumCallout,
  bottomNote,
  introPriceNote,
  isBestValue: _isBestValue = false,
  ctaButton,
  className,
  children,
  disabled = false,
  ariaLabel,
  onTrack,
  trackingLabel,
  componentName = 'SubscriptionTile',
}) => {
  // When ctaButton is provided, tile is not selectable (CTA mode)
  const isCtaMode = !!ctaButton;
  // Selected: Blue background with ring (like pricing page popular tile)
  // Unselected: Gray background (like pricing page non-popular tiles)
  const tileStyles = isSelected
    ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-4 ring-offset-white dark:ring-offset-gray-900 border-transparent'
    : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md';

  const handleClick = () => {
    if (!disabled && !isCtaMode) {
      onTrack?.({ action: 'select', trackingLabel, componentName });
      onSelect();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && !isCtaMode && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onTrack?.({ action: 'select', trackingLabel, componentName });
      onSelect();
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTrack?.({ action: 'cta_click', trackingLabel, componentName });
    if (ctaButton?.onClick) {
      ctaButton.onClick();
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl p-6 transition-all flex flex-col h-full',
        // Add extra bottom padding for radio button or CTA button
        isCtaMode ? 'pb-20' : 'pb-14',
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : isCtaMode
            ? 'cursor-default'
            : 'cursor-pointer',
        tileStyles,
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isCtaMode ? 'article' : 'radio'}
      aria-checked={isCtaMode ? undefined : isSelected}
      aria-label={ariaLabel || `${title} - ${price}${periodLabel || ''}`}
      aria-disabled={disabled}
      tabIndex={isCtaMode || disabled ? -1 : 0}
    >
      {/* Top Badge - vertically centered on the top border */}
      {topBadge && (
        <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
          <span
            className={cn(
              BADGE_COLORS[topBadge.color],
              'text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg whitespace-nowrap'
            )}
          >
            {topBadge.text}
          </span>
        </div>
      )}

      {/* Main content that can grow */}
      <div className='flex flex-col flex-grow'>
        {/* Title and Price - add top margin when there's a topBadge */}
        <div className={cn('text-center mb-6', topBadge && 'mt-2')}>
          <h3
            className={cn(
              textVariants.heading.h4(),
              'mb-2',
              isSelected ? 'text-white' : ''
            )}
          >
            {title}
          </h3>
          <div className='mb-3'>
            <span
              className={cn(
                'text-4xl font-bold',
                isSelected ? 'text-white' : 'text-gray-900 dark:text-gray-100'
              )}
            >
              {price}
            </span>
            {periodLabel && (
              <span
                className={cn(
                  'text-lg',
                  isSelected
                    ? 'text-blue-100'
                    : 'text-gray-500 dark:text-gray-400'
                )}
              >
                {periodLabel}
              </span>
            )}
          </div>

          {/* Discount Badge */}
          {discountBadge && (
            <div
              className={cn(
                'inline-flex items-center px-2 py-1 rounded-full text-sm font-semibold',
                isSelected
                  ? 'bg-blue-500 text-white'
                  : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
              )}
            >
              {discountBadge.text}
            </div>
          )}
        </div>

        {/* Custom Content Area */}
        {children}

        {/* Features List */}
        {features.length > 0 && (
          <div className='space-y-3 mb-6 flex-grow'>
            {features.map((feature, index) => (
              <div key={index} className='flex items-start'>
                <svg
                  className={cn(
                    'w-5 h-5 mr-3 flex-shrink-0',
                    isSelected ? 'text-blue-200' : 'text-green-500'
                  )}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span
                  className={cn(
                    'text-sm text-left',
                    isSelected
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  {feature.replace(/^✓\s*/, '')}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Premium Callout */}
        {premiumCallout && (
          <div
            className={cn(
              'rounded-lg p-4 mb-4',
              isSelected
                ? 'bg-blue-500/30'
                : 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
            )}
          >
            <div className='flex items-center mb-2'>
              <span
                className={cn(
                  'font-semibold text-sm',
                  isSelected
                    ? 'text-white'
                    : 'text-purple-600 dark:text-purple-400'
                )}
              >
                {premiumCallout.title}
              </span>
            </div>
            <ul
              className={cn(
                'text-xs space-y-1',
                isSelected
                  ? 'text-blue-100'
                  : 'text-gray-600 dark:text-gray-400'
              )}
            >
              {premiumCallout.features.map((feat, idx) => (
                <li key={idx}>• {feat}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom Note (e.g., new expiration date) */}
        {bottomNote && (
          <div
            className={cn(
              'text-center text-sm font-medium mb-4',
              isSelected ? 'text-blue-100' : 'text-blue-600 dark:text-blue-400'
            )}
          >
            {bottomNote}
          </div>
        )}

        {/* Intro Price Banner */}
        {introPriceNote && (
          <div
            className={cn(
              'p-3 rounded-lg mt-auto',
              isSelected
                ? 'bg-blue-500/30'
                : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
            )}
          >
            <p
              className={cn(
                'text-sm font-semibold text-center',
                isSelected
                  ? 'text-white'
                  : 'text-yellow-700 dark:text-yellow-300'
              )}
            >
              {introPriceNote}
            </p>
          </div>
        )}
      </div>

      {/* CTA Button - absolutely positioned at bottom */}
      {isCtaMode && (
        <div className='absolute bottom-4 left-6 right-6'>
          {ctaButton.href ? (
            <a
              href={ctaButton.href}
              className={cn(
                'block w-full py-3 font-semibold rounded-lg text-center transition-colors',
                isSelected
                  ? 'bg-white text-blue-600 hover:bg-gray-100'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              )}
              onClick={e => e.stopPropagation()}
            >
              {ctaButton.label}
            </a>
          ) : (
            <button
              onClick={handleCtaClick}
              disabled={disabled}
              className={cn(
                'w-full py-3 font-semibold rounded-lg transition-colors',
                isSelected
                  ? 'bg-white text-blue-600 hover:bg-gray-100'
                  : 'bg-blue-600 text-white hover:bg-blue-700',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {ctaButton.label}
            </button>
          )}
        </div>
      )}

      {/* Radio button indicator - absolutely positioned at bottom */}
      {!isCtaMode && (
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
          <div
            className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center',
              isSelected
                ? 'border-white bg-white'
                : 'border-gray-300 dark:border-gray-600'
            )}
          >
            {isSelected && <div className='w-2 h-2 rounded-full bg-blue-600' />}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionTile;
