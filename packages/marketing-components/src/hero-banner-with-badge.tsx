import React from 'react';
import { cn, useLayout } from '@sudobility/components';

export interface ButtonConfig {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export interface HeroBannerWithBadgeProps {
  badgeIcon?: React.ReactNode;
  badgeText: string;
  badgeColor?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'gray';
  title: string | React.ReactNode;
  subtitle?: string;
  description: string;
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
  className?: string;
  children?: React.ReactNode;
}

export const HeroBannerWithBadge: React.FC<HeroBannerWithBadgeProps> = ({
  badgeIcon,
  badgeText,
  badgeColor = 'blue',
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  className,
  children,
}) => {
  const { containerClass } = useLayout();

  const badgeColorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200',
    green:
      'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200',
    purple:
      'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-200',
    orange:
      'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700 text-orange-800 dark:text-orange-200',
    pink: 'bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700 text-pink-800 dark:text-pink-200',
    gray: 'bg-gray-100 dark:bg-gray-900/30 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200',
  };

  const badgeClasses = badgeColorClasses[badgeColor];

  return (
    <section className={cn('py-20', className)}>
      <div className={`${containerClass} text-center`}>
        <div
          className={cn(
            'inline-flex items-center border px-6 py-3 rounded-full mb-6',
            badgeClasses
          )}
        >
          {badgeIcon && <span className='mr-3'>{badgeIcon}</span>}
          <span className='font-semibold'>{badgeText}</span>
        </div>

        <h1 className='text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6'>
          {typeof title === 'string' ? (
            <span dangerouslySetInnerHTML={{ __html: title }} />
          ) : (
            title
          )}
          {subtitle && (
            <span className='text-blue-600 dark:text-blue-400 block'>
              {subtitle}
            </span>
          )}
        </h1>

        <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed'>
          {description}
        </p>

        {(primaryButton || secondaryButton) && (
          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
            {primaryButton &&
              (primaryButton.href ? (
                <a
                  href={primaryButton.href}
                  className={cn(
                    'px-8 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors inline-block',
                    primaryButton.className
                  )}
                >
                  {primaryButton.text}
                </a>
              ) : (
                <button
                  onClick={primaryButton.onClick}
                  className={cn(
                    'px-8 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors',
                    primaryButton.className
                  )}
                >
                  {primaryButton.text}
                </button>
              ))}
            {secondaryButton &&
              (secondaryButton.href ? (
                <a
                  href={secondaryButton.href}
                  className={cn(
                    'px-8 py-3 rounded-md border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 transition-colors inline-block',
                    secondaryButton.className
                  )}
                >
                  {secondaryButton.text}
                </a>
              ) : (
                <button
                  onClick={secondaryButton.onClick}
                  className={cn(
                    'px-8 py-3 rounded-md border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 transition-colors',
                    secondaryButton.className
                  )}
                >
                  {secondaryButton.text}
                </button>
              ))}
          </div>
        )}

        {children}
      </div>
    </section>
  );
};
