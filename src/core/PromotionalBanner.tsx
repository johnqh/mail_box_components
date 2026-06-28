import React from 'react';
import { EnvelopeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useLayout } from '../layout/Layout/LayoutContext';
import { designTokens, ui } from '@sudobility/design';

export interface PromotionalBannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonIcon?: 'envelope' | 'arrow' | 'both' | 'none';
  variant?: 'default' | 'prominent';
  badgeText?: string;
  prominentBadgeText?: string;
  onButtonClick: () => void;
  className?: string;
}

/**
 * PromotionalBanner - A flexible promotional banner component
 *
 * Features:
 * - Two visual variants (default and prominent)
 * - Customizable icons (envelope, arrow, both, or none)
 * - Animated badge with pulse effect
 * - Gradient backgrounds and hover effects
 * - Responsive design
 * - Dark mode support
 *
 * @param title - Main banner title text
 * @param subtitle - Optional subtitle text
 * @param buttonText - Text to display on the CTA button
 * @param buttonIcon - Icon configuration for the button
 * @param variant - Visual variant (default or prominent)
 * @param badgeText - Text for the badge in default variant
 * @param prominentBadgeText - Text for the badge in prominent variant
 * @param onButtonClick - Callback when the CTA button is clicked
 * @param className - Additional CSS classes
 */
export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  title,
  subtitle,
  buttonText,
  buttonIcon = 'envelope',
  variant = 'default',
  badgeText = 'FREE',
  prominentBadgeText = '100% Free',
  onButtonClick,
  className = '',
}) => {
  const renderStartIcon = () => {
    if (buttonIcon === 'envelope' || buttonIcon === 'both') {
      return (
        <EnvelopeIcon
          className={variant === 'prominent' ? 'h-5 w-5 mr-2' : 'h-4 w-4 mr-1'}
        />
      );
    }
    if (buttonIcon === 'none') {
      return null;
    }
    // Default email SVG for other cases
    return (
      <svg
        className={variant === 'prominent' ? 'h-5 w-5 mr-2' : 'h-4 w-4 mr-1'}
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
        />
      </svg>
    );
  };

  const renderEndIcon = () => {
    if (buttonIcon === 'arrow' || buttonIcon === 'both') {
      return <ArrowRightIcon className='h-4 w-4 ml-2' />;
    }
    return null;
  };

  const getBorderClass = () => {
    if (variant === 'prominent') {
      return 'border-b-2 border-success/30';
    }
    return `border-b border-success/30`;
  };

  const getButtonClasses = () => {
    const baseClasses = `bg-gradient-to-r from-success to-primary hover:opacity-90 text-primary-foreground ${designTokens.radius.lg} font-bold ${ui.transition.slow} transform hover:scale-105 ${designTokens.shadow.lg} inline-flex items-center whitespace-nowrap cursor-pointer`;

    if (variant === 'prominent') {
      return `${baseClasses} px-8 py-3 text-base`;
    }
    return `${baseClasses} px-6 py-2 text-sm`;
  };

  const getTitleClasses = () => {
    if (variant === 'prominent') {
      return 'text-success font-semibold text-lg';
    }
    return 'text-success font-semibold';
  };

  const displayBadgeText =
    variant === 'prominent' ? prominentBadgeText : badgeText;

  const { containerClass } = useLayout();

  return (
    <div
      className={`bg-gradient-to-r from-success/10 to-primary/10 ${getBorderClass()} ${className}`}
    >
      <div className={`${containerClass} py-4`}>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div
            className={`flex items-center ${variant === 'prominent' ? 'text-center sm:text-left' : ''}`}
          >
            <div className='bg-success text-success-foreground text-xs font-bold px-3 py-1 rounded-full mr-3 animate-pulse'>
              {displayBadgeText}
            </div>
            <div>
              <span className={getTitleClasses()}>{title}</span>
              {subtitle && (
                <span className='text-success text-sm block'>{subtitle}</span>
              )}
            </div>
          </div>
          <button onClick={onButtonClick} className={getButtonClasses()}>
            {renderStartIcon()}
            {buttonText}
            {renderEndIcon()}
          </button>
        </div>
      </div>
    </div>
  );
};
