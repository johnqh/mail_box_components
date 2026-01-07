/**
 * Theme system types
 */

/**
 * Available theme modes
 */
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

/**
 * Available font sizes
 */
export enum FontSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

/**
 * Theme context value
 */
export interface ThemeContextType {
  theme: Theme;
  fontSize: FontSize;
  setTheme: (theme: Theme) => void;
  setFontSize: (fontSize: FontSize) => void;
  /**
   * The actual theme being applied (resolves 'system' to 'light' or 'dark')
   */
  resolvedTheme: Theme.LIGHT | Theme.DARK;
}

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Storage key for theme preference
   * @default 'theme'
   */
  themeStorageKey?: string;
  /**
   * Storage key for font size preference
   * @default 'font-size'
   */
  fontSizeStorageKey?: string;
  /**
   * Default theme
   * @default Theme.LIGHT
   */
  defaultTheme?: Theme;
  /**
   * Default font size
   * @default FontSize.MEDIUM
   */
  defaultFontSize?: FontSize;
}
