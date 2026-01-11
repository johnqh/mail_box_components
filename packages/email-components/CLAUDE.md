# CLAUDE.md

This file provides guidance for AI assistants working with this repository.

## Project Overview

**Package**: `@sudobility/email-components`
**Version**: 2.0.6
**Type**: ES Module + UMD

Email marketing and management UI components for React.

### Components
- `SubscriberList` - Email subscriber management
- `ABTestEmail` - A/B testing for emails
- `ContactCard` - Contact information display
- `EmailAccountsList` - Email accounts listing
- `EmailAnalytics` - Email analytics dashboard
- `EmailCampaign` - Campaign management
- `EmailInputGroup` - Email input form group
- `EmailTemplate` - Email template builder
- `FreeEmailBanner` - Promotional banner
- `SubscriptionPlan` - Subscription plan display

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
bun run test:watch

# Run single test file
bun test -- src/__tests__/<test-file>.test.tsx
```

## Architecture

### Source Structure
- `src/lib/` - Core utilities and helper functions
- `src/index.ts` - Main entry point with all exports

### Build Configuration
- **Vite** - Library bundling with ES modules and UMD formats
- **TypeScript** - Strict compilation with declaration files
- **Tailwind CSS** - Utility-first styling
- **Path Alias** - `@/` maps to `src/`

### Dependencies
- **@sudobility/components** - Shared UI components
- **@sudobility/design** - Design tokens, colors, typography
- **React 18/19** - UI framework
- **Radix UI** - Accessible UI primitives

## Key Implementation Details

### Component Styling Strategy
- Uses `cn()` utility for conditional class merging (clsx + tailwind-merge)
- Component variants defined through design system tokens
- Accessibility-first with Radix UI primitives
- Dark mode support throughout
- Responsive design with mobile-first approach

### Testing Guidelines
- Every component should have test coverage
- Use React Testing Library for component tests
- Test user interactions, accessibility, and edge cases
- Run tests: `bun test`

### Adding New Components
1. Create component in `src/` or `src/components/`
2. Add tests in `src/__tests__/`
3. Export from `src/index.ts`
4. Ensure accessibility with Radix UI primitives where applicable

## AI-Assisted Development Notes

- All components use TypeScript with strict types for better IntelliSense
- Consistent naming conventions: PascalCase for components, camelCase for utilities
- Props interfaces are exported alongside components
- Use `cn()` utility for conditional styling: `cn('base-classes', condition && 'conditional-class')`
