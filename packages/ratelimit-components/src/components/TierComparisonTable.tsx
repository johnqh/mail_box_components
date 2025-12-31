import React from 'react';
import { cn } from '../lib/cn';
import type { TierComparisonTableProps } from '../types';

// =============================================================================
// Default Labels
// =============================================================================

const defaultLabels = {
  title: 'Plan Comparison',
  tierHeader: 'Plan',
  hourlyHeader: 'Hourly',
  dailyHeader: 'Daily',
  monthlyHeader: 'Monthly',
  unlimitedLabel: 'Unlimited',
  currentTierBadge: 'Current',
};

// =============================================================================
// Helper Functions
// =============================================================================

function defaultFormatNumber(n: number): string {
  return n.toLocaleString();
}

// =============================================================================
// TierComparisonTable Component
// =============================================================================

export const TierComparisonTable: React.FC<TierComparisonTableProps> = ({
  tiers,
  labels: customLabels,
  onTierSelect,
  className,
  formatNumber = defaultFormatNumber,
}) => {
  const labels = { ...defaultLabels, ...customLabels };

  const formatLimit = (limit: number | null): string => {
    if (limit === null)
      return labels.unlimitedLabel ?? defaultLabels.unlimitedLabel;
    return formatNumber(limit);
  };

  const renderLimitCell = (limit: number | null): React.ReactNode => {
    const isUnlimited = limit === null;
    return (
      <span
        className={cn(
          'text-sm',
          isUnlimited
            ? 'font-medium text-green-600 dark:text-green-400'
            : 'text-gray-700 dark:text-gray-300'
        )}
      >
        {formatLimit(limit)}
      </span>
    );
  };

  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800',
        className
      )}
    >
      {/* Title */}
      {labels.title && (
        <div className='border-b border-gray-200 px-6 py-4 dark:border-gray-700'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
            {labels.title}
          </h3>
        </div>
      )}

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50'>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {labels.tierHeader}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {labels.hourlyHeader}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {labels.dailyHeader}
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                {labels.monthlyHeader}
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
            {tiers.map(tier => (
              <tr
                key={tier.id}
                onClick={() => onTierSelect?.(tier.id)}
                className={cn(
                  'transition-colors',
                  tier.isHighlighted && 'bg-blue-50 dark:bg-blue-900/20',
                  tier.isCurrent && 'bg-green-50 dark:bg-green-900/20',
                  onTierSelect &&
                    'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50'
                )}
              >
                {/* Tier Name */}
                <td className='whitespace-nowrap px-6 py-4'>
                  <div className='flex items-center gap-2'>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        tier.isCurrent
                          ? 'text-green-700 dark:text-green-400'
                          : tier.isHighlighted
                            ? 'text-blue-700 dark:text-blue-400'
                            : 'text-gray-900 dark:text-white'
                      )}
                    >
                      {tier.name}
                    </span>
                    {tier.isCurrent && (
                      <span className='inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/50 dark:text-green-400'>
                        {labels.currentTierBadge}
                      </span>
                    )}
                  </div>
                </td>

                {/* Hourly Limit */}
                <td className='whitespace-nowrap px-6 py-4 text-right'>
                  {renderLimitCell(tier.hourlyLimit)}
                </td>

                {/* Daily Limit */}
                <td className='whitespace-nowrap px-6 py-4 text-right'>
                  {renderLimitCell(tier.dailyLimit)}
                </td>

                {/* Monthly Limit */}
                <td className='whitespace-nowrap px-6 py-4 text-right'>
                  {renderLimitCell(tier.monthlyLimit)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TierComparisonTable;
