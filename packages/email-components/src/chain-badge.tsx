import React from 'react';
import { cn } from '@sudobility/components';

export type ChainType = 'evm' | 'solana' | 'bitcoin' | 'other';

export interface ChainBadgeProps {
  chainType: ChainType;
  size?: 'sm' | 'md' | 'lg';
}

const chainColors = {
  evm: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  solana:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  bitcoin:
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
  lg: 'text-base px-3 py-1',
};

export const ChainBadge: React.FC<ChainBadgeProps> = ({
  chainType,
  size = 'md',
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        chainColors[chainType],
        sizeClasses[size]
      )}
    >
      {chainType.toUpperCase()}
    </span>
  );
};
