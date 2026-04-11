/**
 * Toast notification component with animations and icons
 */

import { useEffect, useState } from 'react';
import { colors } from '@sudobility/design';
import type { ToastComponentProps } from './types';

/**
 * Icon components for different toast types
 */
const icons = {
  success: (
    <svg
      className='h-5 w-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M5 13l4 4L19 7'
      />
    </svg>
  ),
  error: (
    <svg
      className='h-5 w-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  ),
  warning: (
    <svg
      className='h-5 w-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
      />
    </svg>
  ),
  info: (
    <svg
      className='h-5 w-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  ),
};

/**
 * Style mappings for different toast types (from design system)
 */
const alertColors = {
  success: colors.component.alert.success,
  error: colors.component.alert.error,
  warning: colors.component.alert.warning,
  info: colors.component.alert.info,
};

const styles = {
  success: {
    container: `${alertColors.success.base} ${alertColors.success.dark}`,
    icon: alertColors.success.icon,
    text: '',
  },
  error: {
    container: `${alertColors.error.base} ${alertColors.error.dark}`,
    icon: alertColors.error.icon,
    text: '',
  },
  warning: {
    container: `${alertColors.warning.base} ${alertColors.warning.dark}`,
    icon: alertColors.warning.icon,
    text: '',
  },
  info: {
    container: `${alertColors.info.base} ${alertColors.info.dark}`,
    icon: alertColors.info.icon,
    text: '',
  },
};

/**
 * Individual toast notification component
 */
export function Toast({
  toast,
  onDismiss,
}: ToastComponentProps): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const { type, message, id } = toast;
  const style = styles[type];

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(enterTimer);
  }, []);

  const handleDismiss = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onDismiss(id);
    }, 200); // Match animation duration
  };

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg pointer-events-auto cursor-default
        transition-all duration-200 ease-out
        ${style.container}
        ${isVisible && !isLeaving ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
      `}
      role='alert'
      aria-live='polite'
    >
      <span className={`flex-shrink-0 mt-0.5 ${style.icon}`}>
        {icons[type]}
      </span>
      <span
        className={`flex-1 min-w-0 text-sm font-medium max-h-32 overflow-y-auto ${style.text}`}
      >
        {message}
      </span>
      <button
        onClick={handleDismiss}
        className={`
          flex-shrink-0 p-1 rounded-md transition-colors
          hover:bg-black/10 dark:hover:bg-white/10
          ${style.text}
        `}
        aria-label='Dismiss notification'
      >
        <svg
          className='h-4 w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    </div>
  );
}

export default Toast;
