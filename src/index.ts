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

// Performance & Optimization utilities
export * from './utils';

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
// Global types and interfaces
export * from './types/ui-navigation';

// === DESIGN SYSTEM ===
// Design tokens and variants from external package
export { 
  colors, 
  designTokens, 
  textVariants, 
  variants,
  ui
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
  FeatureGrid,
  createFeature,
  createSecurityFeatures,
  GradientButton,
  Input,
  Label,
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
  TabsContent
} from './ui';

// Layout Components
export { 
  PageContainer,
  Section
} from './ui';

export { 
  StandardPageLayout,
  type StandardPageLayoutProps 
} from './components';

// Additional Components (from /components)
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
  TOCSection
} from './ui';

// === LEGACY WILDCARD EXPORTS ===
// For backward compatibility
export * from './lib';
export * from '@johnqh/design-system';
export * from './ui';
export * from './components';

// === DEFAULT EXPORT ===
// Grouped exports for convenience
import { cn } from './lib/utils';
import { withOpacity, responsive, themeColor, getSizeClasses, buttonVariant, inputVariant, cardVariant, textVariant } from './lib';
import { colors, designTokens, textVariants, variants } from '@johnqh/design-system';

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