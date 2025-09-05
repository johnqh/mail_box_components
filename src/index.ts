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

// === DESIGN SYSTEM ===
// Design tokens and variants
export { 
  colors, 
  designTokens, 
  textVariants, 
  variants
} from './design-system';

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
  Dropdown,
  GradientButton,
  Input,
  Label,
  Select,
  Spinner,
  Switch,
  Tabs
} from './ui';

// Layout Components
export { 
  FlexContainer,
  PageContainer,
  Section
} from './ui';

// Content Components
export { 
  EmptyState,
  LoadingState,
  NoContent
} from './ui';

// Form Components
export { 
  EmailInputGroup,
  FormFieldGroup
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
  Modal,
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
  ChainType
} from './ui';

// === LEGACY WILDCARD EXPORTS ===
// For backward compatibility
export * from './lib';
export * from './design-system';
export * from './ui';

// === DEFAULT EXPORT ===
// Grouped exports for convenience
import { cn } from './lib/utils';
import { withOpacity, responsive, themeColor, getSizeClasses, buttonVariant, inputVariant, cardVariant, textVariant } from './lib';
import { colors, designTokens, textVariants, variants } from './design-system';

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