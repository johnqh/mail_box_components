/**
 * Working UI Components - Phase 2 extraction from @johnqh/mail_box
 * Only components without external dependencies
 */

// === CORE WORKING COMPONENTS ===
export { Button, buttonVariants } from '../ui/button';
export { Input } from '../ui/input';
export { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
export { PageTitle, SectionTitle, BodyText, TextLink } from '../ui/typography';
export { StatusBadge, ChainBadge } from '../ui/status-badge';
export { Select } from '../ui/select';
export { Alert, AlertTitle, AlertDescription } from '../ui/alert';
export { Spinner } from '../ui/spinner';
export { Switch } from '../ui/switch';
export { Tabs } from '../ui/tabs';
export { Label } from '../ui/label';
export { Modal } from '../ui/modal';
export { LoadingState } from '../ui/loading-state';
export { EmptyState } from '../ui/empty-state';
export { NoContent } from '../ui/no-content';
export { StatusIndicator } from '../ui/status-indicator';
export { ConfirmationDialog } from '../ui/confirmation-dialog';
export { IconContainer } from '../ui/icon-container';
export { FormFieldGroup, TextField, TextAreaField, SelectField } from '../ui/form-field-group';
export { EmailInputGroup, EmailInputField, CollapsibleEmailField } from '../ui/email-input-group';
export { SectionBadge } from '../ui/section-badge';
export { AnimatedSection, FadeInUp, FadeInScale, FloatingElement } from '../ui/animated-section';

// Component types
export type { ButtonProps, StatusType, ChainType } from '../ui';

// === LEGACY WILDCARD EXPORTS ===
// For backward compatibility
export * from '../ui/button';
export * from '../ui/input';
export * from '../ui/card';
export * from '../ui/typography';
export * from '../ui/status-badge';
export * from '../ui/select';
export * from '../ui/alert';
export * from '../ui/spinner';
export * from '../ui/switch';
export * from '../ui/tabs';
export * from '../ui/label';
export * from '../ui/modal';
export * from '../ui/loading-state';
export * from '../ui/empty-state';
export * from '../ui/no-content';
export * from '../ui/status-indicator';
export * from '../ui/confirmation-dialog';
export * from '../ui/icon-container';
export * from '../ui/form-field-group';
export * from '../ui/email-input-group';
export * from '../ui/section-badge';
export * from '../ui/animated-section';