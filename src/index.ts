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

// Structured data re-exported from design system
export { createTechArticleData } from '@johnqh/design-system';

// Hooks
export { useClickOutside } from './hooks/useClickOutside';

// Enhanced utilities  
export { 
  withOpacity, 
  responsive, 
  themeColor, 
  getSizeClasses,
  buttonVariant,
  inputVariant, 
  cardVariant, 
  textVariant 
} from './lib';

// === TYPE DECLARATIONS ===
// Global types and interfaces from design system
export type { 
  UINavigationState, 
  UINavigationOptions,
  UINavigationService,
  UINavigationHook,
  UILocationHook,
  UINavigationConfig
} from '@johnqh/design-system';

// === DESIGN SYSTEM ===
// Design tokens and variants from external package
export { 
  colors, 
  designTokens,
  ui,
  textVariants,
  variants
} from '@johnqh/design-system';

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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  UseCaseGrid
} from './ui';

// Layout Components
export { 
  FlexContainer,
  PageContainer,
  Section
} from './ui';

// Additional Components (from /components) - Temporary wildcard for compatibility
export * from './components';

// Content Components
export { 
  EmptyState,
  LoadingState,
  NoContent
} from './ui';

// Form Components
export { 
  EmailInputGroup,
  EmailInputField,
  CollapsibleEmailField,
  FormFieldGroup,
  TextField,
  TextAreaField,
  SelectField
} from './ui';

// Status & Feedback Components
export { 
  StatusBadge, 
  ChainBadge,
  StatusIndicator,
  SectionBadge
} from './ui';

// Typography Components
export { 
  PageTitle, 
  SectionTitle, 
  BodyText, 
  TextLink
} from './ui';

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
  ConfirmationDialog
} from './ui';

// Utility Components
export { 
  IconContainer,
  FreeEmailBanner,
  InfoPanel, 
  StatCard, 
  FormSection, 
  FeatureBlock
} from './ui';

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
  TOCSection
} from './ui';

// === LEGACY NAMED EXPORTS ===
// For backward compatibility - specific named exports
export { cn as combineClassNames } from './lib';
export { GRADIENTS as GRADIENTSLegacy, GRADIENT_CLASSES as GRADIENT_CLASSESLegacy, UI_CONSTANTS as UI_CONSTANTSLegacy, colors as colorsLegacy, designTokens as designTokensLegacy, ui as uiLegacy } from '@johnqh/design-system';

// === DEFAULT EXPORT ===
// Grouped exports for convenience
import { cn } from './lib/utils';
import { withOpacity, responsive, themeColor, getSizeClasses, buttonVariant, inputVariant, cardVariant, textVariant } from './lib';
import { colors, designTokens, textVariants } from '@johnqh/design-system';
import { variants } from '@johnqh/design-system';

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