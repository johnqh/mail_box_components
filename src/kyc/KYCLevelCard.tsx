/**
 * KYC Level Card Component
 *
 * Displays subscription tier information with features and pricing
 */

import React from 'react';
import {
  colors,
  textVariants,
  getStatusIndicatorColor,
} from '@sudobility/design';

export type KYCLevel = 'basic' | 'enhanced' | 'accredited';

interface KYCLevelCardProps {
  level: KYCLevel;
  price: string;
  features: string[];
  isActive?: boolean;
  isVerified?: boolean;
  onSelect?: () => void;
  className?: string;
}

const levelConfig = {
  basic: {
    title: 'Basic KYC',
    description: 'Age & Identity Verification',
    color: 'border-blue-200',
    activeColor: 'border-blue-500 bg-blue-50',
  },
  enhanced: {
    title: 'Enhanced KYC',
    description: 'Basic + Country & Compliance',
    color: 'border-purple-200',
    activeColor: 'border-purple-500 bg-purple-50',
  },
  accredited: {
    title: 'Accredited Investor',
    description: 'Enhanced + Financial Verification',
    color: 'border-gold-200',
    activeColor: 'border-gold-500 bg-gold-50',
  },
};

export const KYCLevelCard: React.FC<KYCLevelCardProps> = ({
  level,
  price,
  features,
  isActive = false,
  isVerified = false,
  onSelect,
  className = '',
}) => {
  const config = levelConfig[level];

  return (
    <div
      className={`
        relative border-2 rounded-lg p-6 transition-all
        ${isActive ? config.activeColor : `${config.color} hover:border-gray-400`}
        ${className}
      `}
    >
      {isVerified && (
        <div className='absolute top-4 right-4'>
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors.component.badge.success.base} ${colors.component.badge.success.dark}`}
          >
            ✓ Verified
          </span>
        </div>
      )}

      <h3 className='text-xl font-bold mb-2'>{config.title}</h3>
      <p className={`${textVariants.body.md()} mb-4`}>{config.description}</p>
      <p className='text-3xl font-bold mb-4'>
        {price}
        <span className={`text-sm font-normal ${textVariants.body.sm()}`}>
          /year
        </span>
      </p>

      <ul className='space-y-2 mb-6'>
        {features.map((feature, index) => (
          <li key={index} className='flex items-start gap-2'>
            <span
              className={`${getStatusIndicatorColor('success').replace('bg-', 'text-')} mt-0.5`}
            >
              ✓
            </span>
            <span className='text-sm'>{feature}</span>
          </li>
        ))}
      </ul>

      {onSelect && (
        <button
          onClick={onSelect}
          disabled={isVerified}
          className={`
            w-full py-2 px-4 rounded font-medium transition-colors
            ${
              isVerified
                ? `${colors.component.badge.default.base} ${colors.component.badge.default.dark} cursor-not-allowed`
                : isActive
                  ? `${colors.component.button.primary.base} ${colors.component.button.primary.dark}`
                  : `${colors.component.badge.default.base} ${colors.component.badge.default.dark} hover:bg-gray-300 dark:hover:bg-gray-600`
            }
          `}
        >
          {isVerified ? 'Verified' : isActive ? 'Current Plan' : 'Select Plan'}
        </button>
      )}
    </div>
  );
};
