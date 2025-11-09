import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface Color {
  /** Color hex value */
  hex: string;
  /** Color name */
  name?: string;
}

export interface ColorSwatchProps {
  /** Colors to display */
  colors: Color[] | string[];
  /** Selected color */
  selectedColor?: string;
  /** Color change handler */
  onColorSelect?: (color: string) => void;
  /** Swatch size */
  size?: 'sm' | 'md' | 'lg';
  /** Show color names */
  showNames?: boolean;
  /** Show copy button */
  showCopy?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * ColorSwatch Component
 *
 * Color palette display with selection and copy functionality.
 * Useful for color pickers and design systems.
 *
 * @example
 * ```tsx
 * <ColorSwatch
 *   colors={['#FF0000', '#00FF00', '#0000FF']}
 *   selectedColor={activeColor}
 *   onColorSelect={setActiveColor}
 *   showCopy
 * />
 * ```
 */
export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  colors,
  selectedColor,
  onColorSelect,
  size = 'md',
  showNames = false,
  showCopy = false,
  className,
}) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const normalizeColors = (): Color[] => {
    return colors.map((color) =>
      typeof color === 'string' ? { hex: color } : color
    );
  };

  const handleCopy = async (hex: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const normalizedColors = normalizeColors();

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {normalizedColors.map((color, index) => {
        const isSelected = selectedColor === color.hex;
        const isCopied = copiedColor === color.hex;

        return (
          <div key={index} className="flex flex-col items-center gap-2">
            <button
              onClick={() => onColorSelect?.(color.hex)}
              className={cn(
                'rounded-lg transition-all relative group',
                sizeClasses[size],
                isSelected && 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900',
                !isSelected && 'hover:scale-110'
              )}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name || color.hex}
            >
              {showCopy && (
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg"
                  onClick={(e) => handleCopy(color.hex, e)}
                >
                  {isCopied ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
              )}
            </button>

            {showNames && (
              <div className="text-center">
                {color.name && (
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    {color.name}
                  </p>
                )}
                <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                  {color.hex}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ColorSwatch;
