import React from 'react';
import { cn } from '@sudobility/components';

export interface MetricItem {
  value: string | number;
  label: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'gray';
  icon?: React.ReactNode;
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
}

export interface MetricsGridProps {
  title?: string;
  description?: string;
  metrics: MetricItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({
  title,
  description,
  metrics,
  columns = 3,
  className,
}) => {
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    pink: 'text-pink-600 dark:text-pink-400',
    gray: 'text-gray-600 dark:text-gray-400',
  };

  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={cn('py-16', className)}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {(title || description) && (
          <div className='text-center mb-12'>
            {title && (
              <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                {title}
              </h2>
            )}
            {description && (
              <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
                {description}
              </p>
            )}
          </div>
        )}

        <div className={cn('grid gap-8', gridClasses[columns])}>
          {metrics.map((metric, index) => {
            const colorClass = metric.color
              ? colorClasses[metric.color]
              : colorClasses.blue;

            return (
              <div
                key={index}
                className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-shadow'
              >
                {metric.icon && (
                  <div className={cn('flex justify-center mb-4', colorClass)}>
                    {metric.icon}
                  </div>
                )}

                <div className='space-y-2'>
                  <div className={cn('text-3xl font-bold', colorClass)}>
                    {metric.value}
                  </div>

                  <div className='text-gray-600 dark:text-gray-400 font-medium'>
                    {metric.label}
                  </div>

                  {metric.trend && (
                    <div
                      className={cn(
                        'text-sm font-semibold',
                        metric.trend.direction === 'up'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      )}
                    >
                      {metric.trend.direction === 'up' ? '↑' : '↓'}{' '}
                      {metric.trend.value}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
