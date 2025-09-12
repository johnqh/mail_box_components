import React from 'react';
import { cn } from "../lib/utils";

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
  ariaLabel = "Loading",
  loadingText = "Loading..."
}) => {
  const getSpinnerClass = () => {
    const sizeClasses = {
      small: 'w-4 h-4',
      default: 'w-6 h-6',
      large: 'w-8 h-8',
      extraLarge: 'w-16 h-16 border-4'
    };
    
    const variantClasses = {
      default: 'border-gray-300 border-t-blue-600',
      white: 'border-white/30 border-t-white',
      success: 'border-gray-300 border-t-green-600',
      warning: 'border-gray-300 border-t-orange-600',
      error: 'border-gray-300 border-t-red-600'
    };
    
    return `animate-spin rounded-full border-2 ${sizeClasses[size]} ${variantClasses[variant]}`;
  };

  return (
    <div
      className={cn(
        getSpinnerClass(),
        className
      )}
      role="status"
      aria-label={ariaLabel}
    >
      <span className="sr-only">{loadingText}</span>
    </div>
  );
};

export default Spinner;