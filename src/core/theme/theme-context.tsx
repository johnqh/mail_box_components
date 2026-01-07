/**
 * Theme context and provider for managing theme preferences
 */

/* global MediaQueryListEvent */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Theme, FontSize } from './types';
import type { ThemeContextType, ThemeProviderProps } from './types';

/**
 * Safe localStorage wrapper
 */
const storage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore storage errors (e.g., private browsing mode)
    }
  },
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

/**
 * Hook to access the theme context
 *
 * @returns Theme context value
 * @throws Error if used outside ThemeProvider
 *
 * @example
 * ```tsx
 * const { theme, setTheme, resolvedTheme } = useTheme();
 *
 * // Toggle between light and dark
 * <button onClick={() => setTheme(resolvedTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}>
 *   Toggle Theme
 * </button>
 * ```
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Theme provider component that manages theme and font size preferences.
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <ThemeProvider
 *       themeStorageKey="my-app-theme"
 *       defaultTheme={Theme.SYSTEM}
 *     >
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({
  children,
  themeStorageKey = 'theme',
  fontSizeStorageKey = 'font-size',
  defaultTheme = Theme.LIGHT,
  defaultFontSize = FontSize.MEDIUM,
}: ThemeProviderProps): React.ReactElement {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = storage.getItem(themeStorageKey);
    return (saved as Theme) || defaultTheme;
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const saved = storage.getItem(fontSizeStorageKey);
    return (saved as FontSize) || defaultFontSize;
  });

  const [resolvedTheme, setResolvedTheme] = useState<Theme.LIGHT | Theme.DARK>(
    () => {
      if (theme === Theme.SYSTEM) {
        const prefersDark =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? Theme.DARK : Theme.LIGHT;
      }
      return theme as Theme.LIGHT | Theme.DARK;
    }
  );

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      storage.setItem(themeStorageKey, newTheme);
    },
    [themeStorageKey]
  );

  const setFontSize = useCallback(
    (newFontSize: FontSize) => {
      setFontSizeState(newFontSize);
      storage.setItem(fontSizeStorageKey, newFontSize);
    },
    [fontSizeStorageKey]
  );

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    // Determine the actual theme to apply
    let actualTheme: Theme.LIGHT | Theme.DARK = theme as
      | Theme.LIGHT
      | Theme.DARK;

    if (theme === Theme.SYSTEM) {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      actualTheme = prefersDark ? Theme.DARK : Theme.LIGHT;
    }

    setResolvedTheme(actualTheme);

    // Apply theme class
    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);

    // Apply font size class
    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${fontSize}`);
  }, [theme, fontSize]);

  // Listen for system theme changes when using system theme
  useEffect(() => {
    if (theme === Theme.SYSTEM) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (e: MediaQueryListEvent) => {
        const root = document.documentElement;
        const actualTheme = e.matches ? Theme.DARK : Theme.LIGHT;
        setResolvedTheme(actualTheme);
        root.classList.remove('light', 'dark');
        root.classList.add(actualTheme);
      };

      mediaQuery.addEventListener('change', handleChange);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [theme]);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      fontSize,
      setTheme,
      setFontSize,
      resolvedTheme,
    }),
    [theme, fontSize, setTheme, setFontSize, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
