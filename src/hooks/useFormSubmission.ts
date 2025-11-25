import { useState, useCallback } from 'react';

export interface UseFormSubmissionOptions {
  /** Success message to show (if not provided, no success message will be set) */
  successMessage?: string;
  /** How long to show success message before clearing (ms, 0 = don't auto-clear) */
  successDuration?: number;
  /** Error message prefix (actual error will be appended) */
  errorPrefix?: string;
  /** Callback after successful submission */
  onSuccess?: () => void;
  /** Callback after failed submission */
  onError?: (error: Error) => void;
}

export interface UseFormSubmissionReturn {
  /** Whether the form is currently being submitted */
  isSubmitting: boolean;
  /** Success message to display */
  successMessage: string;
  /** Error message to display */
  errorMessage: string;
  /** Submit the form with the provided async function */
  submit: (fn: () => Promise<void>) => Promise<void>;
  /** Clear all messages */
  clearMessages: () => void;
  /** Clear only success message */
  clearSuccess: () => void;
  /** Clear only error message */
  clearError: () => void;
}

/**
 * useFormSubmission Hook
 *
 * Manages form submission state including loading, success, and error states.
 * Reduces boilerplate for common form submission patterns.
 *
 * @example
 * ```tsx
 * const { isSubmitting, successMessage, errorMessage, submit, clearMessages } = useFormSubmission({
 *   successMessage: 'Settings saved successfully',
 *   successDuration: 3000,
 * });
 *
 * const handleSave = () => submit(async () => {
 *   await saveSettings(data);
 * });
 *
 * return (
 *   <>
 *     <FormAlerts
 *       successMessage={successMessage}
 *       errorMessage={errorMessage}
 *       onSuccessDismiss={clearSuccess}
 *     />
 *     <ActionButton onClick={handleSave} isLoading={isSubmitting}>
 *       Save Changes
 *     </ActionButton>
 *   </>
 * );
 * ```
 */
export const useFormSubmission = (
  options: UseFormSubmissionOptions = {}
): UseFormSubmissionReturn => {
  const {
    successMessage: defaultSuccessMessage = '',
    successDuration = 3000,
    errorPrefix = '',
    onSuccess,
    onError,
  } = options;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearMessages = useCallback(() => {
    setSuccessMessage('');
    setErrorMessage('');
  }, []);

  const clearSuccess = useCallback(() => {
    setSuccessMessage('');
  }, []);

  const clearError = useCallback(() => {
    setErrorMessage('');
  }, []);

  const submit = useCallback(
    async (fn: () => Promise<void>) => {
      setIsSubmitting(true);
      clearMessages();

      try {
        await fn();

        // Set success message
        if (defaultSuccessMessage) {
          setSuccessMessage(defaultSuccessMessage);

          // Auto-clear success message
          if (successDuration > 0) {
            setTimeout(() => {
              setSuccessMessage('');
            }, successDuration);
          }
        }

        // Call success callback
        if (onSuccess) {
          onSuccess();
        }
      } catch (err) {
        // Set error message
        const errorMsg =
          err instanceof Error ? err.message : 'An error occurred';
        setErrorMessage(errorPrefix ? `${errorPrefix}: ${errorMsg}` : errorMsg);

        // Call error callback
        if (onError && err instanceof Error) {
          onError(err);
        }

        // Re-throw to allow caller to handle if needed
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      defaultSuccessMessage,
      successDuration,
      errorPrefix,
      onSuccess,
      onError,
      clearMessages,
    ]
  );

  return {
    isSubmitting,
    successMessage,
    errorMessage,
    submit,
    clearMessages,
    clearSuccess,
    clearError,
  };
};
