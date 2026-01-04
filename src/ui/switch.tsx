import * as React from 'react';
import { Root, Thumb } from '@radix-ui/react-switch';
import { cn } from '../lib/utils';

/** Tracking event data for switch interactions */
export interface SwitchTrackingData {
  /** Action performed */
  action: 'toggle';
  /** Optional custom label for tracking */
  trackingLabel?: string;
  /** Optional component context */
  componentName?: string;
}

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof Root> {
  /** Optional callback for tracking switch toggle */
  onTrack?: (data: SwitchTrackingData) => void;
  /** Custom label for tracking */
  trackingLabel?: string;
  /** Component name for tracking context */
  componentName?: string;
}

const Switch = React.forwardRef<React.ElementRef<typeof Root>, SwitchProps>(
  (
    {
      className,
      onTrack,
      trackingLabel,
      componentName,
      onCheckedChange,
      ...props
    },
    ref
  ) => {
    const handleCheckedChange = (checked: boolean) => {
      if (onTrack) {
        onTrack({
          action: 'toggle',
          trackingLabel,
          componentName,
        });
      }
      onCheckedChange?.(checked);
    };

    return (
      <Root
        className={cn(
          'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-950 dark:data-[state=checked]:bg-blue-500 dark:data-[state=unchecked]:bg-gray-700',
          className
        )}
        onCheckedChange={handleCheckedChange}
        {...props}
        ref={ref}
      >
        <Thumb
          className={cn(
            'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
          )}
        />
      </Root>
    );
  }
);
Switch.displayName = Root.displayName;

export { Switch };
