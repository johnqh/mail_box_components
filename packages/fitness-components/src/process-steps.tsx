import React from 'react';
import { cn, useLayout } from '@sudobility/components';

export interface ProcessStep {
  step: number | string;
  title: string;
  description: string;
  details?: string[];
  icon?: React.ReactNode;
}

export interface ProcessStepsProps {
  title?: string;
  description?: string;
  steps: ProcessStep[];
  orientation?: 'horizontal' | 'vertical';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'gray';
  className?: string;
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({
  title,
  description,
  steps,
  orientation = 'vertical',
  color = 'blue',
  className,
}) => {
  const { containerClass } = useLayout();

  const colorClasses = {
    blue: {
      bg: 'bg-blue-600',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
    },
    green: {
      bg: 'bg-green-600',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
    },
    purple: {
      bg: 'bg-purple-600',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
    },
    orange: {
      bg: 'bg-orange-600',
      text: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-800',
    },
    pink: {
      bg: 'bg-pink-600',
      text: 'text-pink-600 dark:text-pink-400',
      border: 'border-pink-200 dark:border-pink-800',
    },
    gray: {
      bg: 'bg-gray-600',
      text: 'text-gray-600 dark:text-gray-400',
      border: 'border-gray-200 dark:border-gray-800',
    },
  };

  const colors = colorClasses[color];

  return (
    <section className={cn('py-16', className)}>
      <div className={containerClass}>
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

        <div
          className={cn(
            orientation === 'horizontal'
              ? 'flex flex-col lg:flex-row justify-center items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8'
              : 'space-y-8 max-w-4xl mx-auto'
          )}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                'relative',
                orientation === 'horizontal'
                  ? 'flex-1 text-center lg:text-left'
                  : 'flex items-start'
              )}
            >
              {/* Step Number/Icon */}
              <div
                className={cn(
                  'flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold',
                  colors.bg,
                  orientation === 'horizontal'
                    ? 'w-12 h-12 mx-auto lg:mx-0 mb-4'
                    : 'w-10 h-10 mr-4 mt-1'
                )}
              >
                {step.icon ? step.icon : step.step}
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && orientation === 'vertical' && (
                <div
                  className={cn(
                    'absolute left-5 top-12 w-px h-8 -ml-px',
                    colors.bg.replace('bg-', 'bg-').replace('-600', '-200'),
                    'dark:' +
                      colors.bg.replace('bg-', 'bg-').replace('-600', '-800')
                  )}
                />
              )}

              {/* Content */}
              <div
                className={cn(
                  orientation === 'horizontal' ? 'flex-1' : 'flex-1 min-w-0'
                )}
              >
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                  {step.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-300 mb-3'>
                  {step.description}
                </p>

                {step.details && step.details.length > 0 && (
                  <ul className='space-y-1'>
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className='flex items-start'>
                        <div
                          className={cn(
                            'w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0',
                            colors.bg
                          )}
                        />
                        <span className='text-sm text-gray-600 dark:text-gray-400'>
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
