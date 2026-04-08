import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { colors, textVariants, ui, designTokens } from '@sudobility/design';

export interface ColorPickerProps {
  /** Selected color (hex format) */
  value: string;
  /** Change handler */
  onChange: (color: string) => void;
  /** Preset colors */
  presets?: string[];
  /** Show input field */
  showInput?: boolean;
  /** Show opacity slider */
  showOpacity?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * ColorPicker Component
 *
 * Color picker with preset colors and custom input.
 * Supports hex colors and opacity.
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   value={color}
 *   onChange={setColor}
 *   showInput
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   value={brandColor}
 *   onChange={handleColorChange}
 *   presets={['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A']}
 *   showOpacity
 * />
 * ```
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  presets = [
    '#000000',
    '#FFFFFF',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E2',
    '#F8B500',
    '#52B788',
    '#E63946',
    '#1D3557',
    '#457B9D',
    '#A8DADC',
    '#F4A261',
    '#264653',
    '#2A9D8F',
  ],
  showInput = true,
  showOpacity = false,
  className,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [opacity, setOpacity] = useState(100);

  const handleColorClick = (color: string) => {
    onChange(color);
    setInputValue(color);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(Number(e.target.value));
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
  };

  const displayColor = showOpacity ? hexToRgba(value, opacity) : value;

  return (
    <div
      className={cn(
        ui.background.surface,
        designTokens.radius.lg,
        'p-4',
        className
      )}
    >
      {/* Current color preview */}
      <div className='mb-4'>
        <div className='flex items-center gap-3'>
          <div
            className={cn(
              'w-16 h-16',
              designTokens.radius.lg,
              'border-2',
              ui.border.default,
              'shadow-sm'
            )}
            style={{ backgroundColor: displayColor }}
          />
          <div className='flex-1'>
            <p
              className={cn(
                'text-sm font-medium',
                textVariants.label.default()
              )}
            >
              Selected Color
            </p>
            <p className={cn('text-xs mt-1 font-mono', textVariants.body.sm())}>
              {value}
              {showOpacity && ` (${opacity}%)`}
            </p>
          </div>
        </div>
      </div>

      {/* Preset colors */}
      <div className='mb-4'>
        <p
          className={cn(
            'text-sm font-medium mb-2',
            textVariants.label.default()
          )}
        >
          Preset Colors
        </p>
        <div className='grid grid-cols-6 gap-2'>
          {presets.map(preset => (
            <button
              key={preset}
              onClick={() => handleColorClick(preset)}
              className={cn(
                'w-full aspect-square rounded-md border-2 transition-all hover:scale-110',
                preset === value
                  ? colors.component.input.default.focus
                  : ui.border.default
              )}
              style={{ backgroundColor: preset }}
              aria-label={`Select color ${preset}`}
            />
          ))}
        </div>
      </div>

      {/* Custom color input */}
      {showInput && (
        <div className='mb-4'>
          <label
            className={cn(
              'block text-sm font-medium mb-2',
              textVariants.label.default()
            )}
          >
            Custom Color (Hex)
          </label>
          <div className='flex gap-2'>
            <input
              type='text'
              value={inputValue}
              onChange={handleInputChange}
              placeholder='#000000'
              className={cn(
                'flex-1 px-3 py-2 text-sm font-mono border rounded-md focus:outline-none',
                colors.component.input.default.base,
                colors.component.input.default.dark,
                colors.component.input.default.focus
              )}
            />
            <input
              type='color'
              value={value}
              onChange={e => handleColorClick(e.target.value)}
              className='w-12 h-10 rounded-md cursor-pointer'
            />
          </div>
        </div>
      )}

      {/* Opacity slider */}
      {showOpacity && (
        <div>
          <label
            className={cn(
              'block text-sm font-medium mb-2',
              textVariants.label.default()
            )}
          >
            Opacity: {opacity}%
          </label>
          <input
            type='range'
            min='0'
            max='100'
            value={opacity}
            onChange={handleOpacityChange}
            className={cn(
              'w-full h-2 rounded-lg appearance-none cursor-pointer',
              colors.component.input.default.base,
              colors.component.input.default.dark
            )}
          />
        </div>
      )}
    </div>
  );
};
