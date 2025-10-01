/**
 * @johnqh/mail-box-components
 *
 * A comprehensive React component library and design system.
 *
 * @version 1.4.0
 * @author John Qiu Huang
 * @license MIT
 */

// === UTILITIES ===
// Core utilities
export { cn } from './lib/utils';

// Performance & Optimization utilities - Temporary wildcard for compatibility
export * from './utils';

// Performance monitoring utilities
export {
  getPerformanceMonitor,
  initializePerformanceMonitoring,
  type PerformanceMetrics,
} from './optimization/performance-monitoring';

// File & Utility Functions
export {
  formatFileSize,
  convertFileSize,
  parseFileSize,
} from './utils/formatFileSize';

// Structured data re-exported from design system
export { createTechArticleData } from '@johnqh/design_system';

// Hooks
export { useClickOutside } from './hooks/useClickOutside';
export { useCodeLoader } from './hooks/useCodeLoader';
export {
  useCopyToClipboard,
  useMultipleCopyToClipboard,
  type CopyToClipboardOptions,
  type CopyToClipboardResult,
} from './hooks/useCopyToClipboard';

// Enhanced utilities
export {
  withOpacity,
  responsive,
  themeColor,
  getSizeClasses,
  buttonVariant,
  inputVariant,
  cardVariant,
  textVariant,
} from './lib';

// === TYPE DECLARATIONS ===
// Global types and interfaces from design system
// Note: Navigation types removed - not available in current design system version

// === DESIGN SYSTEM ===
// Design tokens and variants from external package
export {
  colors,
  designTokens,
  ui,
  textVariants,
  variants,
} from '@johnqh/design_system';

// === UI COMPONENTS ===
// Core Components
export {
  Alert,
  AlertTitle,
  AlertDescription,
  AnimatedSection,
  FadeInUp,
  FadeInScale,
  FloatingElement,
  Button,
  buttonVariants,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  ComparisonSection,
  createComparisonData,
  createEmailComparisonData,
  ContentContainer,
  Dropdown,
  FeatureCard,
  FeatureGrid,
  createFeature,
  createSecurityFeatures,
  GradientButton,
  HeroBannerWithBadge,
  Input,
  Label,
  Logo,
  MetricsGrid,
  ProcessSteps,
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
  Spinner,
  Switch,
  TableOfContents,
  EmailAccountsList,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  UseCaseGrid,
  WalletIcon,
} from './ui';

// Layout Components
export { FlexContainer, PageContainer, Section, SectionHeader } from './ui';

// === ORGANIZED COMPONENTS ===
// Core Components (essential functionality)
export * from './core';

// Feature Components (specific features)
export * from './features';

// Layout Components (page structure)
export * from './layout';

// Optimization Components (performance)
export * from './optimization';

// SEO Components (search optimization)
export * from './seo';

// Explicit re-exports for backward compatibility
export { AIMeta, type AIMetaProps } from './seo/AIMeta';
export {
  generateAdvancedSEO,
  pageSEOConfigs,
  createAIMetaTags,
} from './seo/advancedSEO';

// Core components with renamed default exports
export { Breadcrumb } from './core/Breadcrumb';
export { default as BreadcrumbSection } from './core/BreadcrumbSection';
export { SafeAppWrapper } from './core/SafeAppWrapper';
export { SecurityProvider } from './core/SecurityProvider';
export { default as CodeBlock } from './core/CodeBlock';
export { default as CodeExampleBlock } from './core/CodeExampleBlock';
export {
  default as CollapsibleDocumentationTopic,
  type CollapsibleDocumentationTopicProps,
} from './core/CollapsibleDocumentationTopic';
export { default as PromotionalBanner } from './core/PromotionalBanner';
export { default as LanguageSelector } from './core/LanguageSelector';
export { default as TrackedButton } from './core/TrackedButton';
export { default as TrackedLink } from './core/TrackedLink';

// Optimization components
export { default as PerformanceOptimizer } from './optimization/PerformanceOptimizer';
export { default as LoadingOptimizer } from './optimization/LoadingOptimizer';
export { OptimizedRoutePreloader } from './optimization/OptimizedRoutePreloader';

// SEO components
export { AITrainingEnhancer } from './seo/AITrainingEnhancer';

// Layout components
export { PageHeader } from './layout/PageHeader';
export { default as StandardPageLayout } from './layout/StandardPageLayout';

// Feature components
export { default as CTASection } from './features/CTASection';

// Content Components
export { EmptyState, LoadingState, NoContent } from './ui';

// Form Components
export {
  EmailInputGroup,
  EmailInputField,
  CollapsibleEmailField,
  FormFieldGroup,
  TextField,
  TextAreaField,
  SelectField,
} from './ui';

// Status & Feedback Components
export { StatusBadge, ChainBadge, StatusIndicator, SectionBadge } from './ui';

// Typography Components
export { PageTitle, SectionTitle, BodyText, TextLink } from './ui';

// Navigation & Interactive Components
export {
  SmartLink,
  SmartContent,
  useSmartLinks,
  smartLinkVariants,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ConfirmationDialog,
} from './ui';

// Utility Components
export {
  IconContainer,
  FreeEmailBanner,
  InfoPanel,
  StatCard,
  FormSection,
  FeatureBlock,
} from './ui';

// Development & Documentation Components (now in core/)
// Note: These are now exported via ./core but kept here for backward compatibility

// Enhanced Tracking Components (now in core/)
// Note: These are now exported via ./core but kept here for backward compatibility

// Component types
export type {
  ButtonProps,
  StatusType,
  ChainType,
  InputProps,
  ModalProps,
  ModalHeaderProps,
  ModalContentProps,
  ModalFooterProps,
  ConfirmationDialogProps,
  SmartLinkProps,
  SmartContentProps,
  Feature,
  FeatureCardProps,
  HeroBannerWithBadgeProps,
  MetricsGridProps,
  MetricItem,
  ProcessStepsProps,
  ProcessStep,
  UseCaseGridProps,
  UseCase,
  TOCSection,
  EmailAccount,
  WalletEmailGroup,
} from './ui';

// === LEGACY NAMED EXPORTS ===
// For backward compatibility - specific named exports
export { cn as combineClassNames } from './lib';
export {
  GRADIENTS as GRADIENTSLegacy,
  GRADIENT_CLASSES as GRADIENT_CLASSESLegacy,
  UI_CONSTANTS as UI_CONSTANTSLegacy,
  colors as colorsLegacy,
  designTokens as designTokensLegacy,
  ui as uiLegacy,
} from '@johnqh/design_system';

// === DEFAULT EXPORT ===
// Grouped exports for convenience
import { cn } from './lib/utils';
import {
  withOpacity,
  responsive,
  themeColor,
  getSizeClasses,
  buttonVariant,
  inputVariant,
  cardVariant,
  textVariant,
} from './lib';
import { colors, designTokens, textVariants } from '@johnqh/design_system';
import { variants } from '@johnqh/design_system';

export default {
  utils: {
    cn,
    withOpacity,
    responsive,
    themeColor,
    getSizeClasses,
    buttonVariant,
    inputVariant,
    cardVariant,
    textVariant,
  },
  design: {
    colors,
    tokens: designTokens,
    typography: textVariants,
    variants,
  },
};
