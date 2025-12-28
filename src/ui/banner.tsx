import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/utils';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { InfoType } from '@sudobility/types';

/** @deprecated Use InfoType from @sudobility/types instead */
export type BannerVariant = `${InfoType}`;

export interface BannerProps {
  /** Whether the banner is visible */
  isVisible: boolean;
  /** Callback when banner is dismissed */
  onDismiss: () => void;
  /** Banner title */
  title: string;
  /** Banner description (optional) */
  description?: string;
  /** Visual variant */
  variant?: InfoType;
  /** Auto-dismiss duration in milliseconds (0 to disable, default: 5000) */
  duration?: number;
  /** Custom icon (overrides variant icon) */
  icon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for close button */
  closeAriaLabel?: string;
}

const variantConfig: Record<
  InfoType,
  {
    icon: React.ComponentType<{ className?: string }>;
    container: string;
    iconColor: string;
    titleColor: string;
    descriptionColor: string;
  }
> = {
  [InfoType.INFO]: {
    icon: InformationCircleIcon,
    container:
      'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    titleColor: 'text-blue-900 dark:text-blue-100',
    descriptionColor: 'text-blue-700 dark:text-blue-300',
  },
  [InfoType.SUCCESS]: {
    icon: CheckCircleIcon,
    container:
      'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
    iconColor: 'text-green-600 dark:text-green-400',
    titleColor: 'text-green-900 dark:text-green-100',
    descriptionColor: 'text-green-700 dark:text-green-300',
  },
  [InfoType.WARNING]: {
    icon: ExclamationTriangleIcon,
    container:
      'bg-yellow-50 dark:bg-amber-950 border-yellow-200 dark:border-amber-800',
    iconColor: 'text-yellow-600 dark:text-amber-400',
    titleColor: 'text-yellow-900 dark:text-amber-100',
    descriptionColor: 'text-yellow-700 dark:text-amber-300',
  },
  [InfoType.ERROR]: {
    icon: XCircleIcon,
    container: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
    iconColor: 'text-red-600 dark:text-red-400',
    titleColor: 'text-red-900 dark:text-red-100',
    descriptionColor: 'text-red-700 dark:text-red-300',
  },
};

/**
 * Banner Component
 *
 * A temporary notification banner that slides down from the top of the screen.
 * Similar to SwiftMessage for iOS - less intrusive than a modal.
 *
 * Features:
 * - Slides down from top with animation
 * - Auto-dismisses after configurable duration (default 5 seconds)
 * - Manual dismiss via close button
 * - Multiple variants: info, success, warning, error
 * - Dark/light theme support
 *
 * @example
 * ```tsx
 * const [showBanner, setShowBanner] = useState(false);
 *
 * <Banner
 *   isVisible={showBanner}
 *   onDismiss={() => setShowBanner(false)}
 *   variant="success"
 *   title="Changes saved"
 *   description="Your settings have been updated successfully."
 * />
 * ```
 */
export const Banner: React.FC<BannerProps> = ({
  isVisible,
  onDismiss,
  title,
  description,
  variant = InfoType.INFO,
  duration = 5000,
  icon,
  className,
  closeAriaLabel = 'Dismiss banner',
}) => {
  const [animationState, setAnimationState] = useState<
    'entering' | 'visible' | 'exiting' | 'hidden'
  >('hidden');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const config = variantConfig[variant];
  const IconComponent = config.icon;

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
  }, []);

  const handleDismiss = useCallback(() => {
    clearTimeouts();
    setAnimationState('exiting');
    animationTimeoutRef.current = setTimeout(() => {
      setAnimationState('hidden');
      onDismiss();
    }, 300); // Match animation duration
  }, [clearTimeouts, onDismiss]);

  // Handle visibility changes
  useEffect(() => {
    if (isVisible) {
      setAnimationState('entering');
      // Small delay to trigger CSS transition
      animationTimeoutRef.current = setTimeout(() => {
        setAnimationState('visible');
      }, 10);
    } else if (animationState === 'visible' || animationState === 'entering') {
      handleDismiss();
    }
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle auto-dismiss
  useEffect(() => {
    if (animationState === 'visible' && duration > 0) {
      timeoutRef.current = setTimeout(() => {
        handleDismiss();
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [animationState, duration, handleDismiss]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  if (animationState === 'hidden') {
    return null;
  }

  const bannerContent = (
    <div
      role='alert'
      aria-live='polite'
      data-testid='banner'
      className={cn(
        // Base styles
        'fixed left-1/2 z-50 w-full max-w-lg px-4',
        // Transform for centering
        '-translate-x-1/2',
        // Animation
        'transition-all duration-300 ease-out',
        animationState === 'entering' || animationState === 'exiting'
          ? '-translate-y-full opacity-0'
          : 'translate-y-0 opacity-100',
        // Position at top with safe area
        'top-4'
      )}
    >
      <div
        className={cn(
          // Container styles
          'flex items-start gap-3 p-4 rounded-lg border shadow-lg',
          'backdrop-blur-sm',
          config.container,
          className
        )}
      >
        {/* Icon */}
        <div className={cn('flex-shrink-0 mt-0.5', config.iconColor)}>
          {icon || <IconComponent className='h-5 w-5' />}
        </div>

        {/* Content */}
        <div className='flex-1 min-w-0'>
          <p className={cn('font-semibold', config.titleColor)}>{title}</p>
          {description && (
            <p className={cn('text-sm mt-1', config.descriptionColor)}>
              {description}
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          type='button'
          onClick={handleDismiss}
          className={cn(
            'flex-shrink-0 p-1 rounded-md transition-colors',
            'hover:bg-black/10 dark:hover:bg-white/10',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'focus:ring-current'
          )}
          aria-label={closeAriaLabel}
        >
          <XMarkIcon className={cn('h-5 w-5', config.iconColor)} />
        </button>
      </div>
    </div>
  );

  return createPortal(bannerContent, document.body);
};

// Hook for easier banner management
export interface UseBannerOptions {
  /** Default duration for auto-dismiss (default: 5000) */
  defaultDuration?: number;
}

export interface UseBannerReturn {
  /** Whether the banner is currently visible */
  isVisible: boolean;
  /** Current banner props */
  bannerProps: {
    title: string;
    description?: string;
    variant: InfoType;
    duration: number;
  } | null;
  /** Show a banner */
  showBanner: (options: {
    title: string;
    description?: string;
    variant?: InfoType;
    duration?: number;
  }) => void;
  /** Hide the current banner */
  hideBanner: () => void;
}

/**
 * Hook for managing banner state
 *
 * @example
 * ```tsx
 * const { isVisible, bannerProps, showBanner, hideBanner } = useBanner();
 *
 * // Show a banner
 * showBanner({
 *   title: 'Success!',
 *   description: 'Your changes have been saved.',
 *   variant: 'success',
 * });
 *
 * // Render the banner
 * {bannerProps && (
 *   <Banner
 *     isVisible={isVisible}
 *     onDismiss={hideBanner}
 *     {...bannerProps}
 *   />
 * )}
 * ```
 */
export const useBanner = (options: UseBannerOptions = {}): UseBannerReturn => {
  const { defaultDuration = 5000 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [bannerProps, setBannerProps] =
    useState<UseBannerReturn['bannerProps']>(null);

  const showBanner = useCallback(
    ({
      title,
      description,
      variant = InfoType.INFO,
      duration = defaultDuration,
    }: {
      title: string;
      description?: string;
      variant?: InfoType;
      duration?: number;
    }) => {
      setBannerProps({ title, description, variant, duration });
      setIsVisible(true);
    },
    [defaultDuration]
  );

  const hideBanner = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isVisible,
    bannerProps,
    showBanner,
    hideBanner,
  };
};
