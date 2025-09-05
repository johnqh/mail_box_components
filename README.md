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

```bash
npm install @johnqh/mail-box-components
```

### Peer Dependencies

Install the required peer dependencies:

```bash
npm install react react-dom @heroicons/react @radix-ui/react-alert-dialog @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-select @radix-ui/react-switch @radix-ui/react-tabs clsx tailwind-merge
```

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