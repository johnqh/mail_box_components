import { useEffect, useState } from 'react';
import { FormModal } from '../../ui/form-modal';
import { LoginView } from './login-view';
import type { LoginViewMode, LoginViewProps } from './login-view';

export interface LoginModalText {
  /** The bar's title while signing in. */
  signInTitle: string;
  /** The bar's title while creating an account. */
  signUpTitle: string;
  /** The bar's title while sending a link to reset a password. */
  resetPasswordTitle: string;
  /** The accessible name of the close button. */
  close: string;
}

export const DEFAULT_LOGIN_MODAL_TEXT: LoginModalText = {
  signInTitle: 'Sign in',
  signUpTitle: 'Create your account',
  resetPasswordTitle: 'Reset your password',
  close: 'Close',
};

export interface LoginModalProps extends Omit<
  LoginViewProps,
  'mode' | 'onModeChange' | 'className'
> {
  open: boolean;
  /** The close button, the backdrop, Escape — and a successful sign-in. */
  onClose: () => void;
  modalText?: Partial<LoginModalText>;
  /**
   * Which form each opening starts on (default: 'signIn') — a "Create
   * account" button passes 'signUp'. A mode the form has no way to do opens
   * on signing in, and the title follows.
   */
  initialMode?: LoginViewMode;
}

/**
 * `LoginView` in a modal: a title bar with a close button, and the form.
 *
 * The shell is `FormModal` with no bottom bar — the form's own button is the
 * action, and a second one beneath it would be two ways to submit. Signing in
 * closes the modal, after `onSuccess` has been told.
 */
export function LoginModal({
  open,
  onClose,
  onSuccess,
  modalText,
  initialMode = 'signIn',
  ...view
}: LoginModalProps) {
  const text = { ...DEFAULT_LOGIN_MODAL_TEXT, ...modalText };
  const [requestedMode, setMode] = useState<LoginViewMode>(initialMode);
  // Every opening starts afresh on `initialMode`, not where the last one
  // was left.
  useEffect(() => {
    if (open) setMode(initialMode);
  }, [open, initialMode]);
  const mode: LoginViewMode =
    (requestedMode === 'signUp' && !view.onEmailSignUp) ||
    (requestedMode === 'resetPassword' && !view.onPasswordReset)
      ? 'signIn'
      : requestedMode;
  return (
    <FormModal
      open={open}
      title={
        mode === 'signUp'
          ? text.signUpTitle
          : mode === 'resetPassword'
            ? text.resetPasswordTitle
            : text.signInTitle
      }
      onClose={onClose}
      actions={[]}
      closeAriaLabel={text.close}
      // The form at its full width (`LOGIN_VIEW_MAX_WIDTH`, 448), inside
      // the dialog's own 16px of padding either side.
      className='sm:max-w-[480px]'
    >
      <LoginView
        {...view}
        mode={mode}
        onModeChange={setMode}
        onSuccess={() => {
          onSuccess?.();
          onClose();
        }}
      />
    </FormModal>
  );
}
