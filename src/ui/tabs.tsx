import * as React from 'react';
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';
import { cn } from '../lib/utils';
import { variants } from '@sudobility/design';

const Tabs = Root;

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
