/**
 * Theme utility functions for responsive design and theme management
 */

// Removed unused colors import

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResponsiveBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Get color value with opacity
 */
export function withOpacity(color: string, opacity: number): string {
  // Handle HSL colors
  if (color.startsWith('hsl(')) {
    return color.replace(')', ` / ${opacity})`);
  }
  
  // Handle hex colors  
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  return color;
}

/**
 * Generate responsive class variants
 */
export function responsive(baseClass: string, breakpoints: Partial<Record<ResponsiveBreakpoint, string>> = {}): string {
  const classes = [baseClass];
  
  Object.entries(breakpoints).forEach(([bp, value]) => {
    classes.push(`${bp}:${value}`);
  });
  
  return classes.join(' ');
}

/**
 * Create theme-aware color classes
 */
export function themeColor(lightColor: string, darkColor: string): string {
  return `${lightColor} dark:${darkColor}`;
}

/**
 * Get semantic color from design system
 */
export function getSemanticColor(colorName: string, shade: string = 'light'): string {
  // Return a safe fallback color
  if (colorName === 'primary') return shade === 'dark' ? '#ffffff' : '#111827';
  if (colorName === 'secondary') return shade === 'dark' ? '#9ca3af' : '#4b5563';
  return shade === 'dark' ? '#ffffff' : '#111827';
}

/**
 * Generate gradient classes
 */
export function gradient(from: string, to: string, direction: string = 'to-r'): string {
  return `bg-gradient-${direction} from-${from} to-${to}`;
}

/**
 * Spacing utility
 */
export function spacing(size: string | number): string {
  return typeof size === 'number' ? `${size * 0.25}rem` : size;
}

/**
 * Create animation classes
 */
export function animation(duration: string = '200ms', easing: string = 'ease-out'): string {
  return `transition-all duration-${duration.replace('ms', '')} ${easing}`;
}