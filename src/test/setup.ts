import '@testing-library/jest-dom';

// Node 22 exposes a partial localStorage global that is undefined unless
// started with --localstorage-file. Provide the small Web Storage surface
// used by the browser-oriented tests when that global is unavailable.
if (typeof globalThis.localStorage === 'undefined') {
  const values = new Map<string, string>();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, String(value)),
      removeItem: (key: string) => values.delete(key),
      clear: () => values.clear(),
      key: (index: number) => [...values.keys()][index] ?? null,
      get length() {
        return values.size;
      },
    },
  });
}

// jsdom implements neither the Pointer Capture API nor Element.scrollIntoView,
// both of which Radix's Select calls unconditionally — the first from the
// trigger's pointerdown handler, the second while positioning the open listbox
// against the selected item. Without these, any test that drives a Select the
// way a real user does (userEvent, which dispatches a full pointer sequence)
// throws inside Radix before the menu ever opens, and only bare fireEvent
// clicks work. That gap hides real bugs: a component can pass every
// fireEvent test and still be broken under a real pointer.
for (const method of [
  'hasPointerCapture',
  'setPointerCapture',
  'releasePointerCapture',
] as const) {
  if (typeof Element !== 'undefined' && !Element.prototype[method]) {
    Object.defineProperty(Element.prototype, method, {
      value: (): boolean => false,
      writable: true,
      configurable: true,
    });
  }
}

if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    value: (): void => {},
    writable: true,
    configurable: true,
  });
}

// jsdom does not implement `window.matchMedia` at all (confirmed: `typeof window.matchMedia` is
// `'undefined'`, not just non-functional) — needed by `MasterDetailLayout`'s desktop/mobile split
// (`useIsDesktop`) and by `core/theme/theme-context.tsx`'s system-theme detection. A real browser's
// `matchMedia` is driven by actual layout; this stub is driven by `window.innerWidth` instead, which is
// enough for every `min-width`/`max-width` query this repo actually uses, and lets a test simulate a
// breakpoint crossing the normal way: set `window.innerWidth` then dispatch a `resize` event, exactly
// like `MasterDetailLayout.test.tsx`'s own `setViewportWidth` helper does.
//
// A query with neither `min-width` nor `max-width` (`prefers-reduced-motion`, `prefers-color-scheme`,
// ...) MUST default to `matches: false`, not `true` — defaulting true broke a real test the hard way:
// `MasterDetailLayout`'s own slide-transition effect checks `(prefers-reduced-motion: reduce)` and
// skips the animation entirely when it matches, so an over-eager stub silently disabled every
// mobile-transition test (no thrown error, just a missing `.absolute.z-10` — this stub had falsely
// claimed the test environment prefers reduced motion). `false` matches a real browser's default when
// no OS-level preference is set, which is the common case and the one every test here wants.
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  const parsePx = (
    query: string,
    prop: 'min-width' | 'max-width'
  ): number | null => {
    const m = new RegExp(`${prop}:\\s*(\\d+(?:\\.\\d+)?)px`).exec(query);
    return m ? Number(m[1]) : null;
  };
  const evaluates = (query: string): boolean => {
    const min = parsePx(query, 'min-width');
    const max = parsePx(query, 'max-width');
    if (min === null && max === null) return false; // unrecognized query: never claims a match
    if (min !== null && window.innerWidth < min) return false;
    if (max !== null && window.innerWidth > max) return false;
    return true;
  };
  window.matchMedia = (query: string): MediaQueryList => {
    // The window-level `resize` listener is only attached once a caller actually registers its own
    // `change` listener, and removed again once none are left — every render of every future test
    // otherwise calls `matchMedia` at least once (`useIsDesktop`'s initial `useState`), permanently
    // leaking a listener per call with nothing to ever remove it.
    const listeners = new Set<(e: MediaQueryListEvent) => void>();
    const onResize = () => {
      const event = {
        matches: evaluates(query),
        media: query,
      } as MediaQueryListEvent;
      for (const l of listeners) l(event);
    };
    const add = (cb: (e: MediaQueryListEvent) => void) => {
      if (listeners.size === 0) window.addEventListener('resize', onResize);
      listeners.add(cb);
    };
    const remove = (cb: (e: MediaQueryListEvent) => void) => {
      listeners.delete(cb);
      if (listeners.size === 0) window.removeEventListener('resize', onResize);
    };
    return {
      get matches() {
        return evaluates(query);
      },
      media: query,
      onchange: null,
      addListener: add, // deprecated, some libs still call it
      removeListener: remove,
      addEventListener: (
        type: string,
        cb: (e: MediaQueryListEvent) => void
      ) => {
        if (type === 'change') add(cb);
      },
      removeEventListener: (
        type: string,
        cb: (e: MediaQueryListEvent) => void
      ) => {
        if (type === 'change') remove(cb);
      },
      dispatchEvent: () => true,
    } as MediaQueryList;
  };
}
