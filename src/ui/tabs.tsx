import * as React from 'react';
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';
import { cn } from '../lib/utils';
import { variants } from '@sudobility/design';

/** Tracking event data for tabs interactions */
export interface TabsTrackingData {
  /** Action performed */
  action: 'change';
  /** Optional custom label for tracking */
  trackingLabel?: string;
  /** Optional component context */
  componentName?: string;
}

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof Root> {
  /** Optional callback for tracking tab changes */
  onTrack?: (data: TabsTrackingData) => void;
  /** Custom label for tracking */
  trackingLabel?: string;
  /** Component name for tracking context */
  componentName?: string;
}

const Tabs = React.forwardRef<React.ElementRef<typeof Root>, TabsProps>(
  (
    {
      onTrack,
      trackingLabel,
      componentName,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const handleValueChange = (value: string) => {
      if (onTrack) {
        onTrack({
          action: 'change',
          trackingLabel,
          componentName,
        });
      }
      onValueChange?.(value);
    };

    return (
      <Root ref={ref} onValueChange={handleValueChange} {...props}>
        {children}
      </Root>
    );
  }
);
Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<
  React.ElementRef<typeof List>,
  React.ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={cn(variants.navigation.tabs.list(), className)}
    {...props}
  />
));
TabsList.displayName = List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(variants.navigation.tabs.trigger(), className)}
    {...props}
  />
));
TabsTrigger.displayName = Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content
    ref={ref}
    className={cn(variants.navigation.tabs.content(), className)}
    {...props}
  />
));
TabsContent.displayName = Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
