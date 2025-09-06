/**
 * Environment detection utilities for wallet browser compatibility
 */

export function isWalletBrowser(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for common wallet browser user agents
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  // Common wallet browser patterns
  const walletBrowsers = [
    'metamask',
    'trustwallet',
    'coinbase',
    'rainbow',
    'phantom',
    'solflare',
    'exodus',
    'ledger',
    'binance',
    'okx'
  ];
  
  return walletBrowsers.some(wallet => userAgent.includes(wallet));
}

export function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}

export function isNetworkAccess(): boolean {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  // Check if it's an IP address (network access)
  return /^\d+\.\d+\.\d+\.\d+$/.test(hostname);
}

export function getEnvironmentType(): 'localhost' | 'network' | 'wallet-browser' | 'production' {
  if (isLocalhost()) return 'localhost';
  if (isWalletBrowser()) return 'wallet-browser';
  if (isNetworkAccess()) return 'network';
  return 'production';
}

export function shouldEnableWallet(): boolean {
  const envType = getEnvironmentType();
  // Enable wallet for localhost and wallet browsers
  return envType === 'localhost' || envType === 'wallet-browser';
}