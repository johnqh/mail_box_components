import React from 'react';
import { cn } from '../lib/utils';
import { colors, textVariants } from '@sudobility/design';

export interface InfoBoxProps {
  /** Content to display in the info box */
  children: React.ReactNode;
  /** Title/heading for the info box */
  title?: string;
  /** Color variant */
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  /** Size/padding variant */
  size?: 'sm' | 'md' | 'lg';
  /** Icon component to display */
  icon?: React.ComponentType<{ className?: string }>;
  /** Show border */
  bordered?: boolean;
  /** Additional className for the container */
  className?: string;
}

/**
 * InfoBox Component
 *
 * A versatile callout/info box component for highlighting important information,
 * tips, warnings, or notes. Commonly used in documentation, settings pages,
 * and forms.
 *
 * @example
 * ```tsx
 * <InfoBox variant="info" title="Quick Start">
 *   <ol>
 *     <li>Connect your wallet</li>
 *     <li>Sign the message</li>
 *     <li>Access your email</li>
 *   </ol>
 * </InfoBox>
 * ```
 *
 * @example
 * ```tsx
 * import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
 *
 * <InfoBox variant="warning" icon={ExclamationTriangleIcon}>
 *   <strong>Note:</strong> Each wallet creates a unique email address.
 * </InfoBox>
 * ```
 */
export const InfoBox: React.FC<InfoBoxProps> = ({
  children,
  title,
  variant = 'info',
  size = 'md',
  icon: Icon,
  bordered = true,
  className,
}) => {
  // Color variant configurations using design system alert icon tokens
  // Note: alert.*.base combines bg+border+text and can't be split for this
  // component's structure, so we keep individual classes but use DS icon colors.
  const variantClasses = {
    info: {
      bg: 'bg-info/10',
      border: 'border-info/30',
      title: 'text-info',
      text: 'text-info',
      icon: colors.component.alert.info.icon,
    },
    success: {
      bg: 'bg-success/10',
      border: 'border-success/30',
      title: 'text-success',
      text: 'text-success',
      icon: colors.component.alert.success.icon,
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/30',
      title: 'text-warning',
      text: 'text-warning',
      icon: colors.component.alert.warning.icon,
    },
    danger: {
      bg: 'bg-destructive/10',
      border: 'border-destructive/30',
      title: 'text-destructive',
      text: 'text-destructive',
      icon: colors.component.alert.error.icon,
    },
    neutral: {
      bg: 'bg-muted',
      border: 'border-border',
      title: 'text-foreground',
      text: 'text-muted-foreground',
      icon: 'text-muted-foreground',
    },
  };

  // Size/padding configurations
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variantConfig = variantClasses[variant];

  return (
    <div
      className={cn(
        'rounded-lg',
        variantConfig.bg,
        bordered && `border ${variantConfig.border}`,
        sizeClasses[size],
        className
      )}
    >
      {(title || Icon) && (
        <div className='flex items-start gap-3 mb-2'>
          {Icon && (
            <Icon
              className={cn('h-5 w-5 flex-shrink-0 mt-0.5', variantConfig.icon)}
            />
          )}
          {title && (
            <h3
              className={cn(textVariants.body.strong.md(), variantConfig.title)}
            >
              {title}
            </h3>
          )}
        </div>
      )}
      <div className={cn(!title && !Icon && variantConfig.text)}>
        {children}
      </div>
    </div>
  );
};
