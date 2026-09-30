import React, { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

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

/** Whether the view is signing somebody in or creating their account. */
export type LoginViewMode = 'signIn' | 'signUp';

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
};

/** The widest the view is drawn, in pixels, on every platform. */
export const LOGIN_VIEW_MAX_WIDTH = 360;

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
 * nothing of Firebase. The fields and buttons are the design system's own
 * `Input` and `Button`, so they follow its theme.
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
  onGoogleSignIn,
  onAppleSignIn,
  onSuccess,
  onAuthError,
  mode: controlledMode,
  onModeChange,
  text: textOverrides,
  className,
}: LoginViewProps) {
  const text = { ...DEFAULT_LOGIN_VIEW_TEXT, ...textOverrides };
  const [ownMode, setOwnMode] = useState<LoginViewMode>('signIn');
  // Creating an account is a mode only where there is a way to create one.
  const requestedMode = controlledMode ?? ownMode;
  const mode: LoginViewMode = onEmailSignUp ? requestedMode : 'signIn';
  const creating = mode === 'signUp';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
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

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setBusy(true);
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

  const toggleMode = () => {
    const next: LoginViewMode = creating ? 'signIn' : 'signUp';
    setError(null);
    setOwnMode(next);
    onModeChange?.(next);
  };

  return (
    <div
      data-testid='login-view'
      className={cn('mx-auto w-full bg-transparent', className)}
      style={{ maxWidth: LOGIN_VIEW_MAX_WIDTH }}
    >
      <form className='space-y-4' onSubmit={submit}>
        {error && (
          <div
            role='alert'
            className='rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive'
          >
            {error}
          </div>
        )}

        <div className='space-y-1'>
          <label
            htmlFor={`${id}-email`}
            className='block text-sm font-medium text-foreground'
          >
            {text.emailLabel}
          </label>
          <Input
            id={`${id}-email`}
            name='email'
            type='email'
            autoComplete='email'
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder={text.emailPlaceholder}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <label
            htmlFor={`${id}-password`}
            className='block text-sm font-medium text-foreground'
          >
            {text.passwordLabel}
          </label>
          <Input
            id={`${id}-password`}
            name='password'
            type='password'
            autoComplete={creating ? 'new-password' : 'current-password'}
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder={text.passwordPlaceholder}
            className='w-full'
          />
        </div>

        <Button
          type='submit'
          variant='primary'
          animation='none'
          disabled={busy}
          className='w-full'
        >
          {creating ? text.signUp : text.signIn}
        </Button>

        {(onGoogleSignIn || onAppleSignIn) && (
          <>
            {/*
              A rule either side of the words, not the words laid over one
              rule: that needs a background behind them to hide the line, and
              this view has none of its own.
            */}
            <div className='flex items-center gap-3'>
              <div className='h-px flex-1 bg-border' />
              <span className='text-sm text-muted-foreground'>
                {text.orContinueWith}
              </span>
              <div className='h-px flex-1 bg-border' />
            </div>

            <div className='space-y-3'>
              {onGoogleSignIn && (
                <Button
                  type='button'
                  variant='outline'
                  animation='none'
                  disabled={busy}
                  onClick={() => void withProvider(onGoogleSignIn)}
                  className='w-full'
                >
                  <GoogleIcon className='mr-2 h-5 w-5' />
                  {text.signInWithGoogle}
                </Button>
              )}
              {onAppleSignIn && (
                <Button
                  type='button'
                  variant='outline'
                  animation='none'
                  disabled={busy}
                  onClick={() => void withProvider(onAppleSignIn)}
                  className='w-full'
                >
                  <AppleIcon className='mr-2 h-5 w-5' />
                  {text.signInWithApple}
                </Button>
              )}
            </div>
          </>
        )}
      </form>

      {onEmailSignUp && (
        <p className='mt-4 text-center text-sm text-muted-foreground'>
          {creating ? text.alreadyHaveAccount : text.dontHaveAccount}{' '}
          <button
            type='button'
            onClick={toggleMode}
            className='font-medium text-primary underline-offset-4 hover:underline'
          >
            {creating ? text.signIn : text.signUp}
          </button>
        </p>
      )}
    </div>
  );
}
