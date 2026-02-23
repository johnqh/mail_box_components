# Improvement Plans for @sudobility/components

## Priority 1: Critical / High Impact

### 1.1 ~~Add `@sudobility/design` to Vite externals~~ ✅ DONE
- Added `@sudobility/design` and `@sudobility/types` to `rollupOptions.external` and `globals` in `vite.config.ts`

### 1.2 ~~Increase test coverage~~ ✅ DONE
- Added 5 test files with 93 tests total:
  - `useToggle.test.ts` (9 tests)
  - `useClickOutside.test.tsx` (8 tests)
  - `useFormValidation.test.ts` (33 tests)
  - `useFormSubmission.test.ts` (18 tests)
  - `formatFileSize.test.ts` (25 tests)
- Total test count: 572 tests across 34 suites

### 1.3 ~~Remove duplicate component definitions~~ ✅ DONE
- Renamed `src/core/Breadcrumb.tsx` component to `RouterBreadcrumb` to resolve collision with `src/ui/breadcrumb.tsx`
- Added backward-compatible `Breadcrumb` alias with `@deprecated` JSDoc
- Removed cross-directory `export * from '../navigation/pagination'` from `src/ui/index.ts`

## Priority 2: Important / Medium Impact

### 2.1 ~~Consistent JSDoc coverage~~ ✅ DONE
- Added JSDoc to `card.tsx`, `input.tsx`, `alert.tsx`, `badge.tsx`, `modal.tsx`

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

### 3.4 ~~Migrate tsconfig excludes to a cleaner pattern~~ ✅ DONE
- Removed 6 stale exclude entries for non-existent files under `src/utils/optimization/` and `src/lib/variant-*`
- Kept necessary excludes for `src/optimization/optimization/` files that have unresolved module errors

### 3.5 ~~Update package.json version comment in `src/index.ts`~~ ✅ DONE
- Removed hardcoded `v3.0.0` version from header comment

### 3.6 Add ESM-only sub-package entry points
**Problem**: The UMD build (`dist/index.umd.js`) is becoming less relevant as most modern bundlers support ESM natively.
**Fix**: Consider dropping UMD in a future major version and providing only ESM output, which simplifies the build and reduces output size.
