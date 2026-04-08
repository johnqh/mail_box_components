import { cn } from '../../lib/utils';
import { colors, ui } from '@sudobility/design';

export interface SignaturePadProps {
  onSave?: (signature: string) => void;
  width?: number;
  height?: number;
  className?: string;
}

export const SignaturePad = ({
  onSave,
  width = 400,
  height = 200,
  className,
}: SignaturePadProps) => {
  return (
    <div className={cn('border rounded-lg', ui.border.default, className)}>
      <canvas width={width} height={height} className={ui.background.surface} />
      <div className='flex gap-2 p-2'>
        <button
          className={cn(
            'px-3 py-1 rounded',
            colors.component.button.ghost.base,
            colors.component.button.ghost.dark
          )}
        >
          Clear
        </button>
        <button
          onClick={() => onSave?.('')}
          className={cn(
            'px-3 py-1 rounded',
            colors.component.button.primary.base,
            colors.component.button.primary.dark
          )}
        >
          Save
        </button>
      </div>
    </div>
  );
};
