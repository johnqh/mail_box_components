import React from 'react';
import { cn } from "../lib/utils";
import { variants } from "../design-system";

interface SpinnerProps {
  size?: 'small' | 'default' | 'large' | 'extraLarge';
  variant?: 'default' | 'white' | 'success' | 'warning' | 'error';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'default',
  variant = 'default',
  className
}) => {
  const getSpinnerClass = () => {
    if (size === 'default') {
      return variants.loading.spinner[variant]();
    }
    
    // For other sizes, we need to override the size while keeping the color
    const baseClass = variants.loading.spinner[variant]();
    const sizeOverrides = {
      small: 'w-4 h-4',
      large: 'w-8 h-8',
      extraLarge: 'w-16 h-16 border-4'
    };
    
    // Remove existing size classes and apply the new ones
    const classWithoutSize = baseClass.replace(/w-\d+\s+h-\d+(\s+border-\d+)?/, '');
    return `${classWithoutSize} ${sizeOverrides[size]}`;
  };

  return (
    <div
      className={cn(
        getSpinnerClass(),
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;