/**
 * Hook to access toast notifications
 */

import { useContext } from 'react';
import { ToastContext } from './toast-context';
import type { ToastContextValue } from './types';

/**
 * Hook to access toast notification methods
 *
 * @returns Toast context value with methods: success, error, warning, info, addToast, removeToast
 * @throws Error if used outside of ToastProvider
 *
 * @example
 * ```tsx
 * const toast = useToast();
 *
 * // Show success message
 * toast.success('Operation completed!');
 *
 * // Show error with custom duration
 * toast.error('Something went wrong', 10000);
 *
 * // Add custom toast
 * toast.addToast('info', 'Custom message', 3000);
 * ```
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export default useToast;
