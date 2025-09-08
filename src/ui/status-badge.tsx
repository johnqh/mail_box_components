import React from 'react';
import { variants } from '@johnqh/design-system';

export type StatusType = 'verified' | 'connected' | 'disconnected' | 'pending' | 'error' | 'success' | 'warning';

// Local ChainType enum to avoid @johnqh/lib dependency
export type ChainType = 'evm' | 'solana' | 'unknown';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  showDot?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

interface ChainBadgeProps {
  chainType: ChainType;
  size?: 'sm' | 'md' | 'lg';
}

// Status styles are now handled by design system badge variants
const getStatusDotColor = (status: StatusType) => {
  switch (status) {
    case 'verified':
    case 'success':
      return 'bg-green-500';
    case 'connected':
    case 'warning':
      return 'bg-amber-500';
    case 'disconnected':
    case 'error':
      return 'bg-red-500';
    case 'pending':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

// Dot size classes for different badge sizes
const getDotSizeClass = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'w-1.5 h-1.5';
    case 'lg':
      return 'w-3 h-3';
    default: // md
      return 'w-2 h-2';
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  showDot = true,
  size = 'md'
}) => {
  const defaultLabels: Record<StatusType, string> = {
    verified: 'Verified',
    connected: 'Connected',
    disconnected: 'Disconnected',
    pending: 'Pending',
    error: 'Error',
    success: 'Success',
    warning: 'Warning'
  };

  const displayLabel = label || defaultLabels[status];

  // Use design system badge variants for consistent styling
  const getDesignSystemVariant = (status: StatusType, size: 'sm' | 'md' | 'lg') => {
    const sizeMap = { sm: 'small', md: 'default', lg: 'large' } as const;
    const variantMap = {
      verified: 'success',
      success: 'success',
      connected: 'warning', 
      warning: 'warning',
      disconnected: 'error',
      error: 'error',
      pending: 'primary'
    } as const;
    
    const variant = variantMap[status] || 'default';
    const badgeSize = sizeMap[size];
    
    if (badgeSize === 'default') {
      return variants.badge[variant as keyof typeof variants.badge]() as string;
    } else {
      return variants.badge[badgeSize](variant) as string;
    }
  };

  const badgeClass = getDesignSystemVariant(status, size);
  const dotColor = getStatusDotColor(status);
  const dotSize = getDotSizeClass(size);

  return (
    <span className={badgeClass}>
      {showDot && (
        <span className={`inline-block ${dotSize} rounded-full ${dotColor} mr-1`} />
      )}
      {displayLabel}
    </span>
  );
};

export const ChainBadge: React.FC<ChainBadgeProps> = ({
  chainType,
  size = 'md'
}) => {
  if (chainType === 'unknown') return null;

  const chainLabel = chainType === 'solana' ? 'SOL' : 'ETH';
  const sizeMap = { sm: 'small', md: 'default', lg: 'large' } as const;
  const badgeSize = sizeMap[size];
  
  // Use design system Web3 badge variants
  const getBadgeClass = () => {
    const badgeType = chainType === 'solana' ? 'solana' : 'ethereum';
    if (badgeSize === 'default') {
      return variants.badge[badgeType]();
    } else {
      return variants.badge[badgeSize](badgeType);
    }
  };

  return (
    <span className={getBadgeClass() as string}>
      {chainLabel}
    </span>
  );
};