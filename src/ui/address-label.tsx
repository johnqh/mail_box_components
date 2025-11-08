/**
 * AddressLabel Component
 *
 * Displays a shortened blockchain address (EVM or Solana) with tooltip showing full address.
 * Supports hover and click to show tooltip with full address.
 *
 * @example
 * ```tsx
 * <AddressLabel address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" />
 * <AddressLabel address="DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK" />
 * ```
 */

import React, { useState } from 'react';

export interface AddressLabelProps {
  /** Blockchain address (EVM or Solana) */
  address: string;

  /** Number of characters to show at start (default: 6) */
  prefixLength?: number;

  /** Number of characters to show at end (default: 4) */
  suffixLength?: number;

  /** Optional className for custom styling */
  className?: string;

  /** Whether to show copy button (default: false) */
  showCopy?: boolean;
}

/**
 * Shortens a blockchain address for display
 * @param address - Full address
 * @param prefixLength - Characters to show at start
 * @param suffixLength - Characters to show at end
 */
const shortenAddress = (
  address: string,
  prefixLength: number,
  suffixLength: number
): string => {
  if (!address) return '';
  if (address.length <= prefixLength + suffixLength) return address;
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
};

/**
 * AddressLabel - Displays shortened blockchain address with tooltip
 *
 * Features:
 * - Auto-shortens long addresses
 * - Tooltip shows full address on hover
 * - Click to copy full address
 * - Supports both EVM and Solana addresses
 * - Light/dark theme support
 */
export const AddressLabel: React.FC<AddressLabelProps> = ({
  address,
  prefixLength = 6,
  suffixLength = 4,
  className = '',
  showCopy = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [copied, setCopied] = useState(false);

  const shortAddress = shortenAddress(address, prefixLength, suffixLength);

  const handleClick = async () => {
    if (showCopy) {
      try {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    if (!copied) {
      setShowTooltip(false);
    }
  };

  return (
    <div className='relative inline-block'>
      <code
        className={`
          font-mono text-sm text-gray-900 dark:text-gray-100
          ${showCopy ? 'cursor-pointer hover:text-blue-600 dark:hover:text-blue-400' : ''}
          ${className}
        `}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={address}
      >
        {shortAddress}
      </code>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className='absolute z-50 left-1/2 transform -translate-x-1/2 -top-12 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded shadow-lg whitespace-nowrap'
          style={{ minWidth: 'max-content' }}
        >
          {copied ? (
            <span className='text-green-300'>✓ Copied!</span>
          ) : (
            <span className='font-mono'>{address}</span>
          )}
          {/* Arrow */}
          <div className='absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700' />
        </div>
      )}
    </div>
  );
};

export default AddressLabel;
