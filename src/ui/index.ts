/**
 * UI Components Export Index
 *
 * Centralized exports for all UI components to provide a clean API
 * and enable better tree-shaking.
 */

// Core Components
export { AddressLabel, type AddressLabelProps } from './address-label';
export { AddressLink } from './address-link';
export { Alert, AlertTitle, AlertDescription } from './alert';
export {
  AnimatedSection,
  FadeInUp,
  FadeInScale,
  FloatingElement,
} from './animated-section';
export { Button, buttonVariants } from './button';
export { Card, CardHeader, CardContent, CardFooter } from './card';
export {
  ComparisonSection,
  createComparisonData,
  createEmailComparisonData,
} from './comparison-section';
export { ContentContainer } from './content-container';
export { DataTable, type DataTableProps } from './data-table';
export { Dropdown } from './dropdown';
export { FeatureCard } from './feature-card';
export {
  FeatureGrid,
  createFeature,
  createSecurityFeatures,
} from './feature-grid';
export { HeroBannerWithBadge } from './hero-banner-with-badge';
export { Input } from './input';
export { Label } from './label';
export { MetricsGrid } from './metrics-grid';
export { ProcessSteps } from './process-steps';
export { PullToRefresh, type PullToRefreshProps } from './pull-to-refresh';
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './select';
export { Spinner } from './spinner';
export { Switch } from './switch';
export { SectionHeader } from './section-header';
export { TableOfContents } from './table-of-contents';
export { EmailAccountsList } from './email-accounts-list';
export { SettingsList } from './settings-list';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
export { UseCaseGrid } from './use-case-grid';

// Layout Components
export { FlexContainer } from './flex-container';
export { PageContainer } from './page-container';
export { Section } from './section';

// Content Components
export { EmptyState } from './empty-state';
export { LoadingState } from './loading-state';
export { NoContent } from './no-content';

// Form Components
export {
  EmailInputGroup,
  EmailInputField,
  CollapsibleEmailField,
} from './email-input-group';
export {
  FormFieldGroup,
  TextField,
  TextAreaField,
  SelectField,
} from './form-field-group';
export { FormField } from './form-field';
export { FormAlerts } from './form-alerts';
export { ActionButton } from './action-button';
export { Checkbox } from './checkbox';
export { ListItemWithAction } from './list-item-with-action';
export { NavigationList } from './navigation-list';
export { FeatureListItem } from './feature-list-item';

// Status & Feedback Components
export { StatusBadge, ChainBadge } from './status-badge';
export { StatusIndicator } from './status-indicator';
export { SystemStatusIndicator } from './system-status-indicator';
export { SectionBadge } from './section-badge';

// Typography Components
export { PageTitle, SectionTitle, BodyText, TextLink } from './typography';

// Navigation & Interactive Components
export {
  SmartLink,
  SmartContent,
  useSmartLinks,
  smartLinkVariants,
} from './smart-link';
export { Modal, ModalHeader, ModalContent, ModalFooter } from './modal';
export { ConfirmationDialog } from './confirmation-dialog';
export { TextInputModal } from './text-input-modal';

// Utility Components
export { IconContainer } from './icon-container';
export { FreeEmailBanner } from './free-email-banner';
export {
  StatCard,
  FormSection,
  FeatureBlock,
} from './design-system-components';
export { GradientIconContainer } from './gradient-icon-container';
export { GradientBanner } from './gradient-banner';
export { InfoBox } from './info-box';
export { BorderAccent } from './border-accent';
export { CodeDisplay } from './code-display';
export { SkeletonLoader } from './skeleton-loader';
export { StatDisplay } from './stat-display';
export { ProgressBar } from './progress-bar';
export { Divider } from './divider';
export { IconText } from './icon-text';
export { CopyButton } from './copy-button';
export { PageSectionHeader } from './page-section-header';
export { Badge } from './badge';
export { Avatar } from './avatar';
export { StepIndicator, type Step } from './step-indicator';
export { KeyValuePair } from './key-value-pair';
export { Tooltip } from './tooltip';
export { ExternalLink } from './external-link';
export { IconButton } from './icon-button';
export { FileIcon } from './file-icon';
export { Pagination } from './pagination';
export { Tag } from './tag';
export { Backdrop } from './backdrop';
export { MenuItem } from './menu-item';
export { LoadingOverlay } from './loading-overlay';
export { Separator } from './separator';
export { TruncatedText } from './truncated-text';
export { FormattedNumber } from './formatted-number';
export { RelativeTime } from './relative-time';
export { ButtonGroup } from './button-group';
export { SearchInput } from './search-input';
export { Slider } from './slider';
export { NumberInput } from './number-input';
export { DateInput } from './date-input';
export { RadioGroup, type RadioOption } from './radio-group';
export { TextArea } from './text-area';
export { FileInput } from './file-input';
export { Collapsible } from './collapsible';
export { Accordion, type AccordionItem } from './accordion';
export { Image } from './image';
export { Link } from './link';
export { Stack, VStack, HStack } from './stack';
export { Grid } from './grid';
export { Center } from './center';
export { Spacer } from './spacer';
export { Text } from './text';
export { Box } from './box';
export { Flex } from './flex';
export { Container } from './container';
export { Heading } from './heading';
export { HelperText } from './helper-text';
export { VisuallyHidden } from './visually-hidden';
export { AspectRatio } from './aspect-ratio';
export { Kbd } from './kbd';
export { Code } from './code';
export { Blockquote } from './blockquote';
export { List, ListItem } from './list';
export { ScrollArea } from './scroll-area';
export { Show } from './show';
export { Portal } from './portal';
export { Overlay } from './overlay';
export { Drawer } from './drawer';
export { Popover } from './popover';
export { Toast, ToastProvider, useToast } from './toast';
export { Breadcrumb } from './breadcrumb';
export { AlertDialog } from './alert-dialog';
export { Dialog } from './dialog';
export { HoverCard } from './hover-card';
export { ContextMenu } from './context-menu';
export { ToggleGroup } from './toggle-group';
export { Combobox } from './combobox';
export { Command } from './command';
export { NavigationMenu } from './navigation-menu';
export { Sheet } from './sheet';
export { Calendar } from './calendar';
export { Progress } from './progress';
export { Stepper } from './stepper';
export { Rating } from './rating';
export { Timeline } from './timeline';
export { Carousel } from './carousel';
export { Table } from './table';

// Additional Components
export { WalletIcon } from './wallet-icon';
export { WalletSelectionGrid, WalletSelectionButton } from './wallet-selection';
export { Logo } from './logo';
export { default as InternalLinkClusters } from './internal-link-clusters';

// Re-export component types for convenience
export type { AddressLinkProps } from './address-link';
export type { ButtonProps } from './button';
export type { StatusType, ChainType } from './status-badge';
export type { InputProps } from './input';
export type {
  ModalProps,
  ModalHeaderProps,
  ModalContentProps,
  ModalFooterProps,
} from './modal';
export type { ConfirmationDialogProps } from './confirmation-dialog';
export type { TextInputModalProps } from './text-input-modal';
export type { SmartLinkProps, SmartContentProps } from './smart-link';
export type { Feature } from './feature-grid';
export type { FeatureCardProps, FeatureCardColor } from './feature-card';
export type { HeroBannerWithBadgeProps } from './hero-banner-with-badge';
export type { MetricsGridProps, MetricItem } from './metrics-grid';
export type { ProcessStepsProps, ProcessStep } from './process-steps';
export type { UseCaseGridProps, UseCase } from './use-case-grid';
export type { TOCSection } from './table-of-contents';
export type { EmailAccount, WalletEmailGroup } from './email-accounts-list';
export type { SettingItem, SettingsListProps } from './settings-list';
export type { FormFieldProps } from './form-field';
export type { FormAlertsProps } from './form-alerts';
export type { ActionButtonProps } from './action-button';
export type { CheckboxProps } from './checkbox';
export type { ListItemWithActionProps } from './list-item-with-action';
export type { NavigationListProps, NavigationItem } from './navigation-list';
export type { FeatureListItemProps } from './feature-list-item';
export type { GradientIconContainerProps } from './gradient-icon-container';
export type { GradientBannerProps } from './gradient-banner';
export type { InfoBoxProps } from './info-box';
export type { BorderAccentProps } from './border-accent';
export type { CodeDisplayProps } from './code-display';
export type { SkeletonLoaderProps } from './skeleton-loader';
export type { StatDisplayProps } from './stat-display';
export type { ProgressBarProps } from './progress-bar';
export type { DividerProps } from './divider';
export type { IconTextProps } from './icon-text';
export type { CopyButtonProps } from './copy-button';
export type { PageSectionHeaderProps } from './page-section-header';
export type { BadgeProps } from './badge';
export type { AvatarProps } from './avatar';
export type { StepIndicatorProps } from './step-indicator';
export type { KeyValuePairProps } from './key-value-pair';
export type { TooltipProps } from './tooltip';
export type { ExternalLinkProps } from './external-link';
export type { IconButtonProps } from './icon-button';
export type { FileIconProps } from './file-icon';
export type { PaginationProps } from './pagination';
export type { TagProps } from './tag';
export type { BackdropProps } from './backdrop';
export type { MenuItemProps } from './menu-item';
export type { LoadingOverlayProps } from './loading-overlay';
export type { SeparatorProps } from './separator';
export type { TruncatedTextProps } from './truncated-text';
export type { FormattedNumberProps } from './formatted-number';
export type { RelativeTimeProps } from './relative-time';
export type { ButtonGroupProps } from './button-group';
export type { SearchInputProps } from './search-input';
export type { SliderProps } from './slider';
export type { NumberInputProps } from './number-input';
export type { DateInputProps } from './date-input';
export type { RadioGroupProps } from './radio-group';
export type { TextAreaProps } from './text-area';
export type { FileInputProps } from './file-input';
export type { CollapsibleProps } from './collapsible';
export type { AccordionProps } from './accordion';
export type { ImageProps } from './image';
export type { LinkProps } from './link';
export type { StackProps } from './stack';
export type { GridProps } from './grid';
export type { CenterProps } from './center';
export type { SpacerProps } from './spacer';
export type { TextProps } from './text';
export type { BoxProps } from './box';
export type { FlexProps } from './flex';
export type { ContainerProps } from './container';
export type { HeadingProps } from './heading';
export type { HelperTextProps } from './helper-text';
export type { VisuallyHiddenProps } from './visually-hidden';
export type { AspectRatioProps } from './aspect-ratio';
export type { KbdProps } from './kbd';
export type { CodeProps } from './code';
export type { BlockquoteProps } from './blockquote';
export type { ListProps, ListItemProps } from './list';
export type { ScrollAreaProps } from './scroll-area';
export type { ShowProps } from './show';
export type { PortalProps } from './portal';
export type { OverlayProps } from './overlay';
export type { DrawerProps } from './drawer';
export type { PopoverProps } from './popover';
export type { ToastProps, ToastMessage, ToastContextValue } from './toast';
export type { BreadcrumbProps, BreadcrumbItem } from './breadcrumb';
export type { AlertDialogProps } from './alert-dialog';
export type { DialogProps } from './dialog';
export type { HoverCardProps } from './hover-card';
export type { ContextMenuProps, ContextMenuItem } from './context-menu';
export type { ToggleGroupProps, ToggleGroupOption } from './toggle-group';
export type { ComboboxProps, ComboboxOption } from './combobox';
export type { CommandProps, CommandItem } from './command';
export type {
  NavigationMenuProps,
  NavigationMenuItem,
} from './navigation-menu';
export type { SheetProps } from './sheet';
export type { CalendarProps } from './calendar';
export type { ProgressProps } from './progress';
export type { StepperProps, StepperStep } from './stepper';
export type { RatingProps } from './rating';
export type { TimelineProps, TimelineItem } from './timeline';
export type { CarouselProps } from './carousel';
export type { TableProps, TableColumn } from './table';

// Legacy wildcard exports for backward compatibility
export * from './address-label';
export * from './address-link';
export * from './alert';
export * from './animated-section';
export * from './button';
export * from './card';
export * from './comparison-section';
export * from './content-container';
export * from './dropdown';
export * from './feature-card';
export * from './feature-grid';
export * from './hero-banner-with-badge';
export * from './input';
export * from './label';
export * from './metrics-grid';
export * from './process-steps';
export * from './select';
export * from './spinner';
export * from './switch';
export * from './table-of-contents';
export * from './tabs';
export * from './use-case-grid';
export * from './flex-container';
export * from './page-container';
export * from './section';
export * from './empty-state';
export * from './loading-state';
export * from './no-content';
export * from './email-input-group';
export * from './form-field-group';
export * from './form-field';
export * from './form-alerts';
export * from './action-button';
export * from './checkbox';
export * from './list-item-with-action';
export * from './navigation-list';
export * from './feature-list-item';
export * from './status-badge';
export * from './status-indicator';
export * from './system-status-indicator';
export * from './section-badge';
export * from './typography';
export * from './smart-link';
export * from './modal';
export * from './confirmation-dialog';
export * from './text-input-modal';
export * from './icon-container';
export * from './free-email-banner';
export * from './design-system-components';
export * from './wallet-icon';
export * from './wallet-selection';
export * from './logo';
export * from './internal-link-clusters';
export * from './email-accounts-list';
export * from './settings-list';
export * from './gradient-icon-container';
export * from './gradient-banner';
export * from './info-box';
export * from './border-accent';
export * from './code-display';
export * from './skeleton-loader';
export * from './stat-display';
export * from './progress-bar';
export * from './divider';
export * from './icon-text';
export * from './copy-button';
export * from './page-section-header';
export * from './badge';
export * from './avatar';
export * from './step-indicator';
export * from './key-value-pair';
export * from './tooltip';
export * from './external-link';
export * from './icon-button';
export * from './file-icon';
export * from './pagination';
export * from './tag';
export * from './backdrop';
export * from './menu-item';
export * from './loading-overlay';
export * from './separator';
export * from './truncated-text';
export * from './formatted-number';
export * from './relative-time';
export * from './button-group';
export * from './search-input';
export * from './slider';
export * from './number-input';
export * from './date-input';
export * from './radio-group';
export * from './text-area';
export * from './file-input';
export * from './collapsible';
export * from './accordion';
export * from './image';
export * from './link';
export * from './stack';
export * from './grid';
export * from './center';
export * from './spacer';
export * from './text';
export * from './box';
export * from './flex';
export * from './container';
export * from './heading';
export * from './helper-text';
export * from './visually-hidden';
export * from './aspect-ratio';
export * from './kbd';
export * from './code';
export * from './blockquote';
export * from './list';
export * from './scroll-area';
export * from './show';
export * from './portal';
export * from './overlay';
export * from './drawer';
export * from './popover';
export * from './toast';
export * from './breadcrumb';
export * from './alert-dialog';
export * from './dialog';
export * from './hover-card';
export * from './context-menu';
export * from './toggle-group';
export * from './combobox';
export * from './command';
export * from './navigation-menu';
export * from './sheet';
export * from './calendar';
export * from './progress';
export * from './stepper';
export * from './rating';
export * from './timeline';
export * from './carousel';
export * from './table';
