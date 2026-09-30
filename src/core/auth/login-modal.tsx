import { useState } from 'react';
import { FormModal } from '../../ui/form-modal';
import { LoginView } from './login-view';
import type { LoginViewMode, LoginViewProps } from './login-view';

export interface LoginModalText {
  /** The bar's title while signing in. */
  signInTitle: string;
  /** The bar's title while creating an account. */
  signUpTitle: string;
  /** The accessible name of the close button. */
  close: string;
}

export const DEFAULT_LOGIN_MODAL_TEXT: LoginModalText = {
  signInTitle: 'Sign in',
  signUpTitle: 'Create your account',
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
  ...view
}: LoginModalProps) {
  const text = { ...DEFAULT_LOGIN_MODAL_TEXT, ...modalText };
  const [mode, setMode] = useState<LoginViewMode>('signIn');
  return (
    <FormModal
      open={open}
      title={mode === 'signUp' ? text.signUpTitle : text.signInTitle}
      onClose={onClose}
      actions={[]}
      closeAriaLabel={text.close}
      // The form at its full width, inside the dialog's own padding.
      className='sm:max-w-[392px]'
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
