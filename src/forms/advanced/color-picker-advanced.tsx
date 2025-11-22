import { cn } from '../../lib/utils';

export interface ColorPickerAdvancedProps {
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
  className?: string;
}

export const ColorPickerAdvanced = ({
  value,
  onChange,
  presets,
  className,
}: ColorPickerAdvancedProps) => {
  const defaultPresets = [
    '#000000',
    '#ffffff',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
  ];
  const colors = presets || defaultPresets;

  return (
    <div className={cn('space-y-3', className)}>
      <input
        type='color'
        value={value}
        onChange={e => onChange(e.target.value)}
        className='w-full h-12 rounded cursor-pointer'
      />
      <div className='grid grid-cols-8 gap-2'>
        {colors.map(color => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={cn(
              'w-8 h-8 rounded border-2',
              value === color ? 'border-blue-500' : 'border-transparent'
            )}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPickerAdvanced;
