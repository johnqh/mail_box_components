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
