# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React component library and design system (`@johnqh/mail-box-components`) built with TypeScript, Vite, and Tailwind CSS. It provides reusable UI components based on Radix UI primitives with a comprehensive design token system.

## Common Development Commands

```bash
# Build the library (TypeScript compilation + Vite bundling)
npm run build

# Development mode with watch
npm run dev

# Type checking without emitting files
npm run type-check

# Linting (ESLint with TypeScript rules)
npm run lint

# Testing (Vitest)
npm test
npm run test:ui

# Package preparation
npm run prepublishOnly
```

## Architecture

### Source Structure
- `src/index.ts` - Main library entry point
- `src/lib/utils.ts` - Utilities (primarily `cn` for class merging)
- `src/design-system/` - Complete design token system
- `src/components/` - UI components (currently disabled in exports)

### Design System Architecture
The design system is the core of this library, organized into:

- **Colors** (`colors.ts`) - Semantic color palette with dark mode support
- **Design Tokens** (`tokens.ts`) - Comprehensive spacing, typography, animation, and layout tokens
- **Typography** (`typography.ts`) - Text variants and semantic typography
- **Variants** (`variants.ts`) - Component style variants

### Build Configuration
- **Vite** - Library bundling with ES modules and UMD formats
- **TypeScript** - Strict compilation with declaration files
- **Tailwind CSS** - Utility-first styling with CSS custom properties
- **Path Alias** - `@/` maps to `src/`

### Dependencies
- **Peer Dependencies**: React, Radix UI components, Heroicons, clsx, tailwind-merge
- **External Bundle**: All peer dependencies are externalized in build
- **Design Tokens**: Uses Tailwind CSS custom properties for theming

## Key Implementation Details

### Component Export Strategy
Currently, components are disabled in the main export (`src/index.ts:18`) while dependency issues are resolved. The library primarily exports the design system and utilities.

### Design Token System
The design tokens in `src/design-system/tokens.ts` provide a comprehensive system including:
- Spacing scale based on 4px grid
- Semantic typography with size/weight/leading combinations
- Animation timings and easing functions
- Z-index layering system
- Responsive grid patterns
- Flex utility combinations

### Styling Approach
- Uses `cn()` utility for conditional class merging (clsx + tailwind-merge)
- CSS custom properties for theme variables
- Semantic color system with HSL values
- Component variants defined through design tokens

### Library Build
- Outputs ES modules (`index.esm.js`) and UMD (`index.umd.js`)
- TypeScript declarations with source maps
- Tree-shakeable exports
- Optimized for both bundler and direct browser use