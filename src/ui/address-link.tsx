/**
 * AddressLink Component
 *
 * Displays a blockchain address with copy and block explorer link functionality.
 * Supports both EVM chains (Etherscan, etc.) and Solana chains.
 */

import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { textVariants } from '@sudobility/design';

export interface AddressLinkProps {
  /** The blockchain address to display */
  address: string;
  /** Chain ID for EVM chains (positive) or Solana chains (negative) */
  chainId?: number;
  /** Block explorer base URL (if not using chainId) */
  explorerUrl?: string;
  /** Label to display before the address */
  label?: string;
  /** Display format: 'short' (default), 'medium', or 'full' */
  format?: 'short' | 'medium' | 'full';
  /** Show copy button */
  showCopy?: boolean;
  /** Show explorer link button */
  showExplorer?: boolean;
  /** Custom className */
  className?: string;
  /** Custom text className */
  textClassName?: string;
}

/**
 * Get block explorer URL for an address
 */
const getExplorerUrl = (
  address: string,
  chainId?: number,
  explorerUrl?: string
): string | null => {
  // If custom explorer URL provided, use it
  if (explorerUrl) {
    return `${explorerUrl}/address/${address}`;
  }

  // If no chainId, can't determine explorer
  if (!chainId) {
    return null;
  }

  // Solana chains (negative chainIds)
  if (chainId < 0) {
    // Solana Mainnet: -101, Devnet: -102, Testnet: -103
    const cluster =
      chainId === -101
        ? ''
        : chainId === -102
          ? '?cluster=devnet'
          : '?cluster=testnet';
    return `https://explorer.solana.com/address/${address}${cluster}`;
  }

  // EVM chains - map chainId to explorer
  const explorerMap: Record<number, string> = {
    1: 'https://etherscan.io', // Ethereum Mainnet
    11155111: 'https://sepolia.etherscan.io', // Sepolia
    5: 'https://goerli.etherscan.io', // Goerli
    137: 'https://polygonscan.com', // Polygon
    80002: 'https://amoy.polygonscan.com', // Polygon Amoy
    42161: 'https://arbiscan.io', // Arbitrum One
    421614: 'https://sepolia.arbiscan.io', // Arbitrum Sepolia
    10: 'https://optimistic.etherscan.io', // Optimism
    11155420: 'https://sepolia-optimism.etherscan.io', // Optimism Sepolia
    8453: 'https://basescan.org', // Base
    84532: 'https://sepolia.basescan.org', // Base Sepolia
  };

  const baseUrl = explorerMap[chainId];
  if (!baseUrl) {
    return null;
  }

  return `${baseUrl}/address/${address}`;
};

/**
 * Format address based on display format
 */
const formatAddress = (
  address: string,
  format: 'short' | 'medium' | 'full'
): string => {
  if (format === 'full') {
    return address;
  }

  if (format === 'medium') {
    return `${address.substring(0, 10)}...${address.substring(address.length - 8)}`;
  }

  // short (default)
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

/**
 * AddressLink Component
 */
export const AddressLink: React.FC<AddressLinkProps> = ({
  address,
  chainId,
  explorerUrl,
  label,
  format = 'short',
  showCopy = true,
  showExplorer = true,
  className = '',
  textClassName = '',
}) => {
  const [copied, setCopied] = useState(false);

  const formattedAddress = formatAddress(address, format);
  const explorerLink = getExplorerUrl(address, chainId, explorerUrl);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Copy failed
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {label && <span className={textVariants.label.default()}>{label}:</span>}

      <span className={cn('font-mono text-sm', textClassName)}>
        {formattedAddress}
      </span>

      <div className='flex items-center gap-1'>
        {showCopy && (
          <button
            onClick={handleCopy}
            className={cn(
              'p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
              'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            )}
            title={copied ? 'Copied!' : 'Copy address'}
            aria-label='Copy address'
          >
            {copied ? (
              <svg
                className='w-4 h-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            ) : (
              <svg
                className='w-4 h-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                />
              </svg>
            )}
          </button>
        )}

        {showExplorer && explorerLink && (
          <a
            href={explorerLink}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
              'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400'
            )}
            title='View on block explorer'
            aria-label='View on block explorer'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default AddressLink;
