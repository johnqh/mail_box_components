import React, { useEffect, useId, useRef, useState } from 'react';
import {
  colors as designColors,
  touchTargetClasses,
  ui,
  variants as v,
} from '@sudobility/design';
import { cn } from '../../lib/utils';

/**
 * Google's mark. The fills are Google's own trademarked colours and must not
 * be swapped for design tokens: the mark is required to render in its exact
 * palette whatever the theme.
 */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 24 24' aria-hidden='true'>
      <path
        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
        fill='#4285F4'
      />
      <path
        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
        fill='#34A853'
      />
      <path
        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
        fill='#FBBC05'
      />
      <path
        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
        fill='#EA4335'
      />
    </svg>
  );
}

/** Apple's mark, in the text colour: black or white against what it sits on. */
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
    >
      <path d='M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z' />
    </svg>
  );
}

/**
 * Whether the view is signing somebody in, creating their account, or sending
 * a link to reset a forgotten password.
 */
export type LoginViewMode = 'signIn' | 'signUp' | 'resetPassword';

/** What a failed attempt reports to `onAuthError`. */
export interface LoginViewError {
  /** The provider's error code, e.g. `auth/popup-closed-by-user`. */
  code: string;
  message: string;
  /** The user backed out — closed a popup — rather than something failing. */
  isUserAction: boolean;
}

/** Every string the view shows. English by default; pass `text` to localise. */
export interface LoginViewText {
  signIn: string;
  signUp: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  orContinueWith: string;
  signInWithGoogle: string;
  signInWithApple: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  /** Shown when an attempt fails with no message of its own. */
  genericError: string;
  /** The link under the password field that leads to resetting it. */
  forgotPassword: string;
  /** What the reset form is for, above its field. */
  resetPasswordHint: string;
  /** The reset form's button. */
  sendResetLink: string;
  /** Shown once the link has been sent. */
  resetEmailSent: string;
  /** The link that leads from the reset form back to signing in. */
  backToSignIn: string;
}

export const DEFAULT_LOGIN_VIEW_TEXT: LoginViewText = {
  signIn: 'Sign in',
  signUp: 'Sign up',
  emailLabel: 'Email address',
  emailPlaceholder: '',
  passwordLabel: 'Password',
  passwordPlaceholder: '',
  orContinueWith: 'Or continue with',
  signInWithGoogle: 'Sign in with Google',
  signInWithApple: 'Sign in with Apple',
  alreadyHaveAccount: 'Already have an account?',
  dontHaveAccount: "Don't have an account?",
  genericError: 'Authentication failed',
  forgotPassword: 'Forgot password?',
  resetPasswordHint:
    "Enter your email address and we'll send you a link to reset your password.",
  sendResetLink: 'Send reset link',
  resetEmailSent:
    'If an account uses that address, a link to reset its password is on its way. Check your email.',
  backToSignIn: 'Back to sign in',
};

/**
 * The widest the view is drawn, in pixels: Tailwind's `max-w-md`, the width
 * building_blocks' `LoginPage` held its form to before it was made of this
 * view.
 */
export const LOGIN_VIEW_MAX_WIDTH = 448;

// Codes that mean the user backed out rather than that something failed.
const USER_ACTION_ERROR_CODES = [
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
  'auth/user-cancelled',
];

export interface LoginViewProps {
  /** Signs in with email and password. Throws on failure. */
  onEmailSignIn: (email: string, password: string) => Promise<void>;
  /**
   * Creates an account. Throws on failure. The way to create one is offered
   * only when this is given.
   */
  onEmailSignUp?: (email: string, password: string) => Promise<void>;
  /**
   * Sends a link to reset the password for an address. Throws on failure.
   * The way to a forgotten password is offered only when this is given.
   */
  onPasswordReset?: (email: string) => Promise<void>;
  /** Signs in with Google. The button is drawn only when this is given. */
  onGoogleSignIn?: () => Promise<void>;
  /** Signs in with Apple. The button is drawn only when this is given. */
  onAppleSignIn?: () => Promise<void>;
  /** Somebody signed in, or made their account. */
  onSuccess?: () => void;
  /** Takes over error reporting: when given, nothing is shown inline. */
  onAuthError?: (error: LoginViewError) => void;
  /**
   * Which of the two the view is doing. Leave it out and the view keeps track
   * itself; pass it, with `onModeChange`, to follow along — a modal's title
   * does.
   */
  mode?: LoginViewMode;
  onModeChange?: (mode: LoginViewMode) => void;
  text?: Partial<LoginViewText>;
  className?: string;
  /**
   * The colour of the view's links — the mode toggle and "Forgot password?".
   * A page with a colour of its own passes it; the default is the theme's
   * primary.
   */
  linkClassName?: string;
}

/*
  The form is drawn with the design system's classes for a field, a button
  and an alert — the classes `LoginPage` in building_blocks drew its own form
  with before it was made of this view — so the page, the modal and any pane
  that holds this show one form, pixel for pixel.
*/
const fieldClass = () =>
  cn(
    `mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${designColors.component.input.default.base} ${designColors.component.input.default.dark}`,
    // Not the design system's `focusRing`, which is a fixed blue-500.
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background'
  );
/*
  The field and buttons take the design system's themed classes, which follow
  the theme's colours rather than a fixed gray and blue. All are built per
  render: the design system reads the active theme on access, and an app
  configures it after this module loads.
*/
const submitButtonClass = () =>
  cn(v.button.primary.fullWidth(), touchTargetClasses.minHeight);
const providerButtonClass = () =>
  cn(
    v.button.outline.default(),
    `w-full ${touchTargetClasses.minHeight} ${ui.background.surface} ${ui.text.label}`
  );

function Spinner() {
  return (
    <svg
      className='animate-spin -ml-1 mr-2 h-4 w-4'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      aria-hidden='true'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  );
}

/**
 * Sign in, or create an account: the form alone, to be placed in another view.
 *
 * **It brings no page with it.** No background, no heading, no card: the
 * background is transparent so whatever it is placed on shows through, and the
 * view that holds it says what it is — a pane's title, a modal's bar. It is as
 * wide as it is given up to `LOGIN_VIEW_MAX_WIDTH`, and centred in anything
 * wider.
 *
 * Presentational and provider-agnostic: it takes the handlers and knows
 * nothing of Firebase. The fields, buttons and alert are drawn with
 * `@sudobility/design`'s classes, so they follow its theme.
 *
 * @example
 * ```tsx
 * <LoginView
 *   onEmailSignIn={signInEmail}
 *   onEmailSignUp={signUpEmail}
 *   onGoogleSignIn={signInGoogle}
 *   onSuccess={() => navigate('/')}
 * />
 * ```
 */
export function LoginView({
  onEmailSignIn,
  onEmailSignUp,
  onPasswordReset,
  onGoogleSignIn,
  onAppleSignIn,
  onSuccess,
  onAuthError,
  mode: controlledMode,
  onModeChange,
  text: textOverrides,
  className,
  linkClassName = 'text-primary hover:text-primary/80',
}: LoginViewProps) {
  const text = { ...DEFAULT_LOGIN_VIEW_TEXT, ...textOverrides };
  const [ownMode, setOwnMode] = useState<LoginViewMode>('signIn');
  // Creating an account, or resetting a password, is a mode only where there
  // is a way to do it.
  const requestedMode = controlledMode ?? ownMode;
  const mode: LoginViewMode =
    (requestedMode === 'signUp' && !onEmailSignUp) ||
    (requestedMode === 'resetPassword' && !onPasswordReset)
      ? 'signIn'
      : requestedMode;
  const creating = mode === 'signUp';
  const resetting = mode === 'resetPassword';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // The reset link has gone: the form says so instead of offering it again.
  const [resetSent, setResetSent] = useState(false);
  const [popupPending, setPopupPending] = useState(false);
  const popupStartedAt = useRef<number | null>(null);
  // Two views may be on one page — a pane and a modal over it — and an id
  // shared between them would point both labels at the first field.
  const id = useId();

  /*
    A popup sign-in that never answers: the browser opened a tab instead, or
    the popup was closed. The window getting its focus back is the only sign
    of it, so that is what frees the buttons again.
  */
  useEffect(() => {
    const onFocus = () => {
      if (!popupPending || popupStartedAt.current === null) return;
      if (Date.now() - popupStartedAt.current > 2000) {
        setBusy(false);
        setPopupPending(false);
        popupStartedAt.current = null;
      }
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [popupPending]);

  const report = (err: unknown) => {
    const failure = err as { code?: string; message?: string };
    const code = failure.code || 'unknown';
    const message = failure.message || text.genericError;
    const isUserAction = USER_ACTION_ERROR_CODES.includes(code);
    if (onAuthError) onAuthError({ code, message, isUserAction });
    // Backing out of a popup is not an error to be told about.
    else if (!isUserAction) setError(message);
  };

  /*
    Sending the link signs nobody in, so `onSuccess` is not told. What it
    says afterwards is the same whether or not the address has an account —
    Firebase's own answer, with enumeration protection on, is the same too,
    and a form that said "no such account" would tell anyone which addresses
    have one. Without that protection Firebase does say so; this form still
    does not.
  */
  const sendReset = async () => {
    if (!onPasswordReset) return;
    try {
      await onPasswordReset(email.trim());
      setResetSent(true);
    } catch (err) {
      if ((err as { code?: string }).code === 'auth/user-not-found') {
        setResetSent(true);
      } else {
        report(err);
      }
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setBusy(true);
    if (resetting) {
      await sendReset();
      setBusy(false);
      return;
    }
    try {
      if (creating && onEmailSignUp) await onEmailSignUp(email, password);
      else await onEmailSignIn(email, password);
      onSuccess?.();
    } catch (err) {
      report(err);
    } finally {
      setBusy(false);
    }
  };

  const withProvider = async (signIn: () => Promise<void>) => {
    setError(null);
    setBusy(true);
    setPopupPending(true);
    popupStartedAt.current = Date.now();
    try {
      await signIn();
      onSuccess?.();
    } catch (err) {
      report(err);
    } finally {
      setBusy(false);
      setPopupPending(false);
      popupStartedAt.current = null;
    }
  };

  const goTo = (next: LoginViewMode) => {
    setError(null);
    setResetSent(false);
    setOwnMode(next);
    onModeChange?.(next);
  };
  const toggleMode = () => goTo(creating ? 'signIn' : 'signUp');

  return (
    <div
      data-testid='login-view'
      className={cn('mx-auto w-full bg-transparent', className)}
      style={{ maxWidth: LOGIN_VIEW_MAX_WIDTH }}
    >
      <form className='space-y-6' onSubmit={submit}>
        {error && (
          <div
            role='alert'
            className={`${designColors.component.alert.error.base} ${designColors.component.alert.error.dark} border px-4 py-3 rounded-md text-sm`}
          >
            {error}
          </div>
        )}

        {resetting && (
          <p className={`text-sm ${ui.text.muted}`}>{text.resetPasswordHint}</p>
        )}

        {resetting && resetSent && (
          <div
            role='status'
            className={`border px-4 py-3 rounded-md text-sm ${ui.border.default} ${ui.background.subtle} ${ui.text.label}`}
          >
            {text.resetEmailSent}
          </div>
        )}

        <div className='space-y-4'>
          <div>
            <label htmlFor={`${id}-email`} className={`block ${ui.text.label}`}>
              {text.emailLabel}
            </label>
            <input
              id={`${id}-email`}
              name='email'
              type='email'
              autoComplete='email'
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder={text.emailPlaceholder}
              className={fieldClass()}
            />
          </div>

          {!resetting && (
            <div>
              <label
                htmlFor={`${id}-password`}
                className={`block ${ui.text.label}`}
              >
                {text.passwordLabel}
              </label>
              <input
                id={`${id}-password`}
                name='password'
                type='password'
                autoComplete={creating ? 'new-password' : 'current-password'}
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder={text.passwordPlaceholder}
                className={fieldClass()}
              />
              {/*
                Under the field it is about, at its trailing edge, where every
                sign-in form puts it. Only while signing in: somebody creating
                an account has no password to forget.
              */}
              {onPasswordReset && !creating && (
                <div className='mt-2 text-right'>
                  <button
                    type='button'
                    onClick={() => goTo('resetPassword')}
                    className={cn('text-sm font-medium', linkClassName)}
                  >
                    {text.forgotPassword}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <button type='submit' disabled={busy} className={submitButtonClass()}>
            {busy && <Spinner />}
            {resetting
              ? text.sendResetLink
              : creating
                ? text.signUp
                : text.signIn}
          </button>
        </div>

        {!resetting && (onGoogleSignIn || onAppleSignIn) && (
          <>
            {/*
              A rule either side of the words, not the words laid over one
              rule: that needs a background behind them to hide the line, and
              this view has none of its own. The gap is the `px-2` the words
              were padded by.
            */}
            <div className='flex items-center gap-2 text-sm'>
              <div className={`flex-1 border-t ${ui.border.default}`} />
              <span className={ui.text.muted}>{text.orContinueWith}</span>
              <div className={`flex-1 border-t ${ui.border.default}`} />
            </div>

            <div className='space-y-3'>
              {onGoogleSignIn && (
                <button
                  type='button'
                  disabled={busy}
                  onClick={() => void withProvider(onGoogleSignIn)}
                  className={providerButtonClass()}
                >
                  <GoogleIcon className='h-5 w-5 mr-2' />
                  {text.signInWithGoogle}
                </button>
              )}
              {onAppleSignIn && (
                <button
                  type='button'
                  disabled={busy}
                  onClick={() => void withProvider(onAppleSignIn)}
                  className={providerButtonClass()}
                >
                  <AppleIcon className='h-5 w-5 mr-2' />
                  {text.signInWithApple}
                </button>
              )}
            </div>
          </>
        )}
      </form>

      {resetting ? (
        <p className={`mt-8 text-center text-sm ${ui.text.muted}`}>
          <button
            type='button'
            onClick={() => goTo('signIn')}
            className={cn('font-medium', linkClassName)}
          >
            {text.backToSignIn}
          </button>
        </p>
      ) : (
        onEmailSignUp && (
          <p className={`mt-8 text-center text-sm ${ui.text.muted}`}>
            {creating ? text.alreadyHaveAccount : text.dontHaveAccount}{' '}
            <button
              type='button'
              onClick={toggleMode}
              className={cn('font-medium', linkClassName)}
            >
              {creating ? text.signIn : text.signUp}
            </button>
          </p>
        )
      )}
    </div>
  );
}
