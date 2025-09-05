/**
 * Web Platform Style Generator
 * 
 * Converts design system data to Tailwind CSS classes for web components
 */

import { PlatformStyleGenerator } from '@johnqh/design-system';
import { cn } from '../lib/utils';

/**
 * Convert color value to Tailwind CSS class or custom CSS property
 */
function colorToTailwind(color: string, property: 'bg' | 'text' | 'border'): string {
  // Handle transparent
  if (color === 'transparent') {
    return property === 'bg' ? 'bg-transparent' : 
           property === 'text' ? 'text-transparent' : 
           'border-transparent';
  }
  
  // Handle hex colors by creating CSS custom property classes
  if (color.startsWith('#')) {
    const colorClass = `${property}-[${color}]`;
    return colorClass;
  }
  
  // Handle predefined color references (should be converted to Tailwind equivalents)
  // This is where we map design system colors to Tailwind classes
  const colorMappings: Record<string, Record<string, string>> = {
    // Neutral colors
    '#ffffff': { bg: 'bg-white', text: 'text-white', border: 'border-white' },
    '#f9fafb': { bg: 'bg-gray-50', text: 'text-gray-50', border: 'border-gray-50' },
    '#f3f4f6': { bg: 'bg-gray-100', text: 'text-gray-100', border: 'border-gray-100' },
    '#e5e7eb': { bg: 'bg-gray-200', text: 'text-gray-200', border: 'border-gray-200' },
    '#d1d5db': { bg: 'bg-gray-300', text: 'text-gray-300', border: 'border-gray-300' },
    '#9ca3af': { bg: 'bg-gray-400', text: 'text-gray-400', border: 'border-gray-400' },
    '#6b7280': { bg: 'bg-gray-500', text: 'text-gray-500', border: 'border-gray-500' },
    '#4b5563': { bg: 'bg-gray-600', text: 'text-gray-600', border: 'border-gray-600' },
    '#374151': { bg: 'bg-gray-700', text: 'text-gray-700', border: 'border-gray-700' },
    '#1f2937': { bg: 'bg-gray-800', text: 'text-gray-800', border: 'border-gray-800' },
    '#111827': { bg: 'bg-gray-900', text: 'text-gray-900', border: 'border-gray-900' },
    '#000000': { bg: 'bg-black', text: 'text-black', border: 'border-black' },
    
    // Blue colors
    '#eff6ff': { bg: 'bg-blue-50', text: 'text-blue-50', border: 'border-blue-50' },
    '#dbeafe': { bg: 'bg-blue-100', text: 'text-blue-100', border: 'border-blue-100' },
    '#bfdbfe': { bg: 'bg-blue-200', text: 'text-blue-200', border: 'border-blue-200' },
    '#2563eb': { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600' },
    '#1d4ed8': { bg: 'bg-blue-700', text: 'text-blue-700', border: 'border-blue-700' },
    '#1e40af': { bg: 'bg-blue-800', text: 'text-blue-800', border: 'border-blue-800' },
    
    // Red colors
    '#fef2f2': { bg: 'bg-red-50', text: 'text-red-50', border: 'border-red-50' },
    '#fecaca': { bg: 'bg-red-100', text: 'text-red-100', border: 'border-red-100' },
    '#fca5a5': { bg: 'bg-red-200', text: 'text-red-200', border: 'border-red-200' },
    '#f87171': { bg: 'bg-red-300', text: 'text-red-300', border: 'border-red-300' },
    '#dc2626': { bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-600' },
    '#b91c1c': { bg: 'bg-red-700', text: 'text-red-700', border: 'border-red-700' },
    '#991b1b': { bg: 'bg-red-800', text: 'text-red-800', border: 'border-red-800' },
    
    // Green colors
    '#f0fdf4': { bg: 'bg-green-50', text: 'text-green-50', border: 'border-green-50' },
    '#dcfce7': { bg: 'bg-green-100', text: 'text-green-100', border: 'border-green-100' },
    '#bbf7d0': { bg: 'bg-green-200', text: 'text-green-200', border: 'border-green-200' },
    '#86efac': { bg: 'bg-green-300', text: 'text-green-300', border: 'border-green-300' },
    '#16a34a': { bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-600' },
    '#059669': { bg: 'bg-green-700', text: 'text-green-700', border: 'border-green-700' },
    '#047857': { bg: 'bg-green-800', text: 'text-green-800', border: 'border-green-800' },
    
    // Amber colors
    '#fffbeb': { bg: 'bg-amber-50', text: 'text-amber-50', border: 'border-amber-50' },
    '#fef3c7': { bg: 'bg-amber-100', text: 'text-amber-100', border: 'border-amber-100' },
    '#fde68a': { bg: 'bg-amber-200', text: 'text-amber-200', border: 'border-amber-200' },
    '#d97706': { bg: 'bg-amber-600', text: 'text-amber-600', border: 'border-amber-600' },
    '#b45309': { bg: 'bg-amber-700', text: 'text-amber-700', border: 'border-amber-700' },
    '#92400e': { bg: 'bg-amber-800', text: 'text-amber-800', border: 'border-amber-800' },
  };
  
  const mapping = colorMappings[color];
  if (mapping && mapping[property]) {
    return mapping[property];
  }
  
  // Fallback to arbitrary value
  return `${property}-[${color}]`;
}

/**
 * Convert spacing value to Tailwind padding/margin classes
 */
function spacingToTailwind(spacing: { horizontal?: number; vertical?: number }, type: 'p' | 'm' = 'p'): string {
  const classes: string[] = [];
  
  if (spacing.horizontal !== undefined) {
    const hClass = spacingNumberToTailwind(spacing.horizontal, `${type}x`);
    if (hClass) classes.push(hClass);
  }
  
  if (spacing.vertical !== undefined) {
    const vClass = spacingNumberToTailwind(spacing.vertical, `${type}y`);
    if (vClass) classes.push(vClass);
  }
  
  return classes.join(' ');
}

/**
 * Convert numeric spacing to Tailwind class
 */
function spacingNumberToTailwind(value: number, prefix: string): string {
  // Map pixel values to Tailwind spacing scale
  const spacingMap: Record<number, string> = {
    0: '0',
    2: '0.5',
    4: '1',
    6: '1.5', 
    8: '2',
    10: '2.5',
    12: '3',
    14: '3.5',
    16: '4',
    18: '5',
    20: '5',
    24: '6',
    28: '7',
    32: '8',
    36: '9',
    40: '10',
    44: '11',
    48: '12',
  };
  
  const scale = spacingMap[value];
  if (scale) {
    return `${prefix}-${scale}`;
  }
  
  // Use arbitrary value for custom spacing
  return `${prefix}-[${value}px]`;
}

/**
 * Convert border radius to Tailwind class
 */
function radiusToTailwind(radius: number): string {
  const radiusMap: Record<number, string> = {
    0: 'rounded-none',
    2: 'rounded-sm',
    4: 'rounded',
    6: 'rounded-md',
    8: 'rounded-lg',
    12: 'rounded-xl',
    16: 'rounded-2xl',
    9999: 'rounded-full',
  };
  
  const tailwindClass = radiusMap[radius];
  if (tailwindClass) {
    return tailwindClass;
  }
  
  return `rounded-[${radius}px]`;
}

/**
 * Web Platform Style Generator Implementation
 */
export class WebStyleGenerator implements PlatformStyleGenerator {
  generateComponentStyles(variant: any, size?: any): string {
    const classes: string[] = [];
    
    // Base component classes
    classes.push('inline-flex', 'items-center', 'justify-center', 'transition-colors');
    
    // Add variant colors
    if (variant?.colors) {
      if (variant.colors.background) {
        classes.push(colorToTailwind(variant.colors.background, 'bg'));
      }
      if (variant.colors.text) {
        classes.push(colorToTailwind(variant.colors.text, 'text'));
      }
      if (variant.colors.border && variant.colors.border !== 'transparent') {
        classes.push('border', colorToTailwind(variant.colors.border, 'border'));
      }
    }
    
    // Add size classes
    if (size) {
      if (size.padding) {
        classes.push(spacingToTailwind(size.padding, 'p'));
      }
      if (size.fontSize) {
        const fontSize = this.fontSizeToTailwind(size.fontSize);
        if (fontSize) classes.push(fontSize);
      }
      if (size.height) {
        const height = this.heightToTailwind(size.height);
        if (height) classes.push(height);
      }
      if (size.borderRadius !== undefined) {
        classes.push(radiusToTailwind(size.borderRadius));
      }
    }
    
    // Add hover states
    if (variant?.states?.hover) {
      if (variant.states.hover.background) {
        classes.push(`hover:${colorToTailwind(variant.states.hover.background, 'bg')}`);
      }
      if (variant.states.hover.text) {
        classes.push(`hover:${colorToTailwind(variant.states.hover.text, 'text')}`);
      }
    }
    
    // Add focus states
    if (variant?.states?.focus?.ring) {
      classes.push('focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2');
      classes.push(`focus:ring-${this.colorToTailwindScale(variant.states.focus.ring)}`);
    }
    
    // Add disabled states
    if (variant?.states?.disabled) {
      classes.push('disabled:opacity-50', 'disabled:cursor-not-allowed');
      if (variant.states.disabled.background) {
        classes.push(`disabled:${colorToTailwind(variant.states.disabled.background, 'bg')}`);
      }
    }
    
    return cn(...classes);
  }
  
  generateTypographyStyles(textVariant: any): string {
    const classes: string[] = [];
    
    if (textVariant.fontSize) {
      classes.push(this.fontSizeToTailwind(textVariant.fontSize) || '');
    }
    
    if (textVariant.fontWeight) {
      classes.push(this.fontWeightToTailwind(textVariant.fontWeight) || '');
    }
    
    if (textVariant.lineHeight) {
      classes.push(this.lineHeightToTailwind(textVariant.lineHeight) || '');
    }
    
    return cn(...classes);
  }
  
  generateSpacingStyles(spacing: any): string {
    return spacingToTailwind(spacing);
  }
  
  generateColorStyles(colors: any): string {
    const classes: string[] = [];
    
    if (colors.background) {
      classes.push(colorToTailwind(colors.background, 'bg'));
    }
    if (colors.text) {
      classes.push(colorToTailwind(colors.text, 'text'));
    }
    if (colors.border) {
      classes.push(colorToTailwind(colors.border, 'border'));
    }
    
    return cn(...classes);
  }
  
  generateAnimationStyles(animation: any): string {
    const classes: string[] = [];
    
    if (animation.duration) {
      classes.push(`duration-${animation.duration}`);
    }
    if (animation.easing) {
      classes.push(`ease-${animation.easing}`);
    }
    
    return cn(...classes);
  }
  
  // Helper methods
  private fontSizeToTailwind(fontSize: number): string {
    const fontSizeMap: Record<number, string> = {
      10: 'text-xs',
      12: 'text-xs',
      14: 'text-sm',
      16: 'text-base',
      18: 'text-lg',
      20: 'text-xl',
      24: 'text-2xl',
    };
    
    return fontSizeMap[fontSize] || `text-[${fontSize}px]`;
  }
  
  private fontWeightToTailwind(weight: number): string {
    const weightMap: Record<number, string> = {
      300: 'font-light',
      400: 'font-normal',
      500: 'font-medium',
      600: 'font-semibold',
      700: 'font-bold',
    };
    
    return weightMap[weight] || `font-[${weight}]`;
  }
  
  private lineHeightToTailwind(lineHeight: number): string {
    const lineHeightMap: Record<number, string> = {
      1: 'leading-none',
      1.25: 'leading-tight',
      1.375: 'leading-snug',
      1.5: 'leading-normal',
      1.625: 'leading-relaxed',
      2: 'leading-loose',
    };
    
    return lineHeightMap[lineHeight] || `leading-[${lineHeight}]`;
  }
  
  private heightToTailwind(height: number): string {
    const heightMap: Record<number, string> = {
      28: 'h-7',
      32: 'h-8',
      40: 'h-10',
      44: 'h-11',
      48: 'h-12',
    };
    
    return heightMap[height] || `h-[${height}px]`;
  }
  
  private colorToTailwindScale(color: string): string {
    // Extract Tailwind color scale from hex color
    if (color.includes('blue')) return 'blue-500';
    if (color.includes('red')) return 'red-500';
    if (color.includes('green')) return 'green-500';
    return 'gray-500';
  }
}

// Create and export the web generator instance
export const webStyleGenerator = new WebStyleGenerator();