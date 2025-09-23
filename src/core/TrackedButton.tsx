import React from 'react';
import { Button } from '../ui';

// Type for tracking button click events
export interface ButtonClickTrackingParams {
  button_text: string;
  button_type: string;
  component_name?: string;
  action_type?: string;
  [key: string]: unknown; // Allow additional tracking parameters
}

export type TrackingFunction = (params: ButtonClickTrackingParams) => void;

interface TrackedButtonProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  trackingLabel?: string;
  actionType?: string;
  componentName?: string;
  onTrack?: TrackingFunction; // Optional tracking function
  trackingParams?: Record<string, unknown>; // Additional tracking parameters
}

/**
 * TrackedButton - Enhanced Button component with automatic analytics tracking
 *
 * Features:
 * - Automatically tracks button clicks with customizable parameters
 * - Supports all Button variants and props
 * - Flexible tracking function injection for different analytics providers
 * - Extracts button text automatically for tracking labels
 * - Type-safe tracking parameter interface
 *
 * @param onTrack - Optional function to handle tracking events
 * @param trackingLabel - Custom label for tracking (defaults to button text)
 * @param actionType - Type of action being performed
 * @param componentName - Name of the component for context
 * @param trackingParams - Additional parameters to include in tracking
 */
export const TrackedButton: React.FC<TrackedButtonProps> = ({
  children,
  onClick,
  variant,
  size,
  disabled,
  className,
  type,
  trackingLabel,
  actionType,
  componentName,
  onTrack,
  trackingParams = {},
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Track the button click if tracking function is provided
    if (onTrack) {
      // Extract button text for tracking
      const buttonText =
        trackingLabel ||
        (typeof children === 'string' ? children : '') ||
        'Unknown Button';

      // Validate and normalize button variant
      const validVariants = [
        'default',
        'primary',
        'secondary',
        'outline',
        'ghost',
        'destructive',
        'link',
      ] as const;
      type ValidVariant = (typeof validVariants)[number];
      const buttonType =
        variant && validVariants.includes(variant as ValidVariant)
          ? variant
          : 'default';

      // Call tracking function with comprehensive parameters
      onTrack({
        button_text: buttonText,
        button_type: buttonType,
        component_name: componentName,
        action_type: actionType,
        ...trackingParams, // Spread additional tracking parameters
      });
    }

    // Call original onClick handler
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      disabled={disabled}
      className={className}
      type={type}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default TrackedButton;
