import React from 'react';
import { textVariants } from '@sudobility/design';
import { cn } from './lib/cn';
import type {
  BadgeConfig,
  DiscountBadgeConfig,
  PremiumCalloutConfig,
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
  /** Additional CSS classes */
  className?: string;
  /** Custom content to render in the content area */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;

  /** Accessibility label */
  ariaLabel?: string;
}

const BADGE_COLORS: Record<BadgeConfig['color'], string> = {
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
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
  isBestValue = false,
  className,
  children,
  disabled = false,
  ariaLabel,
}) => {
  const borderColor = isSelected
    ? isBestValue
      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
      : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 hover:shadow-md';

  const handleClick = () => {
    if (!disabled) {
      onSelect();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      className={cn(
        'relative border-2 rounded-xl p-6 transition-all flex flex-col',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        borderColor,
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role='radio'
      aria-checked={isSelected}
      aria-label={ariaLabel || `${title} - ${price}${periodLabel || ''}`}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {/* Top Badge */}
      {topBadge && (
        <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
          <span
            className={cn(
              BADGE_COLORS[topBadge.color],
              'text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg whitespace-nowrap'
            )}
          >
            {topBadge.text}
          </span>
        </div>
      )}

      {/* Main content that can grow */}
      <div className='flex flex-col flex-grow'>
        {/* Title and Price */}
        <div className='text-center mb-6'>
          <h3 className={cn(textVariants.heading.h4(), 'mb-2')}>{title}</h3>
          <div className='mb-3'>
            <span
              className={cn(
                'text-4xl font-bold',
                isBestValue
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-blue-600 dark:text-blue-400'
              )}
            >
              {price}
            </span>
            {periodLabel && (
              <span className='text-gray-500 dark:text-gray-400 text-lg'>
                {periodLabel}
              </span>
            )}
          </div>

          {/* Discount Badge */}
          {discountBadge && (
            <div
              className={cn(
                'inline-flex items-center px-2 py-1 rounded-full text-sm font-semibold',
                discountBadge.isBestValue
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
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
                <span
                  className={cn(
                    'text-lg mr-3 flex-shrink-0',
                    isBestValue ? 'text-purple-500' : 'text-green-500'
                  )}
                >
                  ✓
                </span>
                <span className='text-sm text-gray-700 dark:text-gray-300 text-left'>
                  {feature.replace(/^✓\s*/, '')}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Premium Callout */}
        {premiumCallout && (
          <div className='bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4'>
            <div className='flex items-center mb-2'>
              <span className='text-purple-600 dark:text-purple-400 font-semibold text-sm'>
                {premiumCallout.title}
              </span>
            </div>
            <ul className='text-xs text-gray-600 dark:text-gray-400 space-y-1'>
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
              isBestValue
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-blue-600 dark:text-blue-400'
            )}
          >
            {bottomNote}
          </div>
        )}
      </div>

      {/* Bottom section - Always at bottom */}
      <div className='mt-auto space-y-4'>
        {/* Intro Price Banner */}
        {introPriceNote && (
          <div className='p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg'>
            <p className='text-sm text-yellow-700 dark:text-yellow-300 font-semibold text-center'>
              {introPriceNote}
            </p>
          </div>
        )}

        {/* Radio button indicator */}
        <div className='flex justify-center'>
          <div
            className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center',
              isSelected
                ? isBestValue
                  ? 'border-purple-600 bg-purple-600'
                  : 'border-blue-600 bg-blue-600'
                : 'border-gray-300 dark:border-gray-600'
            )}
          >
            {isSelected && <div className='w-2 h-2 rounded-full bg-white' />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTile;
