/**
 * UI Components Export Index
 * 
 * Centralized exports for all UI components to provide a clean API
 * and enable better tree-shaking.
 */

// Core Components
export { Alert, AlertTitle, AlertDescription } from './alert';
export { AnimatedSection, FadeInUp, FadeInScale, FloatingElement } from './animated-section';
export { Button, buttonVariants } from './button';
export { Card, CardHeader, CardContent, CardFooter } from './card';
export { Dropdown } from './dropdown';
export { GradientButton } from './gradient-button';
export { Input } from './input';
export { Label } from './label';
export { Select } from './select';
export { Spinner } from './spinner';
export { Switch } from './switch';
export { Tabs } from './tabs';

// Layout Components
export { FlexContainer } from './flex-container';
export { PageContainer } from './page-container';
export { Section } from './section';

// Content Components
export { EmptyState } from './empty-state';
export { LoadingState } from './loading-state';
export { NoContent } from './no-content';

// Form Components
export { EmailInputGroup } from './email-input-group';
export { FormFieldGroup } from './form-field-group';

// Status & Feedback Components
export { StatusBadge, ChainBadge } from './status-badge';
export { StatusIndicator } from './status-indicator';
export { SectionBadge } from './section-badge';

// Typography Components
export { PageTitle, SectionTitle, BodyText, TextLink } from './typography';

// Navigation & Interactive Components
export { SmartLink } from './smart-link';
export { Modal } from './modal';
export { ConfirmationDialog } from './confirmation-dialog';

// Utility Components
export { IconContainer } from './icon-container';
export { FreeEmailBanner } from './free-email-banner';
export { InfoPanel, StatCard, FormSection, FeatureBlock } from './design-system-components';

// Re-export component types for convenience
export type { ButtonProps } from './button';
export type { StatusType, ChainType } from './status-badge';

// Legacy wildcard exports for backward compatibility
export * from './alert';
export * from './animated-section';
export * from './button';
export * from './card';
export * from './dropdown';
export * from './gradient-button';
export * from './input';
export * from './label';
export * from './select';
export * from './spinner';
export * from './switch';
export * from './tabs';
export * from './flex-container';
export * from './page-container';
export * from './section';
export * from './empty-state';
export * from './loading-state';
export * from './no-content';
export * from './email-input-group';
export * from './form-field-group';
export * from './status-badge';
export * from './status-indicator';
export * from './section-badge';
export * from './typography';
export * from './smart-link';
export * from './modal';
export * from './confirmation-dialog';
export * from './icon-container';
export * from './free-email-banner';
export * from './design-system-components';