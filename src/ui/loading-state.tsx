import React from 'react';
import { cn } from "../../lib/utils";
import { variants, textVariants } from "../../design-system";
import Spinner from './spinner';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'default' | 'large';
  fullScreen?: boolean;
  variant?: 'default' | 'white' | 'success' | 'warning' | 'error';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'default',
  fullScreen = false,
  variant = 'default',
  className
}) => {
  const sizeConfig = {
    small: { spinner: 'small' as const, text: textVariants.body.sm() },
    default: { spinner: 'default' as const, text: textVariants.body.md() },
    large: { spinner: 'large' as const, text: textVariants.body.lg() }
  };

  const config = sizeConfig[size];

  const containerClass = fullScreen 
    ? variants.notifications.loading.overlay()
    : variants.notifications.loading.inline();

  const content = (
    <div className={cn(
      containerClass,
      className
    )}>
      <Spinner size={config.spinner} variant={variant} className="mb-4" />
      {message && (
        <p className={cn(
          config.text,
          'text-gray-600 dark:text-gray-400 text-center max-w-sm'
        )}>
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={variants.overlays.loading.backdrop()}>
        <div className={variants.overlays.loading.container()}>
          <Spinner size={config.spinner} variant={variant} className={variants.overlays.loading.spinner()} />
          {message && (
            <p className={variants.overlays.loading.text()}>
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  return content;
};

export default LoadingState;