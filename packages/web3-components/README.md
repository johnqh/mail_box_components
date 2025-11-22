# @sudobility/web3-components

Web3 and blockchain UI components for React applications.

## Installation

```bash
npm install @sudobility/web3-components @sudobility/components @sudobility/design
```

## Components

- **WalletIcon** - Display wallet provider icons
- **WalletConnect** - Wallet connection button and modal
- **WalletSelection** - Wallet provider selection interface
- **AddressLabel** - Blockchain address display with copy
- **AddressLink** - Clickable blockchain address with explorer link
- **NFTGallery** - NFT collection display grid
- **TokenSwap** - Token swap interface
- **GasTracker** - Gas price tracker and estimator
- **CryptoPortfolio** - Portfolio value and holdings display

## Usage

```tsx
import { WalletConnect, AddressLabel, NFTGallery } from '@sudobility/web3-components';

function App() {
  return (
    <>
      <WalletConnect />
      <AddressLabel address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" />
      <NFTGallery collection="0x..." />
    </>
  );
}
```

## Dependencies

This package requires:
- `@sudobility/components` - Core component library
- `@sudobility/design` - Design system tokens
- `react` ^18.0.0 or ^19.0.0

## License

MIT
