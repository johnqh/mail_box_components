import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/utils';
import { colors } from '@sudobility/design';
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

/** Maps InfoType to the design system's alert color key */
const alertColorKey: Record<InfoType, keyof typeof colors.component.alert> = {
  [InfoType.INFO]: 'info',
  [InfoType.SUCCESS]: 'success',
  [InfoType.WARNING]: 'warning',
  [InfoType.ERROR]: 'error',
};

const variantConfig: Record<
  InfoType,
  {
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  [InfoType.INFO]: { icon: InformationCircleIcon },
  [InfoType.SUCCESS]: { icon: CheckCircleIcon },
  [InfoType.WARNING]: { icon: ExclamationTriangleIcon },
  [InfoType.ERROR]: { icon: XCircleIcon },
};

/** Resolves design system alert colors for a given variant */
const getAlertColors = (variant: InfoType) => {
  const key = alertColorKey[variant];
  return colors.component.alert[key];
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
  const alertColors = getAlertColors(variant);
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
        // Base styles - full width at top of screen (z-[100] to be above all other elements including topbar and breadcrumbs)
        'fixed inset-x-0 top-0 z-[100] w-full',
        // Animation
        'transition-all duration-300 ease-out',
        animationState === 'entering' || animationState === 'exiting'
          ? '-translate-y-full opacity-0'
          : 'translate-y-0 opacity-100'
      )}
    >
      <div
        className={cn(
          // Container styles - full width, no rounded corners
          'flex items-start gap-3 p-4 border-b shadow-lg',
          'backdrop-blur-sm',
          alertColors.base,
          alertColors.dark,
          className
        )}
      >
        {/* Icon */}
        <div className={cn('flex-shrink-0 mt-0.5', alertColors.icon)}>
          {icon || <IconComponent className='h-5 w-5' />}
        </div>

        {/* Content - text color inherited from container via alertColors.base/dark */}
        <div className='flex-1 min-w-0'>
          <p className='font-semibold'>{title}</p>
          {description && (
            <p className='text-sm mt-1 opacity-85'>{description}</p>
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
          <XMarkIcon className={cn('h-5 w-5', alertColors.icon)} />
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
