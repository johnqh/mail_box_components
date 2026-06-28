import React from 'react';
import { cn } from '@/lib/utils';
import { colors, ui, textVariants, designTokens } from '@sudobility/design';

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
  // Color class definitions mapped to semantic theme tokens (theme-aware).
  // Decorative hues collapse to the nearest semantic role.
  const colorClasses: Record<FeatureCardColor, string> = {
    blue: 'text-primary',
    green: 'text-success',
    purple: 'text-primary',
    orange: 'text-warning',
    pink: 'text-primary',
    gray: 'text-muted-foreground',
    red: 'text-destructive',
    indigo: 'text-primary',
    cyan: 'text-primary',
    emerald: 'text-success',
  };

  // Border color classes for left accent
  const borderColorClasses: Record<FeatureCardColor, string> = {
    green: 'border-l-4 border-success',
    blue: 'border-l-4 border-primary',
    purple: 'border-l-4 border-primary',
    orange: 'border-l-4 border-warning',
    red: 'border-l-4 border-destructive',
    indigo: 'border-l-4 border-primary',
    cyan: 'border-l-4 border-primary',
    emerald: 'border-l-4 border-success',
    pink: 'border-l-4 border-primary',
    gray: 'border-l-4 border-border',
  };

  // Icon background classes
  const iconBackgroundClasses: Record<FeatureCardColor, string> = {
    green: 'bg-success/10',
    blue: 'bg-primary/10',
    purple: 'bg-primary/10',
    orange: 'bg-warning/10',
    red: 'bg-destructive/10',
    indigo: 'bg-primary/10',
    cyan: 'bg-primary/10',
    emerald: 'bg-success/10',
    pink: 'bg-primary/10',
    gray: 'bg-muted',
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
        <h3 className={cn(textVariants.heading.h5(), 'mb-3')}>{title}</h3>
        <p className={cn(textVariants.body.md(), 'mb-4')}>{description}</p>

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
                <span className={textVariants.body.sm()}>{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {metrics && Object.keys(metrics).length > 0 && (
          <div className='grid grid-cols-2 gap-4 mt-4'>
            {Object.entries(metrics).map(([key, value], index) => (
              <div
                key={index}
                className={cn(
                  'text-center p-3 rounded-lg',
                  ui.background.subtle
                )}
              >
                <div className={cn('text-lg font-bold', iconColor)}>
                  {value}
                </div>
                <div className={cn(textVariants.caption.default(), 'mt-1')}>
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
    'p-6',
    designTokens.radius.xl,
    designTokens.shadow.lg,
    'hover:shadow-xl',
    ui.transition.all,
    borderColor && borderColorClasses[color],
    (interactive || onClick) && 'cursor-pointer hover:scale-[1.02]',
    isHighlight
      ? 'bg-gradient-to-br from-primary/10 to-accent border-primary/30 border'
      : cn(
          colors.component.card.default.base,
          colors.component.card.default.dark,
          'border'
        ),
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
