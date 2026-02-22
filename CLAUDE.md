# mail_box_components - AI Development Guide

## Overview

A comprehensive React component library (`@sudobility/components`) providing 110+ reusable UI components built on Radix UI primitives, styled with Tailwind CSS and a centralized design system (`@sudobility/design`). The library is organized into domain-specific categories (primitives, forms, charts, media, interactive, etc.) and ships as both ES module and UMD bundles with full TypeScript declarations.

- **Package**: `@sudobility/components`
- **Version**: 5.0.11
- **License**: Public (publishConfig: `"access": "public"`)
- **Package Manager**: **Bun** (always use `bun` instead of `npm`/`yarn`)
- **Framework**: React 18/19, TypeScript 5.9+, Vite 7.x
- **Module Format**: ES Module + UMD

## Project Structure

```
src/
├── index.ts                  # Main library entry point (barrel exports)
├── lib/
│   ├── index.ts              # Re-exports cn utility
│   └── utils.ts              # cn() - clsx + tailwind-merge helper
├── primitives/               # Core UI building blocks
│   ├── feedback/             # Spinner, Alert, Badge, Toast, StatusIndicator, etc.
│   ├── layout/               # Box, Flex, Grid, Stack, Spacer, Resizable, etc.
│   └── typography/           # Text, Heading, Code, Kbd, Blockquote, etc.
├── forms/                    # Comprehensive form components
│   ├── inputs/               # Input, TextArea, Select, Checkbox, Switch, etc.
│   ├── advanced/             # DateRangePicker, ColorPicker, WYSIWYG, Signature, etc.
│   └── builders/             # FormBuilder, FormValidator, SurveyBuilder, etc.
├── ui/                       # 111 generic UI components (flat directory)
│   └── toast/                # Toast subsystem (context, container, hook)
├── navigation/               # SmartLink, Tabs, Pagination, Stepper, TableOfContents
├── data-display/             # DataTable, DataGrid, Avatar, StatDisplay, PivotTable
├── charts/                   # BarChart, LineChart, PieChart, Radar, Heatmap, Gauge, etc.
├── media/                    # Image, Video, Audio players, Gallery, QR code, etc.
├── modals/                   # Modal, Dialog, Drawer, Sheet, Popover, Tooltip
├── interactive/              # DragDrop, Gestures, SwipeActions, PinchZoom, etc.
├── core/                     # Essential app-level components
│   ├── auth/                 # ProtectedRoute
│   ├── error/                # DetailErrorState
│   ├── i18n-routing/         # LanguageValidator, LocalizedLink
│   ├── icons/                # Icon exports
│   ├── optimized/            # MemoizedComponent
│   └── theme/                # ThemeProvider, useTheme, Theme enum
├── features/                 # FeatureCard, FeatureGrid, CTASection
├── kyc/                      # KYCStatusBadge, KYCLevelCard, SumsubWebSDK
├── layout/                   # Page-level layout components
│   ├── Footer/               # Footer (slot-based composition)
│   ├── Layout/               # LayoutProvider, ContentContainer
│   └── Topbar/               # Topbar (slot-based composition)
├── optimization/             # Performance monitoring and optimization
│   └── optimization/         # Lazy loading, preloading, API optimization
├── dev-tools/                # Development-only tools
│   └── PerformancePanel/     # Draggable perf panel with Web Vitals, API, Memory
├── hooks/                    # Custom React hooks
├── utils/                    # Utility functions (CSS, image, analytics, storage)
├── platforms/                # Platform detection and style generation
├── test/                     # Test setup (vitest + jsdom)
└── __tests__/                # 29 test files
```

## Component Categories

### Primitives (`src/primitives/`)
Core building blocks organized into three sub-groups:
- **Layout**: Box, Flex, Grid, Stack, Center, Spacer, Container, PageContainer, AspectRatio, Divider, Separator, FloatingPanel, SplitPane, Resizable, ResizablePanels, ScrollArea, Masonry, Portal, Overlay, BorderAccent, Section
- **Typography**: Text, Heading, PageTitle, SectionTitle, BodyText, TextLink, Code, CodeDisplay, Kbd, Blockquote, HelperText, ScreenReaderText, TruncatedText, FormattedNumber, RelativeTime
- **Feedback**: Spinner, LoadingOverlay, LoadingDots, LoadingState, SkeletonLoader, Alert, AlertBanner, ActionBanner, FullPageSpinner, DataSkeleton, Toast, ToastNotification, NotificationBadge, NotificationPanel, Badge, BadgeDesigner, StatusBadge, StatusIndicator, StatusPipeline

### Forms (`src/forms/`)
- **Inputs**: Input, TextArea, NumberInput, SearchInput, DateInput, TimePicker, PhoneInput, Checkbox, Switch, RadioGroup, Select, MultiSelect, Combobox, EditableSelector, Dropdown, ToggleGroup, Slider, SliderInput, FileInput, TagInput, MentionInput, Label, FormField, FormFieldGroup, FormAlerts, PhoneDirectory, ActionButton
- **Advanced**: DateTimePicker, DateRangePicker, Calendar, TimeSlotPicker, ColorPicker, ColorPickerAdvanced, ColorSwatch, SignaturePad, SignatureRequest, WYSIWYGEditor, MarkdownRenderer, CodeHighlighter, CreditCardInput, CurrencyInput, CurrencyConverter, CurrencyRates
- **Builders**: FormBuilder, FormValidator, FormTemplate, SchemaValidator, FieldMapper, SurveyBuilder, QuizBuilder

### UI Components (`src/ui/`)
111 generic, reusable components. Key examples: Button, Card, Modal, Dialog, Drawer, Sheet, Tabs, Select, Input, Badge, Alert, Spinner, Popover, Tooltip, Table, Breadcrumb, Pagination, Progress, Checkbox, Switch, SkeletonLoader, InfiniteScroll, VirtualList, TreeView, TransferList, MasonryGrid, Confetti, TimerDisplay, VersionBadge, and more.

### Navigation (`src/navigation/`)
SmartLink, Link, ExternalLink, PreloadLink, BreadcrumbNav, Tabs, NavigationMenu, NavigationList, SideNav, Pagination, PaginationNav, Stepper, StepperNav, TableOfContents

### Data Display (`src/data-display/`)
Table, DataTable, DataGrid, PivotTable, SpreadsheetGrid, ColumnResize, CellEditor, List, VirtualList, TreeView, TransferList, Card, DashboardStatCard, Avatar, AvatarGroup, ProfileHeader, KeyValuePair, StatDisplay, EmptyState, NoContent, UserTable, TableReservation, ListingForm

### Charts (`src/charts/`)
BarChart, LineChart, PieChart, AreaChart, RadarChart, BubbleChart, ScatterPlot, TreeMap, SankeyDiagram, Sparkline, Heatmap, FunnelChart, BurndownChart, PerformanceChart, MetricComparison, Gauge, Progress, ProgressCircle, ProgressTracker

### Media (`src/media/`)
Image, ImageGallery, ImageComparison, ImageCropper, Lightbox, RetinaImage, VideoPlayer, VideoThumbnail, VideoEditor, VideoCall, LiveStream, AudioPlayer, AudioWaveform, WaveForm, VoiceRecorder, PodcastPlayer, MediaUploader, MediaPlaylist, PlaylistManager, QRCodeDisplay

### Modals & Overlays (`src/modals/`)
Modal, Dialog, ConfirmationDialog, TextInputModal, Drawer, Sheet, Popover, HoverCard, Tooltip

### Interactive (`src/interactive/`)
DragDrop, DragDropList, SortableGrid, NestedDrag, GestureDetector, SwipeActions, PinchZoom, DoubleTap, LongPress, RadialMenu, FocusTrap, ScrollSpy, PullToRefresh, InfiniteScroll

### Core (`src/core/`)
Breadcrumb, BreadcrumbSection, CodeBlock, CollapsibleDocumentationTopic, PromotionalBanner, TrackedButton, TrackedLink, LanguageSelector, StepList, ErrorBoundary, ErrorBoundaryLazy, SafeAppWrapper, SecurityProvider, OptimizedImage, MemoizedComponent, ThemeProvider/useTheme, ProtectedRoute, DetailErrorState, LanguageValidator, LocalizedLink

### Features (`src/features/`)
FeatureCard, FeatureGrid, CTASection

### KYC (`src/kyc/`)
KYCStatusBadge, KYCLevelCard, SumsubWebSDK

### Layout (`src/layout/`)
StandardPageLayout, PageHeader, MasterDetailLayout, MasterListItem, ScreenContainer, AspectFitView, LayoutProvider/ContentContainer, Footer (slot-based: FooterGrid, FooterBrand, FooterLinkSection, FooterBottom, etc.), Topbar (slot-based: TopbarLogo, TopbarNav, TopbarActions, TopbarMenuToggle, etc.)

### Optimization (`src/optimization/`)
PerformanceOptimizer, LoadingOptimizer, OptimizedRoutePreloader, CriticalPathOptimizer, performance monitoring (getPerformanceMonitor, initializePerformanceMonitoring), Web Vitals integration, advanced lazy loading, API optimization, environment detection, route preloading, security headers

### Dev Tools (`src/dev-tools/`)
PerformancePanel - draggable dev overlay with sections for Web Vitals, API metrics, bundle metrics, memory, and custom metrics

### Hooks (`src/hooks/`)
useClickOutside, useCodeLoader, useCopyToClipboard, useMultipleCopyToClipboard, useFormSubmission, useFormValidation, useToggle, useLocalizedNavigate, useRoutePerformance

### Utilities (`src/utils/`)
cn (clsx + tailwind-merge), formatFileSize/convertFileSize/parseFileSize, CSS optimization, image optimization, tree shaking helpers, lazy loading, navigation helpers, storage utilities, wallet/browser detection, error utilities, analytics utilities

## Development Commands

```bash
# Install dependencies
bun install

# Build the library (TypeScript + Vite)
bun run build

# Development mode with file watching
bun run dev

# Type checking only (no emit)
bun run type-check

# Linting (ESLint with TypeScript + Prettier)
bun run lint

# Formatting
bun run format
bun run format:check

# Run all tests (Vitest)
bun test

# Test with UI
bun run test:ui

# Run a single test file
bun test -- src/__tests__/button.test.tsx

# Pre-publish build
bun run prepublishOnly
```

## Architecture & Patterns

### Dual-Package Design System
This library depends on the separate `@sudobility/design` package (`../design_system`) for design tokens, colors, typography, and component variant definitions. The design system provides:
- **Variant functions** (`variants as v`): e.g. `v.button.primary.default()` returns Tailwind class strings
- **Design tokens**: Spacing (4px grid), typography scales, animation tokens
- **Color palette**: HSL CSS custom properties with dark mode support

### Component Styling Strategy
1. **`cn()` utility** (`src/lib/utils.ts`): Merges class names via `clsx` + `tailwind-merge` to handle Tailwind class conflicts
2. **`class-variance-authority` (CVA)**: Defines component variants with `cva()` for type-safe variant props
3. **Design system classes**: Applied from `@sudobility/design` variant functions
4. **Composition order**: `cn(cvaVariants, designSystemClass, userClassName)` -- base, then design system, then overrides

### Radix UI Primitives
Components use Radix UI for accessible, unstyled primitives:
- `@radix-ui/react-dialog` -- Modal, Dialog
- `@radix-ui/react-alert-dialog` -- ConfirmationDialog
- `@radix-ui/react-select` -- Select
- `@radix-ui/react-switch` -- Switch
- `@radix-ui/react-tabs` -- Tabs
- `@radix-ui/react-label` -- Label
- `@radix-ui/react-slot` -- Polymorphic `asChild` pattern (Button, etc.)

### Tailwind CSS Configuration
- Dark mode via `class` strategy (`darkMode: ["class"]`)
- HSL CSS custom property theming (`hsl(var(--primary))`, `hsl(var(--background))`, etc.)
- Container centered with 2rem padding, max 1400px
- Custom keyframes for accordion animations

### Theme System (`src/core/theme/`)
- `ThemeProvider` wraps the app, provides `useTheme()` hook
- Supports `Theme.LIGHT`, `Theme.DARK`, `Theme.SYSTEM`
- Configurable `FontSize` settings

### Slot-Based Layout Composition
Layout components (Footer, Topbar) use a slot pattern:
```tsx
<Footer>
  <FooterGrid>
    <FooterBrand />
    <FooterLinkSection />
  </FooterGrid>
  <FooterBottom>
    <FooterCopyright />
  </FooterBottom>
</Footer>
```

### i18n Support
- `react-i18next` and `i18next` as peer dependencies
- `useLocalizedNavigate` hook for language-prefixed routing
- `LanguageValidator`, `LocalizedLink` components in `src/core/i18n-routing/`

### Build Configuration
- **Vite 7** library mode with `@vitejs/plugin-react`
- Entry: `src/index.ts`
- Output: `dist/index.esm.js` (ES) and `dist/index.umd.js` (UMD)
- TypeScript declarations via `vite-plugin-dts`
- Path alias: `@/` maps to `src/`
- All peer dependencies externalized in Rollup config

### Testing Architecture
- **Vitest** with jsdom environment and React Testing Library
- 29 test files in `src/__tests__/`
- Setup file: `src/test/setup.ts`
- Coverage thresholds: 80% for branches, functions, lines, statements
- Global test APIs enabled (`describe`, `it`, `expect` without imports)

### ESLint Configuration
- Flat config (`eslint.config.js`) with `@typescript-eslint`, `react-hooks`, `react-refresh`, `prettier`
- Unused vars with `^_` ignore pattern
- `no-console` warning (allows `warn`/`error`)
- Prettier integration enforced as errors

## Common Tasks

### Adding a New Component

1. **Create the component file** in the appropriate directory:
   - Generic UI component: `src/ui/my-component.tsx`
   - Primitive (layout/typography/feedback): `src/primitives/<subcategory>/my-component.tsx`
   - Form input: `src/forms/inputs/my-component.tsx` or `src/forms/advanced/my-component.tsx`
   - Data display: `src/data-display/my-component.tsx`
   - Other category: the matching `src/<category>/my-component.tsx`

2. **Follow the component pattern** (forwardRef + cn + CVA):
   ```tsx
   import * as React from 'react';
   import { cva, type VariantProps } from 'class-variance-authority';
   import { cn } from '../lib/utils';

   const myComponentVariants = cva('base-classes', {
     variants: { variant: { default: '', primary: '' } },
     defaultVariants: { variant: 'default' },
   });

   export interface MyComponentProps
     extends React.HTMLAttributes<HTMLDivElement>,
       VariantProps<typeof myComponentVariants> {}

   const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
     ({ className, variant, ...props }, ref) => (
       <div
         ref={ref}
         className={cn(myComponentVariants({ variant }), className)}
         {...props}
       />
     )
   );
   MyComponent.displayName = 'MyComponent';

   export { MyComponent, myComponentVariants };
   ```

3. **Export from the category index** (e.g., `src/ui/index.ts`, `src/primitives/feedback/index.ts`)

4. **Verify it reaches the main barrel** -- ensure the category index is re-exported from `src/index.ts`

5. **Add tests** in `src/__tests__/my-component.test.tsx`:
   ```tsx
   import { render, screen } from '@testing-library/react';
   import { MyComponent } from '../ui/my-component';

   describe('MyComponent', () => {
     it('renders correctly', () => {
       render(<MyComponent>Hello</MyComponent>);
       expect(screen.getByText('Hello')).toBeInTheDocument();
     });
   });
   ```

6. **Run checks**: `bun run type-check && bun run lint && bun test`

### Using the Design System
```tsx
import { cn } from '../lib/utils';
import { variants as v } from '@sudobility/design';

// Apply design system variant classes
const classes = cn(v.button.primary.default(), 'additional-tailwind-classes');
```

### Working with Radix UI
```tsx
import * as SwitchPrimitive from '@radix-ui/react-switch';

// Wrap Radix primitives with Tailwind styling and cn()
const Switch = React.forwardRef<...>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root className={cn('base-classes', className)} ref={ref} {...props}>
    <SwitchPrimitive.Thumb className={cn('thumb-classes')} />
  </SwitchPrimitive.Root>
));
```

## Peer & Key Dependencies

### Peer Dependencies (required by consumers)
| Package | Version |
|---------|---------|
| `react` / `react-dom` | >= 18.0.0 |
| `@sudobility/design` | ^1.1.18 |
| `@sudobility/types` | ^1.9.51 |
| `@radix-ui/react-dialog` | >= 1.0.0 |
| `@radix-ui/react-alert-dialog` | >= 1.0.0 |
| `@radix-ui/react-select` | >= 2.0.0 |
| `@radix-ui/react-switch` | >= 1.0.0 |
| `@radix-ui/react-tabs` | >= 1.0.0 |
| `@radix-ui/react-label` | >= 2.0.0 |
| `@radix-ui/react-slot` | >= 1.0.0 |
| `@heroicons/react` | >= 2.0.0 |
| `class-variance-authority` | >= 0.7.0 |
| `clsx` | >= 2.0.0 |
| `tailwind-merge` | >= 2.0.0 |
| `react-router-dom` | >= 6.0.0 |
| `react-i18next` / `i18next` | >= 14.0.0 / >= 23.0.0 |
| `web-vitals` | >= 3.0.0 |

### Key Dev Dependencies
| Package | Purpose |
|---------|---------|
| `vite` 7.x | Library bundling |
| `typescript` 5.9+ | Type checking and declarations |
| `vitest` 3.x | Test runner |
| `@testing-library/react` 16.x | Component testing |
| `tailwindcss` 4.x | Utility-first CSS |
| `eslint` 9.x | Linting (flat config) |
| `prettier` 3.x | Code formatting |
| `vite-plugin-dts` | TypeScript declaration generation |

### Related Packages (separate repos)
Domain-specific components have been extracted into their own packages:
- `@sudobility/web3-components`
- `@sudobility/email-components`
- `@sudobility/security-components`
- `@sudobility/documents-components`
- `@sudobility/visualization-components`
- `@sudobility/project-management-components`
- `@sudobility/scheduling-components`
- `@sudobility/analytics-components`
- And 25+ more specialized packages
