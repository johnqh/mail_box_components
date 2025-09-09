import React from 'react';
import { cn } from '../lib/utils';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits?: string[];
  metrics?: { [key: string]: string };
  color?: string;
  isHighlight?: boolean;
  learnMoreUrl?: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  benefits,
  metrics,
  color = 'blue',
  isHighlight = false,
  learnMoreUrl,
  className
}) => {
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    pink: 'text-pink-600 dark:text-pink-400',
    gray: 'text-gray-600 dark:text-gray-400'
  };

  const iconColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  const CardContent = () => (
    <>
      <div className={cn("flex-shrink-0 mb-4", iconColor)}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {description}
        </p>
        
        {benefits && benefits.length > 0 && (
          <ul className="space-y-2 mb-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className={cn("w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0", 
                  `bg-${color}-500`
                )} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        )}
        
        {metrics && Object.keys(metrics).length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {Object.entries(metrics).map(([key, value], index) => (
              <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className={cn("text-lg font-bold", iconColor)}>
                  {value}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {key}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (learnMoreUrl) {
    return (
      <a
        href={learnMoreUrl}
        className={cn(
          "block group p-6 rounded-xl border transition-all duration-200 hover:shadow-lg",
          isHighlight 
            ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
          className
        )}
      >
        <CardContent />
      </a>
    );
  }

  return (
    <div
      className={cn(
        "p-6 rounded-xl border",
        isHighlight 
          ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
        className
      )}
    >
      <CardContent />
    </div>
  );
};