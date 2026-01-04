import * as React from 'react';
import { cn } from '../lib/utils';
import { variants as v } from '@sudobility/design';

/** Tracking event data for input interactions */
export interface InputTrackingData {
  /** Action performed */
  action: 'focus' | 'blur' | 'change';
  /** Optional custom label for tracking */
  trackingLabel?: string;
  /** Optional component context */
  componentName?: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional callback for tracking input interactions */
  onTrack?: (data: InputTrackingData) => void;
  /** Custom label for tracking */
  trackingLabel?: string;
  /** Component name for tracking context */
  componentName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      onTrack,
      trackingLabel,
      componentName,
      onBlur,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onTrack) {
        onTrack({
          action: 'blur',
          trackingLabel,
          componentName,
        });
      }
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onTrack) {
        onTrack({
          action: 'change',
          trackingLabel,
          componentName,
        });
      }
      onChange?.(e);
    };

    return (
      <input
        type={type}
        className={cn(v.input.default(), className)}
        ref={ref}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
