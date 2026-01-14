# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-10-10

### 🚨 BREAKING CHANGES

This is a major release with breaking changes to the dependency structure. See [MIGRATION.md](./MIGRATION.md) for detailed upgrade instructions.

#### Dependency Restructuring

All dependencies (except `@johnqh/design_system`) have been moved to `peerDependencies` for better bundle size optimization and flexibility.

**Previously bundled, now peer dependencies:**
- `@heroicons/react` - Required
- `@radix-ui/react-*` (7 packages) - Required
- `class-variance-authority` - Required
- `clsx` - Required
- `tailwind-merge` - Required
- `react-helmet-async` - Optional
- `react-i18next` - Optional
- `i18next` - Optional
- `react-router-dom` - Optional
- `react-share` - Optional
- `web-vitals` - Optional

**Migration Required:**
Consumers must now install peer dependencies manually. See installation instructions in [README.md](./README.md).

### ✨ Added

- Added `peerDependenciesMeta` for optional dependencies
- Added comprehensive [MIGRATION.md](./MIGRATION.md) guide
- Added detailed installation instructions in README
- Added component-specific dependency documentation

### 🎯 Changed

- **BREAKING:** Moved UI library dependencies to peerDependencies
- **BREAKING:** Moved optional feature dependencies to optional peerDependencies
- Updated vite.config.ts to externalize all peer dependencies
- Updated README.md with new installation instructions
- Reduced production dependencies to only `@johnqh/design_system`

### 📦 Performance

- **Bundle Size Reduction:**
  - ES modules: 714.79 kB → 603.45 kB (15.6% reduction)
  - ES gzipped: 153.95 kB → 116.50 kB (24.3% reduction)
  - UMD: 516.19 kB → 436.22 kB (15.5% reduction)
  - UMD gzipped: 124.66 kB → 93.00 kB (25.4% reduction)
- Improved tree-shaking effectiveness
- Reduced npm install size (19 fewer bundled dependencies)
- Faster installation time

### 🔧 Fixed

- Code formatting in LoadingOptimizer.tsx

---

## [1.6.9] - 2025-10-10

### 📦 Changed

- Updated `@johnqh/design_system` from 1.0.23 to 1.0.24
- Updated `i18next` from 25.5.3 to 25.6.0

### 🔧 Fixed

- Fixed code formatting issues

---

## [1.6.8] - 2025-10-10

### 🔧 Fixed

- Resolved CI/CD lint and test errors from dependency updates

---

## [1.6.7] - Previous Release

For older releases, please refer to the [GitHub releases page](https://github.com/johnqh/mail-box-components/releases).

---

## Migration Guides

- [Migrating from v1.x to v2.0.0](./MIGRATION.md)

## Links

- [Repository](https://github.com/johnqh/mail-box-components)
- [Issues](https://github.com/johnqh/mail-box-components/issues)
- [NPM Package](https://www.npmjs.com/package/@johnqh/mail-box-components)
