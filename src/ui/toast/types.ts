/**
 * Toast notification system types
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  /**
   * Default duration for toasts in milliseconds
   * @default 5000
   */
  defaultDuration?: number;
  /**
   * Maximum number of toasts to show at once
   * @default 5
   */
  maxToasts?: number;
}

export interface ToastComponentProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

export interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
  /**
   * Position of the toast container
   * @default 'bottom-right'
   */
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
}
