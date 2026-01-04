import React from 'react';
import { cn } from '@sudobility/components';
import { ui } from '@sudobility/design';

export interface UseCase {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'gray';
}

export interface UseCaseGridProps {
  title?: string;
  description?: string;
  useCases: UseCase[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export const UseCaseGrid: React.FC<UseCaseGridProps> = ({
  title,
  description,
  useCases,
  columns = 3,
  className,
}) => {
  const containerClass = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

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
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={cn(ui.section.gradient, className)}>
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

        <div className={cn('grid gap-8', gridClasses[columns])}>
          {useCases.map((useCase, index) => {
            const iconColor = useCase.color
              ? colorClasses[useCase.color]
              : colorClasses.blue;

            return (
              <div
                key={index}
                className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow'
              >
                <div className={cn('flex-shrink-0 mb-4', iconColor)}>
                  {useCase.icon}
                </div>

                <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
                  {useCase.title}
                </h3>

                <p className='text-gray-600 dark:text-gray-300 mb-4'>
                  {useCase.description}
                </p>

                {useCase.examples && useCase.examples.length > 0 && (
                  <div>
                    <h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                      Examples:
                    </h4>
                    <ul className='space-y-1'>
                      {useCase.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className='flex items-start'>
                          <div
                            className={cn(
                              'w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0',
                              useCase.color
                                ? `bg-${useCase.color}-500`
                                : 'bg-blue-500'
                            )}
                          />
                          <span className='text-sm text-gray-600 dark:text-gray-400'>
                            {example}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
