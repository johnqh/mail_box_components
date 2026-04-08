import React from 'react';
import { cn } from '../lib/utils';
import { variants, colors } from '@sudobility/design';

interface SpinnerProps {
  size?: 'small' | 'default' | 'large' | 'extraLarge';
  variant?: 'default' | 'white' | 'success' | 'warning' | 'error';
  className?: string;
  ariaLabel?: string;
  loadingText?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'default',
  variant = 'default',
  className,
  ariaLabel = 'Loading',
  loadingText = 'Loading...',
}) => {
  const getSizeClass = () => {
    const sizeMap = {
      small: variants.loading.spinner.small(),
      default: variants.loading.spinner.default(),
      large: variants.loading.spinner.large(),
      extraLarge: 'w-16 h-16 border-4',
    };
    return sizeMap[size];
  };

  const getVariantClass = () => {
    const variantMap = {
      default: `border-gray-300 border-t-[${colors.component.button.primary.base}]`,
      white: 'border-white/30 border-t-white',
      success: `border-gray-300 border-t-green-600`,
      warning: 'border-gray-300 border-t-orange-600',
      error: 'border-gray-300 border-t-red-600',
    };
    return variantMap[variant];
  };

  return (
    <div
      className={cn(
        variants.loading.spinner.default(),
        getSizeClass(),
        getVariantClass(),
        className
      )}
      role='status'
      aria-label={ariaLabel}
    >
      <span className='sr-only'>{loadingText}</span>
    </div>
  );
};
