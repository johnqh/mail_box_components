import React from 'react';
import { cn } from '../lib/utils';
import { variants } from '../design-system';

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

// Use design system gradient button variants
const getVariantClass = (variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error') => {
  switch (variant) {
    case 'primary':
      return variants.button.gradient.primary();
    case 'secondary':
      return variants.button.gradient.secondary();
    case 'success':
      return variants.button.gradient.success();
    case 'warning':
      // Fallback for warning (not in design system)
      return 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:ring-yellow-500 text-white border-transparent shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200';
    case 'error':
      // Fallback for error (not in design system)
      return 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:ring-red-500 text-white border-transparent shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200';
    default:
      return variants.button.gradient.primary();
  }
};

// Size classes that complement the design system
const sizeClasses = {
  sm: 'h-8', // Small size override
  md: '', // Default from design system
  lg: 'h-12' // Large size override
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'relative',
        getVariantClass(variant),
        sizeClasses[size],
        'hover:scale-105 active:scale-95 transition-transform',
        fullWidth && 'w-full',
        className
      )}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <span className={cn(loading && 'opacity-0')}>
        {children}
      </span>
    </button>
  );
};

export default GradientButton;