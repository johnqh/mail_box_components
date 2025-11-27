# React Native Port - Technical Design & Implementation Plan

## Executive Summary

This document outlines the complete technical design for porting `@sudobility/components` (361 components) and 4 specialized packages to React Native, creating a new monorepo at `../mail_box_components_rn`.

### Key Decisions
- **RN Setup:** Bare React Native (full native control, supports all native modules)
- **Monorepo:** npm workspaces (matches current project structure)
- **Styling:** NativeWind v4 (Tailwind for React Native)
- **Navigation:** React Navigation
- **Design System:** Unified `@sudobility/design` with `.native.ts` platform exports
- **Scope:** Port all technically portable components
- **Estimated Code Reuse:** 70-75%

---

## 1. Package Architecture

### 1.1 Target Structure

```
mail_box_components_rn/
├── packages/
│   ├── components-rn/                    # @sudobility/components-rn
│   │   ├── src/
│   │   │   ├── primitives/               # Layout, Typography, Feedback
│   │   │   ├── forms/                    # Input, Select, Switch, etc.
│   │   │   ├── navigation/               # SmartLink, Tabs, Breadcrumbs
│   │   │   ├── modals/                   # Modal, Sheet, Dialog
│   │   │   ├── data-display/             # Lists, Cards, Tables
│   │   │   ├── interactive/              # Gestures, Drag-drop
│   │   │   ├── ui/                       # General UI components
│   │   │   ├── hooks/                    # Custom hooks
│   │   │   └── lib/                      # Utilities (cn function)
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── devops-components-rn/             # @sudobility/devops-components-rn
│   ├── email-components-rn/              # @sudobility/email-components-rn
│   ├── web3-components-rn/               # @sudobility/web3-components-rn
│   └── marketing-components-rn/          # @sudobility/marketing-components-rn
│
├── example-app/                          # Bare RN demo app for testing
├── package.json                          # Monorepo root (npm workspaces)
├── tsconfig.json
├── tailwind.config.js                    # NativeWind config
└── metro.config.js
```

### 1.2 Package Dependencies

```
@sudobility/design (existing, with .native.ts exports)
        ↓
@sudobility/components-rn
        ↓
┌───────┴───────┬───────────────┬────────────────┐
↓               ↓               ↓                ↓
devops-rn    email-rn       web3-rn      marketing-rn
```

---

## 2. Design System Integration

### 2.1 Unified Platform Exports

Add `.native.ts` files to existing `@sudobility/design` package:

```
design_system/src/
├── utilities/
│   ├── utils.ts              # Web: cn() with tailwind-merge
│   └── utils.native.ts       # RN: cn() with clsx only (NativeWind handles merging)
├── core/
│   ├── variants.ts           # Web variants
│   └── variants.native.ts    # RN variants (same classes, NativeWind compatible)
└── tokens/
    ├── colors.ts             # Shared color definitions
    └── tokens.ts             # Shared design tokens
```

### 2.2 cn() Utility for React Native

```typescript
// utils.native.ts
import { type ClassValue, clsx } from 'clsx';

// NativeWind processes Tailwind classes at build time
// No need for tailwind-merge in RN
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
```

### 2.3 Package.json Exports

```json
{
  "name": "@sudobility/design",
  "exports": {
    ".": {
      "react-native": "./dist/index.native.js",
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js"
    }
  }
}
```

---

## 3. Component Architecture

### 3.1 Three-File Pattern (Maximum Reuse)

For each component:

```
Button/
├── Button.shared.ts      # Shared types, logic, variant computation (100% reuse)
├── Button.tsx            # Web implementation (existing)
├── Button.native.tsx     # React Native implementation (new)
└── index.ts              # Platform-aware export
```

### 3.2 Example Implementation

**Button.shared.ts:**
```typescript
export interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const getButtonVariantClasses = (variant: string, size: string) => {
  // Shared variant logic - returns NativeWind-compatible classes
};

export const useButtonState = (loading: boolean, disabled: boolean) => ({
  isDisabled: loading || disabled,
  showSpinner: loading,
});
```

**Button.native.tsx:**
```typescript
import { Pressable, Text, ActivityIndicator } from 'react-native';
import { cn } from '@sudobility/design';
import { ButtonBaseProps, getButtonVariantClasses, useButtonState } from './Button.shared';

export interface ButtonProps extends ButtonBaseProps {
  onPress?: () => void;
  accessibilityLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  disabled,
  loading,
  onPress,
  children,
  accessibilityLabel,
}) => {
  const classes = getButtonVariantClasses(variant, size);
  const { isDisabled, showSpinner } = useButtonState(loading, disabled);

  return (
    <Pressable
      className={cn(classes)}
      disabled={isDisabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled }}
    >
      {showSpinner && <ActivityIndicator size="small" />}
      <Text className={cn('text-center font-medium')}>{children}</Text>
    </Pressable>
  );
};
```

---

## 4. Dependency Replacements

### 4.1 Core Dependencies

| Web Dependency | React Native Replacement |
|----------------|-------------------------|
| `react-dom` | `react-native` |
| `@radix-ui/*` | Custom implementations |
| `@heroicons/react` | `react-native-heroicons` |
| `react-router-dom` | `@react-navigation/native` |
| `tailwindcss` | `nativewind` v4 |
| `tailwind-merge` | Not needed (NativeWind handles) |
| `clsx` | Keep `clsx` (works in RN) |
| `class-variance-authority` | Keep `cva` (works with NativeWind) |
| `createPortal` | `@gorhom/portal` or RN Modal |

### 4.2 Additional RN Dependencies

```json
{
  "dependencies": {
    "nativewind": "^4.0.0",
    "react-native-reanimated": "^3.x",
    "react-native-gesture-handler": "^2.x",
    "react-native-safe-area-context": "^4.x",
    "@react-navigation/native": "^6.x",
    "@react-navigation/stack": "^6.x",
    "@react-navigation/bottom-tabs": "^6.x",
    "react-native-heroicons": "^3.x",
    "react-native-svg": "^15.x",
    "@gorhom/bottom-sheet": "^4.x",
    "@react-native-clipboard/clipboard": "^1.x"
  }
}
```

### 4.3 Radix UI Replacements

| Radix Component | RN Replacement |
|-----------------|---------------|
| `@radix-ui/react-dialog` | Custom Modal or `react-native-modal` |
| `@radix-ui/react-select` | `@gorhom/bottom-sheet` + custom picker |
| `@radix-ui/react-switch` | RN `Switch` component |
| `@radix-ui/react-tabs` | `@react-navigation/material-top-tabs` |
| `@radix-ui/react-tooltip` | Long-press or info icon pattern |
| `@radix-ui/react-slot` | Custom children pass-through |

---

## 5. Accessibility Translation

### 5.1 ARIA to React Native

| Web ARIA | React Native |
|----------|-------------|
| `role="button"` | `accessibilityRole="button"` |
| `role="dialog"` | `accessibilityViewIsModal={true}` |
| `aria-label` | `accessibilityLabel` |
| `aria-describedby` | `accessibilityHint` |
| `aria-disabled` | `accessibilityState={{ disabled: true }}` |
| `aria-selected` | `accessibilityState={{ selected: true }}` |
| `aria-expanded` | `accessibilityState={{ expanded: true }}` |
| `aria-checked` | `accessibilityState={{ checked: true }}` |
| `aria-live` | `accessibilityLiveRegion="polite"` |
| `aria-hidden` | `importantForAccessibility="no-hide-descendants"` |

### 5.2 Screen Reader Announcements

```typescript
import { AccessibilityInfo } from 'react-native';
AccessibilityInfo.announceForAccessibility('Modal opened');
```

---

## 6. Navigation Integration

### 6.1 SmartLink Replacement

```typescript
// SmartLink.native.tsx
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, Linking } from 'react-native';

export const SmartLink: React.FC<SmartLinkProps> = ({ to, href, external, children }) => {
  const navigation = useNavigation();
  const destination = to || href;

  const handlePress = () => {
    if (!destination) return;
    if (external || destination.startsWith('http')) {
      Linking.openURL(destination);
    } else {
      navigation.navigate(destination);
    }
  };

  return (
    <Pressable onPress={handlePress} accessibilityRole="link">
      <Text className="text-blue-600 dark:text-blue-400">{children}</Text>
    </Pressable>
  );
};
```

---

## 7. Component Portability Analysis

### 7.1 By Category

| Category | Total | Portable | Needs Rework | Skip |
|----------|-------|----------|--------------|------|
| Primitives (Layout) | 16 | 16 | 0 | 0 |
| Primitives (Typography) | 11 | 11 | 0 | 0 |
| Primitives (Feedback) | 16 | 12 | 4 | 0 |
| Form Inputs | 25 | 15 | 10 | 0 |
| Data Display | 26 | 12 | 12 | 2 |
| UI Components | 113 | 70 | 35 | 8 |
| Navigation | 9 | 0 | 9 | 0 |
| Modals | 5 | 0 | 5 | 0 |
| Media | 19 | 5 | 8 | 6 |
| Charts | 20 | 0 | 15 | 5 |
| Interactive | 15 | 5 | 10 | 0 |
| **Total** | **~275** | **~146** | **~108** | **~21** |

### 7.2 Components to Skip (Web-Only)

- All SEO components (`AIMeta`, `SemanticHTML`, `AITrainingEnhancer`)
- `SkipNavigation` (web accessibility pattern)
- `Kbd` (keyboard shortcuts)
- `SumsubWebSDK` (web SDK - use native SDK instead)
- Complex canvas-based components (video editor, signature pad)

### 7.3 Components Requiring Significant Redesign

- `Modal` → Bottom sheet for actions, full-screen for forms
- `Select` → Bottom sheet picker
- `Dropdown` → Action sheet (iOS) / Bottom sheet
- `Table` → FlatList-based layout
- `TreeView` → Expandable list
- `Masonry` → Simple grid or FlatList

---

## 8. Specialized Packages

### 8.1 devops-components-rn (26 components)

**Port All:**
- `AlertDialog`, `MetricsGrid`, `SystemStatusIndicator`
- `DeploymentStatus`, `PipelineView`, `BuildLog`
- `TestResult`, `TestRunner`, `AuditLog`
- `ApiPlayground`, `ApiReference`, `WebhookLogger`
- Dashboard and monitoring components

**Mobile UX Adaptations:**
- `PageBuilder` → Simplified mobile builder or view-only
- `WorkflowBuilder` → Simplified or view-only

### 8.2 email-components-rn (10 components)

**Port All:**
- `EmailAccountsList`, `EmailInputGroup`, `ContactCard`
- `EmailTemplate`, `EmailCampaign`, `EmailAnalytics`
- `ABTestEmail`, `FreeEmailBanner`
- `SubscriberList`, `SubscriptionPlan`

### 8.3 web3-components-rn (8 components)

**Port All:**
- `WalletSelection`, `WalletIcon`, `WalletConnect`
- `AddressLabel`, `TokenSwap`, `GasTracker`
- `NFTGallery`, `CryptoPortfolio`

**Note:** May need `@walletconnect/react-native-compat` for WalletConnect

### 8.4 marketing-components-rn (13 components)

**Port All:**
- `HeroBannerWithBadge`, `FeatureListItem`, `FeatureSpotlight`
- `UseCaseGrid`, `TestimonialSlider`, `CtaBanner`
- `WelcomeScreen`, `NpsSurvey`
- `CrmDashboard`, `SalesReport`
- `LandingBuilder` → View-only or simplified
- `InternalLinkClusters`, `SubscriberList`

---

## 9. Implementation Phases

### Phase 1: Foundation (Week 1-2)

**Deliverables:**
1. Create monorepo at `../mail_box_components_rn`
2. Configure NativeWind, TypeScript, Metro bundler
3. Add `.native.ts` exports to `@sudobility/design`
4. Create `cn.native.ts` utility
5. Set up example Expo app
6. POC: Button, Card, Input, Spinner, Alert

**Validation:**
- POC components render on iOS/Android
- NativeWind classes apply correctly
- Design tokens work across platforms

### Phase 2: Core Primitives (Week 3-4)

**Components (~34):**
- Layout: Box, Flex, Stack, Center, Grid, Container, Spacer, Divider
- Typography: Text, Heading, HelperText, TruncatedText
- Feedback: Spinner, Badge, StatusBadge, Alert, SkeletonLoader

### Phase 3: Form Components (Week 5-6)

**Components (~28):**
- Basic: Input, TextArea, Label, Switch, Checkbox, RadioGroup
- Select: Custom bottom sheet picker
- Advanced: NumberInput, PhoneInput, SearchInput, TagInput

### Phase 4: Navigation & Modals (Week 7-8)

**Components (~18):**
- Navigation: SmartLink, Tabs, Breadcrumb, Pagination
- Modals: Modal, BottomSheet, Dialog, ConfirmationDialog, Toast

### Phase 5: Interactive & Data Display (Week 9-10)

**Components (~30):**
- Interactive: PullToRefresh, SwipeActions, LongPress gestures
- Data: Card variants, Avatar, List components, EmptyState

### Phase 6: Advanced Components (Week 11-12)

**Components (~20):**
- Charts: Basic charts with `victory-native` or `react-native-chart-kit`
- Media: OptimizedImage (FastImage), basic media components
- Complex: Accordion, Stepper, ProgressTracker

### Phase 7: Specialized Packages (Week 13-16)

**Week 13-14:**
- `@sudobility/email-components-rn` (10 components)
- `@sudobility/web3-components-rn` (8 components)

**Week 15-16:**
- `@sudobility/devops-components-rn` (26 components)
- `@sudobility/marketing-components-rn` (13 components)

### Phase 8: Testing & Documentation (Week 17-18)

**Deliverables:**
- Unit tests with React Native Testing Library
- E2E tests with Detox
- Component documentation
- Migration guide from web components
- Storybook or example app with all components

---

## 10. Critical Path

```
Phase 1 (Foundation)
    │
    ├──→ Phase 2 (Primitives)
    │        │
    │        ├──→ Phase 3 (Forms)
    │        │        │
    │        │        └──→ Phase 4 (Navigation/Modals)
    │        │                 │
    │        │                 └──→ Phase 5 (Interactive)
    │        │
    │        └──→ Phase 6 (Advanced) [parallel with Phase 5]
    │
    └──→ Phase 7 (Specialized) [can start after Phase 5]
             │
             └──→ Phase 8 (Testing/Docs)
```

**Parallel Opportunities:**
- Phase 5 & 6 can run in parallel after Phase 4
- Phase 7 can start once Phase 5 primitives are ready
- Documentation can begin in Phase 2

---

## 11. Testing Strategy

### 11.1 Unit Testing

```typescript
import { render, fireEvent, screen } from '@testing-library/react-native';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Press me</Button>);
    expect(screen.getByText('Press me')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    render(<Button onPress={onPress}>Press me</Button>);
    fireEvent.press(screen.getByText('Press me'));
    expect(onPress).toHaveBeenCalled();
  });

  it('has correct accessibility role', () => {
    render(<Button>Press me</Button>);
    expect(screen.getByRole('button')).toBeTruthy();
  });
});
```

### 11.2 E2E Testing (Detox)

```javascript
describe('Button E2E', () => {
  it('should respond to tap', async () => {
    await element(by.text('Submit')).tap();
    await expect(element(by.text('Success'))).toBeVisible();
  });
});
```

---

## 12. Performance Optimization

### 12.1 List Virtualization

```typescript
<FlatList
  data={items}
  renderItem={renderItem}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  windowSize={5}
  maxToRenderPerBatch={10}
  removeClippedSubviews={true}
/>
```

### 12.2 Animation Performance

Use `react-native-reanimated` for 60fps animations:

```typescript
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const scale = useSharedValue(1);
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));
```

### 12.3 Image Optimization

```typescript
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: imageUrl, priority: FastImage.priority.normal }}
  resizeMode={FastImage.resizeMode.cover}
/>
```

---

## 13. Platform-Specific Handling

### 13.1 iOS vs Android

```typescript
import { Platform } from 'react-native';

const styles = {
  shadow: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 } },
    android: { elevation: 4 },
  }),
};
```

### 13.2 Safe Area

```typescript
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Component = () => {
  const insets = useSafeAreaInsets();
  return <View style={{ paddingTop: insets.top }} />;
};
```

---

## 14. Critical Files Reference

Files to study before implementation:

| File | Purpose |
|------|---------|
| `src/lib/utils.ts` | cn() utility pattern |
| `src/ui/button.tsx` | CVA + variant system pattern |
| `src/ui/modal.tsx` | Overlay/portal pattern |
| `src/navigation/smart-link.tsx` | Navigation pattern |
| `src/hooks/useToggle.ts` | Reusable hook pattern |
| `design_system/src/core/variants.ts` | Design system variants |

---

## 15. Success Metrics

- [ ] All 5 packages created and published
- [ ] ~250+ components ported
- [ ] 80%+ test coverage
- [ ] Example app demonstrating all components
- [ ] Documentation complete
- [ ] Performance: <100ms initial render, 60fps animations
- [ ] Accessibility: VoiceOver/TalkBack support for all components
