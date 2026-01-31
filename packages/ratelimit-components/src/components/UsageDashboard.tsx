import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/cn';
import type {
  UsageDashboardProps,
  UsageBarConfig,
  UsageBarColor,
} from '../types';

// =============================================================================
// Progress Bar Variants
// =============================================================================

const progressBarVariants = cva(
  'h-full rounded-full transition-all duration-300',
  {
    variants: {
      color: {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500',
        purple: 'bg-purple-500',
      },
    },
    defaultVariants: {
      color: 'blue',
    },
  }
);

// =============================================================================
// Helper Functions
// =============================================================================

function getPercentage(used: number, limit: number | null): number {
  if (limit === null || limit === 0) return 0;
  return Math.min(100, (used / limit) * 100);
}

function getAutoColor(used: number, limit: number | null): UsageBarColor {
  if (limit === null) return 'green'; // Unlimited
  const percentage = getPercentage(used, limit);
  if (percentage >= 90) return 'red';
  if (percentage >= 70) return 'yellow';
  return 'blue';
}

function formatResetTime(resetsAt: string): string {
  const resetDate = new Date(resetsAt);
  const now = new Date();
  const diffMs = resetDate.getTime() - now.getTime();

  if (diffMs <= 0) return 'now';

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  } else if (diffHours < 24) {
    const mins = diffMinutes % 60;
    return mins > 0 ? `${diffHours}h ${mins}m` : `${diffHours}h`;
  } else {
    const hours = diffHours % 24;
    return hours > 0 ? `${diffDays}d ${hours}h` : `${diffDays}d`;
  }
}

// =============================================================================
// UsageBar Component
// =============================================================================

interface UsageBarProps {
  config: UsageBarConfig;
  showPercentage?: boolean;
  showRemaining?: boolean;
  labels: {
    usedLabel: string;
    limitLabel: string;
    unlimitedLabel: string;
    remainingLabel: string;
    resetsLabel: string;
  };
}

const UsageBar: React.FC<UsageBarProps> = ({
  config,
  showPercentage = true,
  showRemaining = true,
  labels,
}) => {
  const { label, used, limit, color, resetsAt } = config;
  const percentage = getPercentage(used, limit);
  const autoColor = color ?? getAutoColor(used, limit);
  const remaining = limit !== null ? Math.max(0, limit - used) : null;
  const isUnlimited = limit === null;

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
          {label}
        </span>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          {used.toLocaleString()} {labels.usedLabel}
          {!isUnlimited && ` / ${limit.toLocaleString()} ${labels.limitLabel}`}
          {isUnlimited && ` (${labels.unlimitedLabel})`}
        </span>
      </div>

      {!isUnlimited && (
        <div className='relative'>
          <div className='h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
            <div
              className={cn(progressBarVariants({ color: autoColor }))}
              style={{ width: `${percentage}%` }}
            />
          </div>
          {showPercentage && (
            <span className='absolute right-0 top-4 text-xs text-gray-500 dark:text-gray-400'>
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}

      {isUnlimited && (
        <div className='h-3 w-full rounded-full bg-green-100 dark:bg-green-900/30'>
          <div className='h-full w-full rounded-full bg-green-500/20' />
        </div>
      )}

      <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
        {showRemaining && remaining !== null && (
          <span>{remaining.toLocaleString()} {labels.remainingLabel}</span>
        )}
        {!showRemaining && <span />}
        {resetsAt && (
          <span>{labels.resetsLabel} {formatResetTime(resetsAt)}</span>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// UsageDashboard Component
// =============================================================================

const defaultLabels = {
  title: 'Usage',
  usedLabel: 'used',
  limitLabel: 'limit',
  unlimitedLabel: 'Unlimited',
  remainingLabel: 'remaining',
  resetsLabel: 'Resets in',
};

export const UsageDashboard: React.FC<UsageDashboardProps> = ({
  usageBars,
  currentTierName,
  labels: customLabels,
  onUpgradeClick,
  upgradeButtonLabel = 'Upgrade',
  className,
  showPercentage = true,
  showRemaining = true,
  onTrack,
  trackingLabel,
  componentName = 'UsageDashboard',
}) => {
  const labels = { ...defaultLabels, ...customLabels };

  const handleUpgradeClick = () => {
    onTrack?.({ action: 'upgrade_click', trackingLabel, componentName });
    onUpgradeClick?.();
  };

  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800',
        className
      )}
    >
      {/* Header */}
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
            {labels.title}
          </h3>
          {currentTierName && (
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {currentTierName}
            </p>
          )}
        </div>
        {onUpgradeClick && (
          <button
            onClick={handleUpgradeClick}
            className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
          >
            {upgradeButtonLabel}
          </button>
        )}
      </div>

      {/* Usage Bars */}
      <div className='space-y-6'>
        {usageBars.map((bar, index) => (
          <UsageBar
            key={`${bar.label}-${index}`}
            config={bar}
            showPercentage={showPercentage}
            showRemaining={showRemaining}
            labels={{
              usedLabel: labels.usedLabel ?? defaultLabels.usedLabel,
              limitLabel: labels.limitLabel ?? defaultLabels.limitLabel,
              unlimitedLabel:
                labels.unlimitedLabel ?? defaultLabels.unlimitedLabel,
              remainingLabel:
                labels.remainingLabel ?? defaultLabels.remainingLabel,
              resetsLabel: labels.resetsLabel ?? defaultLabels.resetsLabel,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default UsageDashboard;
