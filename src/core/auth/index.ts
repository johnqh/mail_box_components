/**
 * Authentication-related routing components
 */

export { ProtectedRoute } from './ProtectedRoute';
export type { ProtectedRouteProps } from './ProtectedRoute';

/**
 * Signing in: the form to place in another view, and the same form in a modal
 */
export {
  LoginView,
  DEFAULT_LOGIN_VIEW_TEXT,
  LOGIN_VIEW_MAX_WIDTH,
} from './login-view';
export type {
  LoginViewProps,
  LoginViewText,
  LoginViewMode,
  LoginViewError,
} from './login-view';
export { LoginModal, DEFAULT_LOGIN_MODAL_TEXT } from './login-modal';
export type { LoginModalProps, LoginModalText } from './login-modal';
