# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2025-11-22

### 🎉 Major Release - Reorganized Architecture

This is a **major version** with a complete reorganization of the component library for better maintainability and scalability.

### ✨ Added

#### New Package Structure
- **Primitives** (50 components): Layout, typography, and feedback building blocks
- **Forms** (60 components): Inputs, advanced inputs, and form builders
- **Navigation** (17 components): Links, breadcrumbs, tabs, pagination
- **Data Display** (25 components): Tables, lists, cards, stats
- **Charts** (20 components): Data visualization components
- **Media** (19 components): Image, video, audio components
- **Modals** (10 components): Dialogs, drawers, popovers, tooltips
- **Interactive** (15 components): Drag & drop, gestures, interactions

#### Specialized Packages (New!)
- **@sudobility/web3-components** v1.0.0 - Web3 & blockchain components (9 components)
- **@sudobility/email-components** v1.0.0 - Email marketing components (9 components)
- **@sudobility/fitness-components** v1.0.0 - Fitness tracking components (15 components)
- **@sudobility/realestate-components** v1.0.0 - Real estate components (12 components)

### 🔄 Changed

- **Component Organization**: All 220+ components reorganized into logical categories
- **Import Paths**: Imports now use organized category structure internally
- **Build Output**: Optimized bundle sizes with better tree-shaking
  - ES modules: 965KB (160KB gzipped)
  - UMD: 655KB (125KB gzipped)
- **TypeScript**: Updated tsconfig to include all new directories
- **Dependencies**: Updated to latest peer dependency versions

### 🗑️ Removed

- **Removed**: `src/ui/` flat structure - replaced with organized categories
- **Extracted**: Domain-specific components moved to specialized packages

### 🔧 Fixed

- Fixed duplicate exports (TrackedLink, ImageCropper, MediaUploader, TableOfContents)
- Fixed import path resolution issues with new structure
- Fixed module resolution for cross-category imports
- Updated all component imports to use local or aliased paths

### 📚 Documentation

- Added comprehensive README.md with new structure
- Added MIGRATION_GUIDE.md for upgrading from v2.x
- Updated CLAUDE.md with architecture details
- Added COMPONENT_MIGRATION_MAP.md listing all components

### ⚠️ Breaking Changes

**For most users: NO breaking changes** - All exports remain backward compatible.

However, if you were:
- Importing from internal paths (e.g., `@sudobility/components/dist/ui/button`)
- Using specialized domain components (Web3, Email, Fitness, Real Estate)

Then you'll need to:
- Update imports to use main package export
- Install specialized packages separately if needed

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for details.

### 🎯 Migration Path

```bash
# v2.x (still works)
import { Button, Modal } from '@sudobility/components';

# v3.0 (recommended - same as v2.x!)
import { Button, Modal } from '@sudobility/components';

# v3.0 specialized packages (new!)
import { WalletConnect } from '@sudobility/web3-components';
import { EmailCampaign } from '@sudobility/email-components';
```

### 📦 Package Information

- **Main Package**: @sudobility/components@3.0.0
- **Design System**: @sudobility/design@^1.1.3 (peer dependency)
- **React**: ^18.0.0 || ^19.0.0 (peer dependency)

---

## [2.0.34] - 2025-11-21

### Changed
- Updated @sudobility dependencies
- Minor version bump

## [2.0.33] - 2025-11-21

### Changed
- Updated @sudobility dependencies
- Minor version bump

## [2.0.32] - 2025-11-21

### Changed
- Updated @sudobility dependencies
- Minor version bump

## [2.0.31] - 2025-11-21

### Changed
- Updated @sudobility dependencies
- Minor version bump

## [2.0.30] - 2025-11-20

### Added
- Enhanced share functionality with Discord, Messages, Email, and More options

---

## Previous Versions

For changes in versions 2.0.29 and earlier, please refer to the git history.

[3.0.0]: https://github.com/sudobility/components/compare/v2.0.34...v3.0.0
[2.0.34]: https://github.com/sudobility/components/compare/v2.0.33...v2.0.34
[2.0.33]: https://github.com/sudobility/components/compare/v2.0.32...v2.0.33
