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
