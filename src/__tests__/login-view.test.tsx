import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginView, LOGIN_VIEW_MAX_WIDTH } from '../core/auth/login-view';
import { LoginModal } from '../core/auth/login-modal';

const signIn = () => vi.fn().mockResolvedValue(undefined);

async function fill(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Email address'), 'ada@example.com');
  await user.type(screen.getByLabelText('Password'), 'secret');
}

describe('LoginView', () => {
  it('is no wider than its maximum, centred, and paints no background', () => {
    render(<LoginView onEmailSignIn={signIn()} />);
    const view = screen.getByTestId('login-view');
    expect(view.style.maxWidth).toBe(`${LOGIN_VIEW_MAX_WIDTH}px`);
    expect(view.className).toContain('mx-auto');
    expect(view.className).toContain('w-full');
    expect(view.className).toContain('bg-transparent');
  });

  it('brings no heading: the view that holds it says what it is', () => {
    render(<LoginView onEmailSignIn={signIn()} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('signs in with what was typed, and says so', async () => {
    const user = userEvent.setup();
    const onEmailSignIn = signIn();
    const onSuccess = vi.fn();
    render(<LoginView onEmailSignIn={onEmailSignIn} onSuccess={onSuccess} />);
    await fill(user);
    await user.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(onEmailSignIn).toHaveBeenCalledWith('ada@example.com', 'secret');
    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
  });

  it('creates an account once asked to', async () => {
    const user = userEvent.setup();
    const onEmailSignIn = signIn();
    const onEmailSignUp = signIn();
    render(
      <LoginView onEmailSignIn={onEmailSignIn} onEmailSignUp={onEmailSignUp} />
    );
    await user.click(screen.getByRole('button', { name: 'Sign up' }));
    await fill(user);
    // The toggle now offers the way back, so the submit is the other one.
    const [submit] = screen.getAllByRole('button', { name: 'Sign up' });
    await user.click(submit!);
    expect(onEmailSignUp).toHaveBeenCalledWith('ada@example.com', 'secret');
    expect(onEmailSignIn).not.toHaveBeenCalled();
  });

  it('offers only what it was given a way to do', () => {
    render(<LoginView onEmailSignIn={signIn()} />);
    expect(screen.queryByText('Sign in with Google')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign in with Apple')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign up')).not.toBeInTheDocument();
    expect(screen.queryByText('Or continue with')).not.toBeInTheDocument();
  });

  it('offers Google and Apple when given them', async () => {
    const user = userEvent.setup();
    const onGoogleSignIn = signIn();
    render(
      <LoginView
        onEmailSignIn={signIn()}
        onGoogleSignIn={onGoogleSignIn}
        onAppleSignIn={signIn()}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Sign in with Apple' })
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole('button', { name: 'Sign in with Google' })
    );
    expect(onGoogleSignIn).toHaveBeenCalled();
  });

  it('shows why an attempt failed', async () => {
    const user = userEvent.setup();
    render(
      <LoginView
        onEmailSignIn={vi.fn().mockRejectedValue({
          code: 'auth/wrong-password',
          message: 'Wrong password',
        })}
      />
    );
    await fill(user);
    await user.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Wrong password'
    );
  });

  it('says nothing when the user backed out of a popup', async () => {
    const user = userEvent.setup();
    render(
      <LoginView
        onEmailSignIn={signIn()}
        onGoogleSignIn={vi
          .fn()
          .mockRejectedValue({ code: 'auth/popup-closed-by-user' })}
      />
    );
    await user.click(
      screen.getByRole('button', { name: 'Sign in with Google' })
    );
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Sign in with Google' })
      ).toBeEnabled()
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('takes its words from the caller', () => {
    render(
      <LoginView
        onEmailSignIn={signIn()}
        text={{ signIn: 'Anmelden', emailLabel: 'E-Mail' }}
      />
    );
    expect(screen.getByRole('button', { name: 'Anmelden' })).toBeVisible();
    expect(screen.getByLabelText('E-Mail')).toBeVisible();
  });
});

describe('LoginModal', () => {
  it('shows the view in a dialog with a close button on its bar', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<LoginModal open onClose={onClose} onEmailSignIn={signIn()} />);
    const dialog = screen.getByRole('dialog', { name: 'Sign in' });
    expect(dialog).toContainElement(screen.getByTestId('login-view'));
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('has no bottom bar: the form has its own button', () => {
    render(<LoginModal open onClose={vi.fn()} onEmailSignIn={signIn()} />);
    expect(screen.getAllByRole('button', { name: 'Sign in' })).toHaveLength(1);
  });

  it('retitles itself when creating an account', async () => {
    const user = userEvent.setup();
    render(
      <LoginModal
        open
        onClose={vi.fn()}
        onEmailSignIn={signIn()}
        onEmailSignUp={signIn()}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Sign up' }));
    expect(
      screen.getByRole('dialog', { name: 'Create your account' })
    ).toBeInTheDocument();
  });

  it('opens on the mode it is asked for, each time it opens', async () => {
    const user = userEvent.setup();
    const props = {
      onClose: vi.fn(),
      onEmailSignIn: signIn(),
      onEmailSignUp: signIn(),
      initialMode: 'signUp' as const,
    };
    const { rerender } = render(<LoginModal open {...props} />);
    expect(
      screen.getByRole('dialog', { name: 'Create your account' })
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Sign in' }));
    rerender(<LoginModal open={false} {...props} />);
    rerender(<LoginModal open {...props} />);
    expect(
      screen.getByRole('dialog', { name: 'Create your account' })
    ).toBeInTheDocument();
  });

  it('opens on signing in when it has no way to sign up', () => {
    render(
      <LoginModal
        open
        onClose={vi.fn()}
        onEmailSignIn={signIn()}
        initialMode='signUp'
      />
    );
    expect(screen.getByRole('dialog', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('closes once somebody has signed in', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onSuccess = vi.fn();
    render(
      <LoginModal
        open
        onClose={onClose}
        onSuccess={onSuccess}
        onEmailSignIn={signIn()}
      />
    );
    await fill(user);
    await user.click(screen.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(onClose).toHaveBeenCalled());
    expect(onSuccess).toHaveBeenCalled();
  });

  it('renders nothing when closed', () => {
    render(
      <LoginModal open={false} onClose={vi.fn()} onEmailSignIn={signIn()} />
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('LoginView password reset', () => {
  const reset = () => vi.fn().mockResolvedValue(undefined);

  it('offers no way to a forgotten password unless given one', () => {
    render(<LoginView onEmailSignIn={signIn()} />);
    expect(
      screen.queryByRole('button', { name: 'Forgot password?' })
    ).not.toBeInTheDocument();
  });

  it('offers it while signing in, and not while creating an account', async () => {
    const user = userEvent.setup();
    render(
      <LoginView
        onEmailSignIn={signIn()}
        onEmailSignUp={signIn()}
        onPasswordReset={reset()}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Forgot password?' })
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Sign up' }));
    expect(
      screen.queryByRole('button', { name: 'Forgot password?' })
    ).not.toBeInTheDocument();
  });

  it('sends the link to the address already typed, and says so', async () => {
    const user = userEvent.setup();
    const onPasswordReset = reset();
    const onSuccess = vi.fn();
    const onModeChange = vi.fn();
    render(
      <LoginView
        onEmailSignIn={signIn()}
        onPasswordReset={onPasswordReset}
        onSuccess={onSuccess}
        onModeChange={onModeChange}
      />
    );
    await user.type(screen.getByLabelText('Email address'), 'ada@example.com');
    await user.click(screen.getByRole('button', { name: 'Forgot password?' }));
    expect(onModeChange).toHaveBeenCalledWith('resetPassword');
    // The address carries over; there is no password to ask for.
    expect(screen.queryByLabelText('Password')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Send reset link' }));
    expect(onPasswordReset).toHaveBeenCalledWith('ada@example.com');
    expect(await screen.findByRole('status')).toHaveTextContent(
      /Check your email/
    );
    // Sending a link signs nobody in.
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('does not say whether the address has an account', async () => {
    const user = userEvent.setup();
    const onPasswordReset = vi.fn().mockRejectedValue(
      Object.assign(new Error('There is no user record.'), {
        code: 'auth/user-not-found',
      })
    );
    render(
      <LoginView
        onEmailSignIn={signIn()}
        onPasswordReset={onPasswordReset}
        mode='resetPassword'
      />
    );
    await user.type(screen.getByLabelText('Email address'), 'x@y.z');
    await user.click(screen.getByRole('button', { name: 'Send reset link' }));
    expect(await screen.findByRole('status')).toBeInTheDocument();
    expect(
      screen.queryByText('There is no user record.')
    ).not.toBeInTheDocument();
  });

  it('reports any other failure, and leads back to signing in', async () => {
    const user = userEvent.setup();
    const onPasswordReset = vi.fn().mockRejectedValue(
      Object.assign(new Error('Too many requests.'), {
        code: 'auth/too-many-requests',
      })
    );
    render(
      <LoginView onEmailSignIn={signIn()} onPasswordReset={onPasswordReset} />
    );
    await user.click(screen.getByRole('button', { name: 'Forgot password?' }));
    await user.type(screen.getByLabelText('Email address'), 'x@y.z');
    await user.click(screen.getByRole('button', { name: 'Send reset link' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Too many requests.'
    );
    await user.click(screen.getByRole('button', { name: 'Back to sign in' }));
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('titles the modal for what it is doing', async () => {
    const user = userEvent.setup();
    render(
      <LoginModal
        open
        onClose={vi.fn()}
        onEmailSignIn={signIn()}
        onPasswordReset={reset()}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Forgot password?' }));
    expect(screen.getByText('Reset your password')).toBeInTheDocument();
  });
});
