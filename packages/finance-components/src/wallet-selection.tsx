import React from 'react';
import { WalletIcon } from './wallet-icon';

export interface WalletOption {
  id: string;
  name: string;
  icon?: string;
  available: boolean;
  connecting?: boolean;
  chainType: 'evm' | 'solana';
  connector?: unknown;
  onClick: () => void;
}

interface WalletSelectionButtonProps {
  wallet: WalletOption;
  disabled?: boolean;
  className?: string;
  statusLabels?: {
    available: string;
    notAvailable: string;
  };
}

export const WalletSelectionButton: React.FC<WalletSelectionButtonProps> = ({
  wallet,
  disabled = false,
  className = '',
  statusLabels = { available: 'Available', notAvailable: 'Not Available' },
}) => {
  return (
    <button
      onClick={wallet.onClick}
      disabled={disabled || !wallet.available}
      aria-label={`Connect ${wallet.name} wallet for ${wallet.chainType === 'solana' ? 'Solana' : 'Ethereum'} network`}
      className={`
        w-full flex items-center justify-between p-4 md:p-4 py-5 md:py-4 
        border border-gray-200 dark:border-gray-700 rounded-lg 
        hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <div className='flex items-center space-x-3'>
        <WalletIcon
          wallet={wallet.name.toLowerCase()}
          connector={wallet.connector as { icon?: string } | undefined}
        />
        <div className='text-left'>
          <p className='font-medium text-gray-900 dark:text-white'>
            {wallet.name}
          </p>
          <p
            className={`text-xs ${
              wallet.available
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {wallet.available
              ? statusLabels.available
              : statusLabels.notAvailable}
          </p>
        </div>
      </div>

      {wallet.connecting && (
        <div
          className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${
            wallet.chainType === 'solana'
              ? 'border-purple-600'
              : 'border-blue-600'
          }`}
        />
      )}
    </button>
  );
};

interface WalletTabProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  color: 'blue' | 'purple';
}

export const WalletTab: React.FC<WalletTabProps> = ({
  active,
  onClick,
  icon,
  label,
  color,
}) => {
  const colorClasses = {
    blue: active
      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
    purple: active
      ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
  };

  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${colorClasses[color]}`}
    >
      <span className='flex items-center justify-center space-x-2'>
        <span>{icon}</span>
        <span>{label}</span>
      </span>
    </button>
  );
};

interface WalletSelectionGridProps {
  evmWallets: WalletOption[];
  solanaWallets: WalletOption[];
  activeTab: 'ethereum' | 'solana';
  onTabChange: (tab: 'ethereum' | 'solana') => void;
  connectingWallet?: string | null;
  className?: string;
  labels?: {
    ethereum?: string;
    solana?: string;
    available?: string;
    notAvailable?: string;
    noWalletText?: string;
    installMetaMask?: string;
    installPhantom?: string;
  };
}

export const WalletSelectionGrid: React.FC<WalletSelectionGridProps> = ({
  evmWallets,
  solanaWallets,
  activeTab,
  onTabChange,
  connectingWallet,
  className = '',
  labels = {},
}) => {
  const defaultLabels = {
    ethereum: 'Ethereum',
    solana: 'Solana',
    available: 'Available',
    notAvailable: 'Not Available',
    noWalletText: "Don't have a wallet?",
    installMetaMask: 'Install MetaMask',
    installPhantom: 'Install Phantom',
  };

  const finalLabels = { ...defaultLabels, ...labels };
  const currentWallets = activeTab === 'ethereum' ? evmWallets : solanaWallets;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Tab Navigation */}
      <div className='flex space-x-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg'>
        <WalletTab
          active={activeTab === 'ethereum'}
          onClick={() => onTabChange('ethereum')}
          icon='⟠'
          label={finalLabels.ethereum}
          color='blue'
        />
        <WalletTab
          active={activeTab === 'solana'}
          onClick={() => onTabChange('solana')}
          icon='◎'
          label={finalLabels.solana}
          color='purple'
        />
      </div>

      {/* Wallet Grid */}
      <div className='space-y-3'>
        {currentWallets.map(wallet => (
          <WalletSelectionButton
            key={wallet.id}
            wallet={{
              ...wallet,
              connecting: connectingWallet === wallet.name,
            }}
            disabled={!!connectingWallet}
            statusLabels={{
              available: finalLabels.available,
              notAvailable: finalLabels.notAvailable,
            }}
          />
        ))}
      </div>

      {/* Help Text */}
      <div className='text-center pt-2'>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          {finalLabels.noWalletText}{' '}
          {activeTab === 'ethereum' ? (
            <a
              href='https://metamask.io/download/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
            >
              {finalLabels.installMetaMask}
            </a>
          ) : (
            <a
              href='https://phantom.app/download'
              target='_blank'
              rel='noopener noreferrer'
              className='text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300'
            >
              {finalLabels.installPhantom}
            </a>
          )}
        </p>
      </div>
    </div>
  );
};
