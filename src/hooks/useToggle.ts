import { useState, useCallback } from 'react';

export interface UseToggleReturn {
  /** Current value of the toggle */
  value: boolean;
  /** Set the toggle to true */
  setTrue: () => void;
  /** Set the toggle to false */
  setFalse: () => void;
  /** Toggle the current value */
  toggle: () => void;
  /** Set a specific value */
  setValue: (value: boolean) => void;
}

/**
 * useToggle Hook
 *
 * Manages boolean state with convenient helper functions.
 * Useful for modals, settings, feature flags, etc.
 *
 * @param initialValue - Initial boolean value (default: false)
 *
 * @example
 * ```tsx
 * const modal = useToggle(false);
 *
 * return (
 *   <>
 *     <Button onClick={modal.setTrue}>Open Modal</Button>
 *     <Modal isOpen={modal.value} onClose={modal.setFalse}>
 *       <ModalContent>Content</ModalContent>
 *     </Modal>
 *   </>
 * );
 * ```
 */
export const useToggle = (initialValue = false): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(v => !v), []);

  return {
    value,
    setTrue,
    setFalse,
    toggle,
    setValue,
  };
};

export default useToggle;
