# @sudobility/components

A comprehensive React component library and design system for building modern web applications.

## 🚀 Version 3.0.0 - Reorganized Architecture

**Major Update**: Components are now organized into logical categories with specialized domain packages available separately.

## Features

- 🎨 **Complete Design System** - Professional design tokens, colors, typography
- 🧩 **220+ UI Components** - Organized into 8 categories (primitives, forms, navigation, charts, media, modals, data-display, interactive)
- ♿ **Accessibility First** - Built with Radix UI primitives
- 🌙 **Dark Mode Support** - Full dark/light theme support
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **TypeScript** - Fully typed with excellent IntelliSense
- 🎭 **Tailwind CSS** - Utility-first styling with customization
- ⚡ **Performance Optimized** - Tree-shakeable and lightweight
- 📦 **Modular Packages** - Domain-specific components in separate packages

## Installation

### Core Library

```bash
npm install @sudobility/components @sudobility/design
```

### Specialized Packages (Optional)

```bash
# Web3 & Blockchain Components
npm install @sudobility/web3-components

# Email Marketing Components
npm install @sudobility/email-components

# Fitness & Health Tracking
npm install @sudobility/fitness-components

# Real Estate & Property Management
npm install @sudobility/realestate-components
```

### Required Peer Dependencies

```bash
npm install react@^18.0.0 react-dom@^18.0.0 \
  @heroicons/react@^2.2.0 \
  @radix-ui/react-alert-dialog@^1.1.0 \
  @radix-ui/react-dialog@^1.1.0 \
  @radix-ui/react-label@^2.1.0 \
  @radix-ui/react-select@^2.2.0 \
  @radix-ui/react-slot@^1.2.0 \
  @radix-ui/react-switch@^1.2.0 \
  @radix-ui/react-tabs@^1.1.0 \
  class-variance-authority@^0.7.0 \
  clsx@^2.1.1 \
  tailwind-merge@^3.0.0
```

## Component Categories

### Primitives
Layout, typography, and feedback components - the building blocks.
```tsx
import { Button, Card, Alert, Spinner, Badge } from '@sudobility/components';
```

### Forms
Comprehensive form components for user input.
```tsx
import { Input, Select, Checkbox, DatePicker } from '@sudobility/components';
```

### Navigation
Links, menus, breadcrumbs, tabs, and pagination.
```tsx
import { SmartLink, Tabs, Breadcrumb, Pagination } from '@sudobility/components';
```

### Data Display
Tables, lists, cards, and data visualization.
```tsx
import { DataTable, Avatar, Card, KeyValuePair } from '@sudobility/components';
```

### Charts
Data visualization and charting components.
```tsx
import { PieChart, BarChart, LineChart, ProgressBar } from '@sudobility/components';
```

### Media
Image, video, and audio components.
```tsx
import { ImageGallery, VideoPlayer, AudioPlayer } from '@sudobility/components';
```

### Modals
Dialogs, drawers, popovers, and tooltips.
```tsx
import { Modal, Dialog, Popover, Tooltip } from '@sudobility/components';
```

### Interactive
Drag & drop, gestures, and interactive behaviors.
```tsx
import { DragDrop, SwipeActions, PullToRefresh } from '@sudobility/components';
```

## Quick Start

```tsx
import { Button, Card, Input } from '@sudobility/components';

function App() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Specialized Packages

### Web3 Components
```tsx
import { WalletConnect, AddressLabel, NFTGallery } from '@sudobility/web3-components';
```

### Email Components
```tsx
import { EmailCampaign, EmailAnalytics } from '@sudobility/email-components';
```

### Fitness Components
```tsx
import { StepCounter, WorkoutLog, CalorieTracker } from '@sudobility/fitness-components';
```

### Real Estate Components
```tsx
import { PropertyCard, MortgageCalc, VirtualTour } from '@sudobility/realestate-components';
```

## Migration from v2.x

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed migration instructions.

**Key Changes:**
- Component imports remain the same (backward compatible)
- New organized structure under the hood
- Specialized components moved to separate packages
- Tree-shaking improvements for smaller bundle sizes

## Documentation

- **Full Documentation**: [CLAUDE.md](./CLAUDE.md) - Complete project documentation
- **Component Map**: [COMPONENT_MIGRATION_MAP.md](./COMPONENT_MIGRATION_MAP.md) - All components categorized
- **Migration Guide**: [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Upgrade from v2.x

## Package Structure

```
@sudobility/components/
├── primitives/     # Layout, typography, feedback
├── forms/          # Inputs, advanced, builders
├── navigation/     # Links, menus, tabs
├── data-display/   # Tables, lists, cards
├── charts/         # Data visualization
├── media/          # Images, video, audio
├── modals/         # Dialogs, popovers, tooltips
├── interactive/    # Drag & drop, gestures
├── core/           # Core utilities
└── hooks/          # Custom React hooks

Specialized Packages:
├── @sudobility/web3-components
├── @sudobility/email-components
├── @sudobility/fitness-components
└── @sudobility/realestate-components
```

## Development

```bash
# Build the library
npm run build

# Development mode with watch
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Testing
npm test
```

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## License

MIT © John Q Huang

## Links

- **GitHub**: [https://github.com/sudobility/components](https://github.com/sudobility/components)
- **Issues**: [https://github.com/sudobility/components/issues](https://github.com/sudobility/components/issues)
- **npm**: [@sudobility/components](https://www.npmjs.com/package/@sudobility/components)
