# @johnqh/mail-box-components

A comprehensive React component library and design system for building modern web applications.

## Features

- 🎨 **Complete Design System** - Professional design tokens, colors, typography
- 🧩 **20+ UI Components** - Forms, modals, cards, alerts, and more
- ♿ **Accessibility First** - Built with Radix UI primitives
- 🌙 **Dark Mode Support** - Full dark/light theme support
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **TypeScript** - Fully typed with excellent IntelliSense
- 🎭 **Tailwind CSS** - Utility-first styling with customization
- ⚡ **Performance Optimized** - Tree-shakeable and lightweight

## Installation

### Quick Start

```bash
npm install @johnqh/mail-box-components
```

### Required Peer Dependencies

The library requires these peer dependencies to be installed:

```bash
npm install react@^18.0.0 react-dom@^18.0.0 \
  @heroicons/react@^2.0.0 \
  @radix-ui/react-alert-dialog@^1.0.0 \
  @radix-ui/react-dialog@^1.0.0 \
  @radix-ui/react-label@^2.0.0 \
  @radix-ui/react-select@^2.0.0 \
  @radix-ui/react-slot@^1.0.0 \
  @radix-ui/react-switch@^1.0.0 \
  @radix-ui/react-tabs@^1.0.0 \
  class-variance-authority@^0.7.0 \
  clsx@^2.1.1 \
  tailwind-merge@^3.0.0
```

### Optional Dependencies

Install these only if you need specific features:

```bash
# For internationalization (LanguageSelector, CodeBlock)
npm install react-i18next@^16.0.0 i18next@^25.0.0

# For routing (SmartLink, Breadcrumb)
npm install react-router-dom@^7.0.0

# For SEO/Meta tags (AIMeta)
npm install react-helmet-async@^2.0.0

# For social sharing (Breadcrumb sharing feature)
npm install react-share@^5.0.0

# For performance monitoring
npm install web-vitals@^5.0.0

# For additional icons
npm install lucide-react@^0.400.0
```

### Complete Installation (All Features)

To install everything at once:

```bash
npm install @johnqh/mail-box-components \
  react@^18.0.0 react-dom@^18.0.0 \
  @heroicons/react@^2.0.0 \
  @radix-ui/react-alert-dialog@^1.0.0 \
  @radix-ui/react-dialog@^1.0.0 \
  @radix-ui/react-label@^2.0.0 \
  @radix-ui/react-select@^2.0.0 \
  @radix-ui/react-slot@^1.0.0 \
  @radix-ui/react-switch@^1.0.0 \
  @radix-ui/react-tabs@^1.0.0 \
  class-variance-authority@^0.7.0 \
  clsx@^2.1.1 \
  tailwind-merge@^3.0.0 \
  react-i18next@^16.0.0 \
  i18next@^25.0.0 \
  react-router-dom@^7.0.0 \
  react-helmet-async@^2.0.0 \
  react-share@^5.0.0 \
  web-vitals@^5.0.0 \
  lucide-react@^0.400.0
```

> **Migrating from v1.x?** See [MIGRATION.md](./MIGRATION.md) for detailed upgrade instructions.

## Usage

```tsx
import { Button, Card, Alert } from '@johnqh/mail-box-components'

function App() {
  return (
    <div>
      <Card>
        <Button variant="primary">Click me</Button>
        <Alert variant="success">Success message</Alert>
      </Card>
    </div>
  )
}
```

## Components

### Form Controls
- `Button` - Feature-rich button with variants and animations
- `Input` - Form input with validation states
- `Label` - Accessible form labels
- `Select` - Dropdown select component
- `Switch` - Toggle switch component
- `Tabs` - Tabbed interface component

### Layout & Display
- `Card` - Flexible card component
- `Modal` - Accessible modal dialogs
- `Alert` - Alert messages with multiple states
- `Spinner` - Loading spinners
- `LoadingState` - Comprehensive loading states
- `EmptyState` - Empty state placeholders

### Navigation
- `Breadcrumb` - SEO-optimized breadcrumbs
- `ConfirmationDialog` - Confirmation prompts

### Typography
- `Typography` - Text components (PageTitle, SectionTitle, BodyText, TextLink)

## Design System

The library includes a complete design system with:

- **Colors** - Semantic color palette with dark mode support
- **Typography** - Consistent text styles and hierarchy
- **Spacing** - Standardized spacing scale
- **Shadows** - Elevation system
- **Tokens** - Design tokens for consistency

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## License

MIT