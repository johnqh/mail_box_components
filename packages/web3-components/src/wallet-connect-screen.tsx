import React from 'react';
import { WalletSelectionGrid, WalletOption } from './wallet-selection';

export interface WalletConnectScreenProps {
  /** EVM wallet options */
  evmWallets: WalletOption[];
  /** Solana wallet options */
  solanaWallets: WalletOption[];
  /** Currently active tab */
  activeTab: 'ethereum' | 'solana';
  /** Callback when tab changes */
  onTabChange: (tab: 'ethereum' | 'solana') => void;
  /** Currently connecting wallet name (shows spinner) */
  connectingWallet?: string | null;
  /** Whether auto-connecting in wallet browser */
  isAutoConnecting?: boolean;
  /** Error message to display */
  error?: string | null;
  /** Whether browser supports extensions */
  browserSupportsExtensions?: boolean;
  /** All UI labels */
  labels: {
    // Tab labels
    ethereum: string;
    solana: string;
    // Wallet status
    available: string;
    notAvailable: string;
    // Help text
    noWalletText: string;
    installMetaMask: string;
    installPhantom: string;
    // Auto-connect
    autoConnectTitle?: string;
    autoConnectDescription?: string;
    // Browser compatibility
    extensionsNotSupported?: string;
    useChromeForSolana?: string;
  };
  /** Optional className */
  className?: string;
}

/**
 * WalletConnectScreen - "Connect Your Wallet" UI
 *
 * A presentational component for wallet selection with tab navigation.
 * Supports EVM and Solana wallets, auto-connect mode, and browser compatibility messages.
 *
 * @example
 * ```tsx
 * <WalletConnectScreen
 *   evmWallets={evmWallets}
 *   solanaWallets={solanaWallets}
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 *   connectingWallet={connectingWallet}
 *   labels={{
 *     ethereum: 'Ethereum',
 *     solana: 'Solana',
 *     available: 'Available',
 *     notAvailable: 'Not Available',
 *     noWalletText: "Don't have a wallet?",
 *     installMetaMask: 'Install MetaMask',
 *     installPhantom: 'Install Phantom',
 *   }}
 * />
 * ```
 */
export const WalletConnectScreen: React.FC<WalletConnectScreenProps> = ({
  evmWallets,
  solanaWallets,
  activeTab,
  onTabChange,
  connectingWallet,
  isAutoConnecting = false,
  error,
  browserSupportsExtensions = true,
  labels,
  className = '',
}) => {
  // Auto-connecting state (wallet browser)
  if (isAutoConnecting) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className='w-16 h-16 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4' />
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
          {labels.autoConnectTitle || 'Connecting to Wallet'}
        </h3>
        <p className='text-gray-600 dark:text-gray-400 text-sm'>
          {labels.autoConnectDescription ||
            'Please approve the connection in your wallet'}
        </p>
      </div>
    );
  }

  // Browser doesn't support extensions - show message for Solana tab
  const showExtensionWarning =
    activeTab === 'solana' && !browserSupportsExtensions;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Error message */}
      {error && (
        <div className='p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
          <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
        </div>
      )}

      {showExtensionWarning ? (
        // Show extension warning for Solana on unsupported browsers
        <>
          {/* Tab Navigation - still show tabs */}
          <div className='flex space-x-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg'>
            <button
              onClick={() => onTabChange('ethereum')}
              className='flex-1 py-2 px-3 rounded-md font-medium text-sm transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            >
              <span className='flex items-center justify-center space-x-1'>
                <span>⟠</span>
                <span>{labels.ethereum}</span>
              </span>
            </button>
            <button
              onClick={() => onTabChange('solana')}
              className='flex-1 py-2 px-3 rounded-md font-medium text-sm transition-colors bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
            >
              <span className='flex items-center justify-center space-x-1'>
                <span>◎</span>
                <span>{labels.solana}</span>
              </span>
            </button>
          </div>

          {/* Extension warning message */}
          <div className='p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800'>
            <div className='text-center space-y-3'>
              <p className='text-sm font-medium text-gray-900 dark:text-white'>
                {labels.extensionsNotSupported ||
                  'Browser extensions are not supported'}
              </p>
              <p className='text-xs text-gray-600 dark:text-gray-400'>
                {labels.useChromeForSolana ||
                  'Please use Chrome, Firefox, or Edge for Solana wallets'}
              </p>
              <div className='flex justify-center space-x-4 pt-2'>
                <a
                  href='https://www.google.com/chrome/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline'
                >
                  Chrome
                </a>
                <a
                  href='https://www.mozilla.org/firefox/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline'
                >
                  Firefox
                </a>
                <a
                  href='https://www.microsoft.com/edge'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline'
                >
                  Edge
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Normal wallet selection
        <WalletSelectionGrid
          evmWallets={evmWallets}
          solanaWallets={solanaWallets}
          activeTab={activeTab}
          onTabChange={onTabChange}
          connectingWallet={connectingWallet}
          labels={{
            ethereum: labels.ethereum,
            solana: labels.solana,
            available: labels.available,
            notAvailable: labels.notAvailable,
            noWalletText: labels.noWalletText,
            installMetaMask: labels.installMetaMask,
            installPhantom: labels.installPhantom,
          }}
        />
      )}
    </div>
  );
};
