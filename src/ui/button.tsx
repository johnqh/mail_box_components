import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { variants as v } from '@sudobility/design';

const buttonVariants = cva('min-h-[44px] touch-manipulation', {
  variants: {
    variant: {
      // Clean variant definitions - let the variant system handle the classes
      default: '',
      primary: '',
      secondary: '',
      outline: '',
      ghost: '',
      destructive: '',
      'destructive-outline': '',
      success: '',
      link: '',
      gradient: '',
      'gradient-secondary': '',
      'gradient-success': '',

      // Web3 specific variants
      wallet: '',
      connect: '',
      disconnect: '',
    },
    size: {
      default: '', // Size handled by design system tokens
      sm: 'h-8', // Override height for small
      lg: 'h-12', // Override height for large
      icon: 'h-10 w-10 p-0',
    },
    animation: {
      none: 'transition-colors duration-200',
      hover: 'transition-all duration-200 hover:scale-105',
      lift: 'transition-all duration-200 hover:scale-105',
      scale: 'transition-transform duration-200 hover:scale-95',
      glow: 'transition-all duration-200 hover:shadow-lg',
      shimmer: 'transition-all duration-200',
      tap: 'transition-transform duration-100 active:scale-95',
      connect: 'transition-all duration-200 hover:scale-105',
      transaction: 'transition-all duration-200 animate-pulse',
      disconnect: 'transition-all duration-200 hover:opacity-80',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    animation: 'hover',
  },
});

/** Tracking event data for button interactions */
export interface ButtonTrackingData {
  /** Action performed */
  action: 'click';
  /** Optional custom label for tracking */
  trackingLabel?: string;
  /** Optional component context */
  componentName?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Optional callback for tracking button clicks */
  onTrack?: (data: ButtonTrackingData) => void;
  /** Custom label for tracking */
  trackingLabel?: string;
  /** Component name for tracking context */
  componentName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      animation,
      asChild = false,
      onTrack,
      trackingLabel,
      componentName,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    // ✨ SIMPLE: Get variant classes using the new system
    const variantName = variant || 'default';
    const sizeName =
      size && size !== 'default' && size !== 'icon' ? size : undefined;

    // Map size abbreviations to full names for design system
    const mapSizeToVariantKey = (size: string | undefined): string => {
      if (!size) return 'default';
      const sizeMap: Record<string, string> = {
        sm: 'small',
        lg: 'large',
        default: 'default',
      };
      return sizeMap[size] || size;
    };

    // Handle nested variants for gradients and web3
    const getButtonClass = () => {
      if (variantName.startsWith('gradient')) {
        const gradientType = variantName
          .replace('gradient-', '')
          .replace('gradient', 'primary');
        return (
          v.button.gradient[gradientType]?.() || v.button.primary.default()
        );
      } else if (['wallet', 'connect', 'disconnect'].includes(variantName)) {
        return v.button.web3[variantName]?.() || v.button.primary.default();
      } else {
        const sizeType = mapSizeToVariantKey(sizeName);
        return (
          v.button[variantName]?.[sizeType]?.() || v.button.primary.default()
        );
      }
    };
    const designSystemClass = getButtonClass();

    // Handle click with optional tracking
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Call tracking callback if provided
      if (onTrack) {
        onTrack({
          action: 'click',
          trackingLabel,
          componentName,
        });
      }

      // Call original onClick handler
      onClick?.(event);
    };

    return (
      <Comp
        className={cn(
          buttonVariants({ size, animation }), // Base styles and layout
          designSystemClass, // Design system variant styles
          className // Custom overrides
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
