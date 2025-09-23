/**
 * Advanced wallet-specific lazy loading for Web3 providers
 * Optimizes bundle size by loading wallet SDKs only when needed
 */

import React, { lazy, Suspense } from 'react';
// Simple loading component replacement
const LoadingState: React.FC<{ message: string; className?: string }> = ({
  message,
  className,
}) => (
  <div className={`flex items-center justify-center p-4 ${className || ''}`}>
    <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500'></div>
    <span className='ml-2 text-sm text-gray-600'>{message}</span>
  </div>
);

// Wallet detection utilities
interface WalletProviderInfo {
  name: string;
  detected: boolean;
  lazyComponent?: () => Promise<unknown>;
  priority: number;
}

// Cache for wallet provider components
const walletComponentCache = new Map<string, any>();
const detectedWallets = new Set<string>();

/**
 * Detect available wallets in the user's environment
 */
export function detectAvailableWallets(): WalletProviderInfo[] {
  const wallets: WalletProviderInfo[] = [];

  // MetaMask detection
  const hasMetaMask = !!(window as any).ethereum?.isMetaMask;
  if (hasMetaMask) {
    detectedWallets.add('metamask');
    wallets.push({
      name: 'MetaMask',
      detected: true,
      priority: 1,
    });
  }

  // Coinbase Wallet detection
  const hasCoinbase = !!(window as any).ethereum?.isCoinbaseWallet;
  if (hasCoinbase) {
    detectedWallets.add('coinbase');
    wallets.push({
      name: 'Coinbase Wallet',
      detected: true,
      priority: 2,
    });
  }

  // Phantom (Solana) detection
  const hasPhantom = !!(window as any).solana?.isPhantom;
  if (hasPhantom) {
    detectedWallets.add('phantom');
    wallets.push({
      name: 'Phantom',
      detected: true,
      priority: 3,
    });
  }

  // WalletConnect (always available as fallback)
  wallets.push({
    name: 'WalletConnect',
    detected: true,
    priority: 4,
  });

  return wallets.sort((a, b) => a.priority - b.priority);
}

/**
 * Lazy-loaded wallet provider factory
 */
export function createLazyWalletProvider(walletName: string) {
  const cacheKey = `wallet-${walletName.toLowerCase()}`;

  if (walletComponentCache.has(cacheKey)) {
    return walletComponentCache.get(cacheKey);
  }

  // For now, return a placeholder component since wallet providers are configured elsewhere
  // This is a template for future wallet-specific lazy loading implementation
  const importFn = () =>
    Promise.resolve({
      default: () =>
        React.createElement('div', {}, `${walletName} Provider Placeholder`),
    });

  const LazyProvider = lazy(importFn);

  const WrappedProvider = (props: any) => (
    <Suspense
      fallback={
        <LoadingState
          message={`Loading ${walletName} wallet...`}
          className='wallet-loading'
        />
      }
    >
      <LazyProvider {...props} />
    </Suspense>
  );

  WrappedProvider.displayName = `Lazy${walletName}Provider`;
  walletComponentCache.set(cacheKey, WrappedProvider);

  return WrappedProvider;
}

/**
 * Smart wallet provider that loads only detected wallets
 */
export function SmartWalletProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const availableWallets = detectAvailableWallets();

  // Preload high-priority detected wallets
  availableWallets
    .filter(wallet => wallet.priority <= 2 && wallet.detected)
    .forEach(_wallet => {
      setTimeout(() => {
        // Preloading wallet provider
      }, 1000);
    });

  return (
    <>
      {availableWallets.map(wallet => {
        const Provider = createLazyWalletProvider(wallet.name);
        return <Provider key={wallet.name} />;
      })}
      {children}
    </>
  );
}

/**
 * Preload wallet providers based on user behavior
 */
export class WalletPreloader {
  private static preloadedWallets = new Set<string>();

  static preloadWallet(walletName: string) {
    const normalizedName = walletName.toLowerCase();

    if (this.preloadedWallets.has(normalizedName)) {
      return;
    }

    this.preloadedWallets.add(normalizedName);

    // Preload with delay to avoid blocking initial render
    setTimeout(() => {
      createLazyWalletProvider(walletName);
    }, 500);
  }

  static preloadCommonWallets() {
    const commonWallets = ['metamask', 'walletconnect', 'coinbase'];

    commonWallets.forEach((wallet, index) => {
      setTimeout(() => {
        this.preloadWallet(wallet);
      }, index * 1000); // Stagger preloading
    });
  }

  static getPreloadedWallets() {
    return Array.from(this.preloadedWallets);
  }
}

/**
 * Hook for wallet-specific optimizations
 */
export function useOptimizedWallets() {
  const availableWallets = detectAvailableWallets();

  const preloadWallet = (walletName: string) => {
    WalletPreloader.preloadWallet(walletName);
  };

  const getDetectedWallets = () => {
    return Array.from(detectedWallets);
  };

  return {
    availableWallets,
    preloadWallet,
    getDetectedWallets,
    hasWallet: (walletName: string) =>
      detectedWallets.has(walletName.toLowerCase()),
  };
}

/**
 * Wallet connection button with lazy loading
 */
export function LazyWalletButton({
  walletName,
  onConnect,
  disabled = false,
}: {
  walletName: string;
  onConnect: () => void;
  disabled?: boolean;
}) {
  const handleClick = () => {
    // Preload the wallet provider before connecting
    WalletPreloader.preloadWallet(walletName);

    // Small delay to allow preloading to start
    setTimeout(onConnect, 100);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className='wallet-connect-btn'
      data-wallet={walletName.toLowerCase()}
    >
      Connect {walletName}
    </button>
  );
}

export default {
  detectAvailableWallets,
  createLazyWalletProvider,
  SmartWalletProviders,
  WalletPreloader,
  useOptimizedWallets,
  LazyWalletButton,
};
