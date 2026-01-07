/**
 * Toast notification context and provider
 */

import { createContext, useCallback, useState, useMemo } from 'react';
import type {
  Toast,
  ToastType,
  ToastContextValue,
  ToastProviderProps,
} from './types';

export const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Generate a unique ID for toasts
 */
function generateToastId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Toast provider component that manages toast state and provides context
 */
export function ToastProvider({
  children,
  defaultDuration = 5000,
  maxToasts = 5,
}: ToastProviderProps): React.ReactElement {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string, duration?: number) => {
      const id = generateToastId();
      const toast: Toast = {
        id,
        type,
        message,
        duration: duration ?? defaultDuration,
      };

      setToasts(prev => {
        const newToasts = [...prev, toast];
        // Limit the number of toasts
        if (newToasts.length > maxToasts) {
          return newToasts.slice(-maxToasts);
        }
        return newToasts;
      });

      // Auto-dismiss after duration
      if (toast.duration && toast.duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, toast.duration);
      }
    },
    [defaultDuration, maxToasts, removeToast]
  );

  const success = useCallback(
    (message: string, duration?: number) =>
      addToast('success', message, duration),
    [addToast]
  );

  const error = useCallback(
    (message: string, duration?: number) =>
      addToast('error', message, duration),
    [addToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) =>
      addToast('warning', message, duration),
    [addToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => addToast('info', message, duration),
    [addToast]
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toasts,
      addToast,
      removeToast,
      success,
      error,
      warning,
      info,
    }),
    [toasts, addToast, removeToast, success, error, warning, info]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
