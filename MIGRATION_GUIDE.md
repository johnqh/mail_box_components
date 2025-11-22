# Migration Guide: v2.x to v3.0

## Overview

Version 3.0 introduces a reorganized architecture for better maintainability and scalability. **Good news: Most applications won't need any code changes!**

## TL;DR - Quick Summary

✅ **No breaking changes for most users**
✅ **Import paths remain the same**
✅ **Specialized components moved to separate packages**
⚠️ **Internal structure reorganized**

## What Changed

### 1. Component Organization

**Before (v2.x):**
```
src/ui/ (flat structure with 500+ components)
```

**After (v3.0):**
```
src/
├── primitives/     # 50 components
├── forms/          # 60 components
├── navigation/     # 17 components
├── data-display/   # 25 components
├── charts/         # 20 components
├── media/          # 19 components
├── modals/         # 10 components
└── interactive/    # 15 components
```

### 2. Specialized Packages

Domain-specific components have been extracted to separate packages:

| Package | Components | Description |
|---------|-----------|-------------|
| `@sudobility/web3-components` | 9 | Wallet, NFT, crypto components |
| `@sudobility/email-components` | 9 | Email marketing components |
| `@sudobility/fitness-components` | 15 | Fitness tracking components |
| `@sudobility/realestate-components` | 12 | Property management components |

## Migration Steps

### For General Components (No Changes Needed!)

If you're using general-purpose components, **no migration needed**:

```tsx
// v2.x - Works the same in v3.0!
import { Button, Card, Input, Modal } from '@sudobility/components';

function App() {
  return (
    <Card>
      <Input />
      <Button>Click me</Button>
    </Card>
  );
}
```

### For Specialized Components (Action Required)

If you're using Web3, Email, Fitness, or Real Estate components:

#### Option A: Install Specialized Package (Recommended)

```bash
# Install the specialized package you need
npm install @sudobility/web3-components
npm install @sudobility/email-components
npm install @sudobility/fitness-components
npm install @sudobility/realestate-components
```

Update your imports:

```tsx
// v2.x
import { WalletConnect, AddressLabel } from '@sudobility/components';

// v3.0
import { WalletConnect, AddressLabel } from '@sudobility/web3-components';
```

#### Option B: Continue Using Main Package (Deprecated)

These components are still available in the main package for backward compatibility but will be removed in v4.0:

```tsx
// Still works in v3.0 but deprecated
import { WalletConnect } from '@sudobility/components';
// Warning: This will be removed in v4.0
```

## Component Migration Map

### Web3 Components → `@sudobility/web3-components`

```tsx
// Before
import { WalletIcon, WalletConnect, WalletSelection, AddressLabel,
         AddressLink, NFTGallery, TokenSwap, GasTracker,
         CryptoPortfolio } from '@sudobility/components';

// After
import { WalletIcon, WalletConnect, WalletSelection, AddressLabel,
         AddressLink, NFTGallery, TokenSwap, GasTracker,
         CryptoPortfolio } from '@sudobility/web3-components';
```

### Email Components → `@sudobility/email-components`

```tsx
// Before
import { EmailAccountsList, EmailCampaign, EmailAnalytics } from '@sudobility/components';

// After
import { EmailAccountsList, EmailCampaign, EmailAnalytics } from '@sudobility/email-components';
```

### Fitness Components → `@sudobility/fitness-components`

```tsx
// Before
import { StepCounter, CalorieTracker, WorkoutLog } from '@sudobility/components';

// After
import { StepCounter, CalorieTracker, WorkoutLog } from '@sudobility/fitness-components';
```

### Real Estate Components → `@sudobility/realestate-components`

```tsx
// Before
import { PropertyCard, MortgageCalc, VirtualTour } from '@sudobility/components';

// After
import { PropertyCard, MortgageCalc, VirtualTour } from '@sudobility/realestate-components';
```

## Breaking Changes

### For Internal Path Users

If you were importing from internal paths (not recommended), you'll need to update:

```tsx
// ❌ This will break
import Button from '@sudobility/components/dist/ui/button';

// ✅ Use this instead
import { Button } from '@sudobility/components';
```

### For Direct Component File Imports

```tsx
// ❌ This will break
import { Button } from '@sudobility/components/src/ui/button';

// ✅ Use this instead
import { Button } from '@sudobility/components';
```

## Benefits of Upgrading

### Better Tree-Shaking

The new structure allows for better tree-shaking and smaller bundle sizes:

```tsx
// Only imports what you need
import { Button } from '@sudobility/components';
// Result: Smaller bundle size
```

### Clearer Dependencies

Domain-specific dependencies are isolated:

```tsx
// v2.x - All dependencies bundled
import { WalletConnect } from '@sudobility/components';

// v3.0 - Clean separation
import { WalletConnect } from '@sudobility/web3-components';
// Only web3 dependencies in this package
```

### Easier Maintenance

Finding and updating components is easier with logical organization.

## Automated Migration (Coming Soon)

We're working on a codemod to automate the migration process:

```bash
# Coming soon
npx @sudobility/migrate v2-to-v3
```

## Support

### Common Issues

**Q: My imports are broken**
A: Make sure you're importing from the package root, not internal paths:
```tsx
✅ import { Button } from '@sudobility/components';
❌ import { Button } from '@sudobility/components/dist/ui/button';
```

**Q: Specialized component not found**
A: Install the specialized package:
```bash
npm install @sudobility/web3-components
```

**Q: TypeScript errors after upgrade**
A: Clear your build cache and reinstall:
```bash
rm -rf node_modules dist
npm install
```

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/sudobility/components/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sudobility/components/discussions)
- **Documentation**: [CLAUDE.md](./CLAUDE.md)

## Timeline

- **v3.0.0** (Current): New structure, backward compatible
- **v3.x.x** (Next 6 months): Deprecation warnings for old imports
- **v4.0.0** (Future): Remove backward compatibility, specialized components only in dedicated packages

## Checklist

- [ ] Update to `@sudobility/components@^3.0.0`
- [ ] Check if you're using specialized components
- [ ] Install specialized packages if needed
- [ ] Update imports for specialized components
- [ ] Test your application
- [ ] Update any internal path imports to use package root
- [ ] Clear build cache if you encounter issues

## Questions?

If you have questions about the migration, please:
1. Check the [Component Migration Map](./COMPONENT_MIGRATION_MAP.md)
2. Review the [CHANGELOG](./CHANGELOG.md)
3. Open a [GitHub Issue](https://github.com/sudobility/components/issues)

---

**Thank you for using @sudobility/components!** We believe these changes will make the library more maintainable and easier to use long-term.
