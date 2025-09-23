/**
 * Web3 library optimization utilities (simplified for existing dependencies)
 * Reduces bundle size by lazy loading and selective imports
 */

// Selective imports for existing Ethereum libraries
export const EthereumUtils = {
  // Only import what we need from viem
  getAddress: async () => {
    try {
      const { getAddress } = await import('viem/utils');
      return getAddress;
    } catch (error) {
      console.warn('viem/utils not available:', error);
      return null;
    }
  },

  parseEther: async () => {
    try {
      const { parseEther } = await import('viem/utils');
      return parseEther;
    } catch (error) {
      console.warn('viem/utils not available:', error);
      return null;
    }
  },

  formatEther: async () => {
    try {
      const { formatEther } = await import('viem/utils');
      return formatEther;
    } catch (error) {
      console.warn('viem/utils not available:', error);
      return null;
    }
  },

  // Create public client on demand
  createPublicClient: async (config: any) => {
    try {
      const { createPublicClient, http } = await import('viem');
      return createPublicClient({
        ...config,
        transport: http(),
      });
    } catch (error) {
      console.warn('viem not available:', error);
      return null;
    }
  },

  // ENS utilities
  resolveENS: async (name: string) => {
    try {
      const { normalize } = await import('viem/ens');
      return normalize(name);
    } catch (error) {
      console.warn('viem/ens not available:', error);
      return null;
    }
  },
};

// Selective imports for Solana libraries (existing dependencies)
export const SolanaUtils = {
  // Connection (only when needed)
  createConnection: async (endpoint: string) => {
    try {
      const { Connection } = await import('@solana/web3.js');
      return new Connection(endpoint);
    } catch (error) {
      console.warn('@solana/web3.js not available:', error);
      return null;
    }
  },

  // PublicKey utilities
  createPublicKey: async (address: string) => {
    try {
      const { PublicKey } = await import('@solana/web3.js');
      return new PublicKey(address);
    } catch (error) {
      console.warn('@solana/web3.js not available:', error);
      return null;
    }
  },

  // Transaction utilities
  createTransaction: async () => {
    try {
      const { Transaction } = await import('@solana/web3.js');
      return new Transaction();
    } catch (error) {
      console.warn('@solana/web3.js not available:', error);
      return null;
    }
  },

  // Wallet adapter (load on demand)
  getWalletAdapter: async (walletName: string) => {
    try {
      const wallets = await import('@solana/wallet-adapter-wallets');

      switch (walletName) {
        case 'phantom':
          return new wallets.PhantomWalletAdapter();
        case 'solflare':
          return new wallets.SolflareWalletAdapter();
        case 'torus':
          return new wallets.TorusWalletAdapter();
        default:
          throw new Error(`Unknown Solana wallet: ${walletName}`);
      }
    } catch (error) {
      console.warn('@solana/wallet-adapter-wallets not available:', error);
      return null;
    }
  },
};

// Optimized wagmi configuration loader
export const createWagmiConfig = async () => {
  try {
    // Dynamically import wagmi and its dependencies
    const [
      { createConfig, http },
      { mainnet, polygon, arbitrum, optimism },
      { injected },
      { walletConnect },
      { coinbaseWallet },
    ] = await Promise.all([
      import('wagmi'),
      import('wagmi/chains'),
      import('wagmi/connectors').then(m => ({ injected: m.injected })),
      import('wagmi/connectors').then(m => ({
        walletConnect: m.walletConnect,
      })),
      import('wagmi/connectors').then(m => ({
        coinbaseWallet: m.coinbaseWallet,
      })),
    ]);

    return createConfig({
      chains: [mainnet, polygon, arbitrum, optimism],
      connectors: [
        injected(),
        walletConnect({
          projectId:
            (typeof window !== 'undefined' &&
              (window as any).VITE_WALLETCONNECT_PROJECT_ID) ||
            'test',
        }),
        coinbaseWallet({
          appName: '0xmail.box',
        }),
      ],
      transports: {
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [arbitrum.id]: http(),
        [optimism.id]: http(),
      },
    });
  } catch (error) {
    console.warn('wagmi not available:', error);
    return null;
  }
};

// Cached provider instances
const providerCache = new Map<string, any>();

// Get or create provider with caching
export const getCachedProvider = async (
  type: string,
  config?: any
): Promise<unknown> => {
  const cacheKey = `${type}-${JSON.stringify(config)}`;

  if (providerCache.has(cacheKey)) {
    return providerCache.get(cacheKey);
  }

  let provider: any;

  try {
    switch (type) {
      case 'solana': {
        const { Connection } = await import('@solana/web3.js');
        provider = new Connection(
          config?.endpoint || 'https://api.mainnet-beta.solana.com'
        );
        break;
      }

      default:
        throw new Error(`Unknown provider type: ${type}`);
    }

    providerCache.set(cacheKey, provider);
    return provider;
  } catch (error) {
    console.warn(`Failed to create ${type} provider:`, error);
    return null;
  }
};

// Clean up providers
export const cleanupProviders = (): void => {
  providerCache.clear();
};

// Tree-shakeable exports for common utilities (loaded dynamically)
export const getTreeShakeableExports = async () => {
  try {
    const [{ getAddress }, { PublicKey }] = await Promise.all([
      import('viem/utils').then(m => ({ getAddress: m.getAddress })),
      import('@solana/web3.js').then(m => ({ PublicKey: m.PublicKey })),
    ]);

    return { getAddress, PublicKey };
  } catch (error) {
    console.warn('Tree-shakeable exports not available:', error);
    return { getAddress: null, PublicKey: null };
  }
};

// Initialize optimizations
export const initializeWeb3Optimizations = (): void => {
  // Preload based on detected wallet
  if (typeof window !== 'undefined') {
    if ((window as any).solana) {
      // Preload Solana utilities
      import('@solana/web3.js');
    }
  }

  // Clean up providers on page unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', cleanupProviders);
  }
};

export default {
  EthereumUtils,
  SolanaUtils,
  createWagmiConfig,
  getCachedProvider,
  cleanupProviders,
  initializeWeb3Optimizations,
};
