import React from 'react';
import { cn } from '../lib/utils';

export type FeatureCardColor =
  | 'green'
  | 'blue'
  | 'purple'
  | 'orange'
  | 'red'
  | 'indigo'
  | 'cyan'
  | 'emerald'
  | 'pink'
  | 'gray';

export interface FeatureCardProps {
  /**
   * Icon or emoji to display
   */
  icon: React.ReactNode;

  /**
   * Title of the feature
   */
  title: string;

  /**
   * Description of the feature
   */
  description: string;

  /**
   * List of benefits (shown as bullet points)
   */
  benefits?: string[];

  /**
   * Metrics to display (shown in grid)
   */
  metrics?: { [key: string]: string };

  /**
   * Color theme for the card
   */
  color?: FeatureCardColor;

  /**
   * Highlight this card with gradient background
   */
  isHighlight?: boolean;

  /**
   * URL for learn more link (makes card clickable)
   */
  learnMoreUrl?: string;

  /**
   * Optional CTA element
   */
  cta?: React.ReactNode;

  /**
   * Optional click handler
   */
  onClick?: () => void;

  /**
   * If true, adds hover effects and cursor pointer
   */
  interactive?: boolean;

  /**
   * Show colored left border accent
   */
  borderColor?: boolean;

  /**
   * Additional className
   */
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  benefits,
  metrics,
  color = 'blue',
  isHighlight = false,
  learnMoreUrl,
  cta,
  onClick,
  interactive = false,
  borderColor = false,
  className,
}) => {
  // Color class definitions for text and backgrounds
  const colorClasses: Record<FeatureCardColor, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    pink: 'text-pink-600 dark:text-pink-400',
    gray: 'text-gray-600 dark:text-gray-400',
    red: 'text-red-600 dark:text-red-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
  };

  // Border color classes for left accent
  const borderColorClasses: Record<FeatureCardColor, string> = {
    green: 'border-l-4 border-green-500',
    blue: 'border-l-4 border-blue-500',
    purple: 'border-l-4 border-purple-500',
    orange: 'border-l-4 border-orange-500',
    red: 'border-l-4 border-red-500',
    indigo: 'border-l-4 border-indigo-500',
    cyan: 'border-l-4 border-cyan-500',
    emerald: 'border-l-4 border-emerald-500',
    pink: 'border-l-4 border-pink-500',
    gray: 'border-l-4 border-gray-500',
  };

  // Icon background classes
  const iconBackgroundClasses: Record<FeatureCardColor, string> = {
    green: 'bg-green-100 dark:bg-green-900/20',
    blue: 'bg-blue-100 dark:bg-blue-900/20',
    purple: 'bg-purple-100 dark:bg-purple-900/20',
    orange: 'bg-orange-100 dark:bg-orange-900/20',
    red: 'bg-red-100 dark:bg-red-900/20',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/20',
    cyan: 'bg-cyan-100 dark:bg-cyan-900/20',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/20',
    pink: 'bg-pink-100 dark:bg-pink-900/20',
    gray: 'bg-gray-100 dark:bg-gray-900/20',
  };

  const iconColor = colorClasses[color];
  const isEmoji = typeof icon === 'string';

  const CardContent = () => (
    <>
      {/* Icon container */}
      {isEmoji ? (
        // Emoji or text icon
        <div className='text-4xl mb-4'>{icon}</div>
      ) : borderColor ? (
        // Icon with colored background (when borderColor is enabled)
        <div
          className={cn(
            'w-12 h-12',
            'rounded-lg',
            'flex items-center justify-center',
            'mb-4',
            iconBackgroundClasses[color],
            iconColor
          )}
        >
          {icon}
        </div>
      ) : (
        // Regular icon
        <div className={cn('flex-shrink-0 mb-4', iconColor)}>{icon}</div>
      )}

      <div className='flex-1'>
        <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
          {title}
        </h3>
        <p className='text-gray-600 dark:text-gray-300 mb-4 leading-relaxed'>
          {description}
        </p>

        {cta && <div className='mt-3 mb-4'>{cta}</div>}

        {benefits && benefits.length > 0 && (
          <ul className='space-y-2 mb-4'>
            {benefits.map((benefit, index) => (
              <li key={index} className='flex items-start'>
                <div
                  className={cn(
                    'w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0',
                    `bg-${color}-500`
                  )}
                />
                <span className='text-sm text-gray-600 dark:text-gray-400'>
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        )}

        {metrics && Object.keys(metrics).length > 0 && (
          <div className='grid grid-cols-2 gap-4 mt-4'>
            {Object.entries(metrics).map(([key, value], index) => (
              <div
                key={index}
                className='text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg'
              >
                <div className={cn('text-lg font-bold', iconColor)}>
                  {value}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                  {key}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );

  // Base card classes
  const baseClasses = cn(
    'p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200',
    borderColor && borderColorClasses[color],
    (interactive || onClick) && 'cursor-pointer hover:scale-[1.02]',
    isHighlight
      ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 border'
      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 border',
    className
  );

  // Handle onClick events with keyboard support
  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (onClick) {
      if ('key' in e) {
        // Keyboard event
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } else {
        // Mouse event
        onClick();
      }
    }
  };

  // If learnMoreUrl provided, render as anchor
  if (learnMoreUrl) {
    return (
      <a
        href={learnMoreUrl}
        className={cn(baseClasses, 'block group')}
        onClick={
          onClick
            ? (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleClick(e);
              }
            : undefined
        }
      >
        <CardContent />
      </a>
    );
  }

  // If onClick provided, render as button
  if (onClick) {
    return (
      <div
        className={baseClasses}
        onClick={handleClick}
        onKeyDown={handleClick}
        role='button'
        tabIndex={0}
        aria-label={title}
      >
        <CardContent />
      </div>
    );
  }

  // Otherwise, render as div
  return (
    <div className={baseClasses}>
      <CardContent />
    </div>
  );
};
