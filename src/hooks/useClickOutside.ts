import { useEffect, RefObject } from 'react';

/**
 * Hook that detects clicks outside of a referenced element.
 *
 * Attaches mousedown and touchstart event listeners to the document
 * and calls the handler when a click occurs outside the referenced element.
 * Useful for closing dropdowns, modals, or popovers when clicking outside.
 *
 * @param ref - React ref object pointing to the element to monitor
 * @param handler - Callback invoked when a click outside the element is detected
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
