/**
 * Security Headers and CSP Configuration for 0xmail.box
 * This file defines Content Security Policy and other security headers
 * for the Web3 email platform.
 */

export const cspDirectives = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for inline scripts in React
    "'unsafe-eval'", // Required for some Web3 libraries
    'https://fonts.googleapis.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for CSS-in-JS and Tailwind
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
  'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
  'img-src': ["'self'", 'data:', 'https:', 'blob:'],
  'connect-src': [
    "'self'",
    // API endpoints
    'https://api.0xmail.box',
    'https://0xmail.box',

    // WalletConnect
    'https://*.walletconnect.com',
    'https://*.walletconnect.org',
    'https://registry.walletconnect.com',
    'https://relay.walletconnect.com',
    'wss://*.walletconnect.com',
    'wss://*.walletconnect.org',

    // Coinbase Wallet
    'https://keys.coinbase.com',
    'https://api.coinbase.com',
    'https://www.walletlink.org',

    // Ethereum RPC endpoints
    'https://mainnet.infura.io',
    'https://polygon-rpc.com',
    'https://rpc.ankr.com',
    'https://cloudflare-eth.com',
    'https://eth-mainnet.alchemyapi.io',

    // Solana RPC endpoints
    'https://api.phantom.app',
    'https://solana-api.projectserum.com',
    'https://api.mainnet-beta.solana.com',
    'https://api.devnet.solana.com',
    'wss://api.phantom.app',
    'wss://api.devnet.solana.com',
    'wss://api.mainnet-beta.solana.com',

    // Additional wallet providers
    'https://bridge.arbitrum.io',
    'https://polygon-mainnet.infura.io',
    'https://optimism-mainnet.infura.io',
  ],
  'frame-src': [
    "'self'",
    'https://verify.walletconnect.com',
    'https://verify.walletconnect.org',
  ],
  'worker-src': ["'self'", 'blob:'],
  'child-src': ["'self'", 'https://verify.walletconnect.com'],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
};

export const generateCSP = (): string => {
  return Object.entries(cspDirectives)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
};

export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Cross-Origin-Embedder-Policy': 'credentialless',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  'Cross-Origin-Resource-Policy': 'cross-origin',
  'Content-Security-Policy': generateCSP(),
};

export const cacheHeaders = {
  fonts: 'public, max-age=31536000, immutable',
  images: 'public, max-age=31536000, immutable',
  js: 'public, max-age=31536000, immutable',
  css: 'public, max-age=31536000, immutable',
  serviceWorker: 'public, max-age=0, must-revalidate',
  manifest: 'public, max-age=86400',
  api: 'no-cache, no-store, must-revalidate',
};

/**
 * Runtime CSP violation reporting
 */
export const setupCSPReporting = () => {
  if (typeof window !== 'undefined') {
    // Listen for CSP violations
    document.addEventListener('securitypolicyviolation', event => {
      console.warn('CSP Violation:', {
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        originalPolicy: event.originalPolicy,
        sourceFile: event.sourceFile,
        lineNumber: event.lineNumber,
      });

      // Optionally send violations to an analytics service
      // Analytics.track('CSP Violation', { ... });
    });
  }
};

/**
 * Web3-specific security considerations
 */
export const web3SecurityNotes = {
  walletConnections:
    'Always verify wallet signatures and never trust client-side data',
  rpcEndpoints: 'Use reputable RPC providers and consider rate limiting',
  contractInteractions:
    'Validate all smart contract interactions on the backend',
  userInput:
    'Sanitize all user inputs, especially wallet addresses and transaction data',
  privateKeys:
    'Never log, store, or transmit private keys - they should remain in wallets only',
  phishing:
    'Implement strict CSP to prevent injection of malicious scripts that could steal wallet access',
};
