/**
 * Wallet browser detection and automatic connection utilities
 */

export interface WalletBrowserInfo {
  isWalletBrowser: boolean;
  walletType:
    | 'metamask'
    | 'trustwallet'
    | 'coinbase'
    | 'rainbow'
    | 'phantom'
    | 'solflare'
    | 'exodus'
    | 'unknown';
  hasEthereum: boolean;
  hasSolana: boolean;
  provider: any;
}

export function detectWalletBrowser(): WalletBrowserInfo {
  const defaultInfo: WalletBrowserInfo = {
    isWalletBrowser: false,
    walletType: 'unknown',
    hasEthereum: false,
    hasSolana: false,
    provider: null,
  };

  if (typeof window === 'undefined') return defaultInfo;

  try {
    const userAgent = navigator.userAgent.toLowerCase();

    // Check for specific wallet browsers
    let walletType: WalletBrowserInfo['walletType'] = 'unknown';
    let isWalletBrowser = false;

    if (userAgent.includes('metamask')) {
      walletType = 'metamask';
      isWalletBrowser = true;
    } else if (userAgent.includes('trustwallet')) {
      walletType = 'trustwallet';
      isWalletBrowser = true;
    } else if (userAgent.includes('coinbase')) {
      walletType = 'coinbase';
      isWalletBrowser = true;
    } else if (userAgent.includes('rainbow')) {
      walletType = 'rainbow';
      isWalletBrowser = true;
    } else if (userAgent.includes('phantom')) {
      walletType = 'phantom';
      isWalletBrowser = true;
    } else if (userAgent.includes('solflare')) {
      walletType = 'solflare';
      isWalletBrowser = true;
    } else if (userAgent.includes('exodus')) {
      walletType = 'exodus';
      isWalletBrowser = true;
    }

    // Check for injected providers even if user agent doesn't match
    const hasEthereum = !!(window as any).ethereum;
    const hasSolana =
      !!(window as any).solana || !!(window as any).phantom?.solana;

    // If we have providers but didn't detect from user agent, still consider it a wallet browser
    if ((hasEthereum || hasSolana) && !isWalletBrowser) {
      isWalletBrowser = true;
      // Try to identify wallet type from provider
      if ((window as any).ethereum?.isMetaMask) walletType = 'metamask';
      else if ((window as any).ethereum?.isCoinbaseWallet)
        walletType = 'coinbase';
      else if ((window as any).ethereum?.isRainbow) walletType = 'rainbow';
      else if ((window as any).phantom) walletType = 'phantom';
      else if ((window as any).solflare) walletType = 'solflare';
    }

    const provider = hasEthereum
      ? (window as any).ethereum
      : hasSolana
        ? (window as any).solana || (window as any).phantom?.solana
        : null;

    return {
      isWalletBrowser,
      walletType,
      hasEthereum,
      hasSolana,
      provider,
    };
  } catch {
    return defaultInfo;
  }
}

export async function autoConnectWalletBrowser(): Promise<{
  success: boolean;
  address?: string;
  error?: string;
}> {
  const walletInfo = detectWalletBrowser();

  if (!walletInfo.isWalletBrowser) {
    return { success: false, error: 'Not running in a wallet browser' };
  }

  // Auto-connecting to wallet...

  try {
    // Try Ethereum connection first
    if (walletInfo.hasEthereum && walletInfo.provider) {
      try {
        const accounts = await walletInfo.provider.request({
          method: 'eth_requestAccounts',
        });

        if (accounts && accounts.length > 0) {
          // Connected to Ethereum wallet
          return { success: true, address: accounts[0] };
        }
      } catch {
        // Ethereum connection failed
      }
    }

    // Try Solana connection
    if (walletInfo.hasSolana && walletInfo.provider) {
      try {
        const response = await walletInfo.provider.connect();
        if (response.publicKey) {
          const address = response.publicKey.toString();
          // Connected to Solana wallet
          return { success: true, address };
        }
      } catch {
        // Solana connection failed
      }
    }

    return { success: false, error: 'Failed to connect to wallet provider' };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unknown connection error',
    };
  }
}
