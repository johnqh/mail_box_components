# @sudobility/components

Comprehensive React component library providing 110+ reusable UI components built on Radix UI primitives, styled with Tailwind CSS and the `@sudobility/design` token system. Ships as ES module and UMD bundles with TypeScript declarations. Domain-specific components are organized into 48 sub-packages under `packages/`.

## Installation

```bash
bun add @sudobility/components @sudobility/design
```

Peer dependencies: `react`, `react-dom`, `@radix-ui/react-*`, `@heroicons/react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `react-router-dom`, `react-i18next`, `i18next`, `web-vitals`.

## Usage

```tsx
import { Button, Card, Input, Modal, DataTable, Tabs } from '@sudobility/components';
import { ThemeProvider, useTheme, Theme } from '@sudobility/components';
import { cn } from '@sudobility/components';

function App() {
  return (
    <ThemeProvider defaultTheme={Theme.SYSTEM}>
      <Card>
        <Input placeholder="Enter your name" />
        <Button variant="primary">Submit</Button>
      </Card>
    </ThemeProvider>
  );
}
```

## API

### Component Categories

- **Primitives** -- Layout (Box, Flex, Grid, Stack, Section), Typography (Text, Heading, Code), Feedback (Spinner, Alert, Badge, Toast, StatusIndicator)
- **Forms** -- Inputs (Input, Select, Checkbox, Switch, DateInput, TagInput, OTPInput), Advanced (DateRangePicker, ColorPicker, WYSIWYG, SignaturePad), Builders (FormBuilder, SurveyBuilder)
- **Data Display** -- DataTable, DataGrid, PivotTable, Avatar, StatDisplay, KeyValuePair, TreeView
- **Charts** -- BarChart, LineChart, PieChart, RadarChart, Heatmap, Gauge, Sparkline
- **Media** -- ImageGallery, VideoPlayer, AudioPlayer, QRCodeDisplay
- **Modals** -- Modal, Dialog, Drawer, Sheet, Popover, Tooltip
- **Interactive** -- DragDrop, SwipeActions, PinchZoom, ScrollSpy, InfiniteScroll
- **Navigation** -- SmartLink, Tabs, Pagination, Stepper, BreadcrumbNav
- **Core** -- ThemeProvider, ProtectedRoute, SafeAppWrapper, ErrorBoundary, PerformancePanel

### Sub-Packages (48 domain-specific packages in `packages/`)

auth, email, web3, subscription, marketing, devops, finance, ecommerce, healthcare, and 39 more.

## Development

```bash
bun install
bun run build              # TypeScript + Vite library build
bun run dev                # Watch mode
bun run type-check         # TypeScript checking
bun run lint               # ESLint
bun test                   # Vitest (80% coverage threshold)
bun run prepublishOnly     # Pre-publish build
```

## Related Packages

- `@sudobility/design` -- design tokens, colors, typography, variants (peer dependency)
- `@sudobility/types` -- shared TypeScript types (peer dependency)
- `@sudobility/components-rn` -- React Native port of this library

## License

Public (npm)
