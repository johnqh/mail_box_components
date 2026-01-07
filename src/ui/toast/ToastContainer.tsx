/**
 * Container component for positioning and managing multiple toasts
 */

import { Toast } from './Toast';
import type { ToastContainerProps } from './types';

/**
 * Position classes for the toast container
 */
const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

/**
 * Container component that renders and positions all active toasts
 */
export function ToastContainer({
  toasts,
  onDismiss,
  position = 'bottom-right',
}: ToastContainerProps): React.ReactElement | null {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      className={`fixed z-50 flex flex-col gap-2 max-w-sm w-full ${positionClasses[position]}`}
      aria-label='Notifications'
    >
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

export default ToastContainer;
