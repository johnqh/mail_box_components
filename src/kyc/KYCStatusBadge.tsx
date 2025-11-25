/**
 * KYC Status Badge Component
 *
 * Displays verification status with color-coded badges
 */

import React from 'react';

export type KYCStatus = 'pending' | 'in_progress' | 'verified' | 'rejected';
export type KYCLevel = 'basic' | 'enhanced' | 'accredited';

interface KYCStatusBadgeProps {
  status: KYCStatus;
  level: KYCLevel;
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-gray-500',
    textColor: 'text-white',
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-blue-500',
    textColor: 'text-white',
  },
  verified: {
    label: 'Verified',
    color: 'bg-green-500',
    textColor: 'text-white',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-500',
    textColor: 'text-white',
  },
};

const levelLabels = {
  basic: 'Basic KYC',
  enhanced: 'Enhanced KYC',
  accredited: 'Accredited Investor',
};

export const KYCStatusBadge: React.FC<KYCStatusBadgeProps> = ({
  status,
  level,
  className = '',
}) => {
  const config = statusConfig[status];
  const levelLabel = levelLabels[level];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${config.color} ${config.textColor}`}
      >
        {levelLabel}: {config.label}
      </span>
    </div>
  );
};
