import { useState, useCallback } from 'react';

export interface CopyToClipboardOptions {
  successDuration?: number;
  onSuccess?: (text: string) => void;
  onError?: (error: Error) => void;
}

export interface CopyToClipboardResult {
  copiedValue: string | null;
  copyToClipboard: (text: string) => Promise<boolean>;
  isCopied: (text: string) => boolean;
  resetCopiedState: () => void;
}

/**
 * Hook for managing copy-to-clipboard functionality with feedback
 * 
 * Features:
 * - Async clipboard API with fallback
 * - Visual feedback state management
 * - Automatic timeout for feedback reset
 * - Error handling
 * - Multiple copy tracking
 * 
 * @param options - Configuration options
 * @returns Object with copy function and state
 * 
 * @example
 * const { copyToClipboard, isCopied } = useCopyToClipboard({
 *   successDuration: 2000,
 *   onSuccess: (text) => console.log('Copied:', text)
 * });
 * 
 * // In component
 * <button onClick={() => copyToClipboard('Hello World')}>
 *   {isCopied('Hello World') ? '✓ Copied!' : 'Copy'}
 * </button>
 */
export const useCopyToClipboard = (
  options: CopyToClipboardOptions = {}
): CopyToClipboardResult => {
  const {
    successDuration = 2000,
    onSuccess,
    onError,
  } = options;

  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      // Modern browsers - use Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
          throw new Error('Copy command was unsuccessful');
        }
      }

      // Set success state
      setCopiedValue(text);
      onSuccess?.(text);

      // Reset after duration
      setTimeout(() => {
        setCopiedValue(null);
      }, successDuration);

      return true;
    } catch (error) {
      const copyError = error instanceof Error ? error : new Error('Copy failed');
      onError?.(copyError);
      return false;
    }
  }, [successDuration, onSuccess, onError]);

  const isCopied = useCallback((text: string): boolean => {
    return copiedValue === text;
  }, [copiedValue]);

  const resetCopiedState = useCallback(() => {
    setCopiedValue(null);
  }, []);

  return {
    copiedValue,
    copyToClipboard,
    isCopied,
    resetCopiedState,
  };
};

/**
 * Hook for managing multiple copy states simultaneously
 * 
 * Useful when you have multiple copyable items on the same page
 * and want to track their individual copy states.
 * 
 * @param options - Configuration options
 * @returns Object with copy function and state management
 * 
 * @example
 * const { copyToClipboard, isCopied } = useMultipleCopyToClipboard();
 * 
 * // Each item has its own copy state
 * <button onClick={() => copyToClipboard('code1', 'item1')}>
 *   {isCopied('item1') ? '✓ Copied!' : 'Copy'}
 * </button>
 * <button onClick={() => copyToClipboard('code2', 'item2')}>
 *   {isCopied('item2') ? '✓ Copied!' : 'Copy'}
 * </button>
 */
export const useMultipleCopyToClipboard = (
  options: CopyToClipboardOptions = {}
) => {
  const {
    successDuration = 2000,
    onSuccess,
    onError,
  } = options;

  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyToClipboard = useCallback(async (text: string, key: string): Promise<boolean> => {
    try {
      // Modern browsers - use Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
          throw new Error('Copy command was unsuccessful');
        }
      }

      // Set success state for this key
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      onSuccess?.(text);

      // Reset after duration
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, successDuration);

      return true;
    } catch (error) {
      const copyError = error instanceof Error ? error : new Error('Copy failed');
      onError?.(copyError);
      return false;
    }
  }, [successDuration, onSuccess, onError]);

  const isCopied = useCallback((key: string): boolean => {
    return copiedStates[key] || false;
  }, [copiedStates]);

  const resetCopiedState = useCallback((key?: string) => {
    if (key) {
      setCopiedStates(prev => ({ ...prev, [key]: false }));
    } else {
      setCopiedStates({});
    }
  }, []);

  return {
    copiedStates,
    copyToClipboard,
    isCopied,
    resetCopiedState,
  };
};

export default useCopyToClipboard;