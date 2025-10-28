import React from 'react';
import { cn } from '../lib/utils';

export interface FeatureTileProps {
  /**
   * Icon or emoji to display at the top of the tile
   */
  icon: React.ReactNode;

  /**
   * Title of the feature
   */
  title: string;

  /**
   * Description of the feature
   */
  description: string;

  /**
   * Optional border color for accent (e.g., 'green', 'blue', 'purple', 'orange')
   */
  borderColor?: 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'indigo' | 'cyan' | 'emerald';

  /**
   * Optional className for additional styling
   */
  className?: string;

  /**
   * Optional click handler
   */
  onClick?: () => void;

  /**
   * If true, adds hover effects and cursor pointer
   */
  interactive?: boolean;
}

/**
 * FeatureTile - A simple, clean tile component for displaying features
 *
 * Features:
 * - Full dark mode support
 * - Optional colored left border accent
 * - Elevation with shadow (lg) and hover effect (xl)
 * - Responsive padding and spacing
 * - Accessible markup
 *
 * @example
 * ```tsx
 * <FeatureTile
 *   icon="⚡"
 *   title="Zero Setup Required"
 *   description="No account creation, email verification, or complex setup."
 * />
 * ```
 *
 * @example With border color
 * ```tsx
 * <FeatureTile
 *   icon={<ShieldCheckIcon className="h-6 w-6" />}
 *   title="Secure & Private"
 *   description="Your data is encrypted and private by default."
 *   borderColor="green"
 *   interactive
 * />
 * ```
 */
export const FeatureTile: React.FC<FeatureTileProps> = ({
  icon,
  title,
  description,
  borderColor,
  className,
  onClick,
  interactive = false,
}) => {
  const borderColorClasses = {
    green: 'border-l-4 border-green-500',
    blue: 'border-l-4 border-blue-500',
    purple: 'border-l-4 border-purple-500',
    orange: 'border-l-4 border-orange-500',
    red: 'border-l-4 border-red-500',
    indigo: 'border-l-4 border-indigo-500',
    cyan: 'border-l-4 border-cyan-500',
    emerald: 'border-l-4 border-emerald-500',
  };

  const iconBackgroundClasses = borderColor
    ? {
        green: 'bg-green-100 dark:bg-green-900/20',
        blue: 'bg-blue-100 dark:bg-blue-900/20',
        purple: 'bg-purple-100 dark:bg-purple-900/20',
        orange: 'bg-orange-100 dark:bg-orange-900/20',
        red: 'bg-red-100 dark:bg-red-900/20',
        indigo: 'bg-indigo-100 dark:bg-indigo-900/20',
        cyan: 'bg-cyan-100 dark:bg-cyan-900/20',
        emerald: 'bg-emerald-100 dark:bg-emerald-900/20',
      }[borderColor]
    : undefined;

  const iconColorClasses = borderColor
    ? {
        green: 'text-green-600 dark:text-green-400',
        blue: 'text-blue-600 dark:text-blue-400',
        purple: 'text-purple-600 dark:text-purple-400',
        orange: 'text-orange-600 dark:text-orange-400',
        red: 'text-red-600 dark:text-red-400',
        indigo: 'text-indigo-600 dark:text-indigo-400',
        cyan: 'text-cyan-600 dark:text-cyan-400',
        emerald: 'text-emerald-600 dark:text-emerald-400',
      }[borderColor]
    : undefined;

  return (
    <div
      className={cn(
        // Base styles with dark mode support
        'bg-white dark:bg-gray-800',
        'rounded-xl',
        'p-6',
        'shadow-lg hover:shadow-xl',
        'transition-all duration-200',
        // Border accent if specified
        borderColor && borderColorClasses[borderColor],
        // Interactive states
        (interactive || onClick) && 'cursor-pointer hover:scale-[1.02]',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {/* Icon container */}
      {typeof icon === 'string' ? (
        // Emoji or text icon
        <div className="text-4xl mb-4">{icon}</div>
      ) : iconBackgroundClasses ? (
        // Icon with colored background
        <div
          className={cn(
            'w-12 h-12',
            'rounded-lg',
            'flex items-center justify-center',
            'mb-4',
            iconBackgroundClasses,
            iconColorClasses,
            (interactive || onClick) && 'group-hover:scale-110 transition-transform'
          )}
        >
          {icon}
        </div>
      ) : (
        // Regular icon
        <div className="mb-4">{icon}</div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureTile;
