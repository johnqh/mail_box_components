# CLAUDE.md

This file provides comprehensive guidance for AI assistants (Claude Code, GitHub Copilot, Cursor, etc.) when working with this repository.

## Project Overview

This is a React component library (`@sudobility/components`) built with TypeScript, Vite, and Tailwind CSS. It provides 40+ reusable UI components based on Radix UI primitives, with design system functionality imported from the separate `@sudobility/design` package.

**Package**: `@sudobility/components`
**Version**: 4.0.135
**Type**: ES Module + UMD
**Framework**: React 18/19, TypeScript 5.9+, Vite 7.x

## Package Manager

**This project uses Bun as the package manager.** Always use `bun` commands instead of `npm`:

```bash
# Install dependencies
bun install

# Run any script
bun run <script-name>
```

## Common Development Commands

```bash
# Build the library (TypeScript compilation + Vite bundling)
bun run build

# Development mode with watch
bun run dev

# Type checking without emitting files
bun run type-check

# Linting (ESLint with TypeScript rules)
bun run lint

# Testing (Vitest with React Testing Library)
bun test
bun run test:ui

# Run single test file
bun test -- src/__tests__/button.test.tsx

# Package preparation
bun run prepublishOnly
```

## Architecture

### Multi-Package Structure
This project uses a **dual-package architecture**:

1. **`@sudobility/components`** (this repo) - UI components and library
2. **`@sudobility/design`** (`../design_system`) - Design tokens, colors, typography, variants

The design system is a peer dependency and used throughout for consistent styling.

### Source Structure
- `src/index.ts` - Main library entry point with comprehensive exports
- `src/lib/` - Core utilities (`cn`, theme helpers, component helpers)
- `src/ui/` - UI component implementations (buttons, forms, modals, etc.)
- `src/components/` - Specialized components and layout components
- `src/hooks/` - Custom React hooks
- `src/utils/` - Performance, SEO, and optimization utilities
- `src/types/` - TypeScript type definitions
- `src/platforms/` - Platform-specific implementations

### Component Categories

**Core UI Components** (`src/ui/`):
- Form controls: Button, Input, Select, Switch, Tabs, Label
- Layout: Card, Modal, Alert, Spinner, Section, PageContainer
- Navigation: SmartLink, ConfirmationDialog, TableOfContents
- Typography: PageTitle, SectionTitle, BodyText, TextLink
- Status: StatusBadge, StatusIndicator, ChainBadge, SectionBadge

**Specialized Components** (`src/components/`):
- StandardPageLayout, FeatureGrid, StepList
- Performance: PerformanceOptimizer, LoadingOptimizer
- SEO: AIMeta, SemanticHTML
- Security: SafeAppWrapper, SecurityProvider, ErrorBoundary

**Layout Components** (`src/layout/`):
- MasterDetailLayout: Responsive master-detail container with mobile toggle
- StandardPageLayout: Standard page wrapper with header/footer
- PageHeader: Reusable page header component

### Build Configuration
- **Vite** - Library bundling with ES modules and UMD formats
- **TypeScript** - Strict compilation with declaration files
- **Tailwind CSS** - Utility-first styling
- **Path Alias** - `@/` maps to `src/`
- **External Dependencies** - React, Radix UI, Heroicons externalized

### Testing Architecture
- **Vitest** - Test runner with React Testing Library
- **Comprehensive Coverage** - 503 tests across 30 test files
- **Component Testing** - Every UI component has dedicated test coverage
- **Utility Testing** - Performance, SEO, and optimization utilities tested

## Key Implementation Details

### Design System Integration
The design system is imported from `@sudobility/design` and includes:
- **Colors** - Semantic color palette with dark mode support
- **Design Tokens** - Spacing, typography, animation tokens (4px grid)
- **Typography** - Text variants and semantic typography system
- **Variants** - Component style variants and utilities
- **UI Utilities** - Layout patterns and common design patterns

### Component Styling Strategy
- Uses `cn()` utility for conditional class merging (clsx + tailwind-merge)
- Component variants defined through design system tokens
- Accessibility-first with Radix UI primitives
- Dark mode support throughout
- Responsive design with mobile-first approach

### Performance & Optimization Features
- **Tree-shakeable exports** - Import only what you need
- **Lazy loading** - Advanced lazy loading for components and routes
- **Performance monitoring** - Built-in performance tracking utilities
- **SEO optimization** - Structured data, meta tags, semantic HTML
- **AI training metadata** - Enhanced for AI-assisted development

### Library Build Output
- ES modules (`dist/index.esm.js`) - ~843KB, ~180KB gzipped
- UMD (`dist/index.umd.js`) - ~580KB, ~147KB gzipped
- TypeScript declarations with source maps
- Optimized for bundler and direct browser use

## Development Workflow

### Adding New Components
1. Create component in appropriate directory (`src/ui/` for UI, `src/components/` for specialized)
2. Add comprehensive tests in `src/__tests__/[component-name].test.tsx`
3. Export from respective index files and main `src/index.ts`
4. Update TypeScript types if needed
5. Ensure accessibility with Radix UI primitives where applicable

### Working with Design System
- Design system is the `@sudobility/design` package
- Import design tokens: `import { designTokens, colors } from '@sudobility/design'`
- Use `cn()` utility for conditional styling: `cn('base-classes', condition && 'conditional-class')`

### Testing Guidelines
- Every component requires test coverage
- Use React Testing Library for component tests
- Test user interactions, accessibility, and edge cases
- Performance utilities have dedicated test suites
- Run specific tests: `bun test -- src/__tests__/button.test.tsx`

### Performance Considerations
- Components use lazy loading patterns in `src/utils/lazy-loading.tsx`
- Optimization utilities in `src/utils/optimization/` directory
- Tree-shaking friendly exports structure
- Built-in performance monitoring for production use

### AI-Assisted Development Features
- Enhanced with AI training metadata (`src/utils/aiTrainingMetadata.ts`)
- Semantic HTML structure for better AI understanding
- Comprehensive TypeScript types for IntelliSense
- Well-documented component APIs and props
- Consistent naming conventions and patterns