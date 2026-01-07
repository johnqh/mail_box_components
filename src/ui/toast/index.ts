/**
 * Toast notification system
 *
 * A flexible, animated toast notification system for React applications.
 *
 * @example
 * ```tsx
 * // 1. Wrap your app with ToastProvider
 * import { ToastProvider, ToastContainer, useToast } from '@sudobility/components/ui/toast';
 *
 * function App() {
 *   return (
 *     <ToastProvider>
 *       <YourApp />
 *       <ToastConsumer />
 *     </ToastProvider>
 *   );
 * }
 *
 * // 2. Add ToastContainer to render toasts
 * function ToastConsumer() {
 *   const { toasts, removeToast } = useToast();
 *   return <ToastContainer toasts={toasts} onDismiss={removeToast} />;
 * }
 *
 * // 3. Use the toast hook anywhere in your app
 * function MyComponent() {
 *   const toast = useToast();
 *
 *   return (
 *     <button onClick={() => toast.success('Saved!')}>
 *       Save
 *     </button>
 *   );
 * }
 * ```
 */

export { ToastProvider, ToastContext } from './toast-context';
export { Toast } from './Toast';
export { ToastContainer } from './ToastContainer';
export { useToast } from './useToast';

export type {
  Toast as ToastData,
  ToastType,
  ToastContextValue,
  ToastProviderProps,
  ToastComponentProps,
  ToastContainerProps,
} from './types';
