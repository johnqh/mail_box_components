import React from 'react';
import { cn } from "../lib/utils";
import { v } from "../lib/variants";

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

// ✨ SIMPLE: Get variant classes using the new system
const getVariantClass = (variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error') => {
  return v.nested(`button.gradient.${variant}`);
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