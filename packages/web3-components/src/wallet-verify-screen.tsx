import React from 'react';
import { WalletIcon } from './wallet-icon';
import { ChainType } from '@sudobility/types';

export interface WalletVerifyScreenProps {
  /** Connected wallet address */
  walletAddress: string;
  /** Chain type (evm or solana) */
  chainType: ChainType;
  /** Name of the connected wallet provider (e.g., "MetaMask", "Phantom") */
  walletProvider?: string;
  /** Connector object for WalletIcon (optional, for EVM wallets) */
  walletConnector?: { icon?: string };
  /** Whether currently signing */
  isSigning: boolean;
  /** Error message to display */
  error?: string | null;
  /** Callback when sign button is clicked */
  onSign: () => void;
  /** Callback when "use different wallet" is clicked */
  onUseDifferentWallet: () => void;
  /** All UI labels */
  labels: {
    // Header
    pageTitle: string;
    pageDescription: string;
    // Wallet info
    connectedWalletLabel: string;
    ethereumChainLabel: string;
    solanaChainLabel: string;
    // Sign section
    signInEthereumTitle: string;
    signInEthereumDescription: string;
    signInSolanaTitle: string;
    signInSolanaDescription: string;
    // Buttons
    signMessageButton: string;
    signingButton: string;
    useDifferentWallet: string;
  };
  /** Optional className */
  className?: string;
  /** Optional children to render after the sign button (e.g., footer links) */
  children?: React.ReactNode;
}

/**
 * WalletVerifyScreen - "Verify Your Wallet" signing UI
 *
 * A presentational component for the wallet verification/signing step.
 * Shows connected wallet info and a sign message button.
 *
 * @example
 * ```tsx
 * <WalletVerifyScreen
 *   walletAddress={address}
 *   chainType={ChainType.EVM}
 *   walletProvider="MetaMask"
 *   isSigning={isSigning}
 *   onSign={handleSign}
 *   onUseDifferentWallet={handleReset}
 *   labels={{
 *     pageTitle: 'Verify Your Wallet',
 *     pageDescription: 'Sign a message to verify ownership',
 *     connectedWalletLabel: 'Connected Wallet',
 *     ethereumChainLabel: 'Ethereum',
 *     solanaChainLabel: 'Solana',
 *     signInEthereumTitle: 'Sign with Ethereum',
 *     signInEthereumDescription: 'Sign a message to verify you own this wallet',
 *     signInSolanaTitle: 'Sign with Solana',
 *     signInSolanaDescription: 'Sign a message to verify you own this wallet',
 *     signMessageButton: 'Sign Message',
 *     signingButton: 'Signing...',
 *     useDifferentWallet: 'Use a different wallet',
 *   }}
 * />
 * ```
 */
export const WalletVerifyScreen: React.FC<WalletVerifyScreenProps> = ({
  walletAddress,
  chainType,
  walletProvider,
  walletConnector,
  isSigning,
  error,
  onSign,
  onUseDifferentWallet,
  labels,
  className = '',
  children,
}) => {
  const isSolana = chainType === ChainType.SOLANA;
  const chainLabel = isSolana
    ? labels.solanaChainLabel
    : labels.ethereumChainLabel;
  const signTitle = isSolana
    ? labels.signInSolanaTitle
    : labels.signInEthereumTitle;
  const signDescription = isSolana
    ? labels.signInSolanaDescription
    : labels.signInEthereumDescription;

  // Color classes based on chain
  const chainBadgeClasses = isSolana
    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
    : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';

  const signSectionClasses = isSolana
    ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';

  const signTitleClasses = isSolana
    ? 'text-purple-900 dark:text-purple-300'
    : 'text-blue-900 dark:text-blue-300';

  const signDescriptionClasses = isSolana
    ? 'text-purple-700 dark:text-purple-400'
    : 'text-blue-700 dark:text-blue-400';

  const buttonGradient = isSolana
    ? 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
    : 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700';

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Error message */}
      {error && (
        <div className='p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
          <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
        </div>
      )}

      {/* Connected wallet info */}
      <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
        <div className='flex justify-between items-start mb-2'>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {labels.connectedWalletLabel}
          </p>
          <span
            className={`text-xs px-2 py-1 rounded-full ${chainBadgeClasses}`}
          >
            {chainLabel}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          {walletProvider && (
            <WalletIcon
              wallet={walletProvider}
              connector={walletConnector}
              className='w-5 h-5'
            />
          )}
          <p className='font-mono text-sm text-gray-900 dark:text-white break-all'>
            {walletAddress}
          </p>
        </div>
      </div>

      {/* Sign message section */}
      <div className={`border rounded-lg p-4 ${signSectionClasses}`}>
        <h3 className={`font-semibold mb-2 ${signTitleClasses}`}>
          {signTitle}
        </h3>
        <p className={`text-sm ${signDescriptionClasses}`}>{signDescription}</p>
      </div>

      {/* Sign button */}
      <button
        onClick={onSign}
        disabled={isSigning}
        className={`w-full py-4 md:py-3 text-lg font-medium text-white rounded-lg transition-all bg-gradient-to-r ${buttonGradient} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isSigning ? (
          <div className='flex items-center justify-center'>
            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
            {labels.signingButton}
          </div>
        ) : (
          labels.signMessageButton
        )}
      </button>

      {/* Use different wallet link */}
      <button
        onClick={onUseDifferentWallet}
        className='w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
      >
        {labels.useDifferentWallet}
      </button>

      {/* Optional children (e.g., footer) */}
      {children}
    </div>
  );
};
