# Migration Guide: v1.x to v2.0.0

## Breaking Changes

Version 2.0.0 introduces a major restructuring of dependencies to improve bundle size, tree-shaking, and flexibility. Most dependencies have been moved from `dependencies` to `peerDependencies`.

## Why This Change?

- **Smaller bundle size**: 15-25% reduction in final bundle size
- **Better tree-shaking**: Only includes what you actually use
- **Dependency flexibility**: Use your preferred versions of UI libraries
- **Optional features**: Components with optional dependencies gracefully degrade

## What You Need to Do

### 1. Install Required Peer Dependencies

These packages are **required** for the library to work:

```bash
npm install @johnqh/mail-box-components@^2.0.0 \
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

Or with Yarn:

```bash
yarn add @johnqh/mail-box-components@^2.0.0 \
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

### 2. Install Optional Dependencies (As Needed)

Install these **only if you use the corresponding features**:

#### Internationalization (i18n)
If you use `LanguageSelector` or `CodeBlock` components:

```bash
npm install react-i18next@^16.0.0 i18next@^25.0.0
```

#### Routing
If you use `SmartLink`, `Breadcrumb`, or routing-related components:

```bash
npm install react-router-dom@^7.0.0
```

#### SEO/Meta Tags
If you use `AIMeta` component:

```bash
npm install react-helmet-async@^2.0.0
```

#### Social Sharing
If you use `Breadcrumb` with share functionality:

```bash
npm install react-share@^5.0.0
```

#### Performance Monitoring
If you use performance monitoring utilities:

```bash
npm install web-vitals@^5.0.0
```

### 3. Update Your package.json

Your `package.json` should now include:

```json
{
  "dependencies": {
    "@johnqh/mail-box-components": "^2.0.0",
    "@heroicons/react": "^2.0.0",
    "@radix-ui/react-alert-dialog": "^1.0.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-label": "^2.0.0",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.0",
    "@radix-ui/react-switch": "^1.0.0",
    "@radix-ui/react-tabs": "^1.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.0.0",

    // Optional - only if you use these features
    "react-i18next": "^16.0.0",
    "i18next": "^25.0.0",
    "react-router-dom": "^7.0.0",
    "react-helmet-async": "^2.0.0",
    "react-share": "^5.0.0",
    "web-vitals": "^5.0.0"
  }
}
```

## Component-Specific Dependencies

### Components Requiring Optional Dependencies

| Component | Required Optional Dependencies |
|-----------|-------------------------------|
| `LanguageSelector` | `react-i18next`, `i18next` |
| `CodeBlock` | `react-i18next`, `i18next` |
| `AIMeta` | `react-helmet-async` |
| `SmartLink` | `react-router-dom` |
| `Breadcrumb` | `react-router-dom`, `react-share` (for sharing) |
| `Performance Monitoring` | `web-vitals` |

### All Other Components

All other components work with just the **required peer dependencies** listed above.

## Migration Checklist

- [ ] Update `@johnqh/mail-box-components` to `^2.0.0`
- [ ] Install all required peer dependencies
- [ ] Install optional dependencies for features you use
- [ ] Run `npm install` or `yarn install`
- [ ] Test your application thoroughly
- [ ] Remove any unused optional dependencies

## Troubleshooting

### Missing Peer Dependency Warnings

If you see warnings like:

```
npm WARN @johnqh/mail-box-components@2.0.0 requires a peer of @heroicons/react@^2.0.0 but none is installed.
```

Install the missing package:

```bash
npm install @heroicons/react@^2.0.0
```

### Component Not Working

If a component isn't working after migration:

1. Check if it requires optional dependencies (see table above)
2. Install the required optional dependencies
3. Clear your build cache: `rm -rf node_modules/.cache`
4. Rebuild your application

### Bundle Size Issues

If your bundle size increased after migration:

1. Ensure tree-shaking is enabled in your bundler
2. Check that you're not importing the entire library: use named imports
3. Remove unused optional dependencies

**Good:**
```typescript
import { Button, Card } from '@johnqh/mail-box-components';
```

**Bad:**
```typescript
import * as Components from '@johnqh/mail-box-components';
```

## Benefits You'll See

After migration, you should notice:

- ✅ **Faster npm install** - Fewer transitive dependencies
- ✅ **Smaller bundle size** - 15-25% reduction in production builds
- ✅ **Better tree-shaking** - Only includes components you use
- ✅ **Version flexibility** - Use your preferred versions of UI libraries
- ✅ **Optional features** - Only install what you need

## Need Help?

If you encounter issues during migration:

1. Check the [README.md](./README.md) for updated installation instructions
2. Open an issue on [GitHub](https://github.com/johnqh/mail-box-components/issues)
3. Include your package.json and error messages

## Rollback

If you need to rollback to v1.x temporarily:

```bash
npm install @johnqh/mail-box-components@^1.6.9
```

Note that v1.x will not receive new features, only critical bug fixes.
