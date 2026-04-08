/**
 * KYC Status Badge Component
 *
 * Displays verification status with color-coded badges
 */

import React from 'react';
import { colors } from '@sudobility/design';

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
    color: `${colors.component.badge.default.base} ${colors.component.badge.default.dark}`,
  },
  in_progress: {
    label: 'In Progress',
    color: `${colors.component.badge.primary.base} ${colors.component.badge.primary.dark}`,
  },
  verified: {
    label: 'Verified',
    color: `${colors.component.badge.success.base} ${colors.component.badge.success.dark}`,
  },
  rejected: {
    label: 'Rejected',
    color: `${colors.component.badge.error.base} ${colors.component.badge.error.dark}`,
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
        className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        {levelLabel}: {config.label}
      </span>
    </div>
  );
};
