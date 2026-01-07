/**
 * Theme system for managing application appearance
 *
 * @example
 * ```tsx
 * import { ThemeProvider, useTheme, Theme, FontSize } from '@sudobility/components/core/theme';
 *
 * // Wrap your app
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme={Theme.SYSTEM}>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 *
 * // Use in components
 * function ThemeToggle() {
 *   const { theme, setTheme, resolvedTheme } = useTheme();
 *
 *   return (
 *     <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
 *       <option value={Theme.LIGHT}>Light</option>
 *       <option value={Theme.DARK}>Dark</option>
 *       <option value={Theme.SYSTEM}>System</option>
 *     </select>
 *   );
 * }
 * ```
 */

export { ThemeProvider, ThemeContext, useTheme } from './theme-context';
export { Theme, FontSize } from './types';
export type { ThemeContextType, ThemeProviderProps } from './types';
