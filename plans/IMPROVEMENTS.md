# Improvement Plans for @sudobility/components

## Priority 1: Critical / High Impact

### 1.1 Add `@sudobility/design` to Vite externals
**Problem**: The `@sudobility/design` package is a peer dependency but is NOT listed in `vite.config.ts` `rollupOptions.external`. This means it may be bundled into the output, increasing bundle size and potentially causing version conflicts for consumers.
**Fix**: Add `'@sudobility/design'` and `'@sudobility/types'` to the external array in `vite.config.ts`.

### 1.2 Increase test coverage
**Problem**: Only 29 test files for 413 source files (roughly 7% file coverage). Many core components, hooks, and utilities lack tests entirely. The coverage threshold is set at 80% but actual coverage may not meet this.
**Fix**: Prioritize testing for:
- All hooks (`useFormValidation`, `useFormSubmission`, `useToggle`, `useClickOutside`)
- Core UI components (Button, Card, Modal, Dialog, Sheet, Tabs)
- Utility functions (`formatFileSize`, `convertFileSize`, `parseFileSize`)
- Toast system (context, hook, container)

### 1.3 Remove duplicate component definitions
**Problem**: Some components exist in both `src/ui/` (flat) and structured directories (`src/primitives/`, `src/forms/`, `src/navigation/`, etc.). For example, there are separate `src/ui/breadcrumb.tsx` and `src/navigation/` breadcrumb exports. This can cause barrel export conflicts and tree-shaking issues.
**Fix**: Audit all `src/ui/` components against category directories. Remove duplicates and ensure each component has a single source of truth.

## Priority 2: Important / Medium Impact

### 2.1 Consistent JSDoc coverage
**Problem**: JSDoc documentation is inconsistent across the codebase. Some files (hooks, utilities) have excellent documentation while many UI components have none.
**Fix**: Add `@fileoverview`, `@param`, `@returns`, and `@example` JSDoc tags to all exported components, interfaces, and functions. Start with the most-used components (Button, Card, Input, Alert, Badge, Modal, Dialog).

### 2.2 Consolidate the `src/ui/index.ts` barrel
**Problem**: The main `src/index.ts` imports from both `src/ui/` (individual file exports) and category directories. The `src/ui/index.ts` barrel file exists but may not be used consistently.
**Fix**: Ensure `src/ui/index.ts` is the single barrel for all UI components and that `src/index.ts` re-exports from it rather than individual files.

### 2.3 Add Storybook or component documentation site
**Problem**: With 110+ components, there is no visual documentation or playground for consumers to explore the library.
**Fix**: Add Storybook with stories for each component category. This also serves as visual regression testing.

### 2.4 Version alignment for sub-packages
**Problem**: 48 sub-packages in `packages/` each have their own version. It is unclear if there is a consistent versioning strategy or automated release process.
**Fix**: Consider a shared version strategy or a tool like Changesets/Lerna for coordinated releases.

## Priority 3: Nice to Have / Low Impact

### 3.1 Tree-shaking validation
**Problem**: The library ships as a single ES module bundle. While `sideEffects: false` could help, there is no validation that tree-shaking works correctly for consumers.
**Fix**: Add a build verification step that checks tree-shaking with a minimal consumer app. Consider offering per-component entry points.

### 3.2 Performance benchmarks
**Problem**: The PerformancePanel dev tool exists but there are no automated performance benchmarks for the components themselves (render time, bundle impact).
**Fix**: Add benchmarks using `@testing-library/react` profiling or `react-performance-testing`.

### 3.3 Accessibility audit
**Problem**: While Radix UI primitives provide good baseline accessibility, many custom components (charts, media, interactive) may not meet WCAG 2.1 AA standards.
**Fix**: Run an automated accessibility audit (axe-core) across all components and fix identified issues.

### 3.4 Migrate tsconfig excludes to a cleaner pattern
**Problem**: `tsconfig.json` has many specific file exclusions (`src/utils/optimization/selectiveImports.ts`, `src/lib/variant-examples.tsx`, etc.), suggesting dead code or incomplete cleanup.
**Fix**: Audit excluded files. Remove truly unused files from the repository. If files are intentionally excluded from compilation, move them to a separate directory (e.g., `examples/`).

### 3.5 Update package.json version comment in `src/index.ts`
**Problem**: The `src/index.ts` header comment says `v3.0.0` but the package is at `v5.0.13`.
**Fix**: Update the version comment or remove the hardcoded version from the source file (rely on package.json as the single source of truth).

### 3.6 Add ESM-only sub-package entry points
**Problem**: The UMD build (`dist/index.umd.js`) is becoming less relevant as most modern bundlers support ESM natively.
**Fix**: Consider dropping UMD in a future major version and providing only ESM output, which simplifies the build and reduces output size.
