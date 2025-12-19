import { useState, type FormEvent } from 'react';
import { Button, Input, Text } from '@sudobility/components';
import { useAuthStatus } from '../../context/auth-provider';
import type { EmailSignUpFormProps } from '../../types';

/**
 * Email sign-up form component
 */
export function EmailSignUpForm({
  onSwitchToSignIn,
  onSuccess,
  compact,
}: EmailSignUpFormProps) {
  const { signUpWithEmail, loading, error, clearError, texts } =
    useAuthStatus();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError(null);

    // Validate password match
    if (password !== confirmPassword) {
      setValidationError(texts.passwordMismatch);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setValidationError(texts.passwordTooShort);
      return;
    }

    await signUpWithEmail(email, password, displayName || undefined);

    // If no error after sign up, call success callback
    onSuccess?.();
  };

  const buttonSize = compact ? 'default' : 'lg';
  const spacing = compact ? 'space-y-3' : 'space-y-4';
  const displayError = validationError || error;

  return (
    <form onSubmit={handleSubmit} className={spacing}>
      <div className={spacing}>
        <div>
          <label
            htmlFor='signup-name'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
          >
            {texts.displayName}
          </label>
          <Input
            id='signup-name'
            type='text'
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            placeholder={texts.displayNamePlaceholder}
            autoComplete='name'
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor='signup-email'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
          >
            {texts.email}
          </label>
          <Input
            id='signup-email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={texts.emailPlaceholder}
            required
            autoComplete='email'
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor='signup-password'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
          >
            {texts.password}
          </label>
          <Input
            id='signup-password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={texts.passwordPlaceholder}
            required
            autoComplete='new-password'
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor='signup-confirm'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
          >
            {texts.confirmPassword}
          </label>
          <Input
            id='signup-confirm'
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder={texts.confirmPasswordPlaceholder}
            required
            autoComplete='new-password'
            disabled={loading}
          />
        </div>
      </div>

      {/* Error message */}
      {displayError && (
        <Text size='sm' className='text-red-600 dark:text-red-400'>
          {displayError}
        </Text>
      )}

      {/* Submit button */}
      <Button
        type='submit'
        variant='primary'
        size={buttonSize}
        disabled={loading}
        className='w-full'
      >
        {loading ? texts.loading : texts.signUp}
      </Button>

      {/* Sign in link */}
      <div className='text-center'>
        <Text size='sm' color='muted'>
          {texts.haveAccount}{' '}
          <button
            type='button'
            onClick={onSwitchToSignIn}
            className='text-blue-600 dark:text-blue-400 hover:underline font-medium'
          >
            {texts.signIn}
          </button>
        </Text>
      </div>
    </form>
  );
}
