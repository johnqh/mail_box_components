import React, { useRef, useEffect, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from './lib/utils';
import { ChainBadge } from '@sudobility/components';
import { textVariants } from '@sudobility/design';

interface EmailAccount {
  address: string;
  name: string;
  type: 'primary' | 'ens' | 'sns';
  walletAddress: string;
  addressType: 'evm' | 'solana';
}

interface WalletEmailGroup {
  walletAddress: string;
  addressType: 'evm' | 'solana';
  primaryEmail: EmailAccount;
  domainEmails: EmailAccount[];
  customColor?: string;
}

interface EmailAccountsListProps {
  walletGroups: WalletEmailGroup[];
  selectedAccount?: string;
  expandedWallets: string[];
  onAccountSelect: (address: string) => void;
  onToggleWallet: (walletAddress: string) => void;
  onAccountSettings?: (address: string) => void;
  className?: string;
}

// Helper function to format wallet addresses
const formatWalletAddress = (address: string): string => {
  if (!address) return '';
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const ChainPill: React.FC<{
  type: 'primary' | 'ens' | 'sns';
  addressType: 'evm' | 'solana';
}> = ({ type, addressType }) => {
  // Use ChainBadge for primary wallet addresses (EVM/Solana)
  if (type === 'primary') {
    return (
      <ChainBadge
        chainType={addressType === 'solana' ? 'solana' : 'evm'}
        size='sm'
      />
    );
  }

  // Custom pill for ENS/SNS with border
  const getChainLabel = () => type.toUpperCase();

  const getChainStyle = () => {
    switch (type) {
      case 'ens':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/10 dark:text-green-300 dark:border-green-800';
      case 'sns':
        return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/10 dark:text-orange-300 dark:border-orange-800';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/10 dark:text-gray-300 dark:border-gray-800';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border',
        getChainStyle()
      )}
    >
      {getChainLabel()}
    </span>
  );
};

const CollapsibleDomainEmails: React.FC<{
  domainEmails: EmailAccount[];
  isExpanded: boolean;
  selectedAccount?: string;
  onAccountSelect: (address: string) => void;
  onAccountSettings?: (address: string) => void;
}> = ({
  domainEmails,
  isExpanded,
  selectedAccount,
  onAccountSelect,
  onAccountSettings: _onAccountSettings,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(isExpanded ? scrollHeight + 8 : 0);
    }
  }, [isExpanded, domainEmails]);

  return (
    <div
      className='overflow-hidden transition-all duration-300 ease-in-out'
      style={{ height: height !== undefined ? `${height}px` : 'auto' }}
    >
      <div ref={contentRef} className='ml-6 mt-2 space-y-1'>
        {domainEmails.map(email => (
          <button
            key={email.address}
            onClick={() => onAccountSelect(email.address)}
            className={cn(
              'w-full flex items-center justify-between text-left px-3 py-2 rounded-lg transition-colors h-[44px]',
              textVariants.body.sm(),
              selectedAccount === email.address
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            <span className='truncate flex-1'>{email.name}</span>
            <ChainPill type={email.type} addressType={email.addressType} />
          </button>
        ))}
      </div>
    </div>
  );
};

const EmailAccountsList: React.FC<EmailAccountsListProps> = ({
  walletGroups,
  selectedAccount,
  expandedWallets,
  onAccountSelect,
  onToggleWallet,
  onAccountSettings,
  className = '',
}) => {
  return (
    <nav className={cn('space-y-1', className)}>
      {walletGroups.map(group => (
        <div key={group.walletAddress}>
          <button
            onClick={() => onAccountSelect(group.primaryEmail.address)}
            className={cn(
              'w-full flex items-center justify-between text-left px-3 py-2 rounded-lg transition-colors h-[44px]',
              textVariants.body.sm(),
              selectedAccount === group.primaryEmail.address &&
                group.domainEmails.length === 0
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
            style={
              group.customColor
                ? { backgroundColor: group.customColor }
                : undefined
            }
          >
            <div className='flex items-center flex-1 min-w-0'>
              <span className='truncate flex-1'>
                {formatWalletAddress(group.walletAddress)}
              </span>
              <ChainPill
                type={group.primaryEmail.type}
                addressType={group.addressType}
              />
            </div>
            {group.domainEmails.length > 0 && (
              <div
                onClick={e => {
                  e.stopPropagation();
                  onToggleWallet(group.walletAddress);
                }}
                className='p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer'
                role='button'
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleWallet(group.walletAddress);
                  }
                }}
              >
                <ChevronRightIcon
                  className={cn(
                    'h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out',
                    expandedWallets.includes(group.walletAddress)
                      ? 'rotate-90'
                      : 'rotate-0'
                  )}
                />
              </div>
            )}
          </button>

          {group.domainEmails.length > 0 && (
            <CollapsibleDomainEmails
              domainEmails={group.domainEmails}
              isExpanded={expandedWallets.includes(group.walletAddress)}
              selectedAccount={selectedAccount}
              onAccountSelect={onAccountSelect}
              onAccountSettings={onAccountSettings}
            />
          )}
        </div>
      ))}
    </nav>
  );
};

export { EmailAccountsList, type EmailAccount, type WalletEmailGroup };
