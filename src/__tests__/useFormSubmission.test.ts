import { renderHook, act } from '@testing-library/react';
import { useFormSubmission } from '../hooks/useFormSubmission';

describe('useFormSubmission', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initialization', () => {
    it('starts with isSubmitting false and empty messages', () => {
      const { result } = renderHook(() => useFormSubmission());

      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.successMessage).toBe('');
      expect(result.current.errorMessage).toBe('');
    });
  });

  describe('successful submission', () => {
    it('sets isSubmitting to true during submission', async () => {
      const { result } = renderHook(() => useFormSubmission());

      let resolvePromise: () => void;
      const promise = new Promise<void>(resolve => {
        resolvePromise = resolve;
      });

      act(() => {
        result.current.submit(() => promise);
      });

      expect(result.current.isSubmitting).toBe(true);

      await act(async () => {
        resolvePromise!();
        await promise;
      });

      expect(result.current.isSubmitting).toBe(false);
    });

    it('sets success message after submission', async () => {
      const { result } = renderHook(() =>
        useFormSubmission({ successMessage: 'Saved!' })
      );

      await act(async () => {
        await result.current.submit(async () => {});
      });

      expect(result.current.successMessage).toBe('Saved!');
    });

    it('auto-clears success message after successDuration', async () => {
      const { result } = renderHook(() =>
        useFormSubmission({
          successMessage: 'Saved!',
          successDuration: 3000,
        })
      );

      await act(async () => {
        await result.current.submit(async () => {});
      });

      expect(result.current.successMessage).toBe('Saved!');

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.successMessage).toBe('');
    });

    it('does not auto-clear success message when successDuration is 0', async () => {
      const { result } = renderHook(() =>
        useFormSubmission({
          successMessage: 'Saved!',
          successDuration: 0,
        })
      );

      await act(async () => {
        await result.current.submit(async () => {});
      });

      act(() => {
        vi.advanceTimersByTime(10000);
      });

      expect(result.current.successMessage).toBe('Saved!');
    });

    it('does not set success message when none configured', async () => {
      const { result } = renderHook(() => useFormSubmission());

      await act(async () => {
        await result.current.submit(async () => {});
      });

      expect(result.current.successMessage).toBe('');
    });

    it('calls onSuccess callback', async () => {
      const onSuccess = vi.fn();
      const { result } = renderHook(() => useFormSubmission({ onSuccess }));

      await act(async () => {
        await result.current.submit(async () => {});
      });

      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });

  describe('failed submission', () => {
    it('sets error message from Error instance', async () => {
      const { result } = renderHook(() => useFormSubmission());

      await act(async () => {
        try {
          await result.current.submit(async () => {
            throw new Error('Network error');
          });
        } catch {
          // Expected
        }
      });

      expect(result.current.errorMessage).toBe('Network error');
    });

    it('uses default message for non-Error throws', async () => {
      const { result } = renderHook(() => useFormSubmission());

      await act(async () => {
        try {
          await result.current.submit(async () => {
            throw 'string error';
          });
        } catch {
          // Expected
        }
      });

      expect(result.current.errorMessage).toBe('An error occurred');
    });

    it('prepends errorPrefix to error message', async () => {
      const { result } = renderHook(() =>
        useFormSubmission({ errorPrefix: 'Save failed' })
      );

      await act(async () => {
        try {
          await result.current.submit(async () => {
            throw new Error('timeout');
          });
        } catch {
          // Expected
        }
      });

      expect(result.current.errorMessage).toBe('Save failed: timeout');
    });

    it('calls onError callback with the error', async () => {
      const onError = vi.fn();
      const { result } = renderHook(() => useFormSubmission({ onError }));
      const error = new Error('Network error');

      await act(async () => {
        try {
          await result.current.submit(async () => {
            throw error;
          });
        } catch {
          // Expected
        }
      });

      expect(onError).toHaveBeenCalledWith(error);
    });

    it('does not call onError for non-Error throws', async () => {
      const onError = vi.fn();
      const { result } = renderHook(() => useFormSubmission({ onError }));

      await act(async () => {
        try {
          await result.current.submit(async () => {
            throw 'not an Error';
          });
        } catch {
          // Expected
        }
      });

      expect(onError).not.toHaveBeenCalled();
    });

    it('re-throws the error for caller handling', async () => {
      const { result } = renderHook(() => useFormSubmission());
      const error = new Error('test error');

      await expect(
        act(async () => {
          await result.current.submit(async () => {
            throw error;
          });
        })
      ).rejects.toThrow('test error');
    });

    it('sets isSubmitting to false after failure', async () => {
      const { result } = renderHook(() => useFormSubmission());

      await act(async () => {
        try {
          await result.current.submit(async () => {
            throw new Error('fail');
          });
        } catch {
          // Expected
        }
      });

      expect(result.current.isSubmitting).toBe(false);
    });
  });

  describe('message clearing', () => {
    it('clears previous messages before new submission', async () => {
      const { result } = renderHook(() =>
        useFormSubmission({ successMessage: 'Done!' })
      );

      // First submission succeeds
      await act(async () => {
        await result.current.submit(async () => {});
      });
      expect(result.current.successMessage).toBe('Done!');

      // Second submission fails - success message should be cleared
      await act(async () => {
        try {
          await result.current.submit(async () => {
            throw new Error('fail');
          });
        } catch {
          // Expected
        }
      });

      expect(result.current.successMessage).toBe('');
      expect(result.current.errorMessage).toBe('fail');
    });

    it('clearMessages clears both success and error', async () => {
      const { result } = renderHook(() =>
        useFormSubmission({ successMessage: 'Done!' })
      );

      await act(async () => {
        await result.current.submit(async () => {});
      });

      act(() => {
        result.current.clearMessages();
      });

      expect(result.current.successMessage).toBe('');
      expect(result.current.errorMessage).toBe('');
    });

    it('clearSuccess clears only success message', async () => {
      const { result } = renderHook(() =>
        useFormSubmission({ successMessage: 'Done!' })
      );

      await act(async () => {
        await result.current.submit(async () => {});
      });

      act(() => {
        result.current.clearSuccess();
      });

      expect(result.current.successMessage).toBe('');
    });

    it('clearError clears only error message', async () => {
      const { result } = renderHook(() => useFormSubmission());

      await act(async () => {
        try {
          await result.current.submit(async () => {
            throw new Error('error');
          });
        } catch {
          // Expected
        }
      });

      act(() => {
        result.current.clearError();
      });

      expect(result.current.errorMessage).toBe('');
    });
  });
});
